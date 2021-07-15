import React from 'react'
import styled from "styled-components/native"
import i18next from "i18next"

const StyledTalent = styled.View`
  margin-left: 16px;
`

const StyledTalentName = styled.Text`
  margin-top: 16px;
  font-family: yumichael;
  font-size: 1em;
  color: #FFE48F;
`

const StyledTalentExplains = styled.Text`
  margin-top: 8px;
  font-family: yumichael;
  font-size: 1em;
  line-height: 1.25em;
  color: ${props => props.theme.headerCellTextColor};
`

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
      <StyledTalentExplains key={children.length}>
        {p.substring(from, from_)}
      </StyledTalentExplains>
    )
    const color = match.substring(3, match.length - 1)
    const colored = p.substring(from_ + match.length, to)
    children.push(
      <StyledTalentExplains key={children.length} style={{color}}>
        {colored}
      </StyledTalentExplains>
    )
    // console.log('format', {colored, color})
    from = to + ender.length
  })
  children.push(
    <StyledTalentExplains key={children.length}>
      {p.substring(from)}
    </StyledTalentExplains>
  )
  return (
    <StyledTalentExplains>
      {children}
    </StyledTalentExplains>
  )
}

export const TalentItem = ({charName, talentName, indent = 0}) => {
  const talentName_ = i18next.t(`character.${charName}.${talentName}`)
  const talentExplained_ = i18next.t(`character.${charName}.${talentName}_Explained`, { returnObjects: true })
  return (
    <StyledTalent style={{marginLeft: indent}}>
      <StyledTalentName>{talentName_}</StyledTalentName>
      <If condition={talentExplained_ !== ""}>
        <TalentExplains explains={talentExplained_}/>
      </If>
    </StyledTalent>
  )
}
