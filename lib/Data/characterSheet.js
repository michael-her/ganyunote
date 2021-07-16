import update from 'immutability-helper'
import _ from 'lodash'

import {totalBeetickCount} from '../Data/artifactLvSheet'
// import artifactSheet from './artifactSheet'
// import weaponSheet from './weaponSheet'

const LEFT_STATS_TEMPLATE = {
  constellation: 6,
  level: '90',
  attackLv: 10,
  skillLv: 13,
  burstLv: 13,
  weapon: 'amosBow',
  weaponRefine: 5,
  weaponLv: '90',
  weaponAtk: 608,
  weaponSub: {
    stat: null,
    value: 0,
  },
  sep_0: {},
  artifact: 'blizzardStrayer',
  artifactSub: 'blizzardStrayer',
  beetickCount: totalBeetickCount,
  suggestStat1: 'critDmg%',
  suggestStat2: 'critRate%',
  suggestStat3: 'atk%',
  suggestStat4: '',
  sep_1: {},
}

export const RIGHT_STATS_TEMPLATE = {
  maxHp:     {
    base: 0,
    add: 0,
  },
  atk: {
    base: 0,
    add: 0,
  },
  def: {
    base: 0,
    add: 0,
  },
  sep_0: {},
  "maxHp%": 0,
  "def%": 0,
  "atk%": 0,
  "increaseDmg%": 0,
  "critRate%": 0,
  "critDmg%": 0,
  sep_1: {},
  "allDmg%": 0,
  "elementalDmg%": 0,
  "skillDmg%": 0,
  "normalAttackDmg%": 0,
  "chargedAttackDmg%": 0,
  "plungeAttackDmg%": 0,
  "normalAttacksDmg%": 0,
  "normalAttackMultiplier%": 100,
  "chargedAttackCritRate%": 0,
  em: 0,
  "swirlDmg%": 0,
  "overloadDmg%": 0,
  "electroChargedDmg%": 0,
  "superconductDmg%": 0,
  "burningDmg%": 0,
  "shatteredDmg%": 0,
  "vaporizeDmg%": 0,
  "meltDmg%": 0,
  stamina: 240,
  "healBonus%": 0,
  "healedBonus%": 0,
  "er%": 100,
  "cdReduce%": 0,
  "shieldStrength%": 0,
  "pyroDmg%": 0,
  "pyroRes%": 15,
  "hydroDmg%": 0,
  "hydroRes%": 15,
  "dendroDmg%": 0,
  "dendroRes%": 15,
  "anemoDmg%": 0,
  "anemoRes%": 15,
  "cryoDmg%": 0,
  "cryoRes%": 15,
  "geoDmg%": 0,
  "geoRes%": 15,
  "physDmg%": 0,
  "physRes%": 15,
}

const TALENTS_TEMPLATE = {
  skills: {
    normalAttacks: {
      normalAttack: {},
      chargedAttack: {},
      plungeAttack: {},
    },
    elementalSkill: {
    },
    elementalBurst: {
    }
  },
  lv0: {
  },
  lv20: {
  },
  lv70: {
  },
  C1: {},
  C2: {},
  C3: {},
  C4: {},
  C5: {},
  C6: {},
  weapon: {},
  artifact: {},
}

const ARTIFACTS_TEMPLATE = {
  flower: {
    maxHp: 4780,
    sub: { // 8
      'atk%': 1,
      'critRate%': 1,
      'cirtDmg%': 6,
    },
  },
  plume: {
    atk: 311,
    sub: { // 8
      'atk%': 1,
      'critRate%': 1,
      'critDmg%': 6,
    },
  },
  sands: {
    'atk%': 46.6,
    sub: { // 7
      'critRate%': 1,
      'critDmg%': 6
    },
  },
  goblet: {
    "cryoDmg%": 46.6,
    sub: { // 8
      'atk%': 1,
      'critRate%': 2,
      'critDmg%': 5,
    },
  },
  circlet: {
    'critDmg%': 62.2,
    sub: { // 7
      'atk%': 4,
      'critRate%': 3,
    },
  }
}

const NORMAL_ATTACK_TEMPLAGE_SET = hitCount => ({
  $set: _.merge({}, ..._.times(hitCount, n => ({[`hit${n+1}`]: {}})))
})

