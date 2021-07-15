import { configureFonts, DefaultTheme} from 'react-native-paper';
import {textColor, primaryBtnBgd, panelBackground} from './base'

const fontConfig = {
  regular: {
    fontFamily: 'yumichael',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'yumichael',
    fontWeight: 'normal',
  },
  light: {
    fontFamily: 'yumichael',
    fontWeight: 'normal',
  },
  thin: {
    fontFamily: 'yumichael',
    fontWeight: 'normal',
  },
}

export const paper = {
  ...DefaultTheme,
  dark: true,
  mode: 'adaptive',
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryBtnBgd,
    text: textColor,
    accent: "#03dac4",
    backdrop: "rgba(0, 0, 0, 0.5)",
    background: '#222431',
    disabled: "rgba(0, 0, 0, 0.26)",
    error: "#B00020",
    notification: "#f50057",
    onSurface: "#000000",
    placeholder: "rgba(0, 0, 0, 0.54)",
    primary: '#36384A',
    surface: '#36384A',
  },
  // fonts: fontConfig,
  fonts: configureFonts({
    default: fontConfig,
    android: fontConfig,
    ios: fontConfig,
    web: fontConfig,
  }),
}
