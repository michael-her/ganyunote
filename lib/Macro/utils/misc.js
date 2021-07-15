import { MacroError } from 'babel-plugin-macros'
import get from 'lodash.get'

const throwIf = (expression, callBack) => {
  if (!expression) return
  throw new MacroError(callBack())
}

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

const addPxTo0 = string => (Number(string) === 0 ? `${string}px` : string)

function transformThemeValue(themeSection) {
  if (['fontSize', 'outline'].includes(themeSection)) {
    return value => (Array.isArray(value) ? value[0] : value)
  }

  if (
    [
      'fontFamily',
      'boxShadow',
      'transitionProperty',
      'transitionDuration',
      'transitionDelay',
      'transitionTimingFunction',
      'backgroundImage',
      'backgroundSize',
      'backgroundColor',
      'cursor',
      'animation',
    ].includes(themeSection)
  ) {
    return value => (Array.isArray(value) ? value.join(', ') : value)
  }

  if (themeSection === 'colors') {
    return value => (typeof value === 'function' ? value({}) : value)
  }

  return value => value
}

const getTheme = configTheme => grab => {
  if (!grab) return configTheme
  // Allow theme`` which gets supplied as an array
  const value = Array.isArray(grab) ? grab[0] : grab
  // Get the theme key so we can apply certain rules in transformThemeValue
  const themeKey = value.split('.')[0]
  // Get the resulting value from the config
  const themeValue = get(configTheme, value)
  // Treat values differently depending on the key name
  return transformThemeValue(themeKey)(themeValue)
}

const stripNegative = string =>
  string && string.length > 1 && string.slice(0, 1) === '-'
    ? string.slice(1, string.length)
    : string

const camelize = string =>
  string && string.replace(/\W+(.)/g, (_, chr) => chr.toUpperCase())

const isNumeric = str => {
  /* eslint-disable-next-line eqeqeq */
  if (typeof str != 'string') return false
  return !Number.isNaN(str) && !Number.isNaN(Number.parseFloat(str))
}

const isClass = str => new RegExp(/(\s*\.|{{)\w/).test(str)

const isMediaQuery = str => str.startsWith('@media')

const isShortCss = className => new RegExp(/[^-]\[/).test(className)

const isArbitraryCss = className => new RegExp(/-\[/).test(className)

// Split a string at a value
function splitOnFirst(str, sep) {
  const index = str.indexOf(sep)
  return index < 0
    ? [str]
    : [str.slice(0, index), str.slice(Number(index) + Number(sep.length))]
}

export {
  throwIf,
  isEmpty,
  addPxTo0,
  getTheme,
  stripNegative,
  get,
  camelize,
  isNumeric,
  isClass,
  isMediaQuery,
  isShortCss,
  isArbitraryCss,
  splitOnFirst,
}
