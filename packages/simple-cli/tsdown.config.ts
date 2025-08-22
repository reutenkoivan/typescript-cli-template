import { createConfig } from '@repo/tsdown-config'

export default createConfig({
  entry: {
    'cat-command': './src/cat-command/index.ts',
    'simple-cli-init': './src/simple-cli-init.ts',
  },
})
