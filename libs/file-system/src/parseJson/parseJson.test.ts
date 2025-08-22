import { parseJson } from './parseJson.js'

describe('parseJson', () => {
  it('should parse valid JSON string', () => {
    const jsonString = '{"name": "test", "version": "1.0.0"}'

    const result = parseJson(jsonString)

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toEqual({ name: 'test', version: '1.0.0' })
    }
  })

  it('should parse JSON array', () => {
    const jsonString = '[1, 2, 3, "test"]'

    const result = parseJson(jsonString)

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toEqual([1, 2, 3, 'test'])
    }
  })

  it('should parse JSON with nested objects', () => {
    const jsonString = '{"user": {"name": "John", "age": 30}, "active": true}'

    const result = parseJson(jsonString)

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toEqual({
        active: true,
        user: { age: 30, name: 'John' },
      })
    }
  })

  it('should parse empty JSON object', () => {
    const jsonString = '{}'

    const result = parseJson(jsonString)

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toEqual({})
    }
  })

  it('should parse empty JSON array', () => {
    const jsonString = '[]'

    const result = parseJson(jsonString)

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toEqual([])
    }
  })

  it('should return error for invalid JSON', () => {
    const invalidJson = '{"name": "test", "version":}'

    const result = parseJson(invalidJson)

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toBe('Failed to parse JSON content')
    }
  })

  it('should return error for malformed JSON', () => {
    const malformedJson = '{name: test}'

    const result = parseJson(malformedJson)

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toBe('Failed to parse JSON content')
    }
  })

  it('should return error for empty string', () => {
    const result = parseJson('')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toBe('Failed to parse JSON content')
    }
  })

  it('should return error for non-JSON string', () => {
    const result = parseJson('this is not json')

    expect(result.isErr()).toBe(true)
    if (result.isErr()) {
      expect(result.error.message).toBe('Failed to parse JSON content')
    }
  })

  it('should handle JSON with special characters', () => {
    const jsonString = '{"message": "Hello\\nWorld\\t!", "emoji": "🚀"}'

    const result = parseJson(jsonString)

    expect(result.isOk()).toBe(true)
    if (result.isOk()) {
      expect(result.value).toEqual({
        emoji: '🚀',
        message: 'Hello\nWorld\t!',
      })
    }
  })
})
