import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, Avatar } from 'react-native-paper'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import i18next from 'i18next'

import CharacterView from './character/CharacterView'
import characterSheet from '../Data/characterSheet'
import { selectChar } from '../Models/actions'

const List = styled.View`
  flex: 1;
  padding: 0px 16px 8px 8px;
  background-color: #222431;
  overflow: auto;
`

const styles = StyleSheet.create({
  card: {
    marginTop: 8,
    // backgroundColor: '#36384A',
  },
  potrait: {
  }
});

// eslint-disable-next-line react/display-name
const potrait = source => props =>
  <Avatar.Image style={styles.potrait} size={48} source={source} />

const CharacterList = ({navigation, oldSelectedChar, onSelectChar}) => {
  return (
    <List>
      {Object.values(characterSheet).map(char => (
        <Card
          key={char.name}
          style={styles.card}
          onPress={() => {
            onSelectChar(char.name)
            navigation.navigate(CharacterView.displayName, {selectedChar: char.name})
          }}
        >
          <Card.Title
            title={i18next.t(`character.${char.name}.name`)}
            subtitle={i18next.t(`character.${char.name}.title`)}
            left={potrait(char.portrait)}
          />
        </Card>
      ))}
    </List>
  )
}
CharacterList.displayName = 'CharacterList'

const mapStateToProps = (state, props) => ({oldSelectedChar: state.app.selectedChar})

export default connect(
  mapStateToProps,
  {
    onSelectChar: selectChar
  },
)(CharacterList)