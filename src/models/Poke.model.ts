export interface POKE_MODEL {
  id: number
  name: string
  base_experience: number
  height: number
  weight: number
  order: number
  sprites: {
    back_default: string
    back_female: string | null
    front_default: string
    front_female: string | null
  }
}

export interface FILTER_INFOS_MODEL {
  [key: string]: {
    name: string
    options: { min: number; max: number; checked: boolean; label: string }[]
  }
}
