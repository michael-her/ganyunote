import React from 'react'
import tw from '@tw'

import { StatusRows } from './status/StatusRows'

export const CharacterSpec = ({char, onSelectStat}) => {
  return (
    <div style={tw`flex-1`}>
      <StatusRows char={char} stats={char.rightStats} onChange={onSelectStat("rightStats")}/>
    </div>
  )
}
