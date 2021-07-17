import React from 'react'
import { create } from 'tailwind-rn'
import { Text as TextRn, Title as TitleRn } from 'react-native-paper'
import _ from 'lodash'

import styles from '../../styles.json';

const {tailwind, theme, getColor, getBgColor} = create(styles);

const Text = props => {
  const textStyle = {
    // ...styles['text-base'],
    fontSize: 16,
		lineHeight: 24,
    fontFamily: 'yumichael',
    color: 'white',
  }
  let style
  if (Array.isArray(props.style)) {
    style = [textStyle, ...props.style]
  } else if (_.isObject(props.style)) {
    style = _.merge({}, textStyle, props.style)
  }
  return (<TextRn {...{...props, style}}>{props.children}</TextRn>)
}

const Title = props => <TitleRn {...{props}}>{props.children}</TitleRn>

export { getColor, getBgColor, theme, Text, Title }
export default tailwind
