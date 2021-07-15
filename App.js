import React from 'react';
import "./lib/Models/i18n.js";
import { ThemeProvider } from 'styled-components/native';
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { Provider as PaperProvider } from 'react-native-paper'
import i18next from 'i18next'
import translationKr from './lib/Language/ko-KR/translation.json'
import { Provider } from 'react-redux';
import {create} from 'tailwind-rn'
import styles from './styles.json';

import { theme, paper } from './lib/Styles'
import store from './lib/Models/store'
import UI from './lib/Components/UI'

i18next.addResourceBundle('ko-KR', 'translation', translationKr, true, true)

const {tailwind, getColor} = create(styles);
export {tailwind, getColor}

export default function App() {
  const [fontsLoaded] = useFonts({
    'yumichael': require('./assets/fonts/YumichaelMonoB.ttf'),
  })
  // console.log('[App]', {paper})
  return (
    fontsLoaded ? (
      <Provider store={store}>
        <PaperProvider theme={paper}>
          <ThemeProvider theme={theme}>
            <UI />
          </ThemeProvider>
        </PaperProvider>
      </Provider>
    ) : (
      <AppLoading />
    )
  );
}

