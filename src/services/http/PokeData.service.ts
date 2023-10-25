import http from "./Common.service";

class PokeDataServices {

    /************* GET INFORMATION ************ */
    getAllPoke() {
        return http.get('/pokemon?limit=151');
    }
}

export default new PokeDataServices();