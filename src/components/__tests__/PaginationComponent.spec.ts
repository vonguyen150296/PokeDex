import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { PokeStore } from '../../stores/Poke.store'

import { shallowMount } from '@vue/test-utils'
import PaginationComponent from '../PaginationComponent.vue'

describe('PaginationComponent', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })
  it('renders number of pokemon properly', () => {
    const POKE_STORE = PokeStore()
    POKE_STORE.updatePokesListLength(30)
    const wrapper = shallowMount(PaginationComponent)

    const msgTag = wrapper.findAll('span.font-medium')
    expect(msgTag.at(0)?.text()).toBe('1')
    expect(msgTag.at(1)?.text()).toBe('25')
    expect(msgTag.at(2)?.text()).toBe('30')

    POKE_STORE.updatePokesListLength(0)
    const wrapper2 = shallowMount(PaginationComponent)
    const msgTag2 = wrapper2.find('p.pagination__pc-message');
    expect(msgTag2.text()).toBe('Showing 0 results');

    POKE_STORE.updatePokesListLength(15)
    const wrapper3 = shallowMount(PaginationComponent)
    const msgTag3 = wrapper3.findAll('span.font-medium')
    expect(msgTag3.at(1)?.text()).toBe('15')
  })

  it('renders number of page properly', () => {
    const POKE_STORE = PokeStore()

    POKE_STORE.updatePokesListLength(60)
    const wrapper = shallowMount(PaginationComponent);
    const numberPageTag = wrapper.findAll('a.aBtn')
    expect(numberPageTag.length).toBe(3);
    expect(numberPageTag.at(0)?.text()).toBe('1')
    expect(numberPageTag.at(1)?.text()).toBe('2')
    expect(numberPageTag.at(2)?.text()).toBe('3')

    POKE_STORE.updatePokesListLength(80);
    const wrapper2 = shallowMount(PaginationComponent);
    const numberPageTag2 = wrapper2.findAll('a.aBtn')
    expect(numberPageTag2.length).toBe(4);
  })

  it('next, prev button clicked', () => {
    const POKE_STORE = PokeStore()
    POKE_STORE.updatePokesListLength(40)
    const wrapper = shallowMount(PaginationComponent);

    /** PC mode*/
    const nextBtn = wrapper.find('a.nextBtn');
    nextBtn.trigger('click');
    expect(POKE_STORE.currentPage).toBe(2);
    nextBtn.trigger('click');
    expect(POKE_STORE.currentPage).toBe(2);

    const prevBtn = wrapper.find('a.prevBtn');
    prevBtn.trigger('click');
    expect(POKE_STORE.currentPage).toBe(1);
    prevBtn.trigger('click');
    expect(POKE_STORE.currentPage).toBe(1);

    /** Mobile mode */
    const nextBtn_mobile = wrapper.find('a.pagination__mobile-nextBtn');
    nextBtn_mobile.trigger('click');
    expect(POKE_STORE.currentPage).toBe(2);

    const prevBtn_mobile = wrapper.find('a.pagination__mobile-prevBtn');
    prevBtn_mobile.trigger('click');
    expect(POKE_STORE.currentPage).toBe(1);
  })

  it('page button clicked', () => {
    const POKE_STORE = PokeStore()
    POKE_STORE.updatePokesListLength(60)
    const wrapper = shallowMount(PaginationComponent);

    const atBtn = wrapper.findAll('a.aBtn');
    atBtn.at(1)?.trigger('click');
    expect(POKE_STORE.currentPage).toBe(2);
  })
})
