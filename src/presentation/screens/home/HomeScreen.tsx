import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { PokeballBg } from '../../components/ui';
import { globalTheme } from '../../../config/theme/global-theme';
import { PokemonCard } from '../../components/pokemons';

export const HomeScreen = () => {
    const { top } = useSafeAreaInsets();
    const height = useWindowDimensions().height;

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
            <FlatList 
                data={data?.pages.flat()??[]}
                renderItem={({item}) => <PokemonCard pokemon={item} />}
                keyExtractor={(pokemon, index) => pokemon.id.toString()+index}
                numColumns={2}
                style={{marginBottom:30}}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <Text variant="displayMedium">Pokedex</Text>
                )}
                onEndReachedThreshold={0.6}
                onEndReached={() => fetchNextPage()}
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