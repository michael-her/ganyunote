import React from 'react'
import _ from 'lodash'
import { TouchableOpacity } from 'react-native'
import i18next from 'i18next'
import update from 'immutability-helper'

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
  SELECT_COLOR,
  ListItemDealing,
  ListItemName,
  ListItem,
  ListItemIcon,
  ListItemDesc,
} from './styled'

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
        style={{cursor: 'pointer'}}
        onPress={e => onChange(update(item, {value: {$set: p}}))}
      >
        <ListItem
          style={{
            backgroundColor: item.value === p
              ? SELECT_COLOR
              : !(index%2) ? 'transparent' : 'rgba(255,255,255,0.1)'
          }}
        >
          <ListItemName>{i18next.t(`character.stat.${p}`)}</ListItemName>
          <ListItemDealing>{`+15%`}</ListItemDealing>
        </ListItem>
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
          style={{cursor: 'pointer'}}
          onPress={e => onChange(talent.original, talent, stacks)}
        >
          <ListItem
            style={{
              backgroundColor: talent.stacks === stacks
                ? SELECT_COLOR
                : !(index%2) ? 'transparent' : 'rgba(255,255,255,0.1)'
            }}
          >
            <ListItemName>{stacks}</ListItemName>
            <ListItemDealing>{`+15%`}</ListItemDealing>
          </ListItem>
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
            style={{cursor: 'pointer'}}
            onPress={e => onChange(update(item, {value: {$set: {parent, name}}}))}
          >
            <ListItem
              style={{
                backgroundColor: item.value.name === name
                  ? SELECT_COLOR
                  : !(index%2) ? 'transparent' : 'rgba(255,255,255,0.1)'
              }}
            >
              <ListItemName>{displayName}</ListItemName>
              <ListItemDealing>{formatComma(calcTalentDmg(char, {parent, name}, {allCrit: true}))}</ListItemDealing>
            </ListItem>
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
          style={{cursor: 'pointer'}}
          onPress={e => onChange(update(item, {value: {$set: item.value === index + 1
            // 별자리 끄기
            ? index
            // 별자리 켜기
            : index + 1
          }}))}
        >
          <ListItem
            style={{
              padding: 0,
              backgroundColor: item.value >= index + 1
                ? SELECT_COLOR
                : !(index%2) ? 'transparent' : 'rgba(255,255,255,0.1)'
            }}
          >
            <ListItemIcon source={i18next.t(`character.${char.name}.${name}_icon`)}/>
            <ListItemName>
              {name + ' ' + i18next.t(`character.${char.name}.${name}`).split(' · ')[1]}
            </ListItemName>
            <ListItemDealing>{`+15%`}</ListItemDealing>
          </ListItem>
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
          style={{cursor: 'pointer'}}
          onPress={e => onChange(update(item, {value: {$set: name}}))}
        >
          <ListItem
            style={{
              backgroundColor: item.value === name
                ? SELECT_COLOR
                : !(index%2) ? 'transparent' : 'rgba(255,255,255,0.1)'
            }}
          >
            <ListItemName>{name}</ListItemName>
            <ListItemDealing>{`+15%`}</ListItemDealing>
          </ListItem>
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
          style={{cursor: 'pointer'}}
          onPress={e => onChange(update(item, {value: {$set: index + 1}}))}
        >
          <ListItem
            style={{
              backgroundColor: item.value === index + 1
                ? SELECT_COLOR
                : !(index%2) ? 'transparent' : 'rgba(255,255,255,0.1)'
            }}
          >
            <ListItemName>{`${index + 1}`}</ListItemName>
            <ListItemDealing>{`+15%`}</ListItemDealing>
          </ListItem>
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
          style={{cursor: 'pointer'}}
          onPress={e => onChange(update(item, {value: {$set: index + 1}}))}
        >
          <ListItem
            style={{
              backgroundColor: item.value === index + 1
                ? SELECT_COLOR
                : !(index%2) ? 'transparent' : 'rgba(255,255,255,0.1)'
            }}
          >
            <ListItemName>{`${index + 1}`}</ListItemName>
            <ListItemDealing>{`+15%`}</ListItemDealing>
          </ListItem>
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
          style={{cursor: 'pointer'}}
          onPress={e => onChange(update(item, {value: {$set: index + 1}}))}
        >
          <ListItem
            style={{
              backgroundColor: item.value === index + 1
                ? SELECT_COLOR
                : !(index%2) ? 'transparent' : 'rgba(255,255,255,0.1)'
            }}
          >
            <ListItemName>{`${index + 1}`}</ListItemName>
            <ListItemDealing>{`+15%`}</ListItemDealing>
          </ListItem>
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
            style={{cursor: 'pointer'}}
            onPress={e => onChange(update(item, {value: {$set: name}}))}
          >
            <ListItem
              style={{
                backgroundColor: item.value === name
                  ? SELECT_COLOR
                  : !(index%2) ? 'transparent' : 'rgba(255,255,255,0.1)'
              }}
            >
              <ListItemName>{i18next.t(`weapon.${name}`)}</ListItemName>
              <ListItemDesc>{`★${weapons[name].rarity}`}</ListItemDesc>
            </ListItem>
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
          style={{cursor: 'pointer'}}
          onPress={e => onChange(update(item, {value: {$set: index + 1}}))}
        >
          <ListItem
            style={{
              backgroundColor: item.value === index + 1
                ? SELECT_COLOR
                : !(index%2) ? 'transparent' : 'rgba(255,255,255,0.1)'
            }}
          >
            <ListItemName>{`${index + 1}`}</ListItemName>
            <ListItemDealing>{`+15%`}</ListItemDealing>
          </ListItem>
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
          style={{cursor: 'pointer'}}
          onPress={e => onChange(update(item, {value: {$set: name}}))}
        >
          <ListItem
            style={{
              backgroundColor: item.value === name
                ? SELECT_COLOR
                : !(index%2) ? 'transparent' : 'rgba(255,255,255,0.1)'
            }}
          >
            <ListItemName>{name}</ListItemName>
            <ListItemDealing>{`+15%`}</ListItemDealing>
          </ListItem>
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
          style={{cursor: 'pointer'}}
          onPress={e => onChange(update(item, {value: {$set: name}}))}
        >
          <ListItem
            style={{
              backgroundColor: item.value === name
                ? SELECT_COLOR
                : !(index%2) ? 'transparent' : 'rgba(255,255,255,0.1)'
            }}
          >
            <ListItemName>{i18next.t(`artifact.${name}`)}</ListItemName>
            <ListItemDealing>{`+15%`}</ListItemDealing>
          </ListItem>
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
          style={{cursor: 'pointer'}}
          onPress={e => onChange(update(item, {value: {$set: name}}))}
        >
          <ListItem
            style={{
              backgroundColor: item.value === name
                ? SELECT_COLOR
                : !(index%2) ? 'transparent' : 'rgba(255,255,255,0.1)'
            }}
          >
            <ListItemName>{i18next.t(`artifact.${name}`)}</ListItemName>
            <ListItemDealing>{`+15%`}</ListItemDealing>
          </ListItem>
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
          style={{cursor: 'pointer'}}
          onPress={e => onChange(update(item, {value: {$set: value}}))}
        >
          <ListItem
            style={{
              backgroundColor: item.value === name
                ? SELECT_COLOR
                : !(index%2) ? 'transparent' : 'rgba(255,255,255,0.1)'
            }}
          >
            <ListItemName>{`${value}`}</ListItemName>
            <ListItemDealing>{`+15%`}</ListItemDealing>
          </ListItem>
        </TouchableOpacity>
      ))}
    </>
  ),
}
Object.keys(contentFactory).forEach(p => (
  contentFactory[p].displayName = `${capitalizeFirstLetter(p)}Content`
))
