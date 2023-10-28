<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';

/** Stores */
import { PokeStore } from "@/stores/Poke.store";
const POKE_STORE = PokeStore();

/** Models */
import type { POKE_MODEL } from '@/models/Poke.model';

/** Services */
import PokeDataService from '@/services/http/PokeData.service';

onBeforeMount(() => {
  POKE_STORE.updateCurrentView('detail');
  let pathname = window.location.pathname;
  let pokeName = pathname?.replace(/\/detail\//g, '');
  if (pokeName) {
    let pokeTmp = POKE_STORE.getPokeDetail(pokeName);
    if (pokeTmp) state.data = pokeTmp;
    else {
      PokeDataService.getPoke(pokeName).then(res => {
        state.data = res.data;
      })
    }
  }
})

interface stateType {
  data: POKE_MODEL
}
const state = reactive({
  data: {}
}) as stateType;

let heightApp = window.innerHeight - 72;
</script>
<template>
  <div class="detail" :style="{ 'height': heightApp + 'px' }">
    <img src="@/assets/images/detail-cover.jpg" alt="cover" class="detail__bg" />
    <div class="detail__content">
      <div class="mx-auto max-w-2xl">
        <h2 class="name">{{ state.data.name }}</h2>
        <div class="image">
          <article class="image__frame sm:col-start-2">
            <div class="image_frame-src">
              <img class="w-full" :src="state.data.sprites.front_default" :alt="state.data.name" />
            </div>
            <div class="-mt-6 pb-2">
              <h2 class="text-slate-700 dark:text-white text-center">Front image</h2>
            </div>
          </article>
          <article class="image__frame">
            <div class="image_frame-src">
              <img class="w-full" :src="state.data.sprites.back_default" :alt="state.data.name" />
            </div>
            <div class="-mt-6 pb-2">
              <h2 class="text-slate-700 dark:text-white text-center">Back image</h2>
            </div>
          </article>
        </div>
      </div>
      <div class="mx-auto mt-10 max-w-2xl lg:max-w-3xl ">
        <dl class="property">
          <div class="property__item">
            <dt class="property__item-value">Base experience : {{ state.data.base_experience }}</dt>
          </div>
          <div class="property__item">
            <dt class="property__item-value">Height : {{ state.data.height }}cm</dt>
          </div>
          <div class="property__item">
            <dt class="property__item-value">Weight : {{ state.data.weight }}g</dt>
          </div>
          <div class="property__item">
            <dt class="property__item-value">Order : {{ state.data.order }}</dt>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.detail {
  @apply relative isolate bg-gray-100 dark:bg-gray-900 overflow-auto;

  &__bg {
    @apply absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-10;
  }

  &__content {
    @apply mx-auto max-w-7xl px-6 lg:px-8;

    .name {
      @apply text-4xl font-bold tracking-tight dark:text-white text-gray-700 sm:text-6xl;
    }

    .image {
      @apply grid gap-6 p-4 grid-cols-2 sm:grid-cols-4;

      &__frame {
        @apply rounded-xl bg-white dark:bg-gray-600 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300;

        &-src {
          @apply relative flex items-center overflow-hidden rounded-xl;
        }
      }
    }

    .property {
      @apply mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4;

      &__item {
        @apply flex flex-col-reverse;

        &-value {
          @apply text-base leading-7 dark:text-gray-300 text-gray-700;
        }
      }
    }
  }

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(212, 208, 208, 1);
  }
}</style>