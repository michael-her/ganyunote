import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import i18next from 'i18next'
import { connect } from 'react-redux'

import MainMenu from './MainMenu'
import CharacterList from './CharacterList'
import CharacterView from './character/CharacterView'
import NavHeader from './NavHeader';

const Stack = createStackNavigator()

const headerStyle = {
  height: 32,
  backgroundColor: '#36384A',
}

function UI({selectedChar}) {
  return (
    <NavigationContainer>
              
      <Stack.Navigator initialRouteName={CharacterList.displayName}>
        <Stack.Screen
          name={CharacterList.displayName}
          component={CharacterList}
          options={{
            headerTitle: i18next.t('general.characters'),
            header: NavHeader,
            headerStyle,
          }}
        />
        <Stack.Screen
          name={CharacterView.displayName}
          component={CharacterView}
          options={{
            headerTitle: selectedChar ? i18next.t(`character.${selectedChar}.name`) : "",
            header: NavHeader,
            headerStyle,
          }}
          initialParams={{ name: 'ganyu' }}
        />
      </Stack.Navigator>

      <StatusBar style="auto" />

      <MainMenu />
      
    </NavigationContainer>
  )
}

export default connect(state => ({selectedChar: state.app.selectedChar}))(UI)