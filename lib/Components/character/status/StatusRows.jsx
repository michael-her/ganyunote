import React, {useState} from 'react'
import i18next from 'i18next'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import _ from 'lodash'

import { calcTalentDmg } from '../../../Models/formulars'
import { formatComma } from '../../../Utils/utils'
import {
  SELECTABLE_COLOR,
  StatusRow,
  StatusValue,
  ListItemDealing,
  StatusAdd,
  StatusValueFlexless,
  SheetRow,
} from '../common/styled'
import { StatusHeader } from './StatusHeader'
import { StatusContentsToggle } from './StatusContentsToggle'

const StatusValueDecrease2 = styled.Text`
  padding: 1px;
  // border: solid;
  // border-width: 2px;
  // border-color: #222431;
  border-radius: 50%
  color: white;
  background-color: #7C44A0; // ${SELECTABLE_COLOR}; // #A777C5;
  width: 20px;
  height: 20px;

  font-family: yumichael;
  font-size: 1em;
  text-align: center;
`

const renderSuggestStatValue = ({char, item, onChange}) => {
  return item.value && <>
    <StatusValue>{i18next.t(`character.stat.${item.value}`)}</StatusValue>
    <TouchableOpacity
      style={{cursor: 'pointer', alignSelf: 'baseline'}}
      onPress={() => {}}
    >
      <StatusValueDecrease2 style={{marginLeft: 8, marginRight: 2}}>-</StatusValueDecrease2>
      {/* <StatusValueDecrease name="md-remove-circle" size={16} style={{marginLeft: 4, marginRight: 2}}/> */}
    </TouchableOpacity>
    <StatusValueFlexless>{10}</StatusValueFlexless>
    <TouchableOpacity
      style={{cursor: 'pointer', alignSelf: 'baseline'}}
      onPress={() => {}}
    >
      <StatusValueDecrease2 style={{marginLeft: 2}}>+</StatusValueDecrease2>
      {/* <StatusValueDecrease name="md-add-circle" size={16} style={{marginLeft: 2}}/> */}
    </TouchableOpacity>
  </>
}

const headerValueFactory = {
  // eslint-disable-next-line react/display-name
  mainTalent: ({char, item}) => <>
    <ListItemDealing>
      {formatComma(calcTalentDmg(char,
        {
          parent: char.mainTalent.parent,
          name: char.mainTalent.name,
        },
        {allCrit: true}
      ))}
    </ListItemDealing>
    <StatusValueFlexless>
      {item.value.name.match(/^hit[\d]/)
        ? i18next.t(`character.${char.name}.normalAttack`) + '-' + _.last(item.value.name)
        : i18next.t(`character.${char.name}.${item.value.name}`)
      }
    </StatusValueFlexless>
  </>,
  // eslint-disable-next-line react/display-name
  weapon: ({char, item}) => (
    <StatusValue>{i18next.t(`weapon.${item.value}`)}</StatusValue>
  ),
  // eslint-disable-next-line react/display-name
  artifact: ({char, item}) => (
    <StatusValue style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'}}
    >
      {i18next.t(`artifact.${item.value}`)}
    </StatusValue>),
  // eslint-disable-next-line react/display-name
  artifactSub: ({char, item}) => (
    <StatusValue style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'}}
    >
      {i18next.t(`artifact.${item.value}`)}
    </StatusValue>),
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
        <StatusValue>{`${item.value}${suffix}`}</StatusValue>
      </When>
      <Otherwise>
        <StatusValue>{`${item.value.base}${suffix}`}</StatusValue>
        <StatusAdd>{`+${item.value.add}${suffix}`}</StatusAdd>
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
    return item.name.startsWith('sep_') ? (<SheetRow key={item.name}/>) : (
      <React.Fragment key={item.original}>
        <StatusRow key={item.original}>
          <StatusHeader item={item} onToggleOpen={toggleOpen}/>
          <StatusHeaderValue {...{char, item}}/>
        </StatusRow>
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

