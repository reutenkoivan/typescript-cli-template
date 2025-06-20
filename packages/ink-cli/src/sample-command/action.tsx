import { Box, render, Text, useApp } from 'ink'
import BigText from 'ink-big-text'
import Gradient from 'ink-gradient'
import Spinner from 'ink-spinner'
import { type FC, useEffect, useState } from 'react'

const Counter: FC = () => {
  const [counter, setCounter] = useState(0)
  const { exit } = useApp()

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((previousCounter) => {
        if (previousCounter >= 5) {
          exit()
        }

        return previousCounter + 1
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [exit])

  return (
    <Box margin={2} flexDirection='column'>
      <Gradient name='rainbow'>
        <BigText text='ink-cli' />
      </Gradient>
      <Box alignItems='center' height={3}>
        <Spinner type='dots' />
        <Text color='green'>{counter} tests passed</Text>
      </Box>
    </Box>
  )
}

export const sampleCommandAction = () => {
  const { waitUntilExit } = render(<Counter />)

  return waitUntilExit()
}
