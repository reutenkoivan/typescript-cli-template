# @repo/test-unit

Unit testing utilities and helpers for the CLI template monorepo.

## Features

- **FsMock**: Centralized file system mocking utilities for Vitest tests
- **Type-safe**: Full TypeScript support with proper type definitions
- **Easy to use**: Simple API for common testing scenarios

## Installation

This package is part of the monorepo workspace. Add it as a dependency:

```json
{
  "devDependencies": {
    "@repo/test-unit": "workspace:*"
  }
}
```

## Usage

### FsMock Class

The `FsMock` class provides utilities for mocking Node.js file system operations in your tests.

```typescript
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FsMock } from '@repo/test-unit/fs-mock'
import { yourFunction } from './your-module.js'

// Mock the fs module
vi.mock('node:fs')

describe('your tests', () => {
  beforeEach(() => {
    FsMock.clearAllMocks()
  })

  it('should handle existing files', () => {
    FsMock.mockExistingFile('file content')
    
    const result = yourFunction('/path/to/file.txt')
    
    expect(result).toBe('expected result')
  })

  it('should handle non-existent files', () => {
    FsMock.mockNonExistentFile()
    
    const result = yourFunction('/path/to/missing.txt')
    
    expect(result).toBe('error result')
  })
})
```

### Available Methods

#### Basic File Operations
- `FsMock.mockFileStats(options)` - Mock file/directory stats
- `FsMock.mockExistingFile(content)` - Mock a readable file
- `FsMock.mockDirectory()` - Mock a directory
- `FsMock.mockNonExistentFile()` - Mock file not found
- `FsMock.mockEmptyFile()` - Mock an empty file

#### Error Scenarios
- `FsMock.mockPermissionDenied()` - Mock permission denied for stat
- `FsMock.mockReadPermissionDenied()` - Mock permission denied for read
- `FsMock.mockStatSyncError(message)` - Mock custom stat error
- `FsMock.mockReadFileSyncError(message)` - Mock custom read error

#### JSON Files
- `FsMock.mockJsonFile(object)` - Mock valid JSON file
- `FsMock.mockInvalidJsonFile()` - Mock malformed JSON
- `FsMock.createValidPackageJson(overrides)` - Create package.json object

#### Utilities
- `FsMock.createBuffer(content)` - Create Buffer from string
- `FsMock.clearAllMocks()` - Clear all mocks (use in beforeEach)

## Examples

### Testing File Reading

```typescript
it('should read file content', () => {
  const content = 'Hello, World!'
  FsMock.mockExistingFile(content)
  
  const result = readFile('/path/to/file.txt')
  
  expect(result.isOk()).toBe(true)
  if (result.isOk()) {
    expect(result.value).toBe(content)
  }
})
```

### Testing Package.json Parsing

```typescript
it('should parse valid package.json', () => {
  const packageData = FsMock.createValidPackageJson({
    name: '@scope/my-package',
    version: '2.0.0'
  })
  
  FsMock.mockJsonFile(packageData)
  
  const result = parsePackageJson('/path/to/package.json')
  
  expect(result.isOk()).toBe(true)
  if (result.isOk()) {
    expect(result.value.name).toBe('@scope/my-package')
  }
})
```

### Testing Error Handling

```typescript
it('should handle permission errors', () => {
  FsMock.mockPermissionDenied()
  
  const result = checkFileExists('/restricted/file.txt')
  
  expect(result.isErr()).toBe(true)
})
```