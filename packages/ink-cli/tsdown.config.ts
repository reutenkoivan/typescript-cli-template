import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  entry: {
    'ink-cli': './src/sample-command/action.tsx',
    'ink-cli-init': './src/ink-cli-init.ts',
  },
  exports: true,
  outDir: './dist',
})
