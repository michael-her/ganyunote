import update from 'immutability-helper'
import _ from 'lodash'

const SETTING_TEMPLATE = {
  beetickCount: 24, // totalBeetickCount,
  suggestStat1: {
    key: 'suggestStat1',
    name: 'critDmg%',
    count: 8,
    maxCount: 0,
    dmgPerStat: 0,
    locked: false,
  },
  suggestStat2: {
    key: 'suggestStat2',
    name: 'critRate%',
    count: 8,
    maxCount: 0,
    dmgPerStat: 0,
    locked: false,
  },
  suggestStat3: {
    key: 'suggestStat3',
    name: 'atk%',
    count: 8,
    maxCount: 0,
    dmgPerStat: 0,
    locked: false,
  },
  suggestStat4: {
    key: 'suggestStat4',
    name: '',
    count: 0,
    maxCount: 0,
    dmgPerStat: 0,
    locked: false,
  },
  suggestStat5: {
    key: 'suggestStat5',
    name: '',
    count: 0,
    maxCount: 0,
    dmgPerStat: 0,
    locked: false,
  },
  sandsStat: 'atk%',
  gobletStat: 'cryoDmg%',
  circletStat: 'critDmg%',
  artifact: 'blizzardStrayer',
  artifactSub: 'blizzardStrayer',
  sep_0: {},
  constellation: 6,
  level: '90',
  attackLv: 10,
  skillLv: 10,
  burstLv: 10,
  weapon: 'amosBow',
  weaponRefine: 5,
  weaponLv: '90',
  weaponAtk: 608,
  weaponSub: {
    stat: null,
    value: 0,
  },
  sep_1: {},
}

