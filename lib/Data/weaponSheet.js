import _ from 'lodash'

const bow = {
  rust: {
    name: 'rust',
    rarity: 4,
    atk: 42,
    'atk%': 9,
    talents: {
      'normalAttackDmg%': [40, 50, 60, 70, 80],
      'chargedAttackDmg%': [-10, -10, -10, -10, -10],
    }
  },
  sacrificialBow: {
    name: 'sacrificialBow',
    rarity: 4,
    atk: 44,
    'er%': 6.7,
    talents: {
      'resetCd': _.times(5, n => ({
        'proc%': 40 + 10 * n,
        cd: 30 - 4 * n,
      }))
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
      'double$normalAttackDmg%': _.times(5, n => ({
        toggle: true,
        amount: 16 + 4 * n,
      })),
      'double$chargedAttackDmg%': _.times(5, n => ({
        toggle: true,
        amount: 16 + 4 * n,
      })),
    }
  },
  viridescentHunt: {
    name: 'viridescentHunt',
    rarity: 4,
    atk: 42,
    'critRate%': 6,
    talents: {
      verdantWind: _.times(5, n=>({
        multiplier: 40 + 10 * n,
        interval: 0.5,
        duration: 4,
        cd: 14 - n,
      }))
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
      flyingSeconds: _.times(5, n=>({
        maxStacks: 5,
        stacks: 3,
      })),
      'flyingSeconds$normalAttackDmg%': _.times(5, n=> ({
        passive: true,
        amount(char) { return char.talents.weapon.flyingSeconds.stacks * (8 + n * 2) },
      })),
      'flyingSeconds$chargedAttackDmg%': _.times(5, n=> ({
        passive: true,
        amount(char) { return char.talents.weapon.flyingSeconds.stacks * (8 + n * 2) },
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
      em2: _.times(5, n => ({
        toggle: true,
        amount: 100 + 25 * n,
        party: true,
      })),
      'atk%': _.times(5, n => ({
        toggle: true,
        amount: 20 + 5 * n,
        party: true,
      }))
    }
  },
  thunderingPulse: {
    name: 'thunderingPulse',
    rarity: 5,
    atk: 46,
    'critDmg%': 14.4,
    talents: {
      'atk%': [20, 25, 30, 35, 40],
      ruleByThunder: _.times(5, n=>({
        stacks: 3,
        maxStacks: 3,
      })),
      'normalAttackDmg%': _.times(5, n => ({
        passive: true,
        amount(char) { return [12 + 3 * n, 24 + 6 * n, 40 + 10 * n][char.talents.weapon.ruleByThunder.stacks - 1] }
      }))
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
      'resetCd': _.times(5, n => ({
        'proc%': 40 + 10 * n,
        cd: 30 - 4 * n,
      }))
    }
  },
  ironSting: {
    name: 'ironSting',
    rarity: 4,
    atk: 42,
    em: 36,
    talents: {
      'elementalDmg%': _.times(5, n=> ({
        stacks: 2,
        maxStacks: 2,
        amount(char) { return 6 + 1.5 * n }
      }))
    }
  },
  theBlackSword: {
    name: 'theBlackSword',
    rarity: 4,
    atk: 42,
    'critRate%': 6,
    talents: {
      'normalAttackDmg%': [20, 25, 30, 35, 40],
      'chargedAttackDmg%': [20, 25, 30, 35, 40],
      // justice: {
      //   passive: true,
      //   // 피격 힐
      // }
    }
  },
  blackcliffLongsword: {
    name: 'blackcliffLongsword',
    rarity: 4,
    atk: 44,
    'critDmg%': 8,
    talents: {
      pressTheAdvantage: _.times(5, n => ({
        maxStacks: 3,
        stacks: 3,
        duration: 30,
        threaded: true,
      })),
      'pressTheAdvantage$atk%': _.times(5, n => ({
        passive: true,
        amount(char) { return char.talents.weapon.pressTheAdvantage.stacks * (12 + 3 * n) },
      }))
    }
  },
  amenomaKageuchi: {
    name: 'amenomaKageuchi',
    rarity: 4,
    atk: 41,
    'atk%': 12,
    talents: {
      iwakuraSuccession: _.times(5, n=>({
        maxStacks: 3,
        stacks: 3,
        duration: 30,
        threaded: true,
      })),
      onBurst$regenEr: _.times(5, n=>({
        passive: true,
        amount(char) { return 6 + n * 1.5 * char.talents.weapon.iwakuraSuccession.stacks }
      })),
    }
  },
  summitShaper: {
    name: 'summitShaper',
    rarity: 5,
    atk: 46,
    'atk%': 10.8,
    talents: {
      'shieldStrength%': _.times(5, n => 20 + n * 5),
      goldenMajesty: _.times(5, n => ({
        stacks: 5,
        maxStacks: 5,
        duration: 8,
      })),
      goldenMajestyShielded: _.times(5, n => ({
        toggle: true,
      })),
      'goldenMajesty$atk%': _.times(5, n => ({
        passive: true,
        amount(char) { return char.talents.weapon.goldenMajesty.stacks * (4 + n) * (
          char.talents.weapon.goldenMajestyShielded ? 2 : 1
        ) }
      })),
    }
  },
  primordialJadeCutter: {
    name: 'primordialJadeCutter',
    rarity: 5,
    atk: 44,
    'critRate%': 9.6,
    talents: {
      'maxHp%': [20, 25, 30, 35, 40],
      'atk%': _.times(5, n=> ({
        passive: true,
        amount(char) { return (char.spec.maxHp.base + char.spec.maxHp.add)
          * (1.2 + 0.3 * n) / char.spec.atk.base }
      }))
    }
  },
  freedomSworn: {
    name: 'freedomSworn',
    rarity: 5,
    atk: 46,
    em: 43,
    talents: {
      'allDmg%': [10, 12.5, 15, 17.5, 20],
      'revolutionaryChorale': _.times(5, _.constant({
        toggle: true,
      })),
      'normalAttacksDmg%': _.times(5, n => ({
        passive(char) { return char.talents.weapon.revolutionaryChorale.toggle },
        amount(char) { return 16 + 4 * n },
        party: true,
      })),
      'atk%': _.times(5, n => ({
        passive(char) { return char.talents.weapon.revolutionaryChorale.toggle },
        amount: 20 + 5 * n,
        party: true,
      })),
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
        stacks: 3,
      })),
      'mistsplittersEdge$elementalDmg%': _.times(5, n=>({
        passive: true,
        amount(char) { return [8 + 2 * n, 16 + 4 * n, 28 + 7 * n][
          char.talents.weapon.mistsplittersEdge.stacks - 1]
        },
      }))
    }
  },
}

