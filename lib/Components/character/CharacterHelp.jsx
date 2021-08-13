import React from 'react'
import i18next from "i18next"
import { View } from 'react-native'
import { Text } from '@tw'

import { TalentItem } from './help/TalentItem'
import { sheetTitle, sheetRow } from './common/styles'

export const CharacterHelp = ({char}) => {
  const {talents: {skills}} = char
  let talentIndex = 0
  return (
    <>
      <Text style={sheetTitle}>{i18next.t('character.talent')}</Text>
      <For each="talent" of={Object.keys(skills)}>
        <TalentItem
          key={talentIndex++}
          charName={char.name}
          talentName={talent}
        />
        <For each="subTalent" of={Object.keys(skills[talent])}>
          <TalentItem
            key={talentIndex++}
            charName={char.name}
            talentName={subTalent}
            indent={4}
          />
        </For>
      </For>
      <For each="talent" of={['lv20', 'lv70', 'lv0']}>
        <If condition={char.talents[talent]}>
          <TalentItem
            key={talentIndex++}
            charName={char.name}
            talentName={talent}
          />
        </If>
      </For>
      <View style={sheetRow}/>
      <Text style={sheetTitle}>{i18next.t('character.constellations')}</Text>
      <For each="talent" of={['C1', 'C2', 'C3', 'C4', 'C5', 'C6']}>
        <TalentItem
          key={(talentIndex = talentIndex + 1)}
          charName={char.name}
          talentName={talent}
        />
      </For>
    </>
  )
}