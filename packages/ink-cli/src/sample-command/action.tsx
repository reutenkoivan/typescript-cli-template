import { render, Text } from 'ink'
import { type FC, useEffect, useState } from 'react'

type CounterProps = {
  signalResolver: () => void
}

const Counter: FC<CounterProps> = ({ signalResolver }) => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((previousCounter) => {
        if (previousCounter >= 5) {
          clearInterval(timer)
          signalResolver()
          return previousCounter
        }

        return previousCounter + 1
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [signalResolver])

  return <Text color='green'>{counter} tests passed</Text>
}

const createControlledPromise = () => {
  let resolve: () => void = () => {}
  let reject: () => void = () => {}

  const promise = new Promise((res, rej) => {
    resolve = res as () => void
    reject = rej
  })

  return { promise, reject, resolve }
}

export const sampleCommandAction = () => {
  const { promise, resolve } = createControlledPromise()

  render(<Counter signalResolver={resolve} />)

  return promise
}
