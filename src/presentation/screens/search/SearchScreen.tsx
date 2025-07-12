import { ActivityIndicator, View } from 'react-native';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { FlatListPokemons } from '../../components/pokemons';
import { getAllPokemons } from '../../../actions/pokemons/getAllPokmeons';

export const SearchScreen = () => {
    const [ search, setSearch ] = useState('');
    const { top } = useSafeAreaInsets();
    const { isDark } = useContext(ThemeContext);
    useEffect(() => {
        const getPokemons = async () => {
            const result = await getAllPokemons();
            console.log(result);
        }
        getPokemons();
    },[]);
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
            <ActivityIndicator 
                size={49} 
                color={isDark ? 'white' : 'black'}
                style={{paddingTop:30}}
            />
            <FlatListPokemons 
                data={[]}
            />
        </View>
    );
}