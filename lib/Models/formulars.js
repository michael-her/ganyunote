import _ from 'lodash'

import {
  characterLvSheet,
  charLvIndex,
  weaponSheet,
  weaponLvSheet,
  weaponLvIndex,
  artifactSubSheet,
  skillLvSheet,
  decDefByCharLevelAdd,
} from '../Data'
import { capitalizeFirstLetter } from '../Utils/utils'

export const calcStatTotal = (char, p) => {
  const {name, weaponType, setting: {level, weapon, weaponLv}, spec: {[`${p}%`]: multiplier}, artifacts} = char
  // console.log('[formulars.calcStatTotal]', {p, name, weaponType, level, weapon, weaponLv, multiplier})
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
    // if (artifact.sub[p]) {
    //   add = add + artifact.sub[p] * _.mean(artifactSubSheet[p]) // 부옵 갯수
    // }
  })

  _.times(5, n=>`suggestStat${n+1}`)
  .filter(key => char.setting[key].name === p)
  .forEach(key => {
    add = add + char.setting[key].count * _.mean(artifactSubSheet[p]) // 부옵 갯수
  })

  base = _.round(base, 2)
  add = _.round(add, 2)
  return { base, add }
}

export const calcMultiplier = (char, talents, p) => {
  const {name, weaponType, setting: {level, weapon, weaponLv}, artifacts} = char
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
    // if (artifact.sub[p]) {
    //   ret = ret + artifact.sub[p] * _.mean(artifactSubSheet[p]) // 부옵 갯수
    // }
  })

  _.times(5, n=>`suggestStat${n+1}`)
  .filter(key => char.setting[key].name === p)
  .forEach(key => {
    ret = ret + char.setting[key].count * _.mean(artifactSubSheet[p]) // 부옵 갯수
  })
  
  const filtered = talents
  .filter(talent => talent.name === p || talent.name.endsWith('$' + p) || !_.isUndefined(talent[p]))
  .filter(talent => !_.isFunction(talent.passive) || talent.passive(char))

  const values = filtered.map(talent => _.isFunction(talent.amount) ? talent.amount.call(talent, char) : talent.amount)

  ret = ret + _.sum(values)

  ret = _.round(ret, 2)
  return ret
}

export const calcWeaponBaseAtk = char => {
  const {weaponType, setting: {weapon, weaponLv}} = char
  const weaponBase = weaponSheet[weaponType][weapon]['atk']
  return weaponLvSheet[`atk_${weaponBase}`][weaponLvIndex(weaponLv)]
}

export const calcWeaponSubStat = char => {
  const {weaponType, setting: {weapon, weaponLv}} = char
  const item = weaponSheet[weaponType][weapon]
  const stat = _.head(Object.keys(item).filter(p => !['name', 'rarity', 'atk', 'talents'].includes(p)))
  const weaponBase = weaponSheet[weaponType][weapon][stat]
  const value = weaponLvSheet[`${stat}_${weaponBase}`][weaponLvIndex(weaponLv)]
  return {stat, value}
}

export const calcCritDmg = (char, talent, options) => {
  const {
    'critRate%': baseCritRate,
    'critDmg%': critDmg,
    'normalAttackCritRate%': normalAttackCritRate,
    'normalAttacksCritRate%': normalAttacksCritRate,
    'chargedAttackCritRate%': chargedAttackCritRate,
    'skillCritRate%': skillCritRate,
    'burstCritRate%': burstCritRate,
  } = char.spec
  let ret = 1
  if (options.dmgType === 'noCrit') {
    // no critical
  } else if (options.dmgType === 'allCrit') {
    ret = ret + critDmg / 100
  } else {
    let critRate = baseCritRate
    if ('normalAttack' === parent) {
      critRate = critRate + normalAttackCritRate
    }
    if ('normalAttacks' === parent) {
      critRate = critRate + normalAttacksCritRate
    }
    if ('chargedAttack' === parent) {
      critRate = critRate + chargedAttackCritRate
    }    
    if ([parent, name].includes('elementalSkill')) {
      critRate = critRate + skillCritRate
    }
    if ([parent, name].includes('elementalBurst')) {
      critRate = critRate + burstCritRate
    }

    ret = ret + critDmg / 100 * Math.min(100, critRate) / 100
  }
  return ret
}

