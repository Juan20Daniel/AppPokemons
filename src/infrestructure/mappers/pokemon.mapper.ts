import { getColorFromImage } from "../../config/helpers/get-color";
import type { Pokemon } from "../../domain/entities/pokemon";
import type { PokemonApiResponse } from "../interfaces/pokemonApiResponse.interface";

export class PokemonMapper {
    static async fromPokeApiToEntity(pokemon:PokemonApiResponse):Promise<Pokemon> {
        const sprites = PokemonMapper.getSprites(pokemon);
        const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
        
        const color = await getColorFromImage(avatar);
        return {
            id: pokemon.id,
            types: pokemon.types.map(({type}) => type.name),
            avatar: avatar,
            sprites: sprites,
            name: pokemon.name,
            color: color,

            games: pokemon.game_indices.map(game => game.version.name),
            stats: pokemon.stats.map(({base_stat, stat}) => {
                return {name:stat.name, value:base_stat}
            }),
            abilities: pokemon.abilities
                .map(({ability}) => ability?.name)
                .filter(habilitie => habilitie != null), 
            movies: pokemon.moves.map(({move, version_group_details}) => {
                return {
                    name:move.name, 
                    lavel:version_group_details.shift()!.level_learned_at
                }
            })
        }
    }
    static getSprites(data: PokemonApiResponse): string[] {
        const sprites: string[] = [
            data.sprites.front_default,
            data.sprites.back_default,
            data.sprites.front_shiny,
            data.sprites.back_shiny,
        ];

        if (data.sprites.other?.home.front_default)
            sprites.push(data.sprites.other?.home.front_default);
        if (data.sprites.other?.['official-artwork'].front_default)
            sprites.push(data.sprites.other?.['official-artwork'].front_default);
        if (data.sprites.other?.['official-artwork'].front_shiny)
            sprites.push(data.sprites.other?.['official-artwork'].front_shiny);
        if (data.sprites.other?.showdown.front_default)
            sprites.push(data.sprites.other?.showdown.front_default);
        if (data.sprites.other?.showdown.back_default)
            sprites.push(data.sprites.other?.showdown.back_default);

        return sprites;
    }
}