import {
  prop,
  lensPath,
  map,
  view,
  last,
  mergeAll,
  merge,
  objOf,
  compose
} from 'ramda'
import { element } from './generics'

const makeProp = (path, state) => objOf(
  last(path),
  view(lensPath(path), state)
)

const mapProps = (lead, state) => compose(
  merge({ lead: lead }),
  mergeAll,
  map(__ => makeProp(__, state)),
  prop('props')
)

const mapChildren = (lead, state, node) => map(
  generateNode(lead, state),
  prop('children', node)
)

const generateNode = (lead, state) => node => element(
  prop('element', node),
  mapProps(lead, state)(node),
  ...mapChildren(lead, state, node),
  null
)

export const defaultRender = (lead, state) => compose(
  generateNode(lead, state),
  prop('app')
)