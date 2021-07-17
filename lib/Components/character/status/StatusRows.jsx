import React, {useState} from 'react'
import { TouchableOpacity, View } from 'react-native'
import _ from 'lodash'
import i18next from 'i18next'
import tw, { Text } from '@tw'

import { calcTalentDmg } from '../../../Models/formulars'
import { formatComma } from '../../../Utils/utils'
import {
  sheetRow,
  rowValue,
  listItemDealing,
  rowValueAdd,
  rowValueFlexless,
} from '../common/styles'
import { StatusHeader } from './StatusHeader'
import { StatusContentsToggle } from './StatusContentsToggle'

const renderSuggestStatValue = ({char, item, onChange}) => {
  return item.value && <>
    <Text style={rowValue}>{i18next.t(`character.stat.${item.value}`)}</Text>
    <TouchableOpacity
      style={tw`self-baseline`}
      onPress={() => {}}
    >
      <Text
        style={tw`w-5 h-5 p-px ml-2 mr-1 text-base leading-4 text-center text-white bg-bossanova-hl rounded-1/2`}
      >-</Text>
    </TouchableOpacity>
    <Text style={rowValueFlexless}>{10}</Text>
    <TouchableOpacity
      style={tw`self-baseline`}
      onPress={() => {}}
    >
      <Text
        style={tw`w-5 h-5 p-px ml-1 text-base leading-4 text-center text-white bg-bossanova-hl rounded-1/2`}
      >+</Text>
    </TouchableOpacity>
  </>
}

const headerValueFactory = {
  // eslint-disable-next-line react/display-name
  mainTalent: ({char, item}) => <>
    <Text style={listItemDealing}>
      {formatComma(calcTalentDmg(char,
        {
          parent: char.mainTalent.parent,
          name: char.mainTalent.name,
        },
        {allCrit: true}
      ))}
    </Text>
    <Text style={rowValueFlexless}>
      {item.value.name.match(/^hit[\d]/)
        ? i18next.t(`character.${char.name}.normalAttack`) + '-' + _.last(item.value.name)
        : i18next.t(`character.${char.name}.${item.value.name}`)
      }
    </Text>
  </>,
  // eslint-disable-next-line react/display-name
  weapon: ({char, item}) => (
    <Text style={rowValue}>{i18next.t(`weapon.${item.value}`)}</Text>
  ),
  // eslint-disable-next-line react/display-name
  artifact: ({char, item}) => (
    <Text style={[rowValue, {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'}]}
    >
      {i18next.t(`artifact.${item.value}`)}
    </Text>),
  // eslint-disable-next-line react/display-name
  artifactSub: ({char, item}) => (
    <Text style={[rowValue, {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'}]}
    >
      {i18next.t(`artifact.${item.value}`)}
    </Text>),
  suggestStat1: renderSuggestStatValue,
  suggestStat2: renderSuggestStatValue,
  suggestStat3: renderSuggestStatValue,
  suggestStat4: renderSuggestStatValue,
}

const StatusHeaderValue = ({char, item}) => {
  const suffix = _.last(item.name) === '%' ? '%' : ''
  const HeaderValue = headerValueFactory[item.name]
  return HeaderValue ? (
    <HeaderValue {...{char, item}}/>
  ) : (
    <Choose>
      <When condition={_.isUndefined(item.value.base) || _.isUndefined(item.value.add)}>
        <Text style={rowValue}>{`${item.value}${suffix}`}</Text>
      </When>
      <Otherwise>
        <Text style={rowValue}>{`${item.value.base}${suffix}`}</Text>
        <Text style={rowValueAdd}>{`+${item.value.add}${suffix}`}</Text>
      </Otherwise>
    </Choose>
  )
}

export const StatusRows = ({char, stats, onChange}) => {
  const [open, setOpen] = useState(null)
  const toggleOpen = name => setOpen(open === name ? null : name)
  return Object.keys(stats)
  .map(p => stats[p].stat
    ? ({name: stats[p].stat, value: stats[p].value, original: p})
    : {name: p, value: stats[p], original: p})
  .map(item => {
    return item.name.startsWith('sep_') ? (<View style={sheetRow} key={item.name}/>) : (
      <React.Fragment key={item.original}>
        <View style={sheetRow} key={item.original}>
          <StatusHeader item={item} onToggleOpen={toggleOpen}/>
          <StatusHeaderValue {...{char, item}}/>
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

