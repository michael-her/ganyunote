import _ from 'lodash'
import i18next from 'i18next'
import { createSelector } from 'reselect'
import { SPEC_TEMPLATE, skillLvSheet } from '../Data'

export const talentSelecter = (char, {talents, talentModes, path, displayPrefix}) => {
  talents = talents || char.talents
  return _.isObject(talents)
  ? Object.keys(talents)
    .reduce((ret, p, index, array) => {
      const itemPath = `${path}.${p}`
      const parent = _.last(path.split('.'))
      const skill = skillLvSheet[char.name][p]
      let talent
      // talent from skills
      if (skill && _.some(talentModes, mode => !_.isUndefined(skill[mode]))) {
        talent = _.cloneDeep(skill)
        if (!_.isUndefined(talents[p].toggle)) {
          talent.toggle = talents[p].toggle
        }
        if (!_.isUndefined(talents[p].stacks)) {
          talent.stacks = talents[p].stacks
        }
      } else {
        talent = talents[p]
      }
      // talent from constellation
      if (parent.match(/C\d/)) {
        const requireConstellation = parseInt(_.last(parent), 10)
        if (char.setting.constellation < requireConstellation) {
          return ret
        }        
      }
      // console.log('[selectToggleTalent]', {p, talent, talentModes, path, talents})
      return [
        ...ret,
        ...(_.every(talentModes, mode => _.isUndefined(talent[mode]))
          ? _.isNumber(talent) && !_.isUndefined(SPEC_TEMPLATE[p])
            ? [{
              name: p,
              passive: true,
              amount: talent,
              original: itemPath,
              displayName: {
                weapon: (i18next.exists(`weapon.talents.${p}`) && i18next.t(`weapon.talents.${p}`)) || i18next.t(`weapon.${char.setting.weapon}`),
                artifact: (i18next.exists(`artifact.talents.${p}`) && i18next.t(`artifact.talents.${p}`)) || i18next.t(`artifact.${char.setting.artifact}`),
                artifactSub: (i18next.exists(`artifact.talents.${p}`) && i18next.t(`artifact.talents.${p}`)) || i18next.t(`artifact.${char.setting.artifactSub}`),
              }[parent] || (
                i18next.exists(displayPrefix + parent) &&
                i18next.t(displayPrefix + parent)
              ),
              explains: {
                weapon: '', // i18next.t(`weapon.talents.${p}_Explained`, { returnObjects: true }),
                artifact: '', // i18next.t(`artifact.talents.${p}_Explained`, { returnObjects: true }),
                artifactSub: '', // i18next.t(`artifact.talents.${p}_Explained`, { returnObjects: true }),
              }[parent] || (
                i18next.exists(displayPrefix + parent + "_Explained", { returnObjects: true }) &&
                i18next.t(displayPrefix + parent + "_Explained", { returnObjects: true })
              ),
            }]
            : talentSelecter(char, {talents: talent, talentModes, path: itemPath, displayPrefix})
          : [{
              name: p,
              original: itemPath,
              displayName: {
                weapon: (i18next.exists(`weapon.talents.${p}`) && i18next.t(`weapon.talents.${p}`)) || i18next.t(`weapon.${char.setting.weapon}`),
                artifact: (i18next.exists(`artifact.talents.${p}`) && i18next.t(`artifact.talents.${p}`)) || i18next.t(`artifact.${char.setting.artifact}`),
                artifactSub: (i18next.exists(`artifact.talents.${p}`) && i18next.t(`artifact.talents.${p}`)) || i18next.t(`artifact.${char.setting.artifactSub}`),
              }[parent] || (
                i18next.exists(displayPrefix + parent) &&
                i18next.t(displayPrefix + parent)
              ),
              explains: {
                weapon: '', // i18next.t(`weapon.talents.${p}_Explained`, { returnObjects: true }),
                artifact: '', // i18next.t(`artifact.talents.${p}_Explained`, { returnObjects: true }),
                artifactSub: '', // i18next.t(`artifact.talents.${p}_Explained`, { returnObjects: true }),
              }[parent] || (
                i18next.exists(displayPrefix + parent + "_Explained", { returnObjects: true }) &&
                i18next.t(displayPrefix + parent + "_Explained", { returnObjects: true })
              ),
              ...talent
            }]
        )
      ]
    }, [])
  : []
}
  
export const reselectTalent = createSelector(
  [talentSelecter],
  talents => talents
)

const mainTalentSelector = (talents, {parent}) =>
Object.keys(talents)
.filter(p => _.isUndefined(talents[p].toggle) && _.isUndefined(talents[p].stacks) && _.isUndefined(talents[p].passive))
.filter(p => p !== 'elementalDash')
.reduce((ret, p) => [
  ...ret,
  ...(Object.keys(talents[p]).length === 0
    ? [{parent, name: p}]
    : mainTalentSelector(talents[p], {parent: p}))
], [])

export const reselectMainTalent = createSelector(
  [mainTalentSelector],
  talents => talents
)
