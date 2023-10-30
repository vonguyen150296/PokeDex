import { describe, it, expect } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import TextFilterComponent from '../TextFilterComponent.vue'

describe('TextFilterComponent', () => {
  const keywords = 'bulbasaur';
  const wrapper = shallowMount(TextFilterComponent, {
    props: { keywords: keywords }
  })

  it('renders properly keywords', () => {
    const inputTag = wrapper.find('input.tfilter__input-text')
    expect(inputTag.exists()).toBe(true)
    expect(inputTag.element.value).toBe(keywords)
  })

  it('emit properly', async () => {
    wrapper.vm.$emit('textFilter')
    wrapper.vm.$emit('textFilter', keywords)

    await wrapper.vm.$nextTick() // Wait until $emits have been handled
    // assert event has been emitted
    expect(wrapper.emitted().textFilter).toBeTruthy()

    // assert event count
    expect(wrapper.emitted().textFilter.length).toBe(2)

    // assert event payload
    expect(wrapper.emitted().textFilter[1]).toEqual([keywords])
  })

  it('search function', () => {
    const inputTag = wrapper.find('input.tfilter__input-text');
    inputTag.setValue(keywords);
    inputTag.trigger('keyup');
    
    // assert event has been emitted
    expect(wrapper.emitted().textFilter).toBeTruthy();
    // assert event count
    expect(wrapper.emitted().textFilter.length).toBe(3)
    // assert event payload
    expect(wrapper.emitted().textFilter[1]).toEqual([keywords])
  })
})
