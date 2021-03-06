import React from 'react'
import { View } from 'react-native'
import { Appbar } from 'react-native-paper'
import tw, { Text } from '@tw'

export const NavHeader = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <View style={tw`flex flex-row items-center h-9 bg-oxfordblue`}>
      {previous
        ? <Appbar.BackAction style={tw`m-0 ml-2`} color={'white'} onPress={navigation.goBack} />
        : undefined
      }
      <Text style={tw`ml-${previous ? 0 : 4} text-white text-base leading-9`}>{title}</Text>
    </View>
  );
}