export const SPEC_TEMPLATE = {
  maxHp: {
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
  "er%": 100,
  em: 0,
  sep_1: {},
  _incAttackLv: 0,
  _incSkillLv: 0,
  _incBurstLv: 0,
  "pyroDmg%": 0,
  "hydroDmg%": 0,
  "dendroDmg%": 0,
  "anemoDmg%": 0,
  "electroDmg%": 0,
  "cryoDmg%": 0,
  "geoDmg%": 0,
  "physDmg%": 0,
  "allDmg%": 0,
  "elementalDmg%": 0,
  "skillDmg%": 0,
  "burstDmg%": 0,
  "normalAttackDmg%": 0,
  "chargedAttackDmg%": 0,
  "plungeAttackDmg%": 0,
  "normalAttacksDmg%": 0,
  "normalAttackMultiplier%": 100,
  "_skillMultiplier%": 100,
  "_burstMultiplier%": 100,
  "_normalAttacksAddition%": 0,
  "_skillAddition%": 0,
  "_burstAddition%": 0,
  "normalAttackCritRate%": 0,
  "normalAttacksCritRate%": 0,
  "chargedAttackCritRate%": 0,
  "skillCritRate%": 0,
  "burstCritRate%": 0,
  "decOpntDef%": 0,
  "ignoreOpntDef%": 0,
  "decOpntPyroRes%": 0,
  "decOpntHydroRes%": 0,
  "decOpntDendroRes%": 0,
  "decOpntAnemoRes%": 0,
  "decOpntElectroRes%": 0,
  "decOpntCryoRes%": 0,
  "decOpntGeoRes%": 0,
  "decOpntPhysRes%": 0,
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
  "cdReduce%": 0,
  "shieldStrength%": 0,
  "pyroRes%": 15,
  "hydroRes%": 15,
  "dendroRes%": 15,
  "anemoRes%": 15,
  "cryoRes%": 15,
  "geoRes%": 15,
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
      'critDmg%': 1,
    },
  },
  plume: {
    atk: 311,
    sub: { // 8
      'atk%': 1,
      'critRate%': 1,
      'critDmg%': 1,
    },
  },
  sands: {
    'atk%': 46.6,
    sub: { // 7
      'critRate%': 1,
      'critDmg%': 2,
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

const NORMAL_ATTACK_TEMPLATE_SET = hitCount => ({
  $set: _.merge({}, ..._.times(hitCount, n => ({[`hit${n+1}`]: {}})))
})

const NORMAL_ATTACK_TEMPLATE = hitCount =>
  _.merge({}, ..._.times(hitCount, n => ({[`hit${n+1}`]: {}})))

const characterSheet = {
  raiden: {
    name: 'raiden',
    rarity: 5,
    weaponType: 'polearm',
    elemental: 'electro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Hu%20Tao.png',
    mainTalent: {parent: 'elementalBurst', name: 'elementalBurstHit'},
    setting: update(SETTING_TEMPLATE, {
      weapon: {$set: 'grasscuttersLight'},
      artifact: {$set: 'emblemOfSeveredFate'},
      artifactSub: {$set: 'emblemOfSeveredFate'},
      suggestStat1: {name: {$set: 'critDmg%'}},
      suggestStat2: {name: {$set: 'critRate%'}},
      suggestStat3: {name: {$set: 'atk%'}},
      sandsStat: {$set: 'atk%'},
      gobletStat: {$set: 'electroDmg%'},
      circletStat: {$set: 'critRate%'},
    }),
    spec: SPEC_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {
      skills: {
        normalAttacks: {
          normalAttack: NORMAL_ATTACK_TEMPLATE_SET(5),
        },
        elementalSkill: {
          elementalSkillHit: {$set: {}},
          elementalSkillOnHit: {$set: {}},
          elementalSkillAura: {$set: {passive: true}},
        },
        elementalBurst: {
          elementalBurstHit: {$set: {}},
          resolveStacks: {$set: {
            maxStacks: 60,
            stacks: 60,
            step: 10,
          }},
          'elementalBurstStance$_burstAddition%': {$set: {
            passive: true,
            amount(char) { return char.talents.skills.elementalBurst.resolveStacks.stacks * 7 }
          }},
          'elementalBurstStance$_normalAttacksAddition%': {$set: {
            passive: true,
            amount(char) { return char.talents.skills.elementalBurst.resolveStacks.stacks * 0.87 }
          }}
        },
      },
      lv20: {$set: {
        'additionalResolveStacks': {
          passive: true,
          amount: 2,
          cd: 3,
        },
      }},
      lv70: {$set: {
        'musouInsshin$regenEr%': {
          passive: true,
          amount(char) { return (char.spec['er%'] - 100) * 0.6 },
        },
        'electroDmg%': {
          passive: true,
          amount(char) { return (char.spec['er%'] - 100) * 0.4 },
        },
        'reduceMoraToAscendingSword%': {
          passive: true,
          amount: 50,
        },
        'reduceMoraToAscendingPolearm%': {
          passive: true,
          amount: 50,
        }
      }},
      lv0: {$set: {
        'cannotCook': {
          passive: true,
        }
      }},
      C1: {$set: {
      }},
      C2: {$set: {
        'atk%': {
          toggle: true,
          amount: 30,
          duration: 10,
          partyOnly: true,
        }
      }},
      C3: {$set: {
        _incSkillLv: {
          passive: true,
          amount: 3,
        }
      }},
      C4: {$set: {
        'ignoreOpntDef%': {
          passive: true,
          amount: 60,
          duration: 7,
        },
      }},
      C5: {$set: {
        _incBurstLv: {
          passive: true,
          amount: 3,
        }
      }},
      C6: {$set: {
      }},
    }),
    artifacts: update(ARTIFACTS_TEMPLATE, {
      sands: {$set: {
        'atk%': 46.6,
        sub: { // 7
          'critRate%': 1,
          'critDmg%': 2,
        },
      }},
      goblet: {$set: {
        "electroDmg%": 46.6,
        sub: { // 8
          'critRate%': 3,
          'critDmg%': 5,
        },
      }},
      circlet: {$set: {
        'critRate%': 31.1,
        sub: { // 7
          'atk%': 4,
          'critDmg%': 3,
        },
      }}
    }),
  },
  yoimiya: {
    name: 'yoimiya',
    rarity: 5,
    weaponType: 'bow',
    elemental: 'pyro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Hu%20Tao.png',
    mainTalent: {parent: 'normalAttack', name: 'hit1'},
    setting: update(SETTING_TEMPLATE, {
      weapon: {$set: 'thunderingPulse'},
      artifact: {$set: 'shimenawasReminiscence'},
      artifactSub: {$set: 'shimenawasReminiscence'},
      suggestStat1: {name: {$set: 'critDmg%'}},
      suggestStat2: {name: {$set: 'critRate%'}},
      suggestStat3: {name: {$set: 'atk%'}},
      sandsStat: {$set: 'atk%'},
      gobletStat: {$set: 'pyroDmg%'},
      circletStat: {$set: 'critDmg%'},
    }),
    spec: SPEC_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {
      skills: {
        normalAttacks: {
          ...TALENTS_TEMPLATE.skills.normalAttacks,
          normalAttack: {$set: {
            ...NORMAL_ATTACK_TEMPLATE(5),
            c6KindlingArrow: {},
          }},
          chargedAttack: {
            chargedAttack: {$set: {}},
            kindlingArrow: {$set: {}},
          }
        },
        elementalSkill: {
          elementalSkillStance: {$set: {toggle: true}},
        },
        elementalBurst: {
          elementalBurstCurse: {$set: {toggle: true}},
        }
      },
      lv20: {$set: {
        'pyroDmg%': {
          maxStacks: 10,
          stacks: 10,
          amount(char) { return this.stacks * 2 },
          duration: 3,
        },
      }},
      lv70: {$set: {
        'atk%': {
          toggle: true,
          amount(char) { return 10 + char.talents.lv20['pyroDmg%'].stacks },
          duration: 15,
          partyOnly: true,
        },
      }},
      lv0: {$set: {
        'craftDecoration%': {
          passive: true,
          amount: 10,
        }
      }},
      C1: {$set: {
        'atk%': 20,
        incBurstDuration: {
          passive: true,
          amount: 4,
        }
      }},
      C2: {$set: {
        'pyroDmg%': 25,
      }},
      C3: {$set: {
        _incSkillLv: {
          passive: true,
          amount: 3,
        }
      }},
      C4: {$set: {
        decSkillCd: {
          passive: true,
          duration: 1.2,
        },
      }},
      C5: {$set: {
        _incBurstLv: {
          passive: true,
          amount: 3,
        }
      }},
      C6: {$set: {
        c6KindlingArrow: {
          passive: true,
          chance: 50,
          duration: 10,
        },
      }},
    }),
    artifacts: update(ARTIFACTS_TEMPLATE, {
      goblet: {$set: {
        "pyroDmg%": 46.6,
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
    setting: update(SETTING_TEMPLATE, {
      weapon: {$set: 'mistsplittersReflection'},
      artifact: {$set: 'blizzardStrayer'},
      artifactSub: {$set: 'blizzardStrayer'},
      suggestStat1: {name: {$set: 'critRate%'}},
      suggestStat2: {name: {$set: 'atk%'}},
      suggestStat3: {name: {$set: 'critDmg%'}},
      sandsStat: {$set: 'atk%'},
      gobletStat: {$set: 'cryoDmg%'},
      circletStat: {$set: 'critRate%'},
    }),
    spec: SPEC_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {
      skills: {$set: {
        normalAttacks: {
          ...TALENTS_TEMPLATE.skills.normalAttacks,
          normalAttack: NORMAL_ATTACK_TEMPLATE(5),
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
        _incSkillLv: {
          passive: true,
          amount: 3,
        }
      }},
      C4: {$set: {
        'onhit_burst$decOpntDef%': {
          toggle: false,
          amount: 30,
          duration: 6,
        },
      }},
      C5: {$set: {
        _incBurstLv: {
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
  ganyu: {
    name: 'ganyu',
    rarity: 5,
    weaponType: 'bow',
    elemental: 'cryo',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Ganyu.png',
    setting: update(SETTING_TEMPLATE, {
      weapon: {$set: 'amosBow'},
      artifact: {$set: 'wanderersTroupe'},
      artifactSub: {$set: 'wanderersTroupe'},
    }),
    spec: SPEC_TEMPLATE,
    mainTalent: {parent: 'chargedAttack', name: 'frostflakeArrowBloom'},
    talents: update(TALENTS_TEMPLATE, {skills: {
      normalAttacks: {
        normalAttack: NORMAL_ATTACK_TEMPLATE_SET(6),
        chargedAttack: {
          frostflakeArrow: {$set: {}},
          frostflakeArrowBloom: {$set: {}},
        }
      },
      elementalSkill: {elementalSkillSummon: {$set: {}}},
      },
      lv20: {$set: {
        'frostflakeArrow$critRate%': {
          passive: char => char.mainTalent.name === 'frostflakeArrow',
          amount: 20,
        },
        'frostflakeArrowBloom$critRate%': {
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
        'decOpntCryoRes%': {
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
        _incSkillLv: {
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
        _incBurstLv: {
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
    setting: update(SETTING_TEMPLATE, {
      weapon: {$set: 'primordialJadeWingedSpear'},
      artifact: {$set: 'viridescentVenerer'},
      artifactSub: {$set: 'gradiatorsFinale'},
    }),
    spec: SPEC_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {
      skills: {
        normalAttacks: {
          normalAttack: NORMAL_ATTACK_TEMPLATE_SET(6),
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
        'decOpptClimbingStamina%': {
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
        'offField$er%': {
          passive: true,
          amount: 25,
        }
      }},
      C3: {$set: {
        _incSkillLv: {
          passive: true,
          amount: 3,
        }
      }},
      C4: {$set: {
        'halfHp$def%': {
          toggle: true,
          amount: 100,
        }
      }},
      C5: {$set: {
        _incBurstLv: {
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
  mcElectro: {
    name: 'mcElectro',
    rarity: 5,
    weaponType: 'sword',
    elemental: 'electro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Traveler%20(Electro).png',
    mainTalent: {parent: 'elementalBurst', name: 'elementalBurstAura'},
    setting: update(SETTING_TEMPLATE, {
      weapon: {$set: 'freedomSworn'},
      artifact: {$set: 'emblemOfSeveredFate'},
      artifactSub: {$set: 'emblemOfSeveredFate'},
      suggestStat1: {name: {$set: 'er%'}},
      suggestStat2: {name: {$set: 'critRate%'}},
      suggestStat3: {name: {$set: 'critDmg%'}},
      sandsStat: {$set: 'er%'},
      gobletStat: {$set: 'electroDmg%'},
      circletStat: {$set: 'critRate%'},
    }),
    spec: SPEC_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {
      skills: {
        normalAttacks: {
          normalAttack: NORMAL_ATTACK_TEMPLATE_SET(5),
        },
        elementalSkill: {elementalSkillSummon: {$set: {}}},
        elementalBurst: {
          elementalBurstHit: {$set: {}},
          elementalBurstAura: {$set: {toggle: true}}
        }
      },
      lv20: {$set: {
        'decSkillCd': {
          passive: true,
          amount: 1.5
        },
      }},
      lv70: {$set: {
        'additionalSummonEr%': {
          passive: true,
          amount: 10,
        },
      }},
      $unset: ['lv0'],
      C1: {$set: {
        'incSkillSummon': {
          passive: true,
          amount: 1,
        },
      }},
      C2: {$set: {
        'decOpntElectroRes%': {
          toggle: true,
          amount: 15,
          duration: 8,
        }
      }},
      C3: {$set: {
        _incSkillLv: {
          passive: true,
          amount: 3,
        }
      }},
      C4: {$set: {
        'doubleSummonEr%': {
          toggle: true,
        },
      }},
      C5: {$set: {
        _incBurstLv: {
          passive: true,
          amount: 3,
        }
      }},
      C6: {$set: {
        'worldshaker': {
          toggle: true,
        },
        'elementalBurstAuraDmg%': {
          passive(char) { return char.talents.C6.worldshaker.toggle },
          amount: 100,
          cd: 10,
        },
        'additionalBurstAuraEr': {
          passive(char) { return char.talents.C6.worldshaker.toggle },
          amount: 1,
        }
      }},
    }),
    artifacts: update(ARTIFACTS_TEMPLATE, {
      sands: {$set: {
        'er%': 51.8,
        sub: { // 7
          'critRate%': 1,
          'critDmg%': 2,
        },
      }},
      goblet: {$set: {
        "electroDmg%": 46.6,
        sub: { // 8
          'er%': 1,
          'critRate%': 2,
          'critDmg%': 5,
        },
      }},
    }),
  },
  hutao: {
    name: 'hutao',
    rarity: 5,
    weaponType: 'polearm',
    elemental: 'pyro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Hu%20Tao.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'staffOfHoma'}}),
    spec: SPEC_TEMPLATE,
    talents: update(TALENTS_TEMPLATE, {
      skills: {elementalSkill: {
        elementalSkillStance: {$set: {toggle: true}},
        elementalSkillCurse: {$set: {toggle: true}},
      }},
      lv20: {$set: {
        'offSkill': {
          toggle: true,
        },
        'critRate%': {
          passive(char) { return char.talents.lv20.offSkill.toggle },
          amount: 12,
          duration: 8,
          partyOnly: true
        },
      }},
      lv70: {$set: {
        'sanguineRouge': {
          toggle: true,
        },
        'pyroDmg%': {
          passive(char) { return char.talents.lv70.sanguineRouge.toggle },
          amount: 33,
        },
      }},
      lv0: {$set: {
        'cookSuspicious%': {
          passive: true,
          amount: 18,
        }
      }},
      C1: {$set: {
        'costStamina%': {
          passive: true,
          amount: 0,
        }
      }},
      C2: {$set: {
        'maxHpToIncDmg%': {
          toggle: true,
          amount: 10,
          talent: ['bloodBlossom'],
        },
      }},
      C3: {$set: {
        _incSkillLv: {
          passive: true,
          amount: 3,
        }
      }},
      C4: {$set: {
        'gargenOfEternalRest': {
          toggle: false,
          duration: 15,
        },
        'critRate%': {
          passive(char) { return char.talents.C4.gargenOfEternalRest.toggle },
          partyOnly: true,
        }
      }},
      C5: {$set: {
        _incBurstLv: {
          passive: true,
          amount: 3,
        }
      }},
      C6: {$set: {
        'bufferflysEmbrace': {
          toggle: false, // { return false /*check cd*/ }
          duration: 10,
          cd: 60,
        },
        'critRateMultiplier%': {
          passive(char) { return char.talents.C6.bufferflysEmbrace.toggle },
          amount: 100,
        }
      }},
    }),
    artifacts: ARTIFACTS_TEMPLATE,
  },
  mona: {
    name: 'mona',
    rarity: 5,
    weaponType: 'catalyst',
    elemental: 'hydro',
    portrait: 'https://rerollcdn.com/GENSHIN/Characters/Mona.png',
    mainTalent: {parent: 'normalAttacks', name: 'chargedAttack'},
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'theWidsith'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {
      weapon: {$set: 'staffOfHoma'},
      artifact: {$set: 'viridescentVenerer'},
      artifactSub: {$set: 'gradiatorsFinale'},
    }),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'songOfBrokenPines'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'freedomSworn'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'freedomSworn'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'freedomSworn'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'sacrificialBow'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'sacrificialFragments'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'freedomSworn'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'freedomSworn'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'wolfsGravestone'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'skywardSpine'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'skywardAtlas'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'wolfsGravestone'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'elegyForTheEnd'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'elegyForTheEnd'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'wolfsGravestone'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'skywardPride'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'mistsplittersReflection'}}),
    spec: SPEC_TEMPLATE,
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
    setting: update(SETTING_TEMPLATE, {weapon: {$set: 'primordialJadeWingedSpear'}}),
    spec: SPEC_TEMPLATE,
    talents: TALENTS_TEMPLATE,
    artifacts: ARTIFACTS_TEMPLATE,
  },
}

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