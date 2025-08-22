import fs from 'node:fs'
import { vi } from 'vitest'

/**
 * File system mocking utilities for unit tests.
 * Provides a centralized way to mock Node.js fs operations with Vitest.
 */
export namespace FsMocker {
  /**
   * Mock fs.statSync to return file stats with specified properties
   */
  export const mockFileStats = (options: { isFile?: boolean; isDirectory?: boolean; size?: number } = {}) => {
    const { isFile = true, isDirectory = false, size = 1024 } = options

    const mockStats = {
      isDirectory: vi.fn().mockReturnValue(isDirectory),
      isFile: vi.fn().mockReturnValue(isFile),
      size,
    }

    vi.mocked(fs.statSync).mockReturnValue(mockStats as unknown as fs.Stats)
    return mockStats
  }

  /**
   * Mock fs.statSync to throw an error
   */
  export const mockStatSyncError = (errorMessage: string) => {
    vi.mocked(fs.statSync).mockImplementation(() => {
      throw new Error(errorMessage)
    })
  }

  /**
   * Mock fs.readFileSync to return specified content
   */
  export const mockReadFileSync = (content: string | Buffer) => {
    vi.mocked(fs.readFileSync).mockReturnValue(content)
  }

  /**
   * Mock fs.readFileSync to throw an error
   */
  export const mockReadFileSyncError = (errorMessage: string) => {
    vi.mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error(errorMessage)
    })
  }

  /**
   * Mock a file that exists and is readable
   */
  export const mockExistingFile = (content: string | Buffer) => {
    FsMocker.mockFileStats({ isFile: true })
    FsMocker.mockReadFileSync(content)
  }

  /**
   * Mock a directory (not a file)
   */
  export const mockDirectory = () => {
    FsMocker.mockFileStats({ isDirectory: true, isFile: false })
  }

  /**
   * Mock a non-existent file
   */
  export const mockNonExistentFile = () => {
    FsMocker.mockStatSyncError('ENOENT: no such file or directory')
  }

  /**
   * Mock permission denied error
   */
  export const mockPermissionDenied = () => {
    FsMocker.mockStatSyncError('EACCES: permission denied')
  }

  /**
   * Mock permission denied error for file reading
   */
  export const mockReadPermissionDenied = () => {
    FsMocker.mockFileStats({ isFile: true })
    FsMocker.mockReadFileSyncError('EACCES: permission denied')
  }

  /**
   * Mock an empty file
   */
  export const mockEmptyFile = () => {
    FsMocker.mockFileStats({ isFile: true, size: 0 })
    FsMocker.mockReadFileSync('')
  }

  /**
   * Mock a valid JSON file with specified content
   */
  export const mockJsonFile = (jsonObject: Record<string, unknown>) => {
    const content = JSON.stringify(jsonObject)
    FsMocker.mockExistingFile(content)
    return content
  }

  /**
   * Mock an invalid JSON file
   */
  export const mockInvalidJsonFile = () => {
    FsMocker.mockExistingFile('{"invalid": json}')
  }

  /**
   * Clear all mocks (should be called in beforeEach)
   */
  export const clearAllMocks = () => {
    vi.clearAllMocks()
  }
}
