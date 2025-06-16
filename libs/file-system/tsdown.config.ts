import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    getFileStats: './src/getFileStats.ts',
    isFileExists: './src/isFileExists.ts',
    parseJson: './src/parseJson.ts',
    parsePackageJson: './src/parsePackageJson.ts',
    readFile: './src/readFile.ts',
  },
  outDir: './dist',
  dts: true,
  exports: true,
})