const NORMAL_ATTACK_TEMPLAGE = hitCount =>
  _.merge({}, ..._.times(hitCount, n => ({[`hit${n+1}`]: {}})))

const characterSheet = {
  ganyu: {
    name: 'ganyu',
    rarity: 5,
    weaponType: 'bow',
    elemental: 'cryo',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Ganyu.png',
    leftStats: LEFT_STATS_TEMPLATE,
    rightStats: RIGHT_STATS_TEMPLATE,
    mainTalent: {parent: 'chargedAttack', name: 'frostflakeArrowBloom'},
    talents: update(TALENTS_TEMPLATE, {skills: {
      normalAttacks: {
        normalAttack: NORMAL_ATTACK_TEMPLAGE_SET(6),
        chargedAttack: {
          frostflakeArrow: {$set: {}},
          frostflakeArrowBloom: {$set: {}},
        }
      },
      elementalSkill: {elementalSkillSummon: {$set: {}}},
      },
      lv20: {$set: {
        'critRate%_frostflakeArrow': {
          passive: char => char.mainTalent.name === 'frostflakeArrow',
          amount: 20,
        },
        'critRate%_frostflakeArrowBloom': {
          passive: char => char.mainTalent.name === 'frostflakeArrowBloom',
          amount: 20,
        }
      }},
      lv70: {$set: {
        'cryoDmg%': {
          toggle: false,
          amount: 20,
        }
      }},
      lv0: {$set: {
        'refundOre%': {
          passive: true,
          amount: 15,
        }
      }},
      C1: {$set: {
        'reduceCryoRes%': {
          toggle: true,
          amount: 15,
          duration: 6,
        },
        'regenEnergy': {
          passive: true,
          amount: 2,
        }
      }},
      C2: {$set: {
        'skillUseCount': {
          passive: true,
          amount: 1,
        }
      }},
      C3: {$set: {
        'skillLvPlus': {
          passive: true,
          amount: 3,
        }
      }},
      C4: {$set: {
        'allDmg%': {
          maxStacks: 5,
          stacks: 0,
          amount() { return this.stacks * 5 },
          cd: 3,
        }
      }},
      C5: {$set: {
        'burstLvPlus': {
          passive: true,
          amount: 3,
        }
      }},
      C6: {$set: {
        'chargelessPerSkill': {
          passive: true,
        }
      }},
    }),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  xiao: {
    name: 'xiao',
    rarity: 5,
    weaponType: 'polearm',
    elemental: 'anemo',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Xiao.png',
    mainTalent: {parent: 'normalAttacks', name: 'plungeAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {
      weapon: {$set: 'primordialJadeWingedSpear'},
      artifact: {$set: 'viridescentVenerer'},
      artifactSub: {$set: 'gradiatorsFinale'},
    }),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {
      skills: {
        normalAttacks: {
          normalAttack: NORMAL_ATTACK_TEMPLAGE_SET(6),
        },
        elementalBurst: {elementalBurstStance: {$set: {toggle: true}}}
      },
      lv20: {$set: {
        'allDmg%': {
          maxStacks: 5,
          stacks: 3,
          amount() { return this.stacks * 5 },
          cd: 3,
        },
      }},
      lv70: {$set: {
        'skillDmg%': {
          maxStacks: 3,
          stacks: 3,
          duration: 7,
          amount: 15,
        }
      }},
      lv0: {$set: {
        'decreaseClimbingStamina%': {
          passive: true,
          amount: 20,
        }
      }},
      C1: {$set: {
        'skillUseCount': {
          passive: true,
          amount: 1,
        },
      }},
      C2: {$set: {
        'er%_offField': {
          passive: true,
          amount: 25,
        }
      }},
      C3: {$set: {
        'skillLvPlus': {
          passive: true,
          amount: 3,
        }
      }},
      C4: {$set: {
        'def%_halfHp': {
          toggle: true,
          amount: 100,
        }
      }},
      C5: {$set: {
        'burstLvPlus': {
          passive: true,
          amount: 3,
        }
      }},
      C6: {$set: {
        'cdlessPerSkillCombo': {
          passive: true,
        }
      }},
    }),
    artifacts: update(ARTIFACTS_TEMPLATE, {
      goblet: {$set: {
        "anemoDmg%": 46.6,
        sub: { // 8
          'atk%': 1,
          'critRate%': 2,
          'critDmg%': 5,
        },
      }},
    }),
  },
  ayaka: {
    name: 'ayaka',
    rarity: 5,
    weaponType: 'sword',
    elemental: 'cryo',
    portrait: require('../../assets/images/character/Ayaka.png'),
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {
      weapon: {$set: 'mistsplittersReflection'},
      suggestStat1: {$set: 'critRate%'},
      suggestStat2: {$set: 'atk%'},
      suggestStat3: {$set: 'critDmg%'},
    }),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {
      skills: {$set: {
        normalAttacks: {
          ...TALENTS_TEMPLATE.skills.normalAttacks,
          normalAttack: NORMAL_ATTACK_TEMPLAGE(5),
        },
        elementalDash: {},
        elementalSkill: {},
        elementalBurst: {
          elementalBurstSummon: {},
          elementalBurstBloom: {},
        },
      }},
      lv20: {$set: {
        'onSkill': {
          toggle: true,
        },
        'normalAttackDmg%': {
          passive(char) { return char.talents.lv20.onSkill.toggle },
          amount: 30,
          duration: 6,
        },
        'chargedAttackDmg%': {
          passive(char) { return char.talents.lv20.onSkill.toggle },
          amount: 30,
          duration: 6,
        },
      }},
      lv70: {$set: {
        'onhit_cryoDmg_dash': {
          toggle: true,
        },
        'restoreStamina': {
          passive(char) { return char.talents.lv70.onhit_cryoDmg_dash.toggle },
          amount: 10,
        },
        'cryoDmg%': {
          passive(char) { return char.talents.lv70.onhit_cryoDmg_dash.toggle },
          amount: 18,
          duration: 10,
        }
      }},
      lv0: {$set: {
        'reduceCd%': {
          passive: true,
          amount: 10,
        }
      }},
      C1: {$set: {
        'onhit_cyroDmg_normalChargedAttack': {
          toggle: true,
        },
        'reduceCd%': {
          passive(char) { return char.talents.C1.onhit_cyroDmg_normalChargedAttack.toggle },
          proc: 50,
          amount: 0.3,
          cd: 0.1,
        }
      }},
      C2: {$set: {
        'burstMultishotDmg': {
          passive: true,
          amount: 20,
          count: 2,
        }
      }},
      C3: {$set: {
        'skillLvPlus': {
          passive: true,
          amount: 3,
        }
      }},
      C4: {$set: {
        'onhit_burst': {
          toggle: false,
        },
        'reduceDef%': {
          passive(char) { return char.talents.C4.onhit_burst.toggle },
          amount: 30,
          duration: 6,
        }
      }},
      C5: {$set: {
        'burstLvPlus': {
          passive: true,
          amount: 3,
        }
      }},
      C6: {$set: {
        'chargedAttackDmg%': {
          toggle: false, // { return false /*check cd*/ }
          amount: 298,
          cd: 10,
        }
      }},
    }),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  hutao: {
    name: 'hutao',
    rarity: 5,
    weaponType: 'polearm',
    elemental: 'pyro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Hu%20Tao.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'staffOfHoma'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {elementalSkill: {
      elementalSkillStance: {$set: {}},
      elementalSkillCurse: {$set: {}},
    }}}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  mona: {
    name: 'mona',
    rarity: 5,
    weaponType: 'catalyst',
    elemental: 'hydro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Mona.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'theWidsith'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {$set: {
      normalAttacks: TALENTS_TEMPLATE.skills.normalAttacks,
      elementalDash: {
        elementalDashAlter: {},
      },
      elementalSkill: {
        elementalSkillSummon: {},
        elementalSkillHold: {},
      },
      elementalBurst: {
        elementalBurstCurse: {},
        elementalBurstCurse2: {},
      }
    }}}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  zhongli: {
    name: 'zhongli',
    rarity: 5,
    weaponType: 'polearm',
    elemental: 'geo',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Zhongli.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {
      weapon: {$set: 'staffOfHoma'},
      artifact: {$set: 'viridescentVenerer'},
      artifactSub: {$set: 'gradiatorsFinale'},
    }),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {
      elementalSkill: {
        elementalSkillClick: {$set: {}},
        elementalSkillHold: {$set: {}},
        elementalSkillSummon: {$set: {}},
        elementalSkillShield: {$set: {}},
      },
      elementalBurst: {
        elementalBurstCurse: {$set: {}},
      }
    }}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  eula: {
    name: 'eula',
    rarity: 5,
    weaponType: 'claymore',
    elemental: 'cryo',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Eula.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'songOfBrokenPines'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {
      elementalSkill: {
        elementalSkillClick: {$set: {}},
        elementalSkillStance: {$set: {}},
        elementalSkillHold: {$set: {}},
      }
    }}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  kazuha: {
    name: 'kazuha',
    rarity: 5,
    weaponType: 'sword',
    elemental: 'anemo',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Kazuha.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'freedomSworn'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {
      normalAttacks: {plungeAttackCombo: {$set: {}}},
      elementalSkill: {
        elementalSkillClick: {$set: {}},
        elementalSkillHold: {$set: {}},
        elementalSkillCombo: {$set: {}},
      },
      elementalBurst: {
        elementalBurstCombo: {$set: {}},
      }
    }}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  xingqiu: {
    name: 'xingqiu',
    rarity: 4,
    weaponType: 'sword',
    elemental: 'hydro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Xingqiu.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'freedomSworn'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {
      elementalSkill: {
        elementalSkillSummon: {$set: {}},
      },
      elementalBurst: {
        elementalBurstCombo: {$set: {}},
      }
    }}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  bennett: {
    name: 'bennett',
    rarity: 4,
    weaponType: 'sword',
    elemental: 'hydro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Bennett.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'freedomSworn'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {
      elementalSkill: {
        elementalSkillClick: {$set: {}},
        elementalSkillHold: {$set: {}},
      },
      elementalBurst: {
        elementalBurstField: {$set: {}},
      }
    }}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  diona: {
    name: 'diona',
    rarity: 4,
    weaponType: 'bow',
    elemental: 'cryo',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Diona.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'sacrificialBow'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {
      elementalSkill: {
        elementalSkillClick: {$set: {}},
        elementalSkillHold: {$set: {}},
      },
      elementalBurst: {
        elementalBurstField: {$set: {}},
      }
    }}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  sucrose: {
    name: 'sucrose',
    rarity: 4,
    weaponType: 'catalyst',
    elemental: 'anemo',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Sucrose.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'sacrificialFragments'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {
      elementalBurst: {
        elementalBurstCombo: {$set: {}},
      }
    }}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  jean: {
    name: 'jean',
    rarity: 5,
    weaponType: 'sword',
    elemental: 'anemo',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Jean.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'freedomSworn'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {
      elementalSkill: {
        elementalSkillHold: {$set: {}},
      },
      elementalBurst: {
        elementalBurstField: {$set: {}},
      }
    }}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  albedo: {
    name: 'albedo',
    rarity: 5,
    weaponType: 'sword',
    elemental: 'geo',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Albedo.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'freedomSworn'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {
      elementalSkill: {
        elementalSkillSummon: {$set: {}},
        elementalSkillHold: {$set: {}},
      },
    }}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  chongyun: {
    name: 'chongyun',
    rarity: 4,
    weaponType: 'claymore',
    elemental: 'cryo',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Chongyun.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'wolfsGravestone'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {
      elementalSkill: {
        elementalSkillField: {$set: {}},
      },
    }}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  xiangling: {
    name: 'xiangling',
    rarity: 4,
    weaponType: 'polearm',
    elemental: 'pyro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Xiangling.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'skywardSpine'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: TALENTS_TEMPLATE,
    artifacts: ARTIFACTS_TEMPLATE,
  },
  klee: {
    name: 'klee',
    rarity: 5,
    weaponType: 'catalyst',
    elemental: 'pyro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Klee.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'skywardAtlas'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: TALENTS_TEMPLATE,
    artifacts: ARTIFACTS_TEMPLATE,
  },
  diluc: {
    name: 'diluc',
    rarity: 5,
    weaponType: 'claymore',
    elemental: 'pyro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Diluc.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'wolfsGravestone'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: TALENTS_TEMPLATE,
    artifacts: ARTIFACTS_TEMPLATE,
  },
  venti: {
    name: 'venti',
    rarity: 5,
    weaponType: 'bow',
    elemental: 'anemo',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Venti.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'elegyForTheEnd'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {
      elementalSkill: {
        elementalSkillClick: {$set: {}},
        elementalSkillHold: {$set: {}},
      },
      elementalBurst: {
        elementalBurstCombo: {$set: {}},
      },
    }}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  fischl: {
    name: 'fischl',
    rarity: 4,
    weaponType: 'bow',
    elemental: 'electro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Fischl.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'elegyForTheEnd'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {
      elementalSkill: {
        elementalSkillHold: {$set: {}},
      },
    }}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  xinyan: {
    name: 'xinyan',
    rarity: 4,
    weaponType: 'claymore',
    elemental: 'pyro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Xinyan.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'wolfsGravestone'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: TALENTS_TEMPLATE,
    artifacts: ARTIFACTS_TEMPLATE,
  },
  beidou: {
    name: 'beidou',
    rarity: 4,
    weaponType: 'claymore',
    elemental: 'electro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Beidou.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'skywardPride'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {
      elementalSkill: {
        elementalSkillClick: {$set: {}},
        elementalSkillHold: {$set: {}},
      },
      elementalBurst: {
        elementalBurstCombo: {$set: {}},
      }
    }}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  keqing: {
    name: 'keqing',
    rarity: 5,
    weaponType: 'sword',
    elemental: 'electro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Keqing.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'mistsplittersReflection'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {skills: {
      elementalSkill: {
        elementalSkillHold: {$set: {}},
        elementalSkillCombo: {$set: {}},
      },
    }}),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  rosaria: {
    name: 'rosaria',
    rarity: 4,
    weaponType: 'polearm',
    elemental: 'cryo',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Rosaria.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    leftStats: update(LEFT_STATS_TEMPLATE, {weapon: {$set: 'primordialJadeWingedSpear'}}),
    rightStats: RIGHT_STATS_TEMPLATE,
    talents: TALENTS_TEMPLATE,
    artifacts: ARTIFACTS_TEMPLATE,
  },
}
// characterSheet = update(characterSheet, Object.keys(characterSheet).reduce((ret, name) => {
//   const char = characterSheet[name]
//   const weaponTalents = weaponSheet[char.weaponType][char.leftStats.weapon].talents
//   return {
//     ...ret,
//     [name]: {
//       talents: {
//         weapon: {$set: Object.keys(weaponTalents).reduce((ret, p) => ({
//           ...ret,
//           [p]: weaponTalents[p][char.leftStats.weaponRefine - 1]
//         }), {})},
//         artifact: {$set: artifactSheet[char.leftStats.artifact].talents[0]},
//         artifactSub: {$set: char.leftStats.artifact === char.leftStats.artifactSub
//           ? artifactSheet[char.leftStats.artifact].talents[1]
//           : artifactSheet[char.leftStats.artifactSub].talents[0]
//         }
//       }
//     }
//   }
// }, {}))

export default characterSheet

/*
카즈하 - 파도를 쫓는 단풍
클레 - 도망치는 태양
유라 - 물보라의 춤
디오나 - 캐츠라인 칵테일
종려 - 속세 한유
연비 - 순수한 지혜
노엘 - 수여받지 못한 꽃
로자리아 - 가시관의 은혜
베넷 - 운명의 시금석
레이저 - 늑대 소년
바바라 - 빛나는 아이돌
설탕 - 무해한 달콤함
피슬 - 단죄의 황녀!!
신염 - 폭열 멜로디
행추 - 의기충천
북두 - 무관의 용왕
타르탈리아 - 타르탈리아
벤티 - 바람의 시인
호두 - 눈 그친 뒤에 매화향
향릉 - 만민백미
중운 - 얼어붙은 열정
각청 - 질뢰쾌우
응광 - 엄월천권
소 - 호법야차
감우 - 리월의 수호자
알베도 - 백악의 아이
모나 - 별하늘의 물거울
치치 - 차가운 환혼의 밤
리사 - 장미 마녀
케이아 - 한풍의 검사
엠버 - 비행 챔피언
진 - 민들레 기사
다이루크 - 새벽의 어둠
데인슬레이프 - 가지의 수호자
*/