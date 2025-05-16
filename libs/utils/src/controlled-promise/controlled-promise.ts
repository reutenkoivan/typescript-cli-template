export const controlledPromise = <T, TReason = unknown>() => {
  let resolve: (value: T) => void
  let reject: (reason: TReason) => void

  const controlledPromise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return {
    promise: controlledPromise,
    // @ts-expect-error
    resolve,
    // @ts-expect-error
    reject,
  }
}
