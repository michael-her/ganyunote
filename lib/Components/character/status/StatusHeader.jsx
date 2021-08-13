import React from 'react'
import _ from 'lodash'
import update from 'immutability-helper'
import { TouchableOpacity, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import i18next from "i18next"
import tw, { getColor, getBgColor, Text } from '@tw'

import { rowName } from '../common/styles'
import { contentFactory } from '../common/content-factory'

export const StatusHeader = ({item, onToggleOpen, onChange, style = {}}) => {
  const colored = [
    'pyroDmg%', 'hydroDmg%', 'dendroDmg%', 'anemoDmg%', 'cryoDmg%', 'geoDmg%', 'physDmg%'
  ].includes(item.name) && item.value > 0
    ? tw`text-${item.name.slice(0, -4)}`
    : 'critRate%' === item.name && item.value > 0
      ? tw`text-ronchi`
      : {}
  console.log('[StatusHeader] item', item)
  const header = (
    <Text
      style={[
        rowName,
        (contentFactory[item.name] ? getBgColor('bossanova-900') : {}),
        style,
        colored,
      ]}
    >
      {_.isUndefined(item.displayName)
        ? ((item.name !== item.original ? `${i18next.t('character.stat.weapon')} ` : '')
          + i18next.t(`character.stat.${item.name}`)).replace(/\s/g, '')
        : item.displayName.replace(/\s/g, '')
      }
    </Text>
  )
  const locked = item.name.match(/suggestStat\d/) && item.value.name
    ? item.value.locked
    : undefined
  return onToggleOpen ? (
    <View style={tw`flex-row`}>
      <TouchableOpacity
        style={tw`items-end justify-end`}
        onPress={() => onToggleOpen(item.original)}
      >
        {header}
      </TouchableOpacity>
      {!_.isUndefined(locked) && <IconButton
        icon={locked ? "lock" : "lock-open-variant"}
        style={tw`w-5 h-5 m-0 ml-1`}
        color={getColor('white').color}
        size={12}
        onPress={() => onChange(update(item, {value: {locked: {$set: !locked}}}))}
      />}
    </View>
  ) : header
}