import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  entry: ['./src/logger.ts'],
  exports: true,
  outDir: './dist',
})
