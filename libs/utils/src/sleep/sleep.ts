import { controlledPromise } from '../controlled-promise'

export const sleep = (ms: number) => {
  const { promise, resolve } = controlledPromise()

  setTimeout(() => {
    resolve(true)
  }, ms)

  return promise
}
