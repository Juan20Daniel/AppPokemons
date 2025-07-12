import { pokeApi } from "../../config/api/pokeApi";
import { PokemonWithNameAndId } from "../../domain/entities/pokemon";
import { PokemonsApiResponse } from "../../infrestructure/interfaces/pokemonsApiResponse.interfaces";
import { PokemonMapper } from "../../infrestructure/mappers/pokemon.mapper";

export const getAllPokemons = async (): Promise<PokemonWithNameAndId[]> => {
    try {
        const {data} = await pokeApi.get<PokemonsApiResponse>('/pokemon?offset=0&limit=1000');

        return data.results.map(pokemon => {
            return PokemonMapper.fromPokeApiWithNameAndIdToEntity(pokemon);
        });
    } catch (error) {
        console.log(error);
        throw new Error('Error al consultar todos los pokemones');
    }
}