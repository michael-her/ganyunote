import React from 'react'
import i18next from 'i18next'
import { useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { MainMenu } from './MainMenu'
import { CharacterList } from './CharacterList'
import { CharacterView } from './character/CharacterView'
import { NavHeader } from './NavHeader';

const Stack = createStackNavigator()

export const UI = () => {
  const selectedChar = useSelector(state => state.app.selectedChar)
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName={CharacterList.displayName}>
        <Stack.Screen
          name={'characters'}
          component={CharacterList}
          options={{
            headerTitle: i18next.t('general.characters'),
            header: NavHeader,
            title: i18next.t('general.appName') + ' - ' + i18next.t('general.characters')
          }}
        />
        <Stack.Screen
          name={'selectedChar'}
          component={CharacterView}
          options={{
            headerTitle: selectedChar ? i18next.t(`character.${selectedChar}.name`) : "",
            header: NavHeader,
            title: i18next.t('general.appName') + ' - ' + i18next.t(`character.${selectedChar}.name`)
          }}
          initialParams={{ name: 'ganyu' }}
        />
      </Stack.Navigator>

      <StatusBar style="auto" />

      <MainMenu />
      
    </NavigationContainer>
  )
}