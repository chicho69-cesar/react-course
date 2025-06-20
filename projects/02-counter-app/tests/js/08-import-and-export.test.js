/* eslint-disable no-undef */
import { getHeroById, getHeroesByOwner } from '../../src/js/08-import-and-export.js'
import heroes from '../../src/js/data/heroes.js'

describe('Test on 08 import and export', () => {
  test('getHeroById should return a hero by ID', () => {
    const id = 1
    const hero = getHeroById(id)

    expect(hero).toEqual({ id: 1, name: 'Batman', owner: 'DC' })
  })

  test('getHeroById should return undefined if hero does not exist', () => {
    const id = 100
    const hero = getHeroById(id)

    /* La .aserción .toBeFalsy y la .toBeTruthy nos ayudan a ver si un valor
    es falsy o truthy, es decir un valor falsy puede ser false, 0, null, 
    undefined, etc. mientras que truthy son valores que si están definidos */
    expect(hero).toBeFalsy()
  })

  test('getHeroesByOwner should return heroes by owner', () => {
    const owner = 'DC'
    const heroesByOwner = getHeroesByOwner(owner)

    expect(heroesByOwner.length).toBe(3)

    expect(heroesByOwner).toEqual([
      { id: 1, name: 'Batman', owner: 'DC' },
      { id: 3, name: 'Superman', owner: 'DC' },
      { id: 4, name: 'Flash', owner: 'DC' }
    ])

    expect(heroesByOwner).toEqual(heroes.filter(hero => hero.owner === owner))
  })

  test('getHeroesByOwner should return heroes of Marvel', () => {
    const owner = 'Marvel'
    const heroesByOwner = getHeroesByOwner(owner)

    expect(heroesByOwner.length).toBe(2)
    expect(heroesByOwner).toEqual(heroes.filter(hero => hero.owner === owner))
  })
})
