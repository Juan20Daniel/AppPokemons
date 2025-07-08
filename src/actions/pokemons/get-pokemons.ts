import { pokeApi } from "../../config/api/pokeApi";
import type { Pokemon } from "../../domain/entities/pokemon";
import type { PokemonApiResponse } from "../../infrestructure/interfaces/pokemonApiResponse.interface";
import type { PokemonsApiResponse } from "../../infrestructure/interfaces/pokemonsApiResponse.interfaces";
import { PokemonMapper } from "../../infrestructure/mappers/pokemon.mapper";

export const getPokemons = async (page:number=0, limit:number=20):Promise<Pokemon[]> => {
    try {
        const fragmentUrl = `/pokemon?offset=${page*limit}&limit=${limit}`;
        const { data } = await pokeApi.get<PokemonsApiResponse>(fragmentUrl);

        const pokePromises = await Promise.all(data.results.map(pokemon => {
            return pokeApi.get<PokemonApiResponse>(pokemon.url);
        }));
        
        return await Promise.all(pokePromises.map(pokemon => {
            return PokemonMapper.fromPokeApiToEntity(pokemon.data)
        }));
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener los pokemons - getPokemons');
    }
}