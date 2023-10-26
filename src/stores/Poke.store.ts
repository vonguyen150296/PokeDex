import { defineStore } from "pinia";

/** Models */
import type { POKE_MODEL, POKE_DETAIL_MODEL } from "@/models/Poke.model";

interface PokeType {
    pokesList: POKE_MODEL[],
    pokesDetailList: POKE_DETAIL_MODEL[]
}
export const PokeStore = defineStore({
    id: "poke-store",
    state: () => ({
        pokesList: [],
        pokesDetailList: []
    }) as PokeType,
    getters: {
        getPokesList: (state) => state.pokesList,
        getPokeDetail: (state) => {
            return (id: number) => {
                let poke = state.pokesDetailList.find( poke => poke.id === id);
                return poke;
            }
        }
    },
    actions: {
        initPokesList(pokesList: POKE_MODEL[]){
            this.pokesList = pokesList;
        },
        addPokeList(pokesList: POKE_MODEL[]){
            this.pokesList = [...this.pokesList, ...pokesList];
        },
        addPokeDetail(poke: POKE_DETAIL_MODEL){
            let pokeDetail = this.pokesDetailList.find(po => po.id === poke.id);
            if(pokeDetail === undefined) this.pokesDetailList.push(poke);
        }
    }
})