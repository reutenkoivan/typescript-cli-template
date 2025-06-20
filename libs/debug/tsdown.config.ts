import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  entry: ['./src/debug.ts'],
  exports: true,
  outDir: './dist',
})
