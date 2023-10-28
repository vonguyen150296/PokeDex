<script setup lang="ts">
import { reactive, onMounted } from "vue";

import { Disclosure } from '@headlessui/vue';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';

/** Stores */
import { PokeStore } from "@/stores/Poke.store";
const POKE_STORE = PokeStore();

const state = reactive({
  darkMode: true
});

onMounted(() => {
  if (state.darkMode) {
    document.documentElement.classList.add('dark');
  }
})

function darkModeTogle() {
  if (state.darkMode) {
    document.documentElement.classList.remove('dark');
    state.darkMode = false;
  } else {
    document.documentElement.classList.add('dark');
    state.darkMode = true;
  }
}

</script>

<template>
  <Disclosure as="nav" class="header">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-10 items-center justify-between">
        <div class="header__link flex-0">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-6 w-auto" src="@/assets/logo.jpg" alt="Logo" />
            <h1 class="title">PokéDex</h1>
          </div>
          <div class="sm:ml-6">
            <div class="flex space-x-4">
              <RouterLink to="/" :class="POKE_STORE.currentView === 'home' ? 'active' : 'noActive'" class="link">Home</RouterLink>
              <div :class="POKE_STORE.currentView === 'detail' ? 'active' : 'text-gray-400'" class="link">Detail</div>
            </div>
          </div>
        </div>
        <div class="header__darkMode">
          <button type="button" @click="darkModeTogle()" class="header__darkMode-btn">
            <span class="absolute -inset-1.5" />
            <span class="sr-only">Dark mode</span>
            <SunIcon v-if="!state.darkMode" class="h-6 w-6" aria-hidden="true" />
            <MoonIcon v-else class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<style scoped lang="scss">
.header {
  @apply dark:bg-gray-800 bg-white;

  &__link {
    @apply flex items-center justify-center;

    .title {
      @apply text-2xl mx-2 dark:text-white text-gray-900 font-bold;
    }

    .active {
      @apply text-gray-900 dark:text-white border-b-2 border-green-500;
    }

    .noActive {
      @apply text-gray-400 dark:hover:text-white hover:text-gray-900 hover:border-b-2 hover:border-green-500;
    }

    .link {
      @apply px-3 py-1 text-sm font-medium;
    }
  }

  &__darkMode {
    @apply absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0;

    &-btn {
      @apply relative rounded-full p-1 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-900 focus:outline-none;
    }
  }
}
</style>