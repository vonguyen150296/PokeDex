<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onBeforeMount } from "vue";

/** components */
import Header from './components/HeaderComponent.vue';
import Spinner from './components/SpinnerComponent.vue';
import Footer from './components/FooterComponent.vue';

/** Services */
import PokeDataHttpService from './services/http/PokeData.service';
import PokeDataService from './services/PokeData.service';

/** Models */
import type { POKE_MODEL } from './models/Poke.model';

/** Stores */
import { PokeStore } from './stores/Poke.store';
const POKE_STORE = PokeStore();

onBeforeMount(() => {
  POKE_STORE.addNumReq();
  PokeDataHttpService.getAllPoke().then(res => {

    /** get poke details */
    let pokesListDetail: POKE_MODEL[] = [];
    let count = 0;
    res.data.results?.forEach(item => {
      PokeDataHttpService.getPoke(item.name).then(res2 => {
        pokesListDetail.push(res2.data);
        count++;
      }).catch(err => {
        console.error(err);
        count++;
      });
    })

    let interval = setInterval(() => {
      if (count === res.data.results.length) {
        clearInterval(interval);
        POKE_STORE.subtractNumReq();
        let pokesList: POKE_MODEL[] = PokeDataService.transform_fetched_data_to_pokesList(pokesListDetail);

        /** save pokes list in store */
        POKE_STORE.initPokesList(pokesList);

      }
    }, 100)
  }).catch(err => {
    console.error(err);
    POKE_STORE.subtractNumReq();
  })
})

const heightApp = window.innerHeight - 72;

</script>

<template>
  <Header></Header>

  <!-- Content -->
  <div class="bg-gray-200 dark:bg-gray-500 w-full" :style="{ 'height': heightApp + 'px' }">
    <Transition>
      <Spinner v-if="POKE_STORE.numReq > 0"></Spinner>
    </Transition>
    <RouterView />
  </div>

  <Footer></Footer>
</template>
<style scoped lang="scss">
.v-leave-from {
  opacity: 1;
}

.v-leave-to {
  opacity: 0;
}

.v-leave-active {
  transition: all 0.7s ease-out;
}
</style>