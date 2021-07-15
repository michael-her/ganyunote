// Defaults for different css-in-js libraries
const configDefaultsStyledComponents = { autoCssProp: true } // Automates the import of styled-components when you use their css prop
const configDefaultsGoober = { sassyPseudo: true } // Sets selectors like hover to &:hover
const configDefaultsStitches = {
  sassyPseudo: true, // Sets selectors like hover to &:hover
  convertStyledDot: true, // Convert styled.[element] to a default syntax
  moveTwPropToStyled: true, // Move the tw prop to a styled definition
  convertHtmlElementToStyled: true, // For packages like stitches, add a styled definition on css prop elements
}

const configDefaultsTwin = ({
  isStyledComponents,
  isGoober,
  isStitches,
  isDev,
}) => ({
  allowStyleProp: false, // Allows styles within style="blah" without throwing an error
  autoCssProp: false, // Automates the import of styled-components when you use their css prop
  dataTwProp: isDev, // During development, add a data-tw="" prop containing your tailwind classes for backtracing
  disableColorVariables: false, // Disable css variables in colors (except gradients) to support older browsers/react native
  hasSuggestions: true, // Switch suggestions on/off when you use a tailwind class that's not found
  sassyPseudo: false, // Sets selectors like hover to &:hover
  debug: false, // Show the output of the classes twin converts
  includeClassNames: false, // Look in the className props for tailwind classes to convert
  dataCsProp: isDev, // During development, add a data-cs="" prop containing your short css classes for backtracing
  disableCsProp: false, // Disable converting css styles in the cs prop
  disableShortCss: false, // Disable converting css written using short css
  stitchesConfig: undefined, // Set the path to the stitches config (stitches only)
  config: undefined, // Set the path to the tailwind config
  convertStyledDot: false, // Convert styled.[element] to a default syntax (only used for stitches so far)
  moveTwPropToStyled: false, // Move the tw prop to a styled definition (only used for stitches so far)
  convertHtmlElementToStyled: false, // For packages like stitches, add a styled definition on css prop elements
  ...(isStyledComponents && configDefaultsStyledComponents),
  ...(isGoober && configDefaultsGoober),
  ...(isStitches && configDefaultsStitches),
})

const isBoolean = value => typeof value === 'boolean'

const allowedPresets = ['styled-components', 'emotion', 'goober', 'stitches']

const configTwinValidators = {
  preset: [
    value => value === undefined || allowedPresets.includes(value),
    `The config “preset” can only be:\n${allowedPresets
      .map(p => `'${p}'`)
      .join(', ')}`,
  ],
  allowStyleProp: [
    isBoolean,
    'The config “allowStyleProp” can only be true or false',
  ],
  autoCssProp: [
    isBoolean,
    'The config “autoCssProp” can only be true or false',
  ],
  disableColorVariables: [
    isBoolean,
    'The config “disableColorVariables” can only be true or false',
  ],
  hasSuggestions: [
    isBoolean,
    'The config “hasSuggestions” can only be true or false',
  ],
  sassyPseudo: [
    isBoolean,
    'The config “sassyPseudo” can only be true or false',
  ],
  dataTwProp: [
    value => isBoolean(value) || value === 'all',
    'The config “dataTwProp” can only be true, false or "all"',
  ],
  dataCsProp: [
    value => isBoolean(value) || value === 'all',
    'The config “dataCsProp” can only be true, false or "all"',
  ],
  debugProp: [
    value => value === undefined,
    `The “debugProp” option was renamed to “dataTwProp”, please rename it in your twin config`,
  ],
  includeClassNames: [
    isBoolean,
    'The config “includeClassNames” can only be true or false',
  ],
  disableCsProp: [
    isBoolean,
    'The config “disableCsProp” can only be true or false',
  ],
  convertStyledDot: [
    isBoolean,
    'The config “convertStyledDot” can only be true or false',
  ],
  moveTwPropToStyled: [
    isBoolean,
    'The config “moveTwPropToStyled” can only be true or false',
  ],
  convertHtmlElementToStyled: [
    isBoolean,
    'The config “convertHtmlElementToStyled” can only be true or false',
  ],
}

export { configDefaultsTwin, configTwinValidators }
