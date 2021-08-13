import update from 'immutability-helper'
import _ from 'lodash'

import {
  calcStatTotal,
  calcMultiplier,
  calcWeaponBaseAtk,
  calcWeaponSubStat,
  calcIncreaseDmg,
  calcTalentDmg,
  calcBeetickMaxCount,
  calcArtifactStatCount,
  calcArtifactStatMaxCount,
} from './formulars'

import {
  artifactSubSheet,
  artifactMainSheet,
} from '../Data'

import { reselectTalent } from './selectors'

export const ADD_CHAR = 'ADD_CHAR'
export const SELECT_CHAR = 'SELECT_CHAR'
export const UPDATE_CHAR = 'UPDATE_CHAR'
export const UPDATE_TALENT = 'UPDATE_TALENT'
export const CHANGE_ARTIFACT = 'CHANGE_CHAR_ARTIFACT'
export const CHANGE_WEAPON = 'CHANGE_CHAR_WEAPON'

export const addChar = (charName, char) => ({
  type: ADD_CHAR,
  charName,
  char,
})

export const selectChar = charName => (dispatch, getState) => {
  const char = getState().app.character[charName]
  dispatch({
    type: CHANGE_ARTIFACT,
    charName,
    artifact: char.setting.artifact,
    artifactSub: char.setting.artifactSub,
  })
  dispatch({
    type: CHANGE_WEAPON,
    charName,
    weapon: char.setting.weapon,
    weaponRefine: char.setting.weaponRefine,
  })
  dispatch(updateChar(charName))
  dispatch({
    type: SELECT_CHAR,
    charName,
  })
}

export const updateTalent = (charName, props) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_TALENT,
    charName,
    props,
  })
  dispatch(updateChar(charName))
}

export const changeArtifact = (charName, artifact, artifactSub) => (dispatch, getState) => {
  dispatch({
    type: CHANGE_ARTIFACT,
    charName,
    artifact,
    artifactSub,
  })
  dispatch(updateChar(charName))
}

export const changeArtifactStat = (charName, kind, stat) => (dispatch, getState) => {
  const char = getState().app.character[charName]
  const prev = _.head(
    Object.keys(artifactMainSheet[kind])
    .filter(p => !_.isUndefined(char.artifacts[kind][p]))
  )
  const props = {
    setting: {
      [`${kind}Stat`]: {$set: stat}
    },
    artifacts: {
      [kind]: {
        [stat]: {$set: artifactMainSheet[kind][stat]},
        $unset: [prev],
      }
    }
  }
  dispatch(updateChar(charName, props))
}

export const changeWeapon = (charName, weapon, weaponRefine) => (dispatch, getState) => {
  dispatch({
    type: CHANGE_WEAPON,
    charName,
    weapon,
    weaponRefine,
  })
  dispatch(updateChar(charName))
}

const updateTalentRepeat = char => {
  const talents = reselectTalent(
    char,
    { // options
      talentModes: ['toggle', 'stacks', 'passive'],
      path: 'talents',
      displayPrefix: `character.${char.name}.`
    }
  )
  // toggle property cannot be function
  .filter(talent => _.isUndefined(talent.toggle) || talent.toggle)
  .filter(talent => !_.isFunction(talent.stacks) || _.isUndefined(talent.stacks) || talent.stacks.call(talent, char) > 0)
  .filter(talent => _.isUndefined(talent.stacks) || talent.stacks > 0)
  .filter(talent => !_.isFunction(talent.passive) || _.isUndefined(talent.passive) || talent.passive.call(talent, char))
  console.log('[updateTalentRepeat]', talents)

  char = update(char, {
    setting: {
      weaponAtk: {$set: calcWeaponBaseAtk(char)},
      weaponSub: {$set: calcWeaponSubStat(char)},
    }
  })

  char = update(char, {
    spec: Object.keys(char.spec)
    .filter(p => !p.startsWith('sep_'))
    .filter(p => _.isNumber(char.spec[p])).reduce((ret, p) => ({
      ...ret,
      [p]: {$set: calcMultiplier(char, talents, p)},
    }), {}),
  })

  char = update(char, {
    spec: Object.keys(char.spec)
    .filter(p => !p.startsWith('sep_'))
    .filter(p => _.isObject(char.spec[p])).reduce((ret, p) => ({
      ...ret,
      [p]: {$set: calcStatTotal(char, p)},
    }), {}),
  })

  char = update(char, {
    spec: {
      'increaseDmg%': {$set: _.round((calcIncreaseDmg(char, char.mainTalent) - 1) * 100, 2)}
    }
  })

  return char
}

