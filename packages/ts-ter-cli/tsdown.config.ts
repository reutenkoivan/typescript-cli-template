import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    'ts-ter-init': './src/ts-ter-init.ts',
    'cat-command': './src/cat-command/index.ts',
    'ls-command': './src/ls-command/index.ts',
  },
  outDir: './dist',
  dts: true,
  exports: true,
})
