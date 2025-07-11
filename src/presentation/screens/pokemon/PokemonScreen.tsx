import { StackScreenProps } from '@react-navigation/stack';
import { Text, View, ScrollView, StyleSheet, Image, FlatList } from 'react-native';
import { RootStackParamList } from '../../navigators/StackNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPokemonById } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';
import { FadeInImage, FullScreenLoader } from '../../components/ui';
import { Formatter } from '../../../config/helpers/formatter';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Chip } from 'react-native-paper';

interface Props extends StackScreenProps<RootStackParamList, 'Pokemon'>{}

export const PokemonScreen = ({route}:Props) => {
    const {isDark} = useContext(ThemeContext); 
    const { top } = useSafeAreaInsets();
    const { pokemonId } = route.params;
    const { isLoading, data:pokemon } = useQuery({
        queryKey: ['pokemon', pokemonId],
        queryFn: () => getPokemonById(pokemonId),
        staleTime: 1000*60*60
    });
    const pokeballImg = isDark 
        ? require('../../../assets/pokeball-light.png')
        : require('../../../assets/pokeball-dark.png')
    if(isLoading || !pokemon) {
        return <FullScreenLoader />
    }

    return (
        <ScrollView
            style={{flex: 1, backgroundColor: pokemon.color}}
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
            <View style={{paddingBottom:60}}>

                <View style={styles.headerContainer}>
                    <Text style={{...styles.pokemonName, top:top+5}}>
                        {Formatter.capitalize( pokemon.name )+'\n'}#{pokemon.id}
                    </Text>
                    <Image source={ pokeballImg } style={ styles.pokeball } />
                    <FadeInImage uri={ pokemon.avatar } style={ styles.pokemonImage } />
                </View>
                {/* Types */ }
                <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 10}}>
                    { pokemon.types.map( type => (
                    <Chip
                        key={ type }
                        mode="outlined"
                        selectedColor="white"
                        style={{marginLeft: 10, backgroundColor:'rgba(0,0,0,.0)'}}
                    >
                        {type}
                    </Chip>
                    ) ) }
                </View>

                {/* Sprites */ }
                <FlatList
                    data={pokemon.sprites}
                    horizontal
                    keyExtractor={item => item}
                    showsHorizontalScrollIndicator={false}
                    centerContent
                    style={ {
                        marginTop: 20,
                        height: 100,
                    } }
                    renderItem={({item}) => (
                        <FadeInImage
                            uri={item}
                            style={{width: 100, height: 100, marginHorizontal: 5}}
                        />
                    )}
                />
                <Text style={styles.subTitle}>Abilities</Text>
                <FlatList 
                    data={pokemon.abilities}
                    keyExtractor={item => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                        <Chip selectedColor='white' style={{marginLeft: 10, backgroundColor:'rgba(0,0,0,.0)'}}>
                            {Formatter.capitalize(item)}
                        </Chip>
                    )}
                />
                <View style={{height:30}} />
                <FlatList 
                    data={pokemon.stats}
                    keyExtractor={stat => stat.name}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({item}) => (
                        <View style={styles.statsContainer}>
                            <Text style={{flex:1, color:'white'}}>{Formatter.capitalize(item.name)}</Text>
                            <Text style={{flex:1, color:'white'}}>{item.value}</Text>
                        </View>
                    )}
                />
                <View style={{height:30}} />
                <FlatList 
                    data={pokemon.movies}
                    keyExtractor={stat => stat.name}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({item}) => (
                        <View style={styles.statsContainer}>
                            <Text style={{flex:1, color:'white'}}>{Formatter.capitalize(item.name)}</Text>
                            <Text style={{flex:1, color:'white'}}>{item.lavel}</Text>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20,
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.7,
    },
    pokemonImage: {
        width: 240,
        height: 240,
        position: 'absolute',
        bottom: -40,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginTop: 20,
    },
    statsContainer: {
        flexDirection: 'column',
        marginHorizontal: 20,
        alignItems: 'center',
    },  
});