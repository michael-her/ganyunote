import _ from 'lodash'
import i18next from 'i18next'

const bow = {
  rust: {
    name: 'rust',
    rarity: 4,
    atk: 42,
    'atk%': 9,
    talents: {
      'normalAttackDmg%': [40, 50, 60, 70, 80],
      'chargedAttackDmg%': -10,
    }
  },
  sacrificialBow: {
    name: 'sacrificialBow',
    rarity: 4,
    atk: 44,
    'er%': 6.7,
    talents: {
      'resetCd': [{
        'proc%': 40,
        cd: 30,
      },{
        'proc%': 50,
        cd: 26,
      },{
        'proc%': 60,
        cd: 22,
      },{
        'proc%': 70,
        cd: 19,
      },{
        'proc%': 80,
        cd: 16,
      },]
    }
  },
  demonSlayerBow: {
    name: 'demonSlayerBow',
    rarity: 4,
    atk: 41,
    'atk%': 12,
    talents: {
      'normalAttackDmg%': [16, 20, 24, 28, 32],
      'chargedAttackDmg%': [16, 20, 24, 28, 32],
      'normalAttackDmg2%': [{
        toggle: true,
        amount: 16,
      },{
        toggle: true,
        amount: 20,
      },{
        toggle: true,
        amount: 24,
      },{
        toggle: true,
        amount: 28,
      },{
        toggle: true,
        amount: 32,
      }],
      'chargedAttackDmg2%': [{
        toggle: true,
        amount: 16,
      },{
        toggle: true,
        amount: 20,
      },{
        toggle: true,
        amount: 24,
      },{
        toggle: true,
        amount: 28,
      },{
        toggle: true,
        amount: 32,
      }]
    }
  },
  amosBow: {
    name: 'amosBow',
    rarity: 5,
    atk: 46,
    'atk%': 10.8,
    talents: {
      'normalAttackDmg%': [12, 15, 18, 21, 24],
      'chargedAttackDmg%': [12, 15, 18, 21, 24],
      'flyingSeconds': _.times(5, n=>({
        maxStacks: 5,
        stacks: 3,
      })),
      'normalAttackDmg%_flyingSeconds': _.times(5, n=> ({
        passive: true,
        amount: char => char.talents.weapon.flyingSeconds.stacks * (8 + n * 2),
      })),
      'chargedAttackDmg%_flyingSeconds': _.times(5, n=> ({
        passive: true,
        amount: char => char.talents.weapon.flyingSeconds.stacks * (8 + n * 2),
      })),
    }
  },
  elegyForTheEnd: {
    name: 'elegyForTheEnd',
    rarity: 5,
    atk: 46,
    'er%': 12,
    talents: {
      em: [60, 75, 90, 105, 120],
      em2: [{
        toggle: true,
        amount: 100,
        party: true,
      },{
        toggle: true,
        amount: 125,
        party: true,
      },{
        toggle: true,
        amount: 150,
        party: true,
      },{
        toggle: true,
        amount: 175,
        party: true,
      },{
        toggle: true,
        amount: 200,
        party: true,
      }],
      'atk%': [{
        toggle: true,
        amount: 20,
        party: true,
      },{
        toggle: true,
        amount: 25,
        party: true,
      },{
        toggle: true,
        amount: 30,
        party: true,
      },{
        toggle: true,
        amount: 35,
        party: true,
      },{
        toggle: true,
        amount: 40,
        party: true,
      }]
    }
  },
  thunderingPulse: {
    name: 'thunderingPulse',
    rarity: 5,
    atk: 46,
    'critDmg%': 14.4,
    talents: {
      'atk%': [20, 25, 30, 35, 40],
      'normalAttackDmg%': [{
        maxStacks: 3,
        amount: [12, 24, 40],
      },{
        maxStacks: 3,
        amount: [15, 30, 50],
      },{
        maxStacks: 3,
        amount: [18, 36, 60],
      },{
        maxStacks: 3,
        amount: [21, 42, 70],
      },{
        maxStacks: 3,
        amount: [24, 48, 80],
      }]
    }
  },
}

