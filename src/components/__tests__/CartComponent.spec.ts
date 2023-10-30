import { describe, it, expect } from 'vitest';

import { shallowMount } from '@vue/test-utils'
import CartComponent from '../CartComponent.vue'

/** Models */
import type { POKE_MODEL } from '../../models/Poke.model';

describe('CartComponent', () => {
  const pokeData: POKE_MODEL = {
    "id": 1,
    "name": "bulbasaur",
    "height": 7,
    "weight": 69,
    "order": 1,
    "base_experience": 64,
    "sprites": {
      "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
      "back_female": null,
      "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      "front_female": null
    }
  };
  const wrapper = shallowMount(CartComponent, { props: { data: pokeData } });
  
  it('renders properly name', () => {
    const nameTag = wrapper.find("h2.cart__name");
    expect(nameTag.exists()).toBe(true);
    expect(nameTag.text()).toBe(pokeData.name);
  });

  it('renders properly image', () => {
    const imageTag = wrapper.find("img.cart__image");
    expect(imageTag.exists()).toBe(true);
    expect(imageTag.attributes('src')).toBe(pokeData.sprites.front_default);
  })
})