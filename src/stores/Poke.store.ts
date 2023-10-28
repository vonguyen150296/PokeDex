import { defineStore } from 'pinia'

/** Models */
import type { FILTER_INFOS_MODEL, POKE_MODEL } from '@/models/Poke.model'

interface PokeType {
  numReq: number // Number of requests being sent to the server. If > 0 => show loading page
  currentView: string // 'home' or 'detail'
  currentPage: number
  pokesList: POKE_MODEL[]
  pokesListLength: number
  filterObj: FILTER_INFOS_MODEL
  keywords: string
}
export const PokeStore = defineStore({
  id: 'poke-store',
  state: () =>
    ({
      numReq: 0,
      currentView: 'home',
      currentPage: 1,
      pokesList: [],
      pokesListLength: 0,
      filterObj: {
        base_experience: {
          name: 'Base experience',
          options: [
            { min: 0, max: 0, label: 'All', checked: true },
            { min: 0, max: 30, label: '0 <= x < 30', checked: false },
            { min: 30, max: 60, label: '30 <= x < 60', checked: false },
            { min: 60, max: 90, label: '60 <= x < 90', checked: false },
            { min: 90, max: 0, label: 'x >= 90', checked: false }
          ]
        },
        height: {
          name: 'Height',
          options: [
            { min: 0, max: 0, label: 'All', checked: true },
            { min: 0, max: 30, label: '0cm <= x < 30cm', checked: false },
            { min: 30, max: 60, label: '30cm <= x < 60cm', checked: false },
            { min: 60, max: 90, label: '60cm <= x < 90cm', checked: false },
            { min: 90, max: 0, label: 'x >= 90cm', checked: false }
          ]
        },
        weight: {
          name: 'Weight',
          options: [
            { min: 0, max: 0, label: 'All', checked: true },
            { min: 0, max: 30, label: '0g <= x < 30g', checked: false },
            { min: 30, max: 60, label: '30g <= x < 60g', checked: false },
            { min: 60, max: 90, label: '60g <= x < 90g', checked: false },
            { min: 90, max: 0, label: 'x >= 90g', checked: false }
          ]
        }
      },
      keywords: ''
    }) as PokeType,
  getters: {
    getPokesList: (state) => {
      return (keywords: string, filterObj: FILTER_INFOS_MODEL) => {
        let result: POKE_MODEL[] = state.pokesList

        /** update keywords */
        state.keywords = keywords

        /** filter with keywords */
        if (keywords) {
          result = result.filter((po) => po.name.includes(keywords))
        }

        /** update filter object */
        state.filterObj = filterObj

        /** filter with min, max attr */
        for (let key in filterObj) {
          if (!filterObj[key].options[0].checked) {
            result = result.filter((po, index) => {
              let check = false
              filterObj[key].options.forEach((opt) => {
                if (opt.checked) {
                  //@ts-ignore
                  if (po[key] >= opt.min && po[key] < opt.max) check = true;
                  //@ts-ignore
                  if (po[key] >= opt.min && opt.max === 0) check = true;
                }
              })

              if (check) return po
            })
          }
        }
        /** get list length before pagination */
        state.pokesListLength = result.length;

        /** return maximun 25items for 1 page */
        result = result.filter(
          (po, index) => 25 * (state.currentPage - 1) <= index && index < 25 * state.currentPage
        )
        return result
      }
    },
    getPokeDetail: (state) => {
      return (name: string) => {
        let poke = state.pokesList.find((poke) => poke.name === name)
        return poke
      }
    }
  },
  actions: {
    initPokesList(pokesList: POKE_MODEL[]) {
      this.pokesList = pokesList;
    },
    updateCurrentPage(currentPage: number) {
      if (currentPage > 0 && currentPage <= this.pokesListLength) this.currentPage = currentPage
    },
    updateCurrentView(view: string) {
      if (view === 'detail' || view === 'home') this.currentView = view
    },
    addNumReq() {
      this.numReq += 1
    },
    subtractNumReq() {
      if (this.numReq > 0) this.numReq -= 1
    }
  }
})
