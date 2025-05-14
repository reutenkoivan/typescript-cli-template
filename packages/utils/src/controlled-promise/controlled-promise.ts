export const controlledPromise = () => {
  let resolve: <T>(value?: T) => void
  let reject: <TReason = unknown>(reason?: TReason) => void

  const controlledPromise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  return {
    promise: controlledPromise,
    resolve: resolve,
    reject,
  }
}
