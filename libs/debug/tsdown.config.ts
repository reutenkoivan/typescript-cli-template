import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/debug.ts'],
  outDir: './dist',
  dts: true,
  exports: true,
})
