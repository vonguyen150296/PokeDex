/** models */
import type { POKE_MODEL } from "@/models/Poke.model";
import type { GET_ALL_POKE_MODEL } from "@/models/PokeHttp.model";

class PokeDataServices {
    transform_fetched_data_to_PokesList(data: GET_ALL_POKE_MODEL): POKE_MODEL[] {
        let api_url = import.meta.env.VITE_API_URL;

        let results: POKE_MODEL[] = data.results.map(item => {
            let id = item.url.replace(api_url, "").replace("/", "");
            let tmp: POKE_MODEL = {
                name: item.name,
                id: parseInt(id),
                image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+id+".png"
            }
            return tmp;
        });
        return results;
    }
}

export default new PokeDataServices();