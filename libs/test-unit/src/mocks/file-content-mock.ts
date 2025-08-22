export namespace FileContentMock {
  /**
   * Create a valid package.json object with optional overrides
   */
  export const createValidPackageJson = (overrides: Record<string, unknown> = {}) => {
    return {
      description: 'A test package',
      name: 'test-package',
      version: '1.0.0',
      ...overrides,
    }
  }

  /**
   * Create a Buffer from string content
   */
  export const createBuffer = (content: string): Buffer => {
    return Buffer.from(content)
  }
}
