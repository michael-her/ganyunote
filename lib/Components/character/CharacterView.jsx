import React from 'react'
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import tw, { Text } from '@tw'

import {
  changeArtifact,
  changeArtifactStat,
  changeWeapon,
  updateChar,
  updateTalent
} from '../../Models/actions'

import { CharacterHelp } from './CharacterHelp'
import { CharacterSetting } from './CharacterSetting'
import { CharacterSpec } from './CharacterSpec'
import { sheetTitle, sheetRow } from './common/styles'
import i18next from 'i18next'

export const CharacterView = ({route, navigation}) => {
  const char = useSelector(state => state.app.character[state.app.selectedChar])
  const dispatch = useDispatch()
  const onUpdateChar = (...props) => dispatch(updateChar(...props))
  const onUpdateTalent = (...props) => dispatch(updateTalent(...props))
  const onChangeWeapon = (...props) => dispatch(changeWeapon(...props))
  const onChangeArtifact = (...props) => dispatch(changeArtifact(...props))
  const onChangeArtifactStat = (...props) => dispatch(changeArtifactStat(...props))
  
  const selectStat = path => item => {
    if (['artifact', 'artifactSub'].includes(item.name)) {
      const {artifact, artifactSub} = {
        artifact: char.setting.artifact,
        artifactSub: char.setting.artifactSub,
        [item.name]: item.value,
      }
      onChangeArtifact(char.name, artifact, artifactSub)
    }
    else if (['weapon', 'weaponRefine'].includes(item.name)) {
      const {weapon, weaponRefine} = {
        weapon: char.setting.weapon,
        weaponRefine: char.setting.weaponRefine,
        [item.name]: item.value,
      }
      onChangeWeapon(char.name, weapon, weaponRefine)
    }
    else if (['sandsStat', 'gobletStat', 'circletStat'].includes(item.name)) {
      onChangeArtifactStat(char.name, item.name.slice(0, -4), item.value)
    }
    else if (item.name === item.original) {
      //TODO: 이전 값하고 동일하면 업데이트 하지 않도록 나중에 추가하자.
      // 지금은 디버깅용으로 좋다.
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
    <View style={tw`flex-1 p-2 overflow-scroll bg-mirage`}>
      <Text style={sheetTitle}>{i18next.t('general.status')}</Text>
      <View style={tw`flex flex-row w-full`}>
        <CharacterSpec char={char} onSelectStat={selectStat}/>
        <CharacterSetting char={char} onSelectStat={selectStat} onToggleTalent={toggleTalent}/>
      </View>
      <View style={sheetRow} />
      <CharacterHelp char={char}/>
    </View>
  )
}