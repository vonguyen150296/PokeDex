<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";

/** Components */
import CategoryFilter from "@/components/CategoryFilter.vue";
import TextFilter from "@/components/TextFilter.vue";
import Cart from "@/components/Cart.vue";
import Pagination from "@/components/Pagination.vue";

/** Models */
import type { FILTER_INFOS_MODEL } from "@/models/Poke.model";

/** Stores */
import { PokeStore } from "@/stores/Poke.store";
const POKE_STORE = PokeStore();

onBeforeMount(() => {
  POKE_STORE.updateCurrentView('home');
})

interface stateType {
  keywords: string;
  filterObj: FILTER_INFOS_MODEL;
}
const state = reactive({
  keywords: POKE_STORE.keywords,
  filterObj: POKE_STORE.filterObj
}) as stateType;

const heightList = window.innerHeight - 146;

function textFilter(keywords: string) {
  state.keywords = keywords;
}

function categoryFilter(filterObj: FILTER_INFOS_MODEL){
  state.filterObj = filterObj;
}


</script>

<template>
  <div class="home">
    <!-- category filter -->
    <div class="home__category">
      <CategoryFilter :filter-obj="state.filterObj" @category-filter="categoryFilter"></CategoryFilter>
    </div>

    <div class="home__content">
      <!-- text filter -->
      <TextFilter :keywords="state.keywords" @text-filter="textFilter"></TextFilter>

      <!-- Pokemon List -->
      <div :style="{ 'height': heightList + 'px' }" class="home__content-list">
        <div class="grid max-w-6xl  grid-cols-1 gap-6 p-4 sm:grid-cols-3 md:grid-cols-5">
          <template v-for="poke in POKE_STORE.getPokesList(state.keywords, state.filterObj)">
            <Cart :data="poke"></Cart>
          </template>
        </div>
      </div>

      <!-- Pagination -->
      <Pagination></Pagination>
    </div>

  </div>
</template>

<style scoped lang="scss">
.home {
  @apply grid grid-cols-1 lg:grid-cols-4 gap-4;

  &__category {
    @apply col-span-1;
  }

  &__content {
    @apply col-span-1 lg:col-span-3 pt-2 pr-2;

    &-list {
      @apply overflow-auto mx-auto;

      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(212, 208, 208, 1);
      }
    }
  }

}
</style>
