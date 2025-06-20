import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  entry: {
    'cat-command': './src/cat-command/index.ts',
    'simple-cli-init': './src/simple-cli-init.ts',
  },
  exports: true,
  outDir: './dist',
})
