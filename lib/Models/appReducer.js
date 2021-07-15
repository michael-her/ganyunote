import update from 'immutability-helper'
import { weaponSheet, artifactSheet } from '../Data'
import { ADD_CHAR, SELECT_CHAR, UPDATE_CHAR, UPDATE_TALENT, CHANGE_WEAPON, CHANGE_ARTIFACT } from './actions'

export default (state = {}, action) => {
  switch(action.type) {
    case SELECT_CHAR:
      return update(state, {selectedChar: {$set: action.charName}})
    case UPDATE_CHAR:
      return update(state, {character: {[action.charName]: {$set: action.char}}})
    case UPDATE_TALENT:
      return update(state, {character: {[action.charName]: action.props}})
    case CHANGE_WEAPON: {
      const char = state.character[action.charName]
      const talents = weaponSheet[char.weaponType][action.weapon].talents
      const talentsRefined = Object.keys(talents).reduce((ret, p) => ({
        ...ret,
        [p]: talents[p][action.weaponRefine - 1]
      }), {})
      return update(state, {character: {[action.charName]: {
        leftStats: {
          weapon: {$set: action.weapon},
          weaponRefine: {$set: action.weaponRefine}
        },
        talents: {weapon: {$set: talentsRefined}}
      }}})
    }
    case CHANGE_ARTIFACT:
      return update(state, {character: {[action.charName]: {
        leftStats: {artifact: {$set: action.artifact}, artifactSub: {$set: action.artifactSub}},
        talents: {
          artifact: {$set: artifactSheet[action.artifact].talents[0]},
          artifactSub: {$set: action.artifact === action.artifactSub
            ? artifactSheet[action.artifact].talents[1]
            : artifactSheet[action.artifactSub].talents[0]
          }
        }}
      }})
    case ADD_CHAR:
      return update(state, {character: {[action.charName]: {$set: action.char}}})
    default:
      return state
  }
}
