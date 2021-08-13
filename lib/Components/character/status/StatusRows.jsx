import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { TouchableOpacity, View } from 'react-native'
import _ from 'lodash'
import update from 'immutability-helper'
import i18next from 'i18next'
import tw, { Text } from '@tw'

import {
  calcTalentDmg,
  calcElemental,
} from '../../../Models/formulars'
import { capitalizeFirstLetter, formatComma } from '../../../Utils/utils'
import {
  sheetRow,
  rowValue,
  listItemDealing,
  rowValueAdd,
  rowValueFlexless,
  rowValueWide,
} from '../common/styles'
import { StatusHeader } from './StatusHeader'
import { StatusContentsToggle } from './StatusContentsToggle'

const renderBeetickCountValue = ({char, item, onChange}) => {
  return <View style={rowValueWide}>
    <Text style={rowValue}>{i18next.t(`general.beetick${_.floor(item.value / 9, 0)}`)}</Text>
    <TouchableOpacity
      style={tw`self-baseline`}
      onPress={() => onChange({...item, value: item.value - 1})}
    >
      <Text
        style={tw`w-5 h-5 p-px ml-2 mr-1 text-base leading-4 text-center text-white bg-bossanova-hl rounded-1/2`}
      >-</Text>
    </TouchableOpacity>
    <View style={tw`min-w-4`}>
      <Text style={[rowValueFlexless, tw`self-center`]}>{item.value}</Text>  
    </View>
    <TouchableOpacity
      style={tw`self-baseline`}
      onPress={() => onChange({...item, value: item.value + 1})}
    >
      <Text
        style={tw`w-5 h-5 p-px ml-1 text-base leading-4 text-center text-white bg-bossanova-hl rounded-1/2`}
      >+</Text>
    </TouchableOpacity>
  </View>
}

const renderSuggestStatValue = ({char, item, onChange}) => {
  return item.value.name && <View style={rowValueWide}>
    <Text style={rowValue}>{i18next.t(`character.stat.${item.value.name}`)}</Text>
    <TouchableOpacity
      style={tw`self-baseline`}
      onPress={() => onChange(update(item, {value: {count: {$set: item.value.count - 1}}}))}
    >
      <Text
        style={tw`w-5 h-5 p-px ml-2 mr-1 text-base leading-4 text-center text-white bg-bossanova-hl rounded-1/2`}
      >-</Text>
    </TouchableOpacity>
    <View style={tw`min-w-4`}>
      <Text style={[rowValueFlexless, tw`self-center`]}>{item.value.count}</Text>  
    </View>
    <TouchableOpacity
      style={tw`self-baseline`}
      onPress={() => onChange(update(item, {value: {count: {$set: item.value.count + 1}}}))}
    >
      <Text
        style={tw`w-5 h-5 p-px ml-1 text-base leading-4 text-center text-white bg-bossanova-hl rounded-1/2`}
      >+</Text>
    </TouchableOpacity>
  </View>
}

