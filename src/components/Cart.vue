<script setup lang="ts">

/** Models */
import type { POKE_MODEL } from '@/models/Poke.model';


const props = defineProps<{
  data: POKE_MODEL
}>()

</script>

<template>
  <article class="rounded-xl bg-white dark:bg-gray-600 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
    <RouterLink :to="'detail/' + props.data.name">
      <div class="relative flex items-center overflow-hidden rounded-xl">
        <img class="w-full" :src="props.data.sprites.front_default" :alt="props.data.name" />
      </div>

      <div class="-mt-6 pb-2">
        <h2 class="text-slate-700 dark:text-white text-center">{{ props.data.name }}</h2>
      </div>
    </RouterLink>
  </article>
</template>