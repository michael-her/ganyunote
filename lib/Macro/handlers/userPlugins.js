import { isEmpty, isMediaQuery, isClass } from './../utils'
import { splitPrefix } from './../prefix'

// If these tasks return true then the rule is matched
const mergeChecks = [
  // Match exact selector
  ({ key, className, prefix }) => key === `${prefix}${className}`,
  // Match class selector (inc dot)
  ({ key, className, prefix }) =>
    !key.includes('{{') &&
    key.match(
      new RegExp(
        `(?:^|>|~|\\+|\\*| )\\.${prefix}${className}(?: |>|~|\\+|\\*|:|$)`,
        'g'
      )
    ),
  // Match parent selector placeholder
  ({ key, className, prefix }) => key.includes(`{{${prefix}${className}}}`),
  // Match possible symbols after the selector (ex dot)
  ({ key, className, prefix }) =>
    [' ', ':', '>', '~', '+', '*'].some(suffix =>
      key.startsWith(`${prefix}${className}${suffix}`)
    ),
]

const getMatches = ({ className, data, sassyPseudo, state }) =>
  Object.entries(data).reduce((result, item) => {
    const [rawKey, value] = item

    // Remove the prefix before attempting match
    let { className: key } = splitPrefix({ className: rawKey, state })

    key = key.replace(/\\/g, '')

    const childValue = Object.values(value)[0]
    const hasChildNesting =
      !Array.isArray(childValue) && typeof childValue === 'object'
    if (hasChildNesting) {
      const matches = getMatches({ className, data: value, sassyPseudo, state })
      if (!isEmpty(matches)) return { ...result, [key]: matches }
    }

    const { prefix } = state.config
    const shouldMergeValue = mergeChecks.some(item =>
      item({ key, value, className, data, prefix })
    )

    if (shouldMergeValue) {
      const newKey = formatKey(key, { className, sassyPseudo, prefix })
      return newKey ? { ...result, [newKey]: value } : { ...result, ...value }
    }

    return result
  }, {})

// The key gets formatted with these checks
const formatTasks = [
  ({ key }) => key.replace(/\\/g, '').trim(),
  // Match exact selector
  ({ key, className, prefix }) => (key === `.${prefix}${className}` ? '' : key),
  // Replace the parent selector placeholder
  ({ key, className, prefix }) => {
    const parentSelectorIndex = key.indexOf(`{{${prefix}${className}}}`)
    const replacement = parentSelectorIndex > 0 ? '&' : ''
    return key.replace(`{{${prefix}${className}}}`, replacement)
  },
  // Strip prefix
  ({ key, prefix }) =>
    !prefix ? key : key.replace(new RegExp(`{{${prefix}`, 'g'), `{{`),
  // Replace the classname at start of selector (eg: &:hover) (postCSS supplies
  // flattened selectors so it looks like .blah:hover at this point)
  ({ key, className, prefix }) =>
    key.startsWith(`.${prefix}${className}`)
      ? key.slice(`.${prefix}${className}`.length)
      : key,
  ({ key }) => key.trim(),
  // Add the parent selector at the start when it has the sassy pseudo enabled
  ({ key, sassyPseudo }) =>
    sassyPseudo && key.startsWith(':') ? `&${key}` : key,
  // Remove the unmatched class wrapping
  ({ key }) => key.replace(/{{/g, '.').replace(/}}/g, ''),
]

const formatKey = (selector, { className, sassyPseudo, prefix }) => {
  if (selector === className) return

  let key = selector
  for (const task of formatTasks) {
    key = task({ key, className, sassyPseudo, prefix })
  }

  return key
}

/**
 * Split grouped selectors (`.class1, class2 {}`) and filter non-selectors
 * @param {object} data Input object from userPluginData
 * @returns {object} An object containing unpacked selectors
 */
const normalizeUserPluginSelectors = data =>
  Object.entries(data).reduce((result, [selector, value]) => {
    const keys = selector
      .split(',')
      .filter(s =>
        isMediaQuery(s)
          ? Object.keys(value).some(selector => isClass(selector))
          : isClass(s)
      )
      .reduce((result, property) => ({ ...result, [property]: value }), {})
    return { ...result, ...keys }
  }, {})

export default ({
  state: {
    configTwin: { sassyPseudo },
    userPluginData: { base, components, utilities },
  },
  state,
  className,
}) => {
  let result
  ;[base, components, utilities].find(rawData => {
    const data = normalizeUserPluginSelectors(rawData)
    const matches = getMatches({ className, data, sassyPseudo, state })

    const hasMatches = !isEmpty(matches)
    result = hasMatches ? matches : result
    return hasMatches
  })
  return result
}
