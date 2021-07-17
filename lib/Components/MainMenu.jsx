import * as React from 'react'
import { Appbar } from 'react-native-paper'
import tw, { Text } from '@tw'
import i18next from 'i18next'

export const MainMenu = () => {
  return (
    <Appbar dark style={tw`h-9 bg-oxfordblue`}>
      <Appbar.Action
        icon="hamburger"
        onPress={() => console.log('Pressed archive')}
      />
      <Text style={tw`text-base leading-9 text-white`}>{i18next.t('general.appName')}</Text>
    </Appbar>
  )
}
