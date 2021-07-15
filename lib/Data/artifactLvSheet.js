import _ from 'lodash'

export const artifactLevels = '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20'
.split(',').map(lv => parseInt(lv.trim(), 10))

export const artifactMainSheet = {
  flower: {
    maxBeetick: 8,
    maxHp: 4780,
  },
  plume: {
    maxBeetick: 8,
    atk: 311,
  },
  sands: {
    maxBeetick: 7,
    'maxHp%': 46.6,
    'atk%': 46.6,
    'def%': 58.3,
    em: 187,
    'er%': 51.8,
  },
  goblet: {
    maxBeetick: 8,
    'maxHp%': 46.6,
    'atk%': 46.6,
    'def%': 58.3,
    em: 187,
    "pyroDmg%": 46.6,
    "hydroDmg%": 46.6,
    "dendroDmg%": 46.6,
    "anemoDmg%": 46.6,
    "cryoDmg%": 46.6,
    "geoDmg%": 46.6,
    "physDmg%": 58.3,
  },
  circlet: {
    maxBeetick: 7,
    'maxHp%': 46.6,
    'atk%': 46.6,
    'def%': 58.3,
    em: 187,
    'critRate%': 31.1,
    'critDmg%': 62.2,
    'healBonus%': 35.9,
  }
}

export const totalBeetickCount = _.sum(Object.keys(artifactMainSheet).map(key => artifactMainSheet[key].maxBeetick))

export const artifactSubSheet = {
  maxHp:      [209, 239, 269, 299],
  def:        [ 16,  19,  21,  23],
  atk:        [ 14,  16,  18,  19],
  'maxHp%':   [4.1, 4.7, 5.3, 5.8],
  'def%':     [5.1, 5.8, 6.6, 7.3],
  'atk%':     [4.1, 4.7, 5.3, 5.8],
  em:         [ 16,  19,  21,  23],
  'er%':      [4.5, 5.2, 5.8, 6.5],
  'critRate%':[2.7, 3.1, 3.5, 3.9],
  'critDmg%': [5.4, 6.2,   7, 7.8],
}

