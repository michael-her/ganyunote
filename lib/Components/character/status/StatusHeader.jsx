import React from 'react'
import _ from 'lodash'
import { TouchableOpacity } from 'react-native'
import i18next from "i18next"
import tw, { getBgColor, Text } from '@tw'

import { rowName } from '../common/styles'
import { contentFactory } from '../common/content-factory'

export const StatusHeader = ({item, onToggleOpen, style = {}}) => {
  const header = (
    <Text
      style={[
        rowName,
        (contentFactory[item.name] ? getBgColor('bossanova-900') : {}),
        style,
      ]}
    >
      {_.isUndefined(item.displayName)
        ? ((item.name !== item.original ? `${i18next.t('character.stat.weapon')} ` : '')
          + i18next.t(`character.stat.${item.name}`)).replace(/\s/g, '')
        : item.displayName.replace(/\s/g, '')
      }
    </Text>
  )
  return onToggleOpen ? (
    <TouchableOpacity
      style={tw`items-end`}
      onPress={() => onToggleOpen(item.original)}
    >
      {header}
    </TouchableOpacity>
  ) : header
}