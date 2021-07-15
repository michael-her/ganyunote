import * as React from 'react'
import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Appbar, Searchbar, useTheme, Text } from 'react-native-paper'

const Header = styled.Text`
  color: ${props => props.theme.textColor};
  font-family: yumichael;
  font-size: 16px;
`

const SearchWrapper = styled.View`
  margin-left: ${props => props.theme.appbar.margin};
  width: 200px;
  height: 20px;

  .searchbar: {
    font-size: ${props => props.theme.primaryBtnFontSizeSmall};
  }
`

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#36384A',
  }
});

const MainMenu = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
  return (
    <Appbar dark style={styles.appbar}>
      <Appbar.Action
        icon="hamburger"
        onPress={() => console.log('Pressed archive')}
      />
      <Header>감우노트</Header>
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
