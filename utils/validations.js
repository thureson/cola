import {
  not,
  hasPath,
  propSatisfies,
  is,
  compose
} from 'ramda'
import { element } from './generics'

export const errorMsg = msg =>
  () => element('div', null, msg)

export const propIsNotType = (type, prop) => compose(
  not,
  propSatisfies(is(type), prop)
)

export const missesProperty = path => compose(
  not,
  hasPath(path)
)