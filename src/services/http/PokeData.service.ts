import http from "./Common.service";

/** Models */
import type { GET_ALL_POKE_MODEL } from "@/models/PokeHttp.model";
import type { POKE_DETAIL_MODEL } from "@/models/Poke.model";

class PokeDataHttpServices {

    /************* GET INFORMATION ************ */
    getAllPoke() : Promise<{data: GET_ALL_POKE_MODEL}> {
        return http.get('/?limit=300&offset=0');
    }

    getPoke(id: number): Promise<{data: POKE_DETAIL_MODEL}>{
        return http.get('/' + id.toString());
    }
}

export default new PokeDataHttpServices();