import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FAB, Text, useTheme } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { PokeballBg } from '../../components/ui';
import { globalTheme } from '../../../config/theme/global-theme';
import { FlatListPokemons } from '../../components/pokemons';
import { RootStackParamList } from '../../navigators/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackParamList, 'Home'>{}

export const HomeScreen = ({ navigation }:Props) => {
    const { top } = useSafeAreaInsets();
    const height = useWindowDimensions().height;
    const theme = useTheme();
    const queryClient = useQueryClient();
    // const { isLoading, data:pokemons=[] } = useQuery({ 
    //     queryKey: ['pokemons'], 
    //     queryFn: () => getPokemons(),
    //     staleTime: 1000*60*60,
    // });

     const { isLoading, data, fetchNextPage } = useInfiniteQuery({ 
        queryKey: ['pokemons', 'infinite'], 
        initialPageParam: 0,
        queryFn: async (params) => {
            const pokemons = await getPokemons(params.pageParam);

            pokemons.forEach(pokemon => {
                queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
            });

            return pokemons;
        },
        getNextPageParam: (lastPage, pages ) => pages.length,
    });
    
    return (
        <View style={{ height:height-20, ...globalTheme.globalMargin, paddingTop:top,}}>
            <PokeballBg customStyle={styles.pokeballImg} />
            <FlatListPokemons 
                data={data?.pages.flat()??[]}
                ListHeaderComponent={<Text variant="displayMedium">Pokedex</Text>}
                onEndReached={fetchNextPage}
            />
            <FAB 
                label="Buscar"
                style={[globalTheme.fab]}
                mode='elevated'
                color={theme.dark ? 'white' : 'black'}
                onPress={() => navigation.push('Search')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    pokeballImg: {
        position:'absolute',
        top: -100,
        right: -100,

    }
});