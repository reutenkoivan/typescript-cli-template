import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  entry: {
    'cat-command': './src/cat-command/index.ts',
    'ts-ter-init': './src/ts-ter-init.ts',
  },
  exports: true,
  outDir: './dist',
})