const headerValueFactory = {
  // eslint-disable-next-line react/display-name
  mainTalent: ({char, item}) => {
    const opnt = useSelector(state => state.app.opnt)
    const {dmg} = calcTalentDmg(char, opnt,
      {
        parent: item.value.parent,
        name: item.value.name,
      },
      {dmgType: 'allCrit'}
    )
    const elemental = calcElemental(char, item.value.name)
    let displayName = item.value.name.match(/^hit[\d]/)
      ? i18next.t(`character.${char.name}.normalAttack`) + '-' + _.last(item.value.name)
      : i18next.t(`character.${char.name}.${item.value.name}`)
    displayName = displayName.split(':')
      ? _.last(displayName.split(':')).trim()
      : displayName
    return <View style={rowValueWide}>
      <Text style={listItemDealing}>
        {formatComma(dmg)}
      </Text>
      <Text style={[rowValueFlexless, elemental ? tw`text-${elemental}` : '']}>
        {displayName}
      </Text>
    </View>
  },
  // eslint-disable-next-line react/display-name
  weapon: ({char, item}) => (
    <Text style={rowValue}>{i18next.t(`weapon.${item.value}`)}</Text>
  ),
  // eslint-disable-next-line react/display-name
  artifact: ({char, item}) => (
    <View style={rowValueWide}>
      <Text style={[rowValue, {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'},
        tw`self-flex-end`]}
      >
        {i18next.t(`artifact.${item.value}`)}
      </Text>      
    </View>),
  // eslint-disable-next-line react/display-name
  artifactSub: ({char, item}) => (
    <View style={rowValueWide}>
      <Text style={[rowValue, {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'},
        tw`self-flex-end`]}
      >
        {i18next.t(`artifact.${item.value}`)}
      </Text>  
    </View>),
  beetickCount: renderBeetickCountValue,
  suggestStat1: renderSuggestStatValue,
  suggestStat2: renderSuggestStatValue,
  suggestStat3: renderSuggestStatValue,
  suggestStat4: renderSuggestStatValue,
  suggestStat5: renderSuggestStatValue,
  // eslint-disable-next-line react/display-name
  sandsStat: ({char, item}) => (
    <Text style={rowValue}>{i18next.t(`character.stat.${item.value}`)}</Text>
  ),
  // eslint-disable-next-line react/display-name
  gobletStat: ({char, item}) => (
    <Text style={rowValue}>{i18next.t(`character.stat.${item.value}`)}</Text>
  ),
  // eslint-disable-next-line react/display-name
  circletStat: ({char, item}) => (
    <Text style={rowValue}>{i18next.t(`character.stat.${item.value}`)}</Text>
  ),
}

const StatusHeaderValue = ({char, item, onChange}) => {
  const suffix = _.last(item.name) === '%' ? '%' : ''
  const HeaderValue = headerValueFactory[item.name]
  let isUnary = true
  let base = 0
  let add = 0
  if (!_.isUndefined(item.value.base) && !_.isUndefined(item.value.add)) {
    isUnary = false
    base = item.value.base
    add = item.value.add
  }
  if (['attackLv', 'skillLv', 'burstLv'].includes(item.name)) {
    base = item.value
    add = char.spec[`_inc${capitalizeFirstLetter(item.name)}`]
    if (add !== 0) {
      isUnary = false
    }
  }
  return HeaderValue ? (
    <HeaderValue {...{char, item, onChange}}/>
  ) : (
    <Choose>
      <When condition={isUnary}>
        <Text style={rowValue}>{`${item.value}${suffix}`}</Text>
      </When>
      <Otherwise>
        <Text style={rowValue}>{`${base}${suffix}`}</Text>
        <Text style={rowValueAdd}>{`+${add}${suffix}`}</Text>
      </Otherwise>
    </Choose>
  )
}

export const StatusRows = ({char, stats, onChange}) => {
  const [open, setOpen] = useState(null)
  const toggleOpen = name => setOpen(open === name ? null : name)
  const wideValues = [
    'artifact',
    'artifactSub',
    'beetickCount',
    'suggestStat1',
    'suggestStat2',
    'suggestStat3',
    'suggestStat4',
    'suggestStat5',
    'mainTalent',
  ]
  return Object.keys(stats)
  .filter(p => !p.startsWith('_'))
  .map(p => stats[p].stat
    ? ({name: stats[p].stat, value: stats[p].value, original: p})
    : {name: p, value: stats[p], original: p})
  .map(item => {
    return item.name.startsWith('sep_') ? (
      <View style={sheetRow} key={item.name}/>
    ) : (
      <React.Fragment key={item.original}>
        <View style={[sheetRow, wideValues.includes(item.name) ? tw`flex-col` : '']} key={item.original}>
          <StatusHeader item={item} onToggleOpen={toggleOpen} onChange={onChange}/>
          <StatusHeaderValue {...{char, item, onChange}}/>
        </View>
        <StatusContentsToggle
          key={`${item.original}_contents`}
          char={char}
          item={item}
          opened={open === item.original}
          onChange={onChange}
        />
      </React.Fragment>
    )
  })
}