const sword = {
  sacrificialSword: {
    name: 'sacrificialSword',
    rarity: 4,
    atk: 41,
    'er%': 13.3,
    talents: {
      'resetCd': [{
        'proc%': 40,
        cd: 30,
      },{
        'proc%': 50,
        cd: 26,
      },{
        'proc%': 60,
        cd: 22,
      },{
        'proc%': 70,
        cd: 19,
      },{
        'proc%': 80,
        cd: 16,
      },]
    }
  },
  ironSting: {
    name: 'ironSting',
    rarity: 4,
    atk: 42,
    em: 36,
    talents: {
      'elementalDmg%': [{
        maxStacks: 2,
        amount: 6,
      },{
        maxStacks: 2,
        amount: 7.5,
      },{
        maxStacks: 2,
        amount: 9,
      },{
        maxStacks: 2,
        amount: 10.5,
      },{
        maxStacks: 2,
        amount: 12,
      }]
    }
  },
  primordialJadeCutter: {
    name: 'primordialJadeCutter',
    rarity: 5,
    atk: 44,
    'critRate%': 9.6,
    talents: {
      'maxHp%': [20, 25, 30, 35, 40],
      'atk%': [{
        passive: true,
        amount(char) { return (char.rightStats.maxHp.base + char.rightStats.maxHp.add) * 1.2 / char.rightStats.atk.base }
      },{
        passive: true,
        amount(char) { return (char.rightStats.maxHp.base + char.rightStats.maxHp.add) * 1.5 / char.rightStats.atk.base }
      },{
        passive: true,
        amount(char) { return (char.rightStats.maxHp.base + char.rightStats.maxHp.add) * 1.8 / char.rightStats.atk.base }
      },{
        passive: true,
        amount(char) { return (char.rightStats.maxHp.base + char.rightStats.maxHp.add) * 2.1 / char.rightStats.atk.base }
      },{
        passive: true,
        amount(char) { return (char.rightStats.maxHp.base + char.rightStats.maxHp.add) * 1.2 / char.rightStats.atk.base }
      },]
    }
  },
  freedomSworn: {
    name: 'freedomSworn',
    rarity: 5,
    atk: 46,
    em: 43,
    talents: {
      'allDmg%': [10, 12.5, 15, 17.5, 20],
      'normalAttacksDmg%': [{
        toggle: true,
        amount: 16,
        party: true,
      },{
        toggle: true,
        amount: 20,
        party: true,
      },{
        toggle: true,
        amount: 24,
        party: true,
      },{
        toggle: true,
        amount: 28,
        party: true,
      },{
        toggle: true,
        amount: 32,
        party: true,
      }],
      'atk%': [{
        toggle: true,
        amount: 20,
        party: true,
      },{
        toggle: true,
        amount: 25,
        party: true,
      },{
        toggle: true,
        amount: 30,
        party: true,
      },{
        toggle: true,
        amount: 35,
        party: true,
      },{
        toggle: true,
        amount: 40,
        party: true,
      }]
    }
  },
  mistsplittersReflection: {
    name: 'mistsplittersReflection',
    rarity: 5,
    atk: 48,
    'critDmg%': 9.6,
    talents: {
      'elementalDmg%': [12, 15, 18, 21, 24],
      'mistsplittersEdge': _.times(5, n=>({
        maxStacks: 3,
        stacks: 2,
      })),
      'elementalDmg%_mistsplittersEdge': [{
        passive: true,
        amount(char) { return [8, 16, 28][char.talents.weapon.mistsplittersEdge.stacks - 1] },
      },{
        passive: true,
        amount(char) { return [10, 20, 35][char.talents.weapon.mistsplittersEdge.stacks - 1] },
      },{
        passive: true,
        amount(char) { return [12, 24, 42][char.talents.weapon.mistsplittersEdge.stacks - 1] },
      },{
        passive: true,
        amount(char) { return [14, 28, 49][char.talents.weapon.mistsplittersEdge.stacks - 1] },
      },{
        passive: true,
        amount(char) { return [16, 32, 56][char.talents.weapon.mistsplittersEdge.stacks - 1] },
      }]
    }
  },
}

