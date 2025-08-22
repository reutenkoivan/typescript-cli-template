import fs from 'node:fs'
import { FsMocker } from '@repo/test-unit/helpers'
import { FileContentMock } from '@repo/test-unit/mocks'
import { vi } from 'vitest'
import { z } from 'zod'
import { basePackageJsonSchema, parsePackageJson } from './parsePackageJson.js'

// Mock the fs module
vi.mock('node:fs')

describe('parsePackageJson', () => {
  beforeEach(() => {
    FsMocker.clearAllMocks()
  })

  it('should parse valid package.json with base schema', () => {
    const validPackageJson = FileContentMock.createValidPackageJson()
    FsMocker.mockJsonFile(validPackageJson)

    const result = parsePackageJson('/path/to/package.json')

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toEqual(validPackageJson)
    }
    expect(fs.statSync).toHaveBeenCalledWith('/path/to/package.json')
    expect(fs.readFileSync).toHaveBeenCalledWith('/path/to/package.json', 'utf-8')
  })

  it('should parse package.json with custom schema', () => {
    const customSchema = basePackageJsonSchema.extend({
      author: z.string(),
      dependencies: z.record(z.string()).optional(),
    })

    const packageJsonWithAuthor = FileContentMock.createValidPackageJson({
      author: 'Test Author',
      dependencies: {
        'some-dep': '^1.0.0',
      },
      version: '2.1.0',
    })

    FsMocker.mockJsonFile(packageJsonWithAuthor)

    const result = parsePackageJson('/path/to/package.json', customSchema)

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toEqual(packageJsonWithAuthor)
      expect(result.value.author).toBe('Test Author')
    }
  })

  it('should return error for non-existent file', () => {
    FsMocker.mockNonExistentFile()

    const result = parsePackageJson('/path/to/nonexistent.json')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error).toContain('File does not exist or is not a file')
    }
  })

  it('should return error for empty file', () => {
    FsMocker.mockEmptyFile()

    const result = parsePackageJson('/path/to/empty.json')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error).toBe('File is empty')
    }
  })

  it('should return error for invalid JSON', () => {
    FsMocker.mockInvalidJsonFile()

    const result = parsePackageJson('/path/to/invalid.json')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error).toContain('Failed to parse JSON')
    }
  })

  it('should return error for missing required fields', () => {
    const invalidPackageJson = {
      description: 'Missing name and version',
    }

    FsMocker.mockJsonFile(invalidPackageJson)

    const result = parsePackageJson('/path/to/invalid.json')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error).toBeInstanceOf(z.ZodError)
    }
  })

  it('should return error for invalid version format', () => {
    const invalidPackageJson = FileContentMock.createValidPackageJson({
      version: 'invalid-version',
    })

    FsMocker.mockJsonFile(invalidPackageJson)

    const result = parsePackageJson('/path/to/invalid.json')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error).toBeInstanceOf(z.ZodError)
    }
  })

  it('should return error for empty package name', () => {
    const invalidPackageJson = FileContentMock.createValidPackageJson({
      name: '',
    })

    FsMocker.mockJsonFile(invalidPackageJson)

    const result = parsePackageJson('/path/to/invalid.json')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error).toBeInstanceOf(z.ZodError)
    }
  })

  it('should handle complex package.json with additional fields', () => {
    const complexPackageJson = FileContentMock.createValidPackageJson({
      keywords: ['test', 'package'],
      license: 'MIT',
      main: 'index.js',
      name: '@scope/test-package',
      scripts: {
        build: 'tsc',
        test: 'vitest',
      },
      version: '1.2.3',
    })

    FsMocker.mockJsonFile(complexPackageJson)

    const result = parsePackageJson('/path/to/complex.json')

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value.name).toBe('@scope/test-package')
      expect(result.value.version).toBe('1.2.3')
      expect(result.value.description).toBe('A test package')
    }
  })

  it('should validate version format strictly', () => {
    const testCases = [
      { valid: true, version: '1.0.0' },
      { valid: true, version: '10.20.30' },
      { valid: true, version: '0.0.1' },
      { valid: false, version: '1.0' },
      { valid: false, version: '1.0.0-alpha' },
      { valid: false, version: '1.0.0+build' },
      { valid: false, version: 'v1.0.0' },
    ]

    for (const testCase of testCases) {
      FsMocker.clearAllMocks()

      const packageJson = FileContentMock.createValidPackageJson({
        version: testCase.version,
      })

      FsMocker.mockJsonFile(packageJson)

      const result = parsePackageJson('/path/to/test.json')

      if (testCase.valid) {
        expect(result.isOk()).toBe(true)
      } else {
        expect(result.isErr()).toBe(true)
      }
    }
  })

  it('should handle file read errors', () => {
    FsMocker.mockReadPermissionDenied()

    const result = parsePackageJson('/restricted/package.json')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error).toContain('Failed to read file')
    }
  })

  it('should handle directory instead of file', () => {
    FsMocker.mockDirectory()

    const result = parsePackageJson('/path/to/directory')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error).toContain('File does not exist or is not a file')
    }
  })
})
