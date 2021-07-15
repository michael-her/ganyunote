import React from 'react'

import { contentFactory } from '../common/content-factory'
import { StatusContents } from '../common/styled'

export const StatusContentsToggle = ({char, item, opened, onChange, contentType}) => {
  const Content = contentFactory[contentType || item.original]
  return (
    <StatusContents style={opened ? {minHeight: 20} : {height: 0, border: 'none'}}>
      {opened && Content && <Content char={char} item={item} onChange={onChange}/>}
    </StatusContents>
  )
}