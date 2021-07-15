import React from 'react'
import i18next from "i18next"

import { TalentItem } from './help/TalentItem'
import { SheetTitle, SheetRow } from './common/styled'

export const CharacterHelp = ({char}) => {
  const {talents: {skills}} = char
  let talentIndex = 0
  return (
    <>
      <SheetTitle>{i18next.t('character.talent')}</SheetTitle>
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
            indent={16}
          />
        </For>
      </For>
      <For each="talent" of={['lv20', 'lv70', 'lv0']}>
        <TalentItem
          key={talentIndex++}
          charName={char.name}
          talentName={talent}
        />
      </For>
      <SheetRow />
      <SheetTitle>{i18next.t('character.constellations')}</SheetTitle>
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