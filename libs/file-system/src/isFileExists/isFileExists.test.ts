import fs from 'node:fs'
import path from 'node:path'
import { FsMocker } from '@repo/test-unit/helpers'
import { vi } from 'vitest'
import { isFileExists } from './isFileExists.js'

// Mock the fs module
vi.mock('node:fs')

describe('isFileExists', () => {
  beforeEach(() => {
    FsMocker.clearAllMocks()
  })

  it('should return success for existing file with relative path', () => {
    FsMocker.mockFileStats({ isFile: true })

    const result = isFileExists('test-file.txt')

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toBe(path.resolve(process.cwd(), 'test-file.txt'))
    }
    expect(fs.statSync).toHaveBeenCalledWith(path.resolve(process.cwd(), 'test-file.txt'))
  })

  it('should return success for existing file with absolute path', () => {
    FsMocker.mockFileStats({ isFile: true })
    const absolutePath = '/absolute/path/to/file.txt'

    const result = isFileExists(absolutePath)

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toBe(absolutePath)
    }
    expect(fs.statSync).toHaveBeenCalledWith(absolutePath)
  })

  it('should return error for non-existent file', () => {
    FsMocker.mockStatSyncError('ENOENT: no such file or directory')

    const result = isFileExists('non-existent-file.txt')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toBe('Failed to get file stats')
    }
  })

  it('should return error for directory path', () => {
    FsMocker.mockFileStats({ isDirectory: true, isFile: false })

    const result = isFileExists('/path/to/directory')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toContain('File does not exist or is not a file')
    }
  })

  it('should work with custom cwd option', () => {
    FsMocker.mockFileStats({ isFile: true })
    const customCwd = '/custom/working/directory'
    const expectedPath = path.resolve(customCwd, 'test-file.txt')

    const result = isFileExists('test-file.txt', { cwd: customCwd })

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toBe(expectedPath)
    }
    expect(fs.statSync).toHaveBeenCalledWith(expectedPath)
  })

  it('should handle file system errors gracefully', () => {
    FsMocker.mockStatSyncError('EACCES: permission denied')

    const result = isFileExists('restricted-file.txt')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toBe('Failed to get file stats')
    }
  })

  it('should handle absolute path detection correctly', () => {
    FsMocker.mockFileStats({ isFile: true })

    // Test with Unix-style absolute path (works on all platforms)
    const absolutePath = '/usr/local/bin/file.txt'
    const result = isFileExists(absolutePath)

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toBe(absolutePath)
    }
    expect(fs.statSync).toHaveBeenCalledWith(absolutePath)
  })
})
