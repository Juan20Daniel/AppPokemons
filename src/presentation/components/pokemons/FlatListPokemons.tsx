import React from 'react';
import { FlatList } from 'react-native';
import { PokemonCard } from './PokemonCard';

interface Props {
    data: Array<any>;
    ListHeaderComponent?: React.ReactNode;
    ListFooterComponent?:React.ReactNode;
    onEndReached?: () => void;
}

export const FlatListPokemons = ({data, ListHeaderComponent, ListFooterComponent, onEndReached}:Props) => {
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
            ListFooterComponent={
                <>{ListFooterComponent}</>
            }
            onEndReachedThreshold={0.6}
            onEndReached={() => {
                if(onEndReached) onEndReached();
            }}
        />
    )
}
