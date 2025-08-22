import fs from 'node:fs'
import { vi } from 'vitest'
import { FsMocker } from './fs-mocker.js'

// Mock the fs module
vi.mock('node:fs')

describe('FsMocker', () => {
  beforeEach(() => {
    FsMocker.clearAllMocks()
  })

  describe('mockFileStats', () => {
    it('should create mock stats with default values', () => {
      const mockStats = FsMocker.mockFileStats()

      expect(mockStats.isFile()).toBe(true)
      expect(mockStats.isDirectory()).toBe(false)
      expect(mockStats.size).toBe(1024)
    })

    it('should create mock stats with custom values', () => {
      const mockStats = FsMocker.mockFileStats({ isDirectory: true, isFile: false, size: 0 })

      expect(mockStats.isFile()).toBe(false)
      expect(mockStats.isDirectory()).toBe(true)
      expect(mockStats.size).toBe(0)
    })
  })

  describe('mockReadFileSync', () => {
    it('should set up mock for readFileSync', () => {
      const content = 'test content'
      FsMocker.mockReadFileSync(content)

      // Test that the mock is set up by calling it
      const result = fs.readFileSync('/test/path')
      expect(result).toBe(content)
    })
  })

  describe('convenience methods', () => {
    it('should mock existing file', () => {
      FsMocker.mockExistingFile('content')

      // Test that both mocks are set up
      const stats = fs.statSync('/test/path')
      const content = fs.readFileSync('/test/path')

      expect(stats.isFile()).toBe(true)
      expect(content).toBe('content')
    })

    it('should mock non-existent file', () => {
      FsMocker.mockNonExistentFile()

      // Test that the error mock is set up
      expect(() => fs.statSync('/test/path')).toThrow('ENOENT: no such file or directory')
    })

    it('should mock directory', () => {
      FsMocker.mockDirectory()

      const stats = fs.statSync('/test/path')
      expect(stats.isFile()).toBe(false)
      expect(stats.isDirectory()).toBe(true)
    })
  })
})
