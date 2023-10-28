<script setup lang="ts">
import { reactive, onUpdated, onBeforeMount } from 'vue';

/** Heroicons */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';

/** Stores */
import { PokeStore } from '@/stores/Poke.store';
const POKE_STORE = PokeStore();

const state = reactive({
  len: POKE_STORE.pokesListLength,
  currentPage: POKE_STORE.currentPage,
  pageArr: ['1', '2', '3', '4', '5', '6', '7', '8'],
});

onBeforeMount(() => {
  state.len = POKE_STORE.pokesListLength;
  POKE_STORE.updateCurrentPage(1);

  let len = Math.ceil(POKE_STORE.pokesListLength / 25);
  state.pageArr = [];
  for (let i = 1; i <= len; i++) state.pageArr.push(i.toString());
})

onUpdated(() => {
  console.log('Pagination updated!');
  /** page array change when filtering */
  if (state.len !== POKE_STORE.pokesListLength) {
    state.len = POKE_STORE.pokesListLength;
    POKE_STORE.updateCurrentPage(1);
    state.currentPage = 1;

    let len = Math.ceil(POKE_STORE.pokesListLength / 25);
    state.pageArr = [];
    for (let i = 1; i <= len; i++) state.pageArr.push(i.toString());
  }
})

function updateCurrentPage(value: string) {
  /** update current page */
  if (value === 'next') {
    if (state.currentPage < 12) state.currentPage++;
  } else if (value === 'prev') {
    if (state.currentPage > 1) state.currentPage--;
  } else state.currentPage = parseInt(value);
  POKE_STORE.updateCurrentPage(state.currentPage);
}

</script>

<template>
  <div class="pagination">
    <div class="pagination__mobile">
      <a class="pagination__mobile-prevBtn">Previous</a>
      <a href="#" class="pagination__mobile-nextBtn">Next</a>
    </div>
    <div class="pagination__pc">
      <p class="pagination__pc-message" v-if="POKE_STORE.pokesListLength"> Showing
        {{ ' ' }}
        <span class="font-medium">{{ (state.currentPage - 1) * 25 + 1 }}</span>
        {{ ' ' }}
        to
        {{ ' ' }}
        <span class="font-medium" v-if="POKE_STORE.pokesListLength > 25 * state.currentPage">{{ state.currentPage * 25
        }}</span>
        <span class="font-medium" v-else>{{ POKE_STORE.pokesListLength }}</span>
        {{ ' ' }}
        of
        {{ ' ' }}
        <span class="font-medium">{{ POKE_STORE.pokesListLength }}</span>
        {{ ' ' }}
        results
      </p>
      <p class="pagination__pc-message" v-else> Showing 0 results</p>
      <nav class="pagination__pc-btn" aria-label="Pagination" v-if="POKE_STORE.pokesListLength > 25">
        <a href="#" class="prevBtn" @click="updateCurrentPage('prev')">
          <span class="sr-only">Previous</span>
          <ChevronLeftIcon class="h-2 w-4" aria-hidden="true" />
        </a>
        <template v-for="page in state.pageArr">
          <a href="#" :key="page" aria-current="page" v-if="page !== '...'" @click="updateCurrentPage(page)"
            :class="state.currentPage.toString() == page ? 'activeBtn' : 'noActiveBtn'" class="aBtn">{{
              page }}</a>
        </template>
        <a href="#" class="nextBtn" @click="updateCurrentPage('next')">
          <span class="sr-only">Next</span>
          <ChevronRightIcon class="h-2 w-4" aria-hidden="true" />
        </a>
      </nav>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  @apply flex items-center justify-between px-4 sm:px-6;

  &__mobile {
    @apply flex flex-1 justify-between sm:hidden;

    &-prevBtn,
    &-nextBtn {
      @apply relative inline-flex items-center rounded-md border border-gray-300 px-4 py-1 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700;
    }

    &-nextBtn {
      @apply ml-3
    }
  }

  &__pc {
    @apply hidden sm:flex sm:flex-1 sm:items-center sm:justify-between h-7;

    &-message {
      @apply text-sm text-gray-700 dark:text-white;
    }

    &-btn {
      @apply isolate inline-flex -space-x-px rounded-md shadow-sm;

      .prevBtn {
        @apply relative inline-flex items-center rounded-l-md px-2 py-1 text-gray-600 dark:text-white ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0;
      }

      .nextBtn {
        @apply relative inline-flex items-center rounded-r-md px-2 py-1 text-gray-600 dark:text-white ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0;
      }

      .span {
        @apply relative inline-flex items-center px-4 py-1 text-sm font-semibold text-gray-700 dark:text-white ring-1 ring-inset ring-gray-300 focus:outline-offset-0;
      }

      .aBtn {
        @apply relative z-10 inline-flex items-center px-4 py-1 text-sm font-semibold dark:text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600;
      }

      .activeBtn {
        @apply bg-indigo-600 text-white;
      }

      .noActiveBtn {
        @apply ring-1 ring-inset ring-gray-300;
      }
    }
  }
}
</style>
  