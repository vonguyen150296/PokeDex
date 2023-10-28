<script setup lang="ts">

import { reactive, ref } from "vue";

/** headlessui */
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

/** heroicons  */
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { MinusIcon, PlusIcon, FunnelIcon } from '@heroicons/vue/20/solid';
/** models */
import type { FILTER_INFOS_MODEL } from "@/models/Poke.model";

const emit = defineEmits<{
  (e: 'categoryFilter', filterObj: FILTER_INFOS_MODEL ): void
}>();

const props = defineProps<{
  filterObj : FILTER_INFOS_MODEL
}>()

interface stateType {
  filterInfos: FILTER_INFOS_MODEL
}

const state = reactive({
  filterInfos: props.filterObj
}) as stateType;


const heightApp = window.innerHeight - 141;

const mobileFiltersOpen = ref(false);

function updateFilterInfos(key: string, all: boolean) {
  if (key === 'base_experience' || key === 'height' || key === 'weight') {
    if (all && state.filterInfos[key].options[0].checked) {
      state.filterInfos[key].options = state.filterInfos[key].options.map((el, index) => {
        if(index > 0) el.checked = false
        return el;
      });
    } else if (!all) {
      state.filterInfos[key].options[0].checked = false;
      let checked = state.filterInfos[key].options.find((el, index) => el.checked);
      if(checked == undefined) state.filterInfos[key].options[0].checked = true;
    }
    
    /** emit change to Home view */
    emit('categoryFilter', state.filterInfos);
  }
}

</script>

<template>
  <div class="category">
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog as="div" class="category__mobile" @close="mobileFiltersOpen = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
            enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
            leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="category__mobile-filter">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="dialog">
                <div class="dialog__header">
                  <h2 class="dialog__header-title">Filters</h2>
                  <button type="button" class="dialog__header-btn" @click="mobileFiltersOpen = false">
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Filters -->
                <form class="dialog__filter">
                  <Disclosure as="div" v-for="(section, key) in state.filterInfos" :key="key" class="section"
                    v-slot="{ open }">
                    <h3 class="section__header">
                      <DisclosureButton class="section__header-disclosure">
                        <span class="font-medium text-gray-900 dark:text-white">{{ section.name }}</span>
                        <span class="ml-6 flex items-center">
                          <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                          <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="section_content">
                      <div class="space-y-6">
                        <div v-for="(option, optionIdx) in section.options" :key="option.min" class="flex items-center">
                          <input :id="`filter-mobile-${key}-${optionIdx}`" :name="`${key}[]`"
                            @change="updateFilterInfos(key.toString(), option.label === 'All')" :value="option.min"
                            type="checkbox" v-model="option.checked"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label :for="`filter-mobile-${key}-${optionIdx}`"
                            class="ml-3 min-w-0 flex-1 text-gray-500 dark:text-white">{{ option.label
                            }}</label>
                        </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <!-- PC filter -->
      <main class="category__pc">

        <!-- filter button for mobile screen -->
        <button title="Filters" class="mobile_iconBtn" @click="mobileFiltersOpen = true">
          <span>
            <FunnelIcon class="h-5 w-5" aria-hidden="true" />
          </span>
        </button>

        <div class="category__pc-filter">
          <h2 class="title">Filters</h2>
        </div>

        <section aria-labelledby="category-heading" class="category__pc-section" :style="{ 'height': heightApp + 'px' }">
          <!-- Filters section -->
          <form class="hidden lg:block">
            <Disclosure as="div" v-for="(section, key) in state.filterInfos" :key="key"
              class="border-b border-gray-200 py-6" v-slot="{ open }">
              <h3 class="-my-3 flow-root">
                <DisclosureButton class="disclosure-btn">
                  <span class="font-medium text-gray-900 dark:text-white">{{ section.name }}</span>
                  <span class="ml-6 flex items-center">
                    <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                    <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel class="pt-6">
                <div class="space-y-4">
                  <div v-for="(option, optionIdx) in section.options" :key="option.min" class="flex items-center">
                    <input :id="`filter-${key}-${optionIdx}`" :name="`${key}[]`" :value="option.min" type="checkbox"
                      v-model="option.checked" @change="updateFilterInfos(key.toString(), option.label === 'All')"
                      class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label :for="`filter-${key}-${optionIdx}`" class="ml-3 text-sm text-gray-600 dark:text-white">{{
                      option.label
                    }}</label>
                  </div>
                </div>
              </DisclosurePanel>
            </Disclosure>
          </form>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.category {
  @apply bg-gray-100 dark:bg-gray-700;

  &__mobile {
    @apply relative z-40 lg:hidden;

    &-filter {
      @apply fixed inset-0 z-40 flex;

      .dialog {
        @apply relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-gray-700 py-4 pb-2 shadow-xl;

        &__header {
          @apply flex items-center justify-between px-4;

          &-title {
            @apply text-lg font-medium text-gray-900 dark:text-white;
          }

          &-btn {
            @apply -mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400;
          }
        }

        &__filter {
          @apply mt-4 border-t border-gray-200;

          .section {
            @apply border-t border-gray-200 px-4 py-6;

            &__header {
              @apply -mx-2 -my-3 flow-root;

              &-disclosure {
                @apply flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500;
              }
            }

            &__content {
              @apply pt-6;
            }
          }
        }
      }
    }
  }

  &__pc {
    @apply mx-auto max-w-7xl lg:pl-8;

    .mobile_iconBtn {
      @apply fixed right-0 my-2 mr-2 bg-blue-300 dark:bg-gray-400 hover:bg-blue-400 dark:hover:bg-gray-600 text-white font-bold py-2 px-2 rounded lg:hidden;
    }

    &-filter {
      @apply justify-between border-b border-gray-200 pb-4 pt-5 hidden lg:block;

      .title {
        @apply text-2xl font-bold tracking-tight text-gray-600 dark:text-gray-200;
      }
    }

    &-section {
      @apply pb-5 hidden lg:block lg:overflow-auto;

      .disclosure-btn {
        @apply flex w-full items-center justify-between py-3 pr-4 text-sm text-gray-400 hover:text-gray-500;
      }

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