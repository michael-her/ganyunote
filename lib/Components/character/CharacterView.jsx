import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import tw from '@tw'

import { changeArtifact, changeWeapon, updateChar, updateTalent } from '../../Models/actions'

import { CharacterHelp } from './CharacterHelp'
import { CharacterSetting } from './CharacterSetting'
import { CharacterSpec } from './CharacterSpec'
import { SheetTitle, SheetRow } from './common/styled'

export const CharacterView = ({route, navigation}) => {
  const char = useSelector(state => state.app.character[state.app.selectedChar])
  const dispatch = useDispatch()
  const onUpdateChar = (...props) => dispatch(updateChar(...props))
  const onUpdateTalent = (...props) => dispatch(updateTalent(...props))
  const onChangeWeapon = (...props) => dispatch(changeWeapon(...props))
  const onChangeArtifact = (...props) => dispatch(changeArtifact(...props))
  
  const selectStat = path => item => {
    if (['artifact', 'artifactSub'].includes(item.name)) {
      const {artifact, artifactSub} = {
        artifact: char.leftStats.artifact,
        artifactSub: char.leftStats.artifactSub,
        [item.name]: item.value,
      }
      onChangeArtifact(char.name, artifact, artifactSub)
    }
    else if (['weapon', 'weaponRefine'].includes(item.name)) {
      const {weapon, weaponRefine} = {
        weapon: char.leftStats.weapon,
        weaponRefine: char.leftStats.weaponRefine,
        [item.name]: item.value,
      }
      onChangeWeapon(char.name, weapon, weaponRefine)
    }
    else if (item.name === item.original) {
      const props = path
        ? { [path]: { [item.name]: {$set: item.value } } }
        : { [item.name]: {$set: item.value } }
      onUpdateChar(char.name, props)
    }
  }
  const toggleTalent = (path, talent, value) => {
    const props = _.reverse(_.toPath(path)).reduce(
      (ret, name) => ({[name]: ret}),
      !_.isUndefined(talent.toggle)
        ? {toggle: {$set: !talent.toggle}}
        : !_.isUndefined(talent.stacks)
          ? {stacks: {$set: value}}
          : undefined
    )
    onUpdateTalent(char.name, props)
  }
  return (
    <div style={tw`flex-1 p-2 overflow-scroll bg-mirage`}>
      <SheetTitle>스테이터스</SheetTitle>
      <div style={tw`flex flex-row w-full`}>
        <CharacterSetting char={char} onSelectStat={selectStat} onToggleTalent={toggleTalent}/>
        <CharacterSpec char={char} onSelectStat={selectStat}/>
      </div>
      <SheetRow />
      <CharacterHelp char={char}/>
    </div>
  )
}