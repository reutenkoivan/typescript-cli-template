import { createConfig } from '@repo/tsdown-config'

export default createConfig({
  entry: {
    getFileStats: './src/getFileStats/index.ts',
    isFileExists: './src/isFileExists/index.ts',
    parseJson: './src/parseJson/index.ts',
    parsePackageJson: './src/parsePackageJson/index.ts',
    readFile: './src/readFile/index.ts',
  },
})
