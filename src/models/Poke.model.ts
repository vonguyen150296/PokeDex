export interface POKE_MODEL {
    name: string;
    id: number;
    image: string; /** https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{id}}.png */
}

export interface POKE_DETAIL_MODEL {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    order: number;
    sprites: {
        back_default: string;
        back_female: string | null;
        front_default: string;
        front_female: string | null;
    }
}