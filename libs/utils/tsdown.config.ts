import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    actionContext: './src/actionContext/index.ts',
    debug: './src/debug/index.ts',
    logger: './src/logger/index.ts',
    'parse-package-json': './src/parse-package-json/index.ts',
    sleep: './src/sleep/index.ts',
    'controlled-promise': './src/controlled-promise.ts',
  },
  outDir: './dist',
  dts: true,
  exports: true,
})
