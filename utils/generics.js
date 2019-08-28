import React from 'react'
import {
  curry,
  cond,
  T
} from 'ramda'
import { defaultRender } from './rendering'
import {
  missesProperty,
  propIsNotType,
  errorMsg,
} from './validations'

export const element = curry(React.createElement)

export const buildDOM = lead => cond([
  [missesProperty(['data']), errorMsg('state should have a property "data"')],
  [missesProperty(['app']), errorMsg('state should have a property "app"')],
  [missesProperty(['app', 'element']), errorMsg('"app" should have a property "element"')],
  [missesProperty(['app', 'props']), errorMsg('"app" should have a property "props"')],
  [missesProperty(['app', 'children']), errorMsg('"app" should have a property "children"')],
  [propIsNotType(Object, 'app'), errorMsg('property "app" should be type Object')],
  [propIsNotType(Object, 'data'), errorMsg('property "data" should be type Object')],
  [T, state => defaultRender(lead, state)(state)]
])