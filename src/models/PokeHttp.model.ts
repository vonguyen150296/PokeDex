export interface GET_ALL_POKE_MODEL {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[]
}