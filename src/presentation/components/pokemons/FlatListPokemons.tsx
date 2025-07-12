import React from 'react';
import { FlatList } from 'react-native';
import { PokemonCard } from './PokemonCard';

interface Props {
    data: Array<any>;
    ListHeaderComponent?: React.ReactNode;
    onEndReached?: () => void;
}

export const FlatListPokemons = ({data, ListHeaderComponent, onEndReached}:Props) => {
    return (
        <FlatList
            data={data}
            renderItem={({item}) => <PokemonCard pokemon={item} />}
            keyExtractor={(pokemon, index) => pokemon.id.toString()+index}
            numColumns={2}
            style={{marginBottom:30}}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
                <>{ListHeaderComponent}</>
            )}
            onEndReachedThreshold={0.6}
            onEndReached={() => {
                if(onEndReached) onEndReached();
            }}
        />
    )
}
