import * as React from 'react'
import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Appbar, Searchbar, useTheme } from 'react-native-paper'
import tw, { Text } from '@tw'

const SearchWrapper = styled.View`
  margin-left: ${props => props.theme.appbar.margin};
  width: 200px;
  height: 20px;

  .searchbar: {
    font-size: ${props => props.theme.primaryBtnFontSizeSmall};
  }
`

const MainMenu = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
  return (
    <Appbar dark style={tw`h-9 bg-oxfordblue`}>
      <Appbar.Action
        icon="hamburger"
        onPress={() => console.log('Pressed archive')}
      />
      <Text style={tw`text-base leading-9 text-white`}>감우노트</Text>
      {/* <SearchWrapper>
        <Searchbar
          className="searchbar"
          placeholder="검색"
          onChangeText={query => setSearchQuery(query)}
          value={searchQuery}
        />
      </SearchWrapper> */}
    </Appbar>
  )
}

export default MainMenu
