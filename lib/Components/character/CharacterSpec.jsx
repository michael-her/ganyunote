import React from 'react'
import { View } from 'react-native'
import tw from '@tw'

import { StatusRows } from './status/StatusRows'

export const CharacterSpec = ({char, onSelectStat}) => {
  return (
    <View style={tw`flex-1`}>
      <StatusRows char={char} stats={char.rightStats} onChange={onSelectStat("rightStats")}/>
    </View>
  )
}
