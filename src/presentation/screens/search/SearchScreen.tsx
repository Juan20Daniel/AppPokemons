import { ActivityIndicator, Text, View } from 'react-native';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { FlatListPokemons } from '../../components/pokemons';
import { getAllPokemons } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';
import { getPokemonsById } from '../../../actions/pokemons';
import { FullScreenLoader } from '../../components/ui';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export const SearchScreen = () => {
    const [ search, setSearch ] = useState('');
    const { top } = useSafeAreaInsets();
    const { isDark } = useContext(ThemeContext);
    const { debounced } = useDebouncedValue(search);

    const { isLoading, data:pokemonsNameWithId = [] } = useQuery({
        queryKey:['pokemons', 'all'],
        queryFn:() => getAllPokemons(),
        staleTime: 1000*60*60
    });

    const pokemonNameIdList = useMemo(() => {
        if(!isNaN(Number(debounced))) {
            const pokemon = pokemonsNameWithId.find(pokemon => pokemon.id === Number(debounced));
            return pokemon ? [pokemon] : [];
        }
        if(debounced.length === 0) return [];
        if(debounced.length < 3) return [];
        const result = pokemonsNameWithId.filter(pokemom => {
            return pokemom.name.includes(debounced.toLocaleLowerCase())
        });
        
        return result;
    },[debounced]);
    
    const { isLoading: isLoadingPokemons, data:searchResult=[] } = useQuery({
        queryKey:['pokemons','by', pokemonNameIdList],
        queryFn: () => getPokemonsById(pokemonNameIdList),
        staleTime: 1000*60*5
    })

    if(isLoading) {
        return <FullScreenLoader />
    }

    return (
        <View style={[globalTheme.globalMargin, {marginTop:top+20}]}>
            <TextInput 
                placeholder='Buscar pokemon'
                mode='flat'
                autoFocus
                autoCorrect={false}
                onChangeText={value => setSearch(value)}
                value={search}
                keyboardType='default'
            />
            {isLoadingPokemons &&
                <ActivityIndicator 
                    size={49} 
                    color={isDark ? 'white' : 'black'}
                    style={{paddingTop:30}}
                />
            }
            <View style={{paddingTop:30}} />
            <Text>{JSON.stringify(searchResult, null, 2)}</Text>
            {/* <FlatListPokemons 
                data={searchResult}
                ListFooterComponent={<View style={{height:100}} />}
            /> */}
        </View>
    );
}