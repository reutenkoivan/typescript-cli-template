import fs from 'node:fs'
import { z } from 'zod'

export const basePackageJsonSchema = z.object({
  name: z.string().min(1, 'Package name is required'),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Version must be in the format x.y.z'),
  description: z.string(),
})

type BasePackageJsonType = z.infer<typeof basePackageJsonSchema>

export const parsePackageJson = <T extends BasePackageJsonType>(
  packageJsonPath: string,
  schema = basePackageJsonSchema as z.ZodType<T>,
) => {
  try {
    const parsedJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    const result = schema.safeParse(parsedJson)

    if (!result.success) {
      throw new Error(`Validation failed: ${result.error.errors.map((e) => e.message).join(', ')}`)
    }

    return result.data
  } catch (error) {
    throw new Error(`Failed to parse package.json: ${error instanceof Error ? error.message : String(error)}`)
  }
}
