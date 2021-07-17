import React from 'react'
import { TouchableOpacity, View, Image } from 'react-native'
import _ from 'lodash'
import i18next from 'i18next'
import update from 'immutability-helper'
import tw, { Text } from '@tw'

import {
  characterLevels,
  weaponSheet,
  weaponLevels,
  artifactSheet,
  artifactSubSheet,
  totalBeetickCount,
} from '../../../Data'
import { reselectMainTalent } from '../../../Models/selectors'
import { capitalizeFirstLetter, formatComma } from '../../../Utils/utils'
import { calcTalentDmg } from '../../../Models/formulars'
import {
  listItemDealing,
  listItemName,
  listItem,
  listItemDesc,
} from './styles'

const renderSuggestStat = ({char, item, onChange}) => (
  <>
    {Object.keys(artifactSubSheet)
    .filter(p => ![
      char.leftStats.suggestStat1,
      char.leftStats.suggestStat2,
      char.leftStats.suggestStat3,
      char.leftStats.suggestStat4].includes(p))
    .map((p, index) => (
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
)

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
  mainTalent: ({char, item, onChange}) => (
    <>
      {reselectMainTalent(char.talents.skills, {parent: 'talents'})
      .map(({parent, name}, index) => {
        const parentDisplayName = ['normalAttack', 'normalAttacks', 'skills', 'talents'].includes(parent) 
          ? ''
          : i18next.t(`character.${char.name}.${parent}`, null)
        const displayName = (parentDisplayName ? parentDisplayName + ': ' : '')
          + (name.match(/^hit[\d]/)
            ? i18next.t(`character.${char.name}.normalAttack`)+"-"+_.last(name)
            : i18next.t(`character.${char.name}.${name}`)
          )
        return (
          <TouchableOpacity
            key={name}
            onPress={e => onChange(update(item, {value: {$set: {parent, name}}}))}
          >
            <View style={listItem(item.value.name === name, index)}>
              <Text style={listItemName}>{displayName}</Text>
              <Text style={listItemDealing}>{formatComma(calcTalentDmg(char, {parent, name}, {allCrit: true}))}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </>
  ),
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
      {[1,2,3,4,5,6,7,8,9,10,11].map((_, index) => (
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
      {[1,2,3,4,5,6,7,8,9,10,11,12,13].map((_, index) => (
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
      {[1,2,3,4,5,6,7,8,9,10,11,12,13].map((_, index) => (
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
  suggestStat1: renderSuggestStat,
  suggestStat2: renderSuggestStat,
  suggestStat3: renderSuggestStat,
  suggestStat4: renderSuggestStat,
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
}
Object.keys(contentFactory).forEach(p => (
  contentFactory[p].displayName = `${capitalizeFirstLetter(p)}Content`
))
