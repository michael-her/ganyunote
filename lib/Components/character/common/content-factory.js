import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TouchableOpacity, View, Image } from 'react-native'
import { RadioButton } from 'react-native-paper'
import _ from 'lodash'
import i18next from 'i18next'
import update from 'immutability-helper'
import tw, { getColor, Text } from '@tw'

import {
  characterLevels,
  weaponSheet,
  weaponLevels,
  artifactSheet,
  artifactSubSheet,
  totalBeetickCount,
  artifactMainSheet,
} from '../../../Data'
import { reselectMainTalent } from '../../../Models/selectors'
import { capitalizeFirstLetter, formatComma } from '../../../Utils/utils'
import {
  calcTalentDmg,
  calcElemental,
} from '../../../Models/formulars'
import {
  listItemDealing,
  listItemName,
  listItem,
  listItemDesc,
} from './styles'

const renderSuggestStat = ({char, item, onChange}) => {
  const {setting: {suggestStat1, suggestStat2, suggestStat3, suggestStat4, suggestStat5}} = char
  const choices = ['blank', ...Object.keys(artifactSubSheet)
  // 현재 선택된 부옵들은 제외
  .filter(p => ![
    suggestStat1.name,
    suggestStat2.name,
    suggestStat3.name,
    suggestStat4.name,
    suggestStat5.name].includes(p))]
  return <>
    {choices.map((p, index) => (
      <TouchableOpacity
        key={p}
        onPress={e => onChange(update(item, {value: {name: {$set: p === 'blank' ? '' : p}}}))}
      >
        <View style={listItem(item.value.name === (p === 'blank' ? '' : p), index)}>
          <Text style={listItemName}>{i18next.t(`character.stat.${p}`)}</Text>
          <Text style={listItemDealing}>{p === 'blank' ? '' : `+15%`}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </>
}

const renderArtifactStat = ({char, item, onChange}) => {
  return <>
    {Object.keys(artifactMainSheet[item.name.slice(0, -4)]).map((p, index) => (
      <TouchableOpacity
        key={p}
        onPress={e => onChange(update(item, {value: {$set: p}}))}
      >
        <View style={listItem(item.value === p, index)}>
          <Text style={listItemName}>{i18next.t(`character.stat.${p}`)}</Text>
          <Text style={listItemDealing}>{`+15%`}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </>
}

export const contentFactory = {
  // eslint-disable-next-line react/display-name
  stacks: ({char, item: talent, onChange}) => (
    <>
      {_.range(talent.maxStacks + 1).map((stacks, index) => (
        <TouchableOpacity
          key={stacks}
          onPress={e => onChange(talent.original, talent, stacks)}
        >
          <View style={listItem(talent.stacks === stacks, index)}>
            <Text style={listItemName}>{stacks}</Text>
            <Text style={listItemDealing}>{`+15%`}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  ),
  // eslint-disable-next-line react/display-name
  mainTalent: ({char, item, onChange}) => {
    const opnt = useSelector(state => state.app.opnt)
    const dmgTypes = ['noCrit', 'allCrit', 'average']
    const [dmgType, setDmgType] = useState('average')
    const dmgColors = [getColor('coolgray-400'), getColor('greenyellow'), getColor('ronchi')]
    return <>
      <View style={tw`flex-row items-center justify-center`}>
        {dmgTypes.map((t, index) => [
          <RadioButton
            key={t}
            value={t}
            style={index === 0 ? null : tw`ml-2`}
            color={dmgColors[dmgTypes.indexOf(t)].color}
            status={dmgType === t ? 'checked' : 'unchecked'}
            onPress={() => setDmgType(t)}
          />,
          <Text key={`${t}Label`} style={tw`text-sm`}>{i18next.t(`general.${t}`)}</Text>
        ])}
      </View>
      {reselectMainTalent(char.talents.skills, {parent: 'talents'})
      .map(({parent, name}, index) => {
        const parentDisplayName = ['normalAttack', 'normalAttacks', 'skills', 'talents'].includes(parent) 
          ? ''
          : i18next.t(`character.${char.name}.${parent}`, null)
        const displayName = ((parentDisplayName ? parentDisplayName + ': ' : '')
          + (name.match(/^hit[\d]/)
            ? i18next.t(`character.${char.name}.normalAttack`)+"-"+_.last(name)
            : i18next.t(`character.${char.name}.${name}`)
          )).replace(/\s/g, '')
        const elemental = calcElemental(char, name)
        const {dmg} = calcTalentDmg(char, opnt, {parent, name}, {dmgType})
        return (
          <TouchableOpacity
            key={name}
            onPress={e => onChange(update(item, {value: {$set: {parent, name}}}))}
          >
            <View style={listItem(item.value.name === name, index)}>
              <Text style={[listItemName, elemental ? tw`text-${elemental}` : '']}>{displayName}</Text>
              <Text style={[listItemDealing, dmgColors[dmgTypes.indexOf(dmgType)]]}>{formatComma(dmg)}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </>
  },
  // eslint-disable-next-line react/display-name
  constellation: ({char, item, onChange}) => (
    <>
      {_.times(6, n=>`C${n+1}`).map((name, index) => (
        <TouchableOpacity
          key={name}
          onPress={e => onChange(update(item, {value: {$set: item.value === index + 1
            // 별자리 끄기
            ? index
            // 별자리 켜기
            : index + 1
          }}))}
        >
          <View style={[listItem(item.value >= index + 1, index), tw`p-0`]}>
            <Image
              style={tw`w-6 h-6 ml-2 pointer-events-none`}
              source={i18next.t(`character.${char.name}.${name}_icon`)}
            />
            <Text style={listItemName}>
              {name + ' ' + i18next.t(`character.${char.name}.${name}`).split(' · ')[1]}
            </Text>
            <Text style={[listItemDealing, tw`leading-6`]} >{`+15%`}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  ),
  // eslint-disable-next-line react/display-name
  level: ({char, item, onChange}) => (
    <>
      {characterLevels.map((name, index) => (
        <TouchableOpacity
          key={name}
          onPress={e => onChange(update(item, {value: {$set: name}}))}
        >
          <View style={listItem(item.value === name, index)}>
            <Text style={listItemName}>{name}</Text>
            <Text style={listItemDealing}>{`+15%`}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  ),
  // eslint-disable-next-line react/display-name
  attackLv: ({char, item, onChange}) => (
    <>
      {[1,2,3,4,5,6,7,8,9,10].map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={e => onChange(update(item, {value: {$set: index + 1}}))}
        >
          <View style={listItem(item.value === index + 1, index)}>
            <Text style={listItemName}>{`${index + 1}`}</Text>
            <Text style={listItemDealing}>{`+15%`}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  ),
  // eslint-disable-next-line react/display-name
  skillLv: ({char, item, onChange}) => (
    <>
      {[1,2,3,4,5,6,7,8,9,10].map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={e => onChange(update(item, {value: {$set: index + 1}}))}
        >
          <View style={listItem(item.value === index + 1, index)}>
            <Text style={listItemName}>{`${index + 1}`}</Text>
            <Text style={listItemDealing}>{`+15%`}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  ),
  // eslint-disable-next-line react/display-name
  burstLv: ({char, item, onChange}) => (
    <>
      {[1,2,3,4,5,6,7,8,9,10].map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={e => onChange(update(item, {value: {$set: index + 1}}))}
        >
          <View style={listItem(item.value === index + 1, index)}>
            <Text style={listItemName}>{`${index + 1}`}</Text>
            <Text style={listItemDealing}>{`+15%`}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  ),
  // eslint-disable-next-line react/display-name
  weapon: ({char, item, onChange}) => {
    const weapons = weaponSheet[char.weaponType]
    return (
      <>
        {Object.keys(weapons).map((name, index) => (
          <TouchableOpacity
            key={name}
            onPress={e => onChange(update(item, {value: {$set: name}}))}
          >
            <View style={listItem(item.value === name, index)}>
              <Text style={listItemName}>{i18next.t(`weapon.${name}`)}</Text>
              <Text style={listItemDesc}>{`★${weapons[name].rarity}`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </>
    ) 
  },
  // eslint-disable-next-line react/display-name
  weaponRefine: ({char, item, onChange}) => (
    <>
      {[1,2,3,4,5].map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={e => onChange(update(item, {value: {$set: index + 1}}))}
        >
          <View style={listItem(item.value === index + 1, index)}>
            <Text style={listItemName}>{`${index + 1}`}</Text>
            <Text style={listItemDealing}>{`+15%`}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  ),
  // eslint-disable-next-line react/display-name
  weaponLv: ({char, item, onChange}) => (
    <>
      {weaponLevels.map((name, index) => (
        <TouchableOpacity
          key={name}
          onPress={e => onChange(update(item, {value: {$set: name}}))}
        >
          <View style={listItem(item.value === name, index)}>
            <Text style={listItemName}>{name}</Text>
            <Text style={listItemDealing}>{`+15%`}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  ),
  // eslint-disable-next-line react/display-name
  artifact: ({char, item, onChange}) => (
    <>
      {Object.keys(artifactSheet).map((name, index) => (
        <TouchableOpacity
          key={name}
          onPress={e => onChange(update(item, {value: {$set: name}}))}
        >
          <View style={listItem(item.value === name, index)}>
            <Text style={listItemName}>{i18next.t(`artifact.${name}`)}</Text>
            <Text style={listItemDealing}>{`+15%`}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  ),
  // eslint-disable-next-line react/display-name
  artifactSub: ({char, item, onChange}) => (
    <>
      {Object.keys(artifactSheet).map((name, index) => (
        <TouchableOpacity
          key={name}
          onPress={e => onChange(update(item, {value: {$set: name}}))}
        >
          <View style={(listItem(item.value === name, index))}>
            <Text style={listItemName}>{i18next.t(`artifact.${name}`)}</Text>
            <Text style={listItemDealing}>{`+15%`}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  ),
  // eslint-disable-next-line react/display-name
  beetickCount: ({char, item, onChange}) => (
    <>
      {_.range(20, totalBeetickCount + 1).map((value, index) => (
        <TouchableOpacity
          key={value}
          onPress={e => onChange(update(item, {value: {$set: value}}))}
        >
          <View style={listItem(item.value === name, index)}>
            <Text style={listItemName}>{`${value}`}</Text>
            <Text style={listItemDealing}>{`+15%`}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  ),
  suggestStat1: renderSuggestStat,
  suggestStat2: renderSuggestStat,
  suggestStat3: renderSuggestStat,
  suggestStat4: renderSuggestStat,
  suggestStat5: renderSuggestStat,
  sandsStat: renderArtifactStat,
  gobletStat: renderArtifactStat,
  circletStat: renderArtifactStat,
}
Object.keys(contentFactory).forEach(p => (
  contentFactory[p].displayName = `${capitalizeFirstLetter(p)}Content`
))
