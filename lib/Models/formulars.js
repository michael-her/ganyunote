import _ from 'lodash'

import {
  characterLvSheet,
  charLvIndex,
  weaponSheet,
  weaponLvSheet,
  weaponLvIndex,
  artifactMainSheet,
  artifactSubSheet,
  skillLvSheet,
} from '../Data'

export const calcStatTotal = (char, p) => {
  const {name, weaponType, leftStats: {level, weapon, weaponLv}, rightStats: {[`${p}%`]: multiplier}, artifacts} = char
  console.log('[formulars.calcStatTotal]', {p, name, weaponType, level, weapon, weaponLv, multiplier})
  let base = characterLvSheet[name][p][charLvIndex(level)]
  const weaponBase = weaponSheet[weaponType][weapon][p]
  if (weaponBase) {
    base = base + weaponLvSheet[`${p}_${weaponBase}`][weaponLvIndex(weaponLv)]
  }
  let add = base * (multiplier / 100.0)
  Object.keys(artifacts).map(key => artifacts[key]).forEach(artifact => {
    if (artifact[p]) {
      add = add + artifact[p] // 주옵 수치
    }
    if (artifact.sub[p]) {
      add = add + artifact.sub[p] * _.mean(artifactSubSheet[p]) // 부옵 갯수
    }
  })
  base = _.round(base, 2)
  add = _.round(add, 2)
  return { base, add }
}

export const calcMultiplier = (char, talents, p) => {
  const {name, weaponType, leftStats: {level, weapon, weaponLv}, artifacts} = char
  let ret = {
    'normalAttackMultiplier%': 100,
    'stamina': 240,
    'er%': 100,
  }[p] || 0
  if (characterLvSheet[name][p]) {
    ret = ret + characterLvSheet[name][p][charLvIndex(level)]
  }
  const weaponBase = weaponSheet[weaponType][weapon][p]
  if (weaponBase) {
    ret = ret + weaponLvSheet[`${p}_${weaponBase}`][weaponLvIndex(weaponLv)]
  }
  Object.keys(artifacts).map(key => artifacts[key]).forEach(artifact => {
    if (artifact[p]) {
      ret = ret + artifact[p] // 주옵 수치
    }
    if (artifact.sub[p]) {
      ret = ret + artifact.sub[p] * _.mean(artifactSubSheet[p]) // 부옵 갯수
    }
  })
  
  ret = talents.filter(talent => talent.name === p || talent.name.startsWith(p + '_'))
  .filter(talent => !_.isFunction(talent.passive) || talent.passive(char))
  .map(talent => _.isFunction(talent.amount) ? talent.amount.call(talent, char) : talent.amount)
  .reduce((ret, amount) => ret + amount, ret)

  if (p === 'critRate%') {
    ret = Math.min(100, ret)
  }

  ret = _.round(ret, 2)
  return ret
}

export const calcWeaponBaseAtk = char => {
  const {weaponType, leftStats: {weapon, weaponLv}} = char
  const weaponBase = weaponSheet[weaponType][weapon]['atk']
  return weaponLvSheet[`atk_${weaponBase}`][weaponLvIndex(weaponLv)]
}

export const calcWeaponSubStat = char => {
  const {weaponType, leftStats: {weapon, weaponLv}} = char
  const item = weaponSheet[weaponType][weapon]
  const stat = _.head(Object.keys(item).filter(p => !['name', 'rarity', 'atk', 'talents'].includes(p)))
  const weaponBase = weaponSheet[weaponType][weapon][stat]
  const value = weaponLvSheet[`${stat}_${weaponBase}`][weaponLvIndex(weaponLv)]
  return {stat, value}
}

export const calcCritDmg = (char, talent, options) => {
  const {
    'critRate%': critRate,
    'critDmg%': critDmg,
  } = char.rightStats
  let ret = 1
  if (options.allCrit) {
    ret = ret + critDmg / 100
  } else {
    ret = ret + critDmg / 100 * critRate / 100
  }
  return ret
}

export const calcIncreaseDmg = (char, talent) => {
  try {
    const {
      rightStats: {
        [`${char.elemental}Dmg%`]: ownedElementalDmg,
        'normalAttacksDmg%': normalAttacksDmg,
        'normalAttackDmg%': normalAttackDmg,
        'chargedAttackDmg%': chargedAttackDmg,
        'plungeAttackDmg%': plungeAttackDmg,
        'elementalDmg%': elementalDmg,
        'skillDmg%': skillDmg,
        'allDmg%': allDmg,
        'physDmg%': physDmg,
      }
    } = char
    const skill = skillLvSheet[char.name][talent.name]
    let ret = 1
    if (_.isUndefined(skill.elemental) || skill.elemental) {
      ret = ret
        + ownedElementalDmg / 100
        + elementalDmg / 100
    } else {
      ret = ret + physDmg / 100
    }
    if (talent.parent === 'normalAttacks') {
      ret = ret + normalAttacksDmg / 100
    }
    if ([talent.parent].includes('normalAttack')) {
      ret = ret + normalAttackDmg / 100
    }
    if ([talent.parent, talent.name].includes('chargedAttack')) {
      ret = ret + chargedAttackDmg / 100
    }
    if ([talent.parent, talent.name].includes('plungeAttack')) {
      ret = ret + plungeAttackDmg / 100
    }
    if ([talent.parent, talent.name].includes('elementalSkill')) {
      ret = ret + skillDmg / 100
    }
    ret = ret + allDmg / 100
    return ret
  } catch (e) {
    console.log(e.stack)
  }
  return 0
}

export const calcTalentMultipler = (char, {name, parent}) => {
  const {
    leftStats: {attackLv},
    rightStats: {
      ['normalAttackMultiplier%']: normalAttackMultiplier
    }
  } = char
  const skill = skillLvSheet[char.name][name]
  console.log('calcTalentMultipler', {name, skill, multiplier: skill.multiplier})

  let ret = skill.multiplier[attackLv - 1] / 100
  if ('normalAttack' === parent) {
    ret = ret * normalAttackMultiplier / 100
  }
  return ret
}

export const calcOpponentDef = (char, talent) => 53.645 / 100

export const calcOpponentRes = (char, talent) => 1 + 2.5 / 100

export const calcTalentDmg = (char, talent, options) => {
  const {
    rightStats: {
      atk: {base: baseAtk, add: addAtk},
    }
  } = char
  const atk = baseAtk + addAtk
  const multiplier = calcTalentMultipler(char, talent, options)
  const crit = calcCritDmg(char, talent, options)
  const increase = calcIncreaseDmg(char, talent, options)

  const oppRes = calcOpponentRes(char, talent, options)
  const oppDef = calcOpponentDef(char, talent, options)

  const ret = _.round(atk * crit * increase * multiplier * oppRes * oppDef)
  console.log('[formulars.calcTalentDmg]', {talent: talent, dmg: ret})
  return ret
}

// export const calcMaxHp = char => {
//   const {name, leftStats: {level}, rightStats: {['maxHp%']: hpM}} = char
//   const base = characterLv[name].hp[levelIndex(level)]
//   return {
//     base,
//     add: (base /* + 무기 */ /* + 성유물 */) * hpM
//   }
// }

// export const calcAtk = char => {
//   const {name, leftStats: {level}, rightStats: {['atk%']: atkM}} = char
//   const base = characterLv[name].atk[levelIndex(level)]
//   return {
//     base,
//     add: (base /* + 무기 */ /* + 성유물 */) * atkM
//   }
// }

