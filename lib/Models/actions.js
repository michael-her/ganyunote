import update from 'immutability-helper'
import _ from 'lodash'

import {
  calcStatTotal,
  calcMultiplier,
  calcWeaponBaseAtk,
  calcWeaponSubStat,
  calcIncreaseDmg,
} from './formulars'

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
    artifact: char.leftStats.artifact,
    artifactSub: char.leftStats.artifactSub,
  })
  dispatch({
    type: CHANGE_WEAPON,
    charName,
    weapon: char.leftStats.weapon,
    weaponRefine: char.leftStats.weaponRefine,
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

export const changeWeapon = (charName, weapon, weaponRefine) => (dispatch, getState) => {
  dispatch({
    type: CHANGE_WEAPON,
    charName,
    weapon,
    weaponRefine,
  })
  dispatch(updateChar(charName))
}

const updateCharRepeat = (char, props) => {
  const talents = reselectTalent(
    char.talents,
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
  console.log('[updateChar]', talents)

  char = update(char, {
    leftStats: {
      weaponAtk: {$set: calcWeaponBaseAtk(char)},
      weaponSub: {$set: calcWeaponSubStat(char)},
    }
  })

  char = update(char, {
    rightStats: Object.keys(char.rightStats)
    .filter(p => !p.startsWith('sep_'))
    .filter(p => _.isNumber(char.rightStats[p])).reduce((ret, p) => ({
      ...ret,
      [p]: {$set: calcMultiplier(char, talents, p)},
    }), {}),
  })

  char = update(char, {
    rightStats: Object.keys(char.rightStats)
    .filter(p => !p.startsWith('sep_'))
    .filter(p => _.isObject(char.rightStats[p])).reduce((ret, p) => ({
      ...ret,
      [p]: {$set: calcStatTotal(char, p)},
    }), {}),
  })

  char = update(char, {
    rightStats: {
      'increaseDmg%': {$set: _.round((calcIncreaseDmg(char, char.mainTalent) - 1) * 100, 2)}
    }
  })

  return char
}

export const updateChar = (charName, props) => (dispatch, getState) => {
  console.log('[actions.updateChar]', {charName, props})
  const {app: {character: {[charName]: char}}} = getState()
  
  let serialized
  let char_ = props ? update(char, props) : char
  let limit = 10
  do {
    serialized = JSON.stringify(char_)
    char_ = updateCharRepeat(char_, props)
    limit = limit - 1
  } while (limit && serialized !== JSON.stringify(char_))

  !limit && console.log("[updateChar] updateCharRepeat 반복 횟수가 최대입니다. 특기들 간의 참조관계가 순환인지 검증하세요.")

  console.log('[actions.updateChar]', char_)
  dispatch({
    type: UPDATE_CHAR,
    charName,
    char: char_
  })
}