import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPokemons } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';
import { PokeballBg } from '../../components/ui';
import { Text } from 'react-native-paper';
import { globalTheme } from '../../../config/theme/global-theme';
import { PokemonCard } from '../../components/pokemons';

export const HomeScreen = () => {
    const { top } = useSafeAreaInsets();
    const height = useWindowDimensions().height;
    const { isLoading, data:pokemons=[] } = useQuery({ 
        queryKey: ['pokemons'], 
        queryFn: () => getPokemons(),
        staleTime: 1000*60*60,
    });
    console.log(pokemons);
    return (
        <View style={{ height:height-20, ...globalTheme.globalMargin, paddingTop:top,}}>
            <PokeballBg customStyle={styles.pokeballImg} />
            <FlatList 
                data={pokemons}
                renderItem={({item}) => <PokemonCard pokemon={item} />}
                keyExtractor={(pokemon, index) => pokemon.id.toString()+index}
                numColumns={2}
                style={{marginBottom:30}}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <Text variant="displayMedium">Pokedex</Text>
                )}
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
})