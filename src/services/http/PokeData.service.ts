import http from "./Common.service";

/** Models */
import type { GET_ALL_POKE_MODEL } from "@/models/PokeHttp.model";
import type { POKE_MODEL } from "@/models/Poke.model";

class PokeDataHttpServices {

    /************* GET INFORMATION ************ */
    getAllPoke() : Promise<{data: GET_ALL_POKE_MODEL}> {
        return http.get('/?limit=200&offset=0');
    }

    getPoke(name: string): Promise<{data: POKE_MODEL}>{
        return http.get('/' + name);
    }
}

export default new PokeDataHttpServices();