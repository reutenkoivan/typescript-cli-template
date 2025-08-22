import { createConfig } from '@repo/tsdown-config'

export default createConfig({
  entry: {
    getFileStats: './src/getFileStats.ts',
    isFileExists: './src/isFileExists.ts',
    parseJson: './src/parseJson.ts',
    parsePackageJson: './src/parsePackageJson.ts',
    readFile: './src/readFile.ts',
  },
})
