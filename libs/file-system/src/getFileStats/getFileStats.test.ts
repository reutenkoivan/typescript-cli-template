import fs from 'node:fs'
import { FsMocker } from '@repo/test-unit/helpers'
import { vi } from 'vitest'
import { getFileStats } from './getFileStats.js'

// Mock the fs module
vi.mock('node:fs')

describe('getFileStats', () => {
  beforeEach(() => {
    FsMocker.clearAllMocks()
  })

  it('should return file stats for existing file', () => {
    FsMocker.mockFileStats({ isFile: true, size: 1024 })

    const result = getFileStats('/path/to/file.txt')

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value.isFile()).toBe(true)
      expect(result.value.size).toBe(1024)
    }
    expect(fs.statSync).toHaveBeenCalledWith('/path/to/file.txt')
  })

  it('should return file stats for directory', () => {
    FsMocker.mockFileStats({ isDirectory: true, isFile: false, size: 0 })

    const result = getFileStats('/path/to/directory')

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value.isDirectory()).toBe(true)
      expect(result.value.isFile()).toBe(false)
    }
    expect(fs.statSync).toHaveBeenCalledWith('/path/to/directory')
  })

  it('should return error for non-existent file', () => {
    FsMocker.mockStatSyncError('ENOENT: no such file or directory')

    const result = getFileStats('/path/to/nonexistent.txt')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toBe('Failed to get file stats')
    }
    expect(fs.statSync).toHaveBeenCalledWith('/path/to/nonexistent.txt')
  })

  it('should return error for permission denied', () => {
    FsMocker.mockStatSyncError('EACCES: permission denied')

    const result = getFileStats('/restricted/file.txt')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toBe('Failed to get file stats')
    }
    expect(fs.statSync).toHaveBeenCalledWith('/restricted/file.txt')
  })

  it('should handle any fs.statSync error', () => {
    FsMocker.mockStatSyncError('Some unexpected error')

    const result = getFileStats('/some/path')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toBe('Failed to get file stats')
    }
  })
})
