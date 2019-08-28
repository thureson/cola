import { set, lensPath, mergeDeepRight } from 'ramda'
import { Subject } from 'rxjs'
import { startWith, scan } from 'rxjs/operators'

// refactor
export const createStore = initialState => {
  const stream = new Subject()
  const state$ = stream.pipe(
    startWith(initialState),
    scan(
      (acc, cur) => mergeDeepRight(acc, cur),
      {}
    )
  )
  const lead = (path, value) => {
    const newState = set(
      lensPath(path),
      value,
      {}
    )
    stream.next(newState)
  }
  return { lead, state$ }
}