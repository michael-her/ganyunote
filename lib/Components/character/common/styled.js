import styled from 'styled-components/native'
import rgba from 'rgba-convert'
import { Ionicons } from '@expo/vector-icons'

import { themeLT } from '../../../Styles/base'

export const SELECTABLE_COLOR = '#542E6B'
export const SELECT_COLOR = `rgba(${rgba(themeLT.activeColor).map((p,i) => i === 3 ? '0.5' : p).join()})`

export const CharacterPage = styled.View`
  flex: 1;
  background-color: #222431;
  padding: 8px;
  overflow: auto;
`

export const SheetTitle = styled.Text`
  width: fit-content;
  border-radius: 2px;
  padding: 2px 4px;
  margin-top: 8px;
  font-family: yumichael;
  font-size: 1em;

  color: ${props => props.theme.headerCellTextColor};
  background-color: #7C44A0;
`

export const SheetRow = styled.View`
  flex-direction: row;
  margin: 12px 16px 0px 0px;
  border-bottom-color: ${props => props.theme.headerCellIconColor};
  border-bottom-width: 1px;
  min-height: 16px;
`

export const StatusRow = styled.View`
  flex-direction: row;
  margin: 12px 16px 0px 0px;
  border-bottom-color: ${props => props.theme.headerCellIconColor};
  border-bottom-width: 1px;
  min-height: 16px;

  align-items: flex-end;
`

export const StatusName = styled.Text`
  padding: 2px 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  color: ${props => props.theme.headerCellTextColor};
  background-color: ${props => props.theme.headerCellIconColor};
  
  font-family: yumichael;

  pointer-events: none;
  user-select: none;
`

export const StatusValue = styled.Text`
  flex: 1;
  text-align: right;
  color: ${props => props.theme.headerCellTextColor};
  font-family: yumichael;

  align-self: baseline;
`

export const StatusValueFlexless = styled.Text`
  text-align: right;
  color: ${props => props.theme.headerCellTextColor};
  font-family: yumichael;

  align-self: baseline;
`

export const StatusAdd = styled.Text`
  margin-left: 8px;
  text-align: left;
  color: #A9FF32;
  font-family: yumichael;

  align-self: baseline;
`

export const StatusContents = styled.View`
  margin-right: 16px;
  border-width: 1px;
  border-top-style: none;
  // border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  border-color: ${props => props.theme.headerCellIconColor};
  color: ${props => props.theme.headerCellTextColor};
  background-color: transparent;

  font-family: yumichael;

  transition: height 0.25s ease
`

export const ListItem = styled.View`
  flex-direction: row;
  padding: 4px 0;
  align-items: center;
  pointer-events: none;
`

export const ListItemIcon = styled.Image`
  margin-left: 8px;
  width: 24px;
  height: 24px;

  pointer-events: none;
`

export const ListItemName = styled.Text`
  margin-left: 8px;
  color: ${props => props.theme.headerCellTextColor};

  font-family: yumichael;
  pointer-events: none;
`

export const ListItemDesc = styled.Text`
  flex: 1;
  margin-right: 8px;

  color: ${props => props.theme.headerCellTextColor};

  text-align: right;
  font-family: yumichael;
  pointer-events: none;
`

export const ListItemDealing = styled.Text`
  flex: 1;
  margin-right: 8px;

  color: #A9FF32;

  text-align: right;
  font-family: yumichael;
  pointer-events: none;

  align-self: baseline;
`

export const StatusValueDecrease = styled(Ionicons)`
  color: #A777C5; // ${SELECTABLE_COLOR};
`
