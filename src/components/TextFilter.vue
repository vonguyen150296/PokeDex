<script setup lang="ts">
import { reactive } from 'vue';

const props = defineProps<{
  keywords: string;
}>();

const emit = defineEmits<{
  (e: 'textFilter', keywords: string) : void
}>()

const state = reactive({
  keywords: props.keywords
});

function search() {
  emit('textFilter', state.keywords);
}

</script>

<template>
  <form class="tfilter">
    <label for="default-search" class="tfilter__label">Search</label>
    <div class="tfilter__input">
      <div class="tfilter__input-icon">
        <svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input type="text" id="default-search" v-model="state.keywords" @keyup="search()" class="tfilter__input-text"
        placeholder="Search Pokémon..." autocomplete="off"/>
    </div>
  </form>
</template>

<style scoped lang="scss">
.tfilter {
  &__label {
    @apply mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white;
  }

  &__input {
    @apply relative ml-3 -mt-4 lg:mt-0 w-[calc(100%_-_50px)] lg:w-[calc(100%_-_13px)];

    &-icon {
      @apply absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none;

      .icon {
        @apply w-4 h-4 text-gray-500 dark:text-gray-400;
      }
    }

    &-text {
      @apply block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 focus:outline-none rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
    }
  }
}
</style>