export const calcIncreaseDmg = (char, {parent, name}) => {
  try {
    const {
      spec: {
        [`${char.elemental}Dmg%`]: ownedElementalDmg,
        'normalAttacksDmg%': normalAttacksDmg,
        'normalAttackDmg%': normalAttackDmg,
        'chargedAttackDmg%': chargedAttackDmg,
        'plungeAttackDmg%': plungeAttackDmg,
        'elementalDmg%': elementalDmg,
        'skillDmg%': skillDmg,
        'burstDmg%': burstDmg,
        'allDmg%': allDmg,
        'physDmg%': physDmg,
      }
    } = char
    const skill = skillLvSheet[char.name][name]
    const elemental = _.isUndefined(skill.elemental)
      ? char.elemental
      : _.isFunction(skill.elemental)
        ? skill.elemental(char)
        : skill.elemental

    let ret = 1
    if (elemental) {
      ret = ret
        + ownedElementalDmg / 100
        + elementalDmg / 100
    } else {
      ret = ret + physDmg / 100
    }
    if (['normalAttack', 'normalAttacks', 'chargedAttack'].includes(parent)) {
      ret = ret + normalAttacksDmg / 100
    }
    if (parent === 'normalAttack') {
      ret = ret + normalAttackDmg / 100
    }
    if ([parent, name].includes('chargedAttack')) {
      ret = ret + chargedAttackDmg / 100
    }
    if ([parent, name].includes('plungeAttack')) {
      ret = ret + plungeAttackDmg / 100
    }
    if ([parent, name].includes('elementalSkill')) {
      ret = ret + skillDmg / 100
    }
    if ([parent, name].includes('elementalBurst')) {
      ret = ret + burstDmg / 100
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
    spec: {
      ['normalAttackMultiplier%']: normalAttackMultiplier,
      ['_normalAttacksAddition%']: _normalAttacksAddition,
      ['_skillAddition%']: _skillAddition,
      ['_burstAddition%']: _burstAddition,
    }
  } = char
  const attackLv = calcAttackLv(char)
  const skillLv = calcSkillLv(char)
  const burstLv = calcBurstLv(char)
  const level = {
    chargedAttack: attackLv,
    normalAttack: attackLv,
    normalAttacks: attackLv,
    elementalSkill: skillLv,
    elementalBurst: burstLv,
  }[parent] || {
    normalAttacks: attackLv,
    elementalSkill: skillLv,
    elementalBurst: burstLv,
  }[name]

  console.log('calcTalentMultipler', {name})

  const skill = skillLvSheet[char.name][name]
  const count = skill.count || 1
  // console.log('calcTalentMultipler', {name, skill, multiplier: skill.multiplier})
  let ret = 0
  if (_.isFunction(skill.multiplier)) {
    ret = skill.multiplier(char) / 100 * count
  } else if(skill.multiplier.length === skill.count) {
    // 다단 타격계수가 모두 다를 경우엔 총 계수로 계산한다.
    ret = _.sum(skill.multiplier.map(m => m[level - 1] / 100))
  } else {
    ret = skill.multiplier[level - 1] / 100 * count
  }
  
  if ('normalAttack' === parent) {
    ret = ret * normalAttackMultiplier / 100 + _normalAttacksAddition / 100
  } else if ('normalAttacks' === parent) {
    ret = ret + _normalAttacksAddition / 100
  }
  
  if ([parent, name].includes('elementalSkill')) {
    ret = ret + _skillAddition / 100
  }

  if ([parent, name].includes('elementalBurst')) {
    ret = ret + _burstAddition / 100
  }

  return ret
}

export const calcOpponentDef = (char, opnt, talent) => {
  const {
    'decOpntDef%': decOpntDef,
    'ignoreOpntDef%': ignoreOpntDef,
  } = char.spec
  return (decDefByCharLevelAdd[charLvIndex(char.setting.level)] + 100) / 
    ((1 - decOpntDef / 100 - ignoreOpntDef / 100) * (opnt.level + 100) + decDefByCharLevelAdd[charLvIndex(char.setting.level)] + 100)
  // 53.645 / 100
}

export const calcOpponentRes = (char, opnt, talent) => {
  const elemental = calcElemental(char, talent.name)
  const decOpntRes = elemental ? char.spec[`decOpnt${capitalizeFirstLetter(elemental)}Res%`] : 0
  const opntRes = elemental ? opnt[`${elemental}Res%`] : 0
  if (opntRes < decOpntRes) {
    return 1 + (decOpntRes - opntRes) / 2 / 100
  } else {
    return 1 - (opntRes - decOpntRes) / 100
  }
  // 1 + 2.5 / 100
}

export const calcTalentDmg = (char, opnt, talent, options = {}) => {
  const {
    spec: {
      atk: {base: baseAtk, add: addAtk},
    }
  } = char
  const atk = baseAtk + addAtk
  const multiplier = calcTalentMultipler(char, talent, options)
  const crit = calcCritDmg(char, talent, options)
  const increase = calcIncreaseDmg(char, talent, options)

  const oppRes = calcOpponentRes(char, opnt, talent, options)
  const oppDef = calcOpponentDef(char, opnt, talent, options)

  const dmg = _.round(atk * crit * increase * multiplier * oppRes * oppDef)
  const ret = {dmg, atk: addAtk / baseAtk, crit, increase, multiplier, oppRes, oppDef}
  // console.log('[formulars.calcTalentDmg]', {talent: talent, ...ret})
  return ret
}

export const calcArtifactStatCount = (char, p, options = {}) => {
  if (_.isUndefined(options.useSuggestion) || options.useSuggestion) {
    let ret = 0
    _.times(5, n=>`suggestStat${n+1}`)
    .filter(key => char.setting[key].name === p)
    .forEach(key => {
      ret = ret + char.setting[key].count * _.mean(artifactSubSheet[p]) // 부옵 갯수
    })
    return ret
  } else {
    return Object.keys(char.artifacts).reduce((ret, kind) => (
      Object.keys(char.artifacts[kind].sub).reduce((ret, stat) => (
        stat === p ? ret + char.artifacts[kind].sub[p] : ret
      ), ret)
    ), 0)
  }
}

export const calcArtifactStatMaxCount = ({artifacts}, p) => (
  artifactSubSheet[p]
    ? Object.keys(artifacts).reduce((ret, kind) => (
        // 주옵에 이미 있으면 부옵으로 붙을 수 없다
        artifacts[kind][p] ? ret : ret + 6
      ), 0)
    : 0
)

export const calcBeetickMaxCount = (char, suggestions) => {
  const statCount = _.min([4, suggestions.length]) // 성유물 부옵은 최대 4 종류
  const ret = ((statCount + 5) * 5) - (
    // 성유물 주옵으로 중복된 갯수만큼 빼준다
    _.sumBy(suggestions,
      s => _.sumBy(Object.keys(char.artifacts), name => {
          const artifact = char.artifacts[name]
          // 성유물 주옵이다
          if (!_.isUndefined(artifact[s.name])) {
            return 1
          }
          return 0
      })
    )
  )
  console.log('[calcBeetickMaxCount]', ret)
  return ret
}

export const calcElemental = (char, talentName) => {
  // console.log('calcElemental', {talentName, char})
  const skill = skillLvSheet[char.name][talentName]

  const ret = _.isUndefined(skill.elemental)
    ? char.elemental
    : _.isFunction(skill.elemental)
      ? skill.elemental(char)
      : skill.elemental

  return ret
}

export const calcAttackLv = char => {
  const {setting: {attackLv}, spec: {_incAttackLv}} = char
  return attackLv + _incAttackLv
}

export const calcSkillLv = char => {
  const {setting: {skillLv}, spec: {_incSkillLv}} = char
  return skillLv + _incSkillLv
}
export const calcBurstLv = char => {
  const {setting: {burstLv}, spec: {_incBurstLv}} = char
  return burstLv + _incBurstLv
}