const calcSuggestions = (char, opnt) => {
  const {
    mainTalent,
    setting: {
      suggestStat1,
      suggestStat2,
      suggestStat3,
      suggestStat4,
      suggestStat5,
    },
  } = char
  const {dmg: prevDmg} = calcTalentDmg(char, opnt, mainTalent)
  const suggestStats = [suggestStat1, suggestStat2, suggestStat3, suggestStat4, suggestStat5]
  let ret = suggestStats.reduce((ret, s, index) => [
    ...ret,
    ...(s.name ? [{
      ...s,
      maxCount: calcArtifactStatMaxCount(char, s.name),
      dmgPerStat: (() => {
        let modified = update(char, {setting: {[`suggestStat${index+1}`]: {count: {$set: s.count + 1}}}})
        modified = updateTalentRepeat(modified)
        // console.log('[updateArtifactRepeat]', deepDiff(char, modified))
        const {dmg} = calcTalentDmg(modified, opnt, mainTalent)
        return dmg - prevDmg
      })(),
    }] : [])
  ], [])
  ret = _.reverse(_.sortBy(ret, o => o.dmgPerStat))
  return ret
}

const updateArtifactRepeat = (char, opnt, suggestions) => {
  suggestions = suggestions || calcSuggestions(char, opnt)
  console.log('[updateArtifactRepeat]', suggestions)

  let followed = char
  // FOLLOW SUGGESTIONS
  // first
  const pIndex = _.findIndex(suggestions, s => !s.locked)
  const qIndex = _.findLastIndex(suggestions, s => !s.locked)
  // 잠겨있어서 자동 배분 불가
  if (pIndex === qIndex || pIndex < 0 || qIndex < 0) {
    console.log('[updateArtifactRepeat] all suggestions are locked')
    return {char, suggestions: []}
  }
  const p = suggestions[pIndex]
  const q = suggestions[qIndex]
  if (p.count >= p.maxCount) {
    return {char, suggestions: suggestions.filter((_,i) => i !== pIndex)}
  }
  if (q.count <= 0) {
    return {char, suggestions: suggestions.filter((_,i) => i !== qIndex)}
  }

  followed.setting[p.key] = {...p, count: p.count + 1}
  followed.setting[q.key] = {...q, count: q.count - 1}

  followed = updateTalentRepeat(followed)
  const nextSuggestions = calcSuggestions(followed, opnt)
  .filter(s => _.some(suggestions, e => e.name === s.name))

  if (suggestions[0].name === nextSuggestions[0].name && _.last(nextSuggestions).name !== p.name) {
    console.log(`[updateArtifactRepeat] ${q.name} → ${p.name}`)
    // 추천등급이 변함없거나 1,2위만 변동되었다면 세팅을 적용한다.
    followed = update(followed, {setting: {
      ...nextSuggestions.reduce((ret, s) => ({...ret, [s.key]: {$set: s}}), {})
    }})
    return {char: followed, suggestions: nextSuggestions}
  } else {
    char = update(char, {setting: {
      ...suggestions.reduce((ret, s) => ({...ret, [s.key]: {$set: s}}), {})
    }})
    // 추천등급이 변경되었다면
    // 첫번째가 꼴찌가 되었다면 더 이상 꼴찌에서 스탯을 빼올 수 없으므로 최적화에서 제외한다.
    return {char, suggestions: suggestions.filter(s => s.name !== p.name)}
  }
}

const updateBeetickCount = (char, opnt, props) => {
  let ret = _.cloneDeep(props)
  const {setting: {beetickCount: prev}} = char
  let diff = 0
  const next = _.get(props, 'setting.beetickCount.$set', prev)
  if (next !== prev) {
    const suggestions = calcSuggestions(char, opnt)
    const beetickMaxCount = calcBeetickMaxCount(char, suggestions)
    if (next >= 0 && next <= beetickMaxCount) {
      diff = next - prev
    }
  } else {
    return ret
  }

  let found = false
  if (diff !== 0) {
    const suggestions = calcSuggestions(char, opnt)
    for(const i in suggestions) {
      const s = suggestions[i]
      if (s.locked) continue
      if (s.count + diff >= 0 && s.count + diff <= s.maxCount) {
        ret = _.set(ret, `setting.${s.key}.count.$set`, s.count + diff)
        found = true
        break;
      }
    }
  }
  
  if (!found || diff === 0) {
    ret.setting.beetickCount = {$set: prev}
  }

  console.log('[updateBeetickCount]', {props: ret})
  return ret
}

