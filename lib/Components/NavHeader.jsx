import React from 'react'
import { StyleSheet } from 'react-native'
import styled from "styled-components/native";
import { Text, Appbar } from 'react-native-paper'
import { textColor } from '../Styles';

const StyledHeader = styled.View`
  height: 48;
  background-color: #36384A;
  flex-direction: row;
  align-items: center;
`

const StyledButton = styled.Button`
  margin-right: 8px;
`

const NavTitle = styled.Text`
  font-size: 16px;
  font-family: yumichael;
  margin-left: ${props => props.hasAction ? 0 : 16}px;
  color: ${props => props.theme.textColor};
`

const NavHeader = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <StyledHeader>
      {previous
        ? <Appbar.BackAction color={textColor} onPress={navigation.goBack} />
        : undefined
      }
      <NavTitle hasAction={previous}>{title}</NavTitle>
    </StyledHeader>
      // style={options.headerStyle}
  );
}

NavHeader.displayName = 'NavHeader'

export default NavHeader