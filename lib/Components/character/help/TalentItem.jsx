import React from 'react'
import { View } from 'react-native'
import styled from "styled-components/native"
import i18next from "i18next"
import tw, {Text} from '@tw'

// const StyledText = styled.Text`
//   margin-top: 8px;
//   line-height: 1.25em;
//   color: ${props => props.theme.headerCellTextColor};
// `
const StyledText = styled.Text`
  margin-top: 8px;
  font-family: yumichael;
  font-size: 1em;
  line-height: 1.25em;
  color: ${props => props.theme.headerCellTextColor};
`

const style = tw`mt-4 leading-6 text-white`

export const TalentExplains = ({explains}) => {
  explains = Array.isArray(explains) ? explains : [explains]
  explains = explains.map(p => p.startsWith("- ") ? p.replace("-", "·") : p)
  const p = explains.join("\n")
  const re = /<c=#[ABCDEF\d]*>/gi
  const matched = p.match(re) || []
  let from = 0, to = 0
  const ender = '</c>'
  const children = []
  matched.forEach(match => {
    const from_ = p.indexOf(match, from)
    to = p.indexOf(ender, from_ + match.length)
    children.push(
      <Text style={style} key={children.length}>
        {p.substring(from, from_)}
      </Text>
    )
    const color = match.substring(3, match.length - 1)
    const colored = p.substring(from_ + match.length, to)
    children.push(
      <Text key={children.length} style={{...style, color}}>
        {colored}
      </Text>
    )
    // console.log('format', {colored, color})
    from = to + ender.length
  })
  children.push(
    <Text key={children.length} style={style}>
      {p.substring(from)}
    </Text>
  )
  return (
    <Text style={style}>
      {children}
    </Text>
  )
}

export const TalentItem = ({charName, talentName, indent = 0}) => {
  const talentName_ = i18next.t(`character.${charName}.${talentName}`)
  const talentExplained_ = i18next.t(`character.${charName}.${talentName}_Explained`, { returnObjects: true })
  return (
    <View style={tw`flex flex-col ml-${indent}`}>
      <Text style={tw`mt-8 text-base leading-4 text-salomie`}>{talentName_}</Text>
      <If condition={talentExplained_ !== ""}>
        <TalentExplains explains={talentExplained_}/>
      </If>
    </View>
  )
}
