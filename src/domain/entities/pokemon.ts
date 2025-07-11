export interface Pokemon {
    id:number;
    name:string;
    types: string[];
    avatar:string;
    sprites: string[];

    //todo
    color:string;

    games: string[];
    stats: Stat[];
    abilities: string[];
    movies: Move[];
}

export interface Stat {
    name: string;
    value: number;
}

export interface Move {
    name: string;
    lavel: number;
}
