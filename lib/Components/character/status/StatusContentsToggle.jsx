import React from 'react'
import { View } from 'react-native'
import tw from '@tw'

import { contentFactory } from '../common/content-factory'
import { rowContents } from '../common/styles'

export const StatusContentsToggle = ({char, item, opened, onChange, contentType}) => {
  const Content = contentFactory[contentType || item.original]
  return (
    <View style={[rowContents, opened ? tw`min-h-20` : tw`h-0 border-none`, {transition: 'height 0.25s ease'}]}>
      {opened && Content && <Content char={char} item={item} onChange={onChange}/>}
    </View>
  )
}