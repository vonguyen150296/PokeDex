/** models */
import type { POKE_MODEL } from "@/models/Poke.model";

class PokeDataServices {
    transform_fetched_data_to_pokesList(data: POKE_MODEL[]): POKE_MODEL[] {

        const results: POKE_MODEL[] = data.map(item => {
            const tmp: POKE_MODEL = {
                id: item.id,
                name: item.name,
                height: item.height,
                weight: item.weight,
                order: item.order,
                base_experience: item.base_experience,
                sprites: {
                    back_default: item.sprites.back_default,
                    back_female: item.sprites.back_female,
                    front_default: item.sprites.front_default,
                    front_female: item.sprites.front_female
                }
            }
            return tmp;
        });
        return results;
    }
}

export default new PokeDataServices();