const polearm = {
  skywardSpine: {
    name: 'skywardSpine',
    rarity: 5,
    atk: 48,
    'er%': 8,
    talents: {
      'critRate%': [8, 10, 12, 14, 16],
      'normalAttacksSpd%': [12, 12, 12, 12, 12],
      'additionalAttack': {
        'proc%': 50,
        'multiplier%': 40,
        cd: 2,
      }
    }
  },
  primordialJadeWingedSpear: {
    name: 'primordialJadeWingedSpear',
    rarity: 5,
    atk: 48,
    'critRate%': 4.8,
    talents: {
      'atk%': [{
        maxStacks: 7,
        amount: 3.2,
        fullStacks: {
          'allDmg%': 12,
        }
      },{
        maxStacks: 7,
        amount: 3.9,
        fullStacks: {
          'allDmg%': 15,
        }
      },{
        maxStacks: 7,
        amount: 4.6,
        fullStacks: {
          'allDmg%': 18,
        }
      },{
        maxStacks: 7,
        amount: 5.3,
        fullStacks: {
          'allDmg%': 21,
        }
      },{
        maxStacks: 7,
        amount: 6,
        fullStacks: {
          'allDmg%': 24,
        }
      }]
    }
  },
  staffOfHoma: {
    name: 'staffOfHoma',
    rarity: 5,
    atk: 46,
    'critDmg%': 14.4,
    talents: {
      "hp%": [20, 25, 30, 35, 40],
      "maxHpToAtk%": [0.8, 1, 1.2, 1.4, 1.6],
      "maxHpToAtk2%": [{
        toggle: true,
        'multiplier%': 1,
      },{
        toggle: true,
        'multiplier%': 1.2,
      },{
        toggle: true,
        'multiplier%': 1.4,
      },{
        toggle: true,
        'multiplier%': 1.6,
      },{
        toggle: true,
        'multiplier%': 1.8,
      },]
    }
  }
}

const claymore = {
  skywardPride: {
    name: 'skywardPride',
    rarity: 5,
    atk: 48,
    'er%': 8,
    talents: {
      'allDmg%': [8, 10, 12, 14, 16],
      'additionalAttack': [{
        toggle: true,
        'multiplier%': 80,
        count: 8,
        duration: 20,
      },{
        toggle: true,
        'multiplier%': 100,
        count: 8,
        duration: 20,
      },{
        toggle: true,
        'multiplier%': 120,
        count: 8,
        duration: 20,
      },{
        toggle: true,
        'multiplier%': 140,
        count: 8,
        duration: 20,
      },{
        toggle: true,
        'multiplier%': 160,
        count: 8,
        duration: 20,
      }]
    }
  },
  wolfsGravestone: {
    name: 'wolfsGravestone',
    rarity: 5,
    atk: 46,
    'atk%': 10.8,
    talents: {
      'atk%': [20, 25, 30, 35, 40],
      'atk2%': [{
        toggle: true,
        amount: 40,
        party: true,
        cd: 30,
      },{
        toggle: true,
        amount: 50,
        party: true,
        cd: 30,
      },{
        toggle: true,
        amount: 60,
        party: true,
        cd: 30,
      },{
        toggle: true,
        amount: 70,
        party: true,
        cd: 30,
      },{
        toggle: true,
        amount: 80,
        party: true,
        cd: 30,
      }]
    }
  },
  songOfBrokenPines: {
    name: 'songOfBrokenPines',
    rarity: 5,
    atk: 49,
    'physDmg%': 4.5,
    talents: {
      'normalAttacksSpd%': [12, 15, 18, 21, 24],
      'normalAttacksDmg%': [{
        toggle: true,
        amount: 16,
      },{
        toggle: true,
        amount: 20,
      },{
        toggle: true,
        amount: 24,
      },{
        toggle: true,
        amount: 28,
      },{
        toggle: true,
        amount: 32,
      }],
      'atk%': [{
        toggle: true,
        amount: 20,
      },{
        toggle: true,
        amount: 25,
      },{
        toggle: true,
        amount: 30,
      },{
        toggle: true,
        amount: 35,
      },{
        toggle: true,
        amount: 40,
      }]
    }
  },
}

