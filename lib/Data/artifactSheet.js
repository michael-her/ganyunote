const artifactSheet = {
  gradiatorsFinale: {
    name: 'gradiatorsFinale',
    rarity: 5,
    talents: [{
      'atk%': 18,
    }, {
      'normalAttacksDmg%': {
        condition(char) { return ['sword', 'claymore', 'polearm'].includes(char.weaponType) },
        amount: 35,
      }
    }],
  },
  wanderersTroupe: {
    name: 'wanderersTroupe',
    rarity: 5,
    talents: [{
      em: 80,
    }, {
      'normalAttacksDmg%': {
        condition(char) { return ['catalyst', 'bow'].includes(char.weaponType) },
        amount: 35,
      }
    }],
  },
  paleFlame: {
    name: 'paleFlame',
    rarity: 5,
    talents: [{
      'physDmg%': 25,
    }, {
      'atk%': {
        stacks: 2,
        amount: 9,
        fullStacks: {
          'physDmg%': 25,
        },
        duration: 7,
        cd: 0.3,
      }
    }],
  },
  thunderingFury: {
    name: 'thunderingFury',
    rarity: 5,
    talents: [{
      'electroDmg%': 15,
    }, {
      'overloadDmg%': 40,
      'electroChargedDmg%': 40,
      'reduceSkillCd': {
        overloadReaction: true,
        electroChargedReaction: true,
        amount: 1,
        duration: 0.8,
      }
    }],
  },
  viridescentVenerer: {
    name: 'viridescentVenerer',
    rarity: 5,
    talents: [{
      'anemoDmg%': 15,
    }, {
      'swirlDmg%': 60,
      'reduceReg%': {
        toggle: true,
        infusedReaction: true,
        infusedElement: true,
        amount: 40,
        duration: 10,
      }
    }],
  },
  archaicPetra: {
    name: 'archaicPetra',
    rarity: 5,
    talents: [{
      'geoDmg%': 15,
    }, {
      'allDmg%': {
        shardElement: true,
        toggle: true,
        amount: 35,
        duration: 10
      }
    }],
  },
  crimsonWitchOfFlames: {
    name: 'crimsonWitchOfFlames',
    rarity: 5,
    talents: [{
      'pyroDmg%': 15,
    }, {
      'overloadDmg%': 40,
      'burningDmg%': 40,
      'vaporizeDmg%': 15,
      'meltDmg%': 15,
      'pyroDmg%': {
        stacks: 3,
        amount: 7.5,
        duration: 10,
      }
    }],
  },
  noblesseOblige: {
    name: 'noblesseOblige',
    rarity: 5,
    talents: [{
      'burstDmg%': 15,
    }, {
      'atk%': {
        toggle: true,
        amount: 20,
        duration: 12,
        stackable: false,
      }
    }],
  },
  blizzardStrayer: {
    name: 'blizzardStrayer',
    rarity: 5,
    talents: [{
      'cryoDmg%': 15,
    }, {
      'critRate%_cryo': {
        passive: true,
        cryoOpponent: true,
        amount: 20,
      },
      'critRate%_frozen': {
        frozenOpponent: true,
        amount: 20,
      }
    }],
  },
  heartOfDepth: {
    name: 'heartOfDepth',
    rarity: 5,
    talents: [{
      'hydroDmg%': 15,
    }, {
      'normalAttacksDmg%': {
        toggle: true,
        amount: 30,
        duration: 15,
      },
      'chargedAttackDmg%': {
        toggle: true,
        amount: 30,
        duration: 15,
      },
    }],
  },
  glacierAndSnowfield: {
    name: 'glacierAndSnowfield',
    rarity: 5,
    talents: [{
      'cryoDmg%': 15,
    }, {
      'superconductDmg%': 15,
      'meltDmg%': 15,
      'cryoDmg%': {
        toggle: true,
        amount: 30,
        duration: 10,
      }
    }],
  },
  retracingBolide: {
    name: 'retracingBolide',
    rarity: 5,
    talents: [{
      'shieldStrength%': 35,
    }, {
      'normalAttacksDmg%': {
        toggle: true,
        amount: 40,
      },
      'chargedAttackDmg%': {
        toggle: true,
        amount: 40,
      }
    }],
  },
  thundersoother: {
    name: 'thundersoother',
    rarity: 5,
    talents: [{
      'electroDmg%': 15,
    }, {
      'allDmg%': {
        electroOpponent: true,
        amount: 35,
      }
    }],
  },
  lavawalker: {
    name: 'lavawalker',
    rarity: 5,
    talents: [{
      'pyroReg%': 40,
    }, {
      'allDmg%': {
        pyroOpponent: true,
        amount: 35,
      }
    }],
  },
  tenacityOfTheMillelith: {
    name: 'tenacityOfTheMillelith',
    rarity: 5,
    talents: [{
      'maxHp%': 20,
    }, {
      'atk%': {
        toggle: true,
        offField: true,
        amount: 20,
        duration: 3,
        cd: 0.5,
      },
      'shieldStrength%': {
        toggle: true,
        offField: true,
        amount: 30,
        duration: 3,
        cd: 0.5,
      }
    }],
  },
  reminiscenceOfShime: {
    name: 'reminiscenceOfShime',
    rarity: 5,
    talents: [{
      'atk%': 18,
    }, {
      'normalAttacksDmg%': {
        toggle: true,
        amount: 50,
        duration: 10,
        energyDrain: 15,
      }
    }],
  },
  sealOfInsulation: {
    name: 'sealOfInsulation',
    rarity: 5,
    talents: [{
      'er%': 20,
    }, {
      'erToBurstDmg%': {
        limit: 75,
        'multiplier%': 30,
      }
    }],
  }
}

Object.keys(artifactSheet).map(key => {
  const artifact = artifactSheet[key]
  if (key !== artifact.name) {
    alert(`artifactSheet.js의 성유물 name이 다릅니다.`)
  }
})

export default artifactSheet