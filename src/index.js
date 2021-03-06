import html, { normalizeAttrs } from './jsx'
import { tryFlatten, isPrimitive, isClass, isFunc, isObj, isSvg } from './utils'
import SnabbdomComponent from './component'

export {
  normalizeAttrs,
  tryFlatten,
  isPrimitive,
  isClass,
  isFunc,
  isObj,
  isSvg,
  SnabbdomComponent
}

export default html
