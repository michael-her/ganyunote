import React from 'react'
import { View } from 'react-native'
import { Card, Avatar } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import i18next from 'i18next'
import tw from '@tw'

import { characterSheet } from '../Data'
import { selectChar } from '../Models/actions'

export const CharacterList = (({navigation}) => {
  const dispatch = useDispatch()
  const onSelectChar = (...props) => dispatch(selectChar(...props))
  return (
    <View style={tw`flex-1 pb-2 pl-2 pr-4 overflow-scroll bg-mirage`}>
      {Object.values(characterSheet).map(char => (
        <Card
          key={char.name}
          style={tw`mt-2 bg-oxfordblue`}
          onPress={() => {
            onSelectChar(char.name)
            navigation.navigate('selectedChar', {selectedChar: char.name})
          }}
        >
          <Card.Title
            title={i18next.t(`character.${char.name}.name`)}
            subtitle={i18next.t(`character.${char.name}.title`)}
            left={() => <Avatar.Image size={48} source={char.portrait} />}
          />
        </Card>
      ))}
    </View>
  )
})