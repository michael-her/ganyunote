import React, { useState } from 'react'
import _ from 'lodash'
import tw from '@tw'

import { themeLT } from '../../Styles/base'
import { reselectTalent } from '../../Models/selectors'
import {
  SELECTABLE_COLOR,
  StatusValue,
  StatusRow,
  StatusContents,
} from './common/styled'
import { StatusRows } from './status/StatusRows'
import { StatusHeader } from './status/StatusHeader'
import { StatusContentsToggle } from './status/StatusContentsToggle'
import { TalentExplains } from './help/TalentItem'

const StatusTalentToggle = ({char, item, opened, onChange}) => {
  return (
    <StatusContents style={opened ? {minHeight: 20} : {height: 0, border: 'none'}}>
      {opened && item.explains &&
        <TalentExplains explains={item.explains}/>
      }
    </StatusContents>
  )
}

const ToggleRows = ({char, onChange}) => {
  const { talents } = char
  const [open, setOpen] = useState(null)
  const toggleOpen = name => setOpen(open === name ? null : name)
  const configurableTalents = reselectTalent(talents, {talentModes: ['toggle', 'stacks'], path: 'talents', displayPrefix: `character.${char.name}.`})
  return configurableTalents.map(talent => {
    const toggleTalent = original => {
      setOpen(original)
      onChange(original, talent)
    }
    return (
      <React.Fragment key={talent.original}>
        <If condition={!_.isUndefined(talent.toggle)}>
          <StatusRow key={talent.original}>
            <StatusHeader
              item={talent}
              onToggleOpen={toggleTalent}
              style={{backgroundColor: talent.toggle ? SELECTABLE_COLOR: themeLT.headerCellIconColor}}
            />
            <StatusValue>{talent.toggle ? 'ON' : 'OFF'}</StatusValue>
          </StatusRow>
          <StatusTalentToggle
            key={`${talent.original}_contents`}
            char={char}
            item={talent}
            opened={open === talent.original}
            onChange={onChange}
          />
        </If>
        <If condition={!_.isUndefined(talent.stacks)}>
          <StatusRow key={talent.original}>
            <StatusHeader
              item={talent}
              onToggleOpen={toggleOpen}
              style={{backgroundColor: talent.stacks > 0 ? SELECTABLE_COLOR: themeLT.headerCellIconColor}}
            />
            <StatusValue>{`${talent.stacks > 0 ? talent.stacks : 'OFF'}`}</StatusValue>
          </StatusRow>
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
  const {leftStats, mainTalent} = char
  return (
    <div style={tw`flex-1`}>
      <StatusRows key='mainTalent' {...{char, stats: {mainTalent}, onChange: onSelectStat()}}/>
      <StatusRows key='setting' {...{char, stats: leftStats, onChange: onSelectStat("leftStats")}}/>
      <ToggleRows key='toggle' {...{char, onChange: onToggleTalent}}/>
    </div>
  )
}
