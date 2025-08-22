import { createConfig } from '@repo/tsdown-config'

export default createConfig({
  entry: {
    helpers: './src/helpers/index.ts',
    mocks: './src/mocks/index.ts',
  },
})
