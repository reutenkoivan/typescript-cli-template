import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/logger.ts'],
  outDir: './dist',
  dts: true,
  exports: true,
})