const polearm = {
  theCatch: {
    name: 'theCatch',
    rarity: 4,
    atk: 42,
    'er%': 10,
    talents: {
      'burstDmg%': _.times(5, n => n * 4 + 16),
      'burstCritRate%': _.times(5, n => n * 1.5 + 6),
    }
  },
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
      eagleSpearOfJustice: _.times(5, n=>({
        stacks: 7,
        maxStacks: 7,
      })),
      'atk%': _.times(5, n=> ({
        passive: true,
        amount(char) { return char.talents.weapon.eagleSpearOfJustice.stacks * (3.2 + n * 0.7) },
      })),
      'allDmg%': _.times(5, n=> ({
        passive: true,
        amount(char) { return (char.talents.weapon.eagleSpearOfJustice.stacks === 7)
          ? (15 + n * 3)
          : 0
        },
      })),
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
      "recklessCinnabar$_maxHpToAtk%": _.times(5, n => ({
        toggle: true,
        amount: 1 + 0.2 * n,
      }))
    }
  },
  grasscuttersLight: {
    name: 'grasscuttersLight',
    rarity: 5,
    atk: 46,
    'er%': 12,
    talents: {
      'atk%': _.times(5, n=>({
        passive: true,
        amount(char) { return Math.min(80 + 10 * n, (char.spec['er%'] - 100) * (0.28 + 0.07 * n)) },
      })),
      'timelessDream$er%': _.times(5, n=>({
        toggle: true,
        amount: 30 + 5 * n,
        duration: 12,
      }))
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
      'additionalAttack': _.times(5, n => ({
        toggle: true,
        'multiplier%': 80 + 20 * n,
        count: 8,
        duration: 20,
      })),
    }
  },
  wolfsGravestone: {
    name: 'wolfsGravestone',
    rarity: 5,
    atk: 46,
    'atk%': 10.8,
    talents: {
      'atk%': [20, 25, 30, 35, 40],
      'wolfishTracker$atk%': _.times(5, n => ({
        toggle: true,
        amount: 40 + 10 * n,
        party: true,
        cd: 30,
      })),
    }
  },
  songOfBrokenPines: {
    name: 'songOfBrokenPines',
    rarity: 5,
    atk: 49,
    'physDmg%': 4.5,
    talents: {
      'normalAttacksSpd%': [12, 15, 18, 21, 24],
      'normalAttacksDmg%': _.times(5, n => ({
        toggle: true,
        amount: 16 + 4 * n,
      })),
      'atk%': _.times(5, n => ({
        toggle: true,
        amount: 20 + 5 * n,
      }))
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
      'resetCd': _.times(5, n => ({
        'proc%': 40 + 10 * n,
        cd: 30 - 4 * n,
      }))
    }
  },
  theWidsith: {
    name: 'theWidsith',
    rarity: 4,
    atk: 42,
    'critDmg%': 12,
    talents: {
      'atk%': _.times(5, n => ({
        random: 1,
        toggle: true,
        amount: 60 + 15 * n,
      })),
      'elementalDmg%': _.times(5, n => ({
        random: 1,
        toggle: true,
        amount: 48 + 12 * n,
      })),
      'em': _.times(5, n => ({
        random: 1,
        toggle: true,
        amount: 240 + 60 * n,
      }))
    }
  },
  skywardAtlas: {
    name: 'skywardAtlas',
    rarity: 5,
    atk: 48,
    'atk%': 7.2,
    talents: {
      'elementalDmg%': [12, 15, 18, 21, 24],
      'favorOfTheClouds': _.times(5, n => ({
        'proc%': 50,
        'multiplier%': 160 + 40 * n,
        duration: 15,
        cd: 30,
      }))
    }
  },
  memoryOfDust: {
    name: 'memoryOfDust',
    rarity: 5,
    atk: 46,
    'atk%': 10.8,
    talents: {
      'shieldStrength%': [20, 25, 30, 35, 40],
      'atk%': _.times(5, n => ({
        stacks: 5,
        maxStacks: 5,
        amount: 4 + n,
        duration: 8,
        cd: 0.3
      })),
      'withShield$atk%': _.times(5, n => ({
        maxStacks: 5,
        amount: 4 + n,
        duration: 8,
        cd: 0.3
      }))
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