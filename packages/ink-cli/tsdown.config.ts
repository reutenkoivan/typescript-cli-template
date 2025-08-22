import { createConfig } from '@repo/tsdown-config'

export default createConfig({
  entry: {
    'ink-cli': './src/sample-command/action.tsx',
    'ink-cli-init': './src/ink-cli-init.ts',
  },
})
