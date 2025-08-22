import { FileContentMock } from './file-content-mock.js'

describe('FileContentMock', () => {
  it('should create valid package.json', () => {
    const packageJson = FileContentMock.createValidPackageJson({ name: 'custom-name' })

    expect(packageJson.name).toBe('custom-name')
    expect(packageJson.version).toBe('1.0.0')
    expect(packageJson.description).toBe('A test package')
  })

  it('should create buffer from string', () => {
    const buffer = FileContentMock.createBuffer('test')

    expect(Buffer.isBuffer(buffer)).toBe(true)
    expect(buffer.toString()).toBe('test')
  })
})
