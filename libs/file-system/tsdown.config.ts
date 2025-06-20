import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  entry: {
    getFileStats: './src/getFileStats.ts',
    isFileExists: './src/isFileExists.ts',
    parseJson: './src/parseJson.ts',
    parsePackageJson: './src/parsePackageJson.ts',
    readFile: './src/readFile.ts',
  },
  exports: true,
  outDir: './dist',
})
