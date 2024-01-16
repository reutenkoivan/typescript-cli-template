import fs from 'fs/promises'
import { glob, GlobOptionsWithFileTypesUnset } from 'glob'

export class FsService {
  findFile(pattern: string, options?: GlobOptionsWithFileTypesUnset) {
    return glob(pattern, { ignore: ['**/node_modules/**'], ...options, nodir: true })
  }

  async findDirectory(pattern: string, options?: GlobOptionsWithFileTypesUnset) {
    const matches = await glob(pattern, { ignore: ['**/node_modules/**'], ...options })
    const stats = await Promise.all(matches.map((match) => fs.stat(match)))

    return matches.filter((_, index) => stats[index].isDirectory())
  }
}

export const fsService = new FsService()
