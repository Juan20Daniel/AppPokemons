import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/pokemon";
import { PokemonApiResponse } from "../../infrestructure/interfaces/pokemonApiResponse.interface";
import { PokemonMapper } from '../../infrestructure/mappers/pokemon.mapper';

export const getPokemonById = async (id:number):Promise<Pokemon> => {
    try {
        const { data } = await pokeApi.get<PokemonApiResponse>(`/pokemon/${id}`);
   
        const pokemon = await PokemonMapper.fromPokeApiToEntity(data);

        return pokemon;
    } catch (error) {
        console.log(error);
        throw new Error("Error al consultar el pokemon");
    }
}