const catalyst = {
  sacrificialFragments: {
    name: 'sacrificialFragments',
    rarity: 4,
    atk: 41,
    em: 48,
    talents: {
      'resetCd': [{
        'proc%': 40,
        cd: 30,
      },{
        'proc%': 50,
        cd: 26,
      },{
        'proc%': 60,
        cd: 22,
      },{
        'proc%': 70,
        cd: 19,
      },{
        'proc%': 80,
        cd: 16,
      },]
    }
  },
  theWidsith: {
    name: 'theWidsith',
    rarity: 4,
    atk: 42,
    'critDmg%': 12,
    talents: {
      'atk%': [{
        random: 1,
        toggle: true,
        amount: 60,
      },{
        random: 1,
        toggle: true,
        amount: 75,
      },{
        random: 1,
        toggle: true,
        amount: 90,
      },{
        random: 1,
        toggle: true,
        amount: 105,
      },{
        random: 1,
        toggle: true,
        amount: 120,
      }],
      'elementalDmg%': [{
        random: 1,
        toggle: true,
        amount: 48,
      },{
        random: 1,
        toggle: true,
        amount: 60,
      },{
        random: 1,
        toggle: true,
        amount: 72,
      },{
        random: 1,
        toggle: true,
        amount: 84,
      },{
        random: 1,
        toggle: true,
        amount: 96,
      }],
      'em': [{
        random: 1,
        toggle: true,
        amount: 240,
      },{
        random: 1,
        toggle: true,
        amount: 300,
      },{
        random: 1,
        toggle: true,
        amount: 360,
      },{
        random: 1,
        toggle: true,
        amount: 420,
      },{
        random: 1,
        toggle: true,
        amount: 480,
      }]
    }
  },
  skywardAtlas: {
    name: 'skywardAtlas',
    rarity: 5,
    atk: 48,
    'atk%': 7.2,
    talents: {
      'elementalDmg%': [12, 15, 18, 21, 24],
      'favorOfTheClouds': [{
        'proc%': 50,
        'multiplier%': 160,
        duration: 15,
        cd: 30,
      },{
        'proc%': 50,
        'multiplier%': 200,
        duration: 15,
        cd: 30,
      },{
        'proc%': 50,
        'multiplier%': 240,
        duration: 15,
        cd: 30,
      },{
        'proc%': 50,
        'multiplier%': 280,
        duration: 15,
        cd: 30,
      },{
        'proc%': 50,
        'multiplier%': 320,
        duration: 15,
        cd: 30,
      },]
    }
  },
  memoryOfDust: {
    name: 'memoryOfDust',
    rarity: 5,
    atk: 46,
    'atk%': 10.8,
    talents: {
      'shieldStrength%': [20, 25, 30, 35, 40],
      'atk%': [{
        maxStacks: 5,
        amount: 4,
        duration: 8,
        cd: 0.3
      },{
        maxStacks: 5,
        amount: 4,
        duration: 8,
        cd: 0.3
      },{
        maxStacks: 5,
        amount: 4,
        duration: 8,
        cd: 0.3
      },{
        maxStacks: 5,
        amount: 4,
        duration: 8,
        cd: 0.3
      },{
        maxStacks: 5,
        amount: 4,
        duration: 8,
        cd: 0.3
      },],
      'atkWithShield%': [{
        maxStacks: 5,
        amount: 4,
        duration: 8,
        cd: 0.3
      },{
        maxStacks: 5,
        amount: 4,
        duration: 8,
        cd: 0.3
      },{
        maxStacks: 5,
        amount: 4,
        duration: 8,
        cd: 0.3
      },{
        maxStacks: 5,
        amount: 4,
        duration: 8,
        cd: 0.3
      },{
        maxStacks: 5,
        amount: 4,
        duration: 8,
        cd: 0.3
      },]
    }
  }
}

const weaponSheet = {
  sword,
  claymore,
  bow,
  polearm,
  catalyst,
}

export default weaponSheet