import { Pokemon, PokemonWithNameAndId } from "../../domain/entities/pokemon";
import { getPokemonById } from "./get-pokemo-by-id";

export const getPokemonsById = async (pokemonsIds:PokemonWithNameAndId[]):Promise<Pokemon[]> => {
    try {
        console.log('exce')
        const result = pokemonsIds.map(pokeId => {
            return getPokemonById(pokeId.id);
        });
        return await Promise.all(result);
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener los pokemones");  
    }
}