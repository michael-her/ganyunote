import React, { useState } from 'react'
import { View } from 'react-native'
import _ from 'lodash'
import tw, { getBgColor, Text } from '@tw'

import { reselectTalent } from '../../Models/selectors'
import {
  sheetRow,
  rowValue,
  rowContents,
} from './common/styles'
import { StatusRows } from './status/StatusRows'
import { StatusHeader } from './status/StatusHeader'
import { StatusContentsToggle } from './status/StatusContentsToggle'
import { TalentExplains } from './help/TalentItem'

const StatusTalentToggle = ({char, item, opened, onChange}) => {
  return (
    <View style={[rowContents, opened ? tw`min-h-5` : tw`h-0 border-none`, {transition: 'height 0.25s ease'}]}>
      {opened && item.explains &&
        <TalentExplains explains={item.explains}/>
      }
    </View>
  )
}

const ToggleRows = ({char, onChange}) => {
  const [open, setOpen] = useState(null)
  const toggleOpen = name => setOpen(open === name ? null : name)
  const configurableTalents = reselectTalent(char, {talentModes: ['toggle', 'stacks'], path: 'talents', displayPrefix: `character.${char.name}.`})
  return configurableTalents.map(talent => {
    const toggleTalent = original => {
      setOpen(original)
      onChange(original, talent)
    }
    return (
      <React.Fragment key={talent.original}>
        <If condition={!_.isUndefined(talent.toggle)}>
          <View style={sheetRow} key={talent.original}>
            <StatusHeader
              item={talent}
              onToggleOpen={toggleTalent}
              onChange={onChange}
              style={getBgColor(talent.toggle ? 'bossanova-900' : 'coolgray-600')}
            />
            <Text style={rowValue}>{talent.toggle ? 'ON' : 'OFF'}</Text>
          </View>
          <StatusTalentToggle
            key={`${talent.original}_contents`}
            char={char}
            item={talent}
            opened={open === talent.original}
            onChange={onChange}
          />
        </If>
        <If condition={!_.isUndefined(talent.stacks)}>
          <View style={sheetRow} key={talent.original}>
            <StatusHeader
              item={talent}
              onToggleOpen={toggleOpen}
              onChange={onChange}
              style={getBgColor(talent.stacks ? 'bossanova-900' : 'coolgray-600')}
            />
            <Text style={rowValue}>{`${talent.stacks > 0 ? talent.stacks : 'OFF'}`}</Text>
          </View>
          <StatusContentsToggle
            key={`${talent.original}_contents`}
            contentType="stacks"
            char={char}
            item={talent}
            opened={open === talent.original}
            onChange={onChange}
          />
        </If>
      </React.Fragment>
    )
  })
}

export const CharacterSetting = ({
  char, onSelectStat, onToggleTalent
}) => {
  const {setting, mainTalent} = char
  return (
    <View style={tw`flex-1`}>
      <StatusRows key='mainTalent' {...{char, stats: {mainTalent}, onChange: onSelectStat()}}/>
      <StatusRows key='setting' {...{char, stats: setting, onChange: onSelectStat("setting")}}/>
      <ToggleRows key='toggle' {...{char, onChange: onToggleTalent}}/>
    </View>
  )
}
