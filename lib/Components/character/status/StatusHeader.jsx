import React from 'react'
import _ from 'lodash'
import { TouchableOpacity } from 'react-native'
import i18next from "i18next"

import { SELECTABLE_COLOR, StatusName } from '../common/styled'
import { contentFactory } from '../common/content-factory'

export const StatusHeader = ({item, onToggleOpen, style}) => {
  const header = (
    <StatusName
      style={{
        ...(contentFactory[item.name] ? {backgroundColor: SELECTABLE_COLOR} : {}),
        ...(style ? style : {}),
      }}
    >
      {_.isUndefined(item.displayName)
        ? ((item.name !== item.original ? `${i18next.t('character.stat.weapon')} ` : '')
          + i18next.t(`character.stat.${item.name}`)).replace(/\s/g, '')
        : item.displayName.replace(/\s/g, '')
      }
    </StatusName>
  )
  return onToggleOpen ? (
    <TouchableOpacity
      style={{cursor: 'pointer', alignItems: 'flex-end'}}
      onPress={() => onToggleOpen(item.original)}
    >
      {header}
    </TouchableOpacity>
  ) : header
}