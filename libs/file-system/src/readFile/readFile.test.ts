import fs from 'node:fs'
import { FsMocker } from '@repo/test-unit/helpers'
import { FileContentMock } from '@repo/test-unit/mocks'
import { vi } from 'vitest'
import { readFile } from './readFile.js'

// Mock the fs module
vi.mock('node:fs')

describe('readFile', () => {
  beforeEach(() => {
    FsMocker.clearAllMocks()
  })

  it('should read file content as buffer by default', () => {
    const testContent = 'This is test content for reading files'
    const mockBuffer = FileContentMock.createBuffer(testContent)
    FsMocker.mockReadFileSync(mockBuffer)

    const result = readFile('/path/to/file.txt')

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(Buffer.isBuffer(result.value)).toBe(true)
      expect(result.value.toString()).toBe(testContent)
    }
    expect(fs.readFileSync).toHaveBeenCalledWith('/path/to/file.txt', undefined)
  })

  it('should read file content with utf-8 encoding', () => {
    const testContent = 'This is test content for reading files'
    FsMocker.mockReadFileSync(testContent)

    const result = readFile('/path/to/file.txt', 'utf-8')

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toBe(testContent)
      expect(typeof result.value).toBe('string')
    }
    expect(fs.readFileSync).toHaveBeenCalledWith('/path/to/file.txt', 'utf-8')
  })

  it('should read file content as buffer with null encoding', () => {
    const testContent = 'This is test content for reading files'
    const mockBuffer = FileContentMock.createBuffer(testContent)
    FsMocker.mockReadFileSync(mockBuffer)

    const result = readFile('/path/to/file.txt', null)

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(Buffer.isBuffer(result.value)).toBe(true)
      expect(result.value.toString()).toBe(testContent)
    }
    expect(fs.readFileSync).toHaveBeenCalledWith('/path/to/file.txt', null)
  })

  it('should read empty file', () => {
    FsMocker.mockReadFileSync('')

    const result = readFile('/path/to/empty.txt', 'utf-8')

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toBe('')
    }
    expect(fs.readFileSync).toHaveBeenCalledWith('/path/to/empty.txt', 'utf-8')
  })

  it('should read file with special characters', () => {
    const specialContent = 'Hello 🌍\nNew line\tTab character'
    FsMocker.mockReadFileSync(specialContent)

    const result = readFile('/path/to/special.txt', 'utf-8')

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toBe(specialContent)
    }
    expect(fs.readFileSync).toHaveBeenCalledWith('/path/to/special.txt', 'utf-8')
  })

  it('should return error for non-existent file', () => {
    FsMocker.mockReadFileSyncError('ENOENT: no such file or directory')

    const result = readFile('/path/to/nonexistent.txt')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toBe('Failed to read file')
    }
    expect(fs.readFileSync).toHaveBeenCalledWith('/path/to/nonexistent.txt', undefined)
  })

  it('should return error for permission denied', () => {
    FsMocker.mockReadFileSyncError('EACCES: permission denied')

    const result = readFile('/restricted/file.txt')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toBe('Failed to read file')
    }
  })

  it('should handle different encoding options', () => {
    const binaryContent = 'Hello'
    FsMocker.mockReadFileSync(binaryContent)

    const result = readFile('/path/to/file.txt', 'ascii')

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toBe(binaryContent)
    }
    expect(fs.readFileSync).toHaveBeenCalledWith('/path/to/file.txt', 'ascii')
  })

  it('should handle large files', () => {
    const largeContent = 'x'.repeat(10000)
    FsMocker.mockReadFileSync(largeContent)

    const result = readFile('/path/to/large.txt', 'utf-8')

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toBe(largeContent)
      expect(result.value.length).toBe(10000)
    }
    expect(fs.readFileSync).toHaveBeenCalledWith('/path/to/large.txt', 'utf-8')
  })

  it('should handle buffer return type correctly', () => {
    const testContent = 'Buffer test content'
    const mockBuffer = FileContentMock.createBuffer(testContent)
    FsMocker.mockReadFileSync(mockBuffer)

    const result = readFile('/path/to/buffer.txt')

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(Buffer.isBuffer(result.value)).toBe(true)
      expect((result.value as Buffer).toString('utf-8')).toBe(testContent)
    }
  })

  it('should handle any file system error', () => {
    FsMocker.mockReadFileSyncError('Some unexpected file system error')

    const result = readFile('/some/path/file.txt')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toBe('Failed to read file')
    }
  })
})