const updateSuggestionStats = (char, opnt, props) => {
  let ret = _.cloneDeep(props)
  const diffs = _.times(5, _.constant(0))
  let suggestions = calcSuggestions(char, opnt)

  for(let index = 0; index < diffs.length; ++index) {
    const p = `suggestStat${index+1}`
    const prev = char.setting[p]
    const next = _.get(props, `setting.${p}.$set`, prev)
    // 부옵 갯수 조정
    if (next.count >= 0 && next.count !== prev.count) {
      diffs[index] = next.count - prev.count
    }
    // 부옵 잠금 해제
    else if(prev.locked !== next.locked) {
      return ret
    }
    // 부옵 변경
    else if(prev.name !== next.name) {
      // 부옵을 삭제하는 경우, 최대 비틱 지수가 줄어들므로 이를 처리해야한다.
      if (next.name === '') {
        const newBeetickMaxCount = calcBeetickMaxCount(char, suggestions.filter(s => s.name === prev.name))
        if (char.setting.beetickCount > newBeetickMaxCount) {
          diffs[index] = newBeetickMaxCount - char.setting.beetickCount
          ret = _.set(ret, `setting.beetickCount`, {$set: newBeetickMaxCount})
        }
        diffs[index] = diffs[index] - prev.count
      } 
      // 부옵을 추가하는 경우, count를 0으로 초기화
      else if(prev.name === '') {
        ret.setting[p].$set.count = 0
        ret.setting[p].$set.locked = false
        return ret
      }
      // 부옵을 변경하는 경우, 개별 부옵 최대값 제한에 걸릴 수 있다.
      // 일단 보자구.
      else {
        return ret
      }
    }
  }

  const founds = _.times(5, _.constant(false))
  diffs.forEach((diff, pIndex) => {
    if (diff === 0) return

    const p = `suggestStat${pIndex+1}`
    const p_name = char.setting[p].name
    const p_s = suggestions[_.findIndex(suggestions, s => s.name === p_name)]
    if (p_s.count + diff >= 0 && p_s.count + diff <= p_s.maxCount) {
      ret = _.set(ret, `setting.${p}.$set.locked`, true)
      founds[pIndex] = true
    }
    // p부옵이 삭제된 경우, p를 제하고도 모자라면
    else if (diff < 0) {
      // 부호를 바꾸어서 q도 제하도록 만든다
      diff = -(diff + p_s.count)
      founds[pIndex] = true
    }
    if (!founds[pIndex]) return
    
    diff > 0 && (suggestions = suggestions.reverse())
    founds[pIndex] = false
    for(const i in suggestions) {
      const q_s = suggestions[i]
      if (q_s.name === p_name) continue
      if (q_s.locked) continue

      const diff_ = diff > 0
        ? q_s.count >= diff ? diff : q_s.count
        : q_s.count - diff <= q_s.maxCount ? diff : q_s.maxCount - q_s.count
      diff = diff - diff_

      if (q_s.count - diff_ <= q_s.maxCount) {
        const qIndex = _.findIndex(_.times(5, n=>`suggestStat${n+1}`), q => char.setting[q].name === q_s.name)
        const q = `suggestStat${qIndex+1}`
        ret = _.set(ret, `setting.${q}.$set`, {
          ...q_s,
          count: char.setting[q].count - diff_
        })
        diff_ > 0
          ? console.log(`[updateSuggestionStats] ${q_s.name} → ${p_s.name}`)
          : console.log(`[updateSuggestionStats] ${p_s.name} → ${q_s.name}`)
      }

      if (diff === 0) {
        founds[pIndex] = true
        break
      }
    }
  })

  for(let i = 0; i < diffs.length; ++i) {
    if (diffs[i] === 0 && !_.isUndefined(_.get(props, `setting.suggestStat${i+1}`))) {
      console.log('[updateSuggestionStats] p not found, cancel all', props)
      ret = update(props, {setting: {$unset: [`suggestStat${i+1}`]}})
    }
    if (diffs[i] !== 0 && !founds[i]) {
      console.log('[updateSuggestionStats] q not found, cancel all', props)
      ret = update(props, {setting: {$unset: [`suggestStat${i+1}`]}})
    }
  }
  console.log('[updateSuggestionStats] END', ret)
  return ret
}

export const updateChar = (charName, props) => (dispatch, getState) => {
  console.log('[actions.updateChar]', {charName, props})
  const {app: {character: {[charName]: char}, opnt}} = getState()

  // 성유물 부옵 추천 props를 자동으로 재생성한다.
  props = props ? updateSuggestionStats(char, opnt, props) : props
  props = props ? updateBeetickCount(char, opnt, props) : props

  let char_ = props ? update(char, props) : char
  
  let serialized
  let limit = 10
  do {
    serialized = JSON.stringify(char_)
    char_ = updateTalentRepeat(char_)
    limit = limit - 1
  } while (limit && serialized !== JSON.stringify(char_))
  limit = calcBeetickMaxCount(char_, calcSuggestions(char_, opnt))
  let suggestions
  do {
    serialized = JSON.stringify(char_)
    const result = updateArtifactRepeat(char_, opnt, suggestions)
    char_ = result.char
    suggestions = result.suggestions
    limit = limit - 1
  } while (suggestions.length > 1 && limit /*&& serialized !== JSON.stringify(char_)*/)

  !limit && console.log("[updateChar] updateCharRepeat 반복 횟수가 최대입니다. 특기들 간의 참조관계가 순환인지 검증하세요.")

  console.log('[actions.updateChar]', char_)
  dispatch({
    type: UPDATE_CHAR,
    charName,
    char: char_
  })
}