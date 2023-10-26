<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onBeforeMount } from "vue";

/** components */
import Header from './components/Header.vue';

/** Services */
import PokeDataHttpService from './services/http/PokeData.service';
import PokeDataService from './services/PokeData.service';

/** Models */
import type { POKE_MODEL } from './models/Poke.model';

/** Stores */
import { PokeStore } from './stores/Poke.store';
const POKE_STORE = PokeStore();

onBeforeMount(() => {
  PokeDataHttpService.getAllPoke().then(res => {
    let pokesList: POKE_MODEL[] = PokeDataService.transform_fetched_data_to_PokesList(res.data);

    /** save pokes list in store */
    POKE_STORE.initPokesList(pokesList);
  })
})

</script>

<template>
  <Header></Header>
  <RouterView />
</template>

<style scoped></style>
