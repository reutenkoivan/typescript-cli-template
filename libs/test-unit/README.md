# @repo/test-unit

Unit testing utilities and helpers for the CLI template monorepo.

## Features

- **FsMocker**: Centralized file system mocking utilities for Vitest tests
- **FileContentMock**: Content creation utilities for test scenarios
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

### FsMocker Namespace

The `FsMocker` namespace provides utilities for mocking Node.js file system operations in your tests.

```typescript
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FsMocker } from '@repo/test-unit/helpers'
import { yourFunction } from './your-module.js'

// Mock the fs module
vi.mock('node:fs')

describe('your tests', () => {
  beforeEach(() => {
    FsMocker.clearAllMocks()
  })

  it('should handle existing files', () => {
    FsMocker.mockExistingFile('file content')
    
    const result = yourFunction('/path/to/file.txt')
    
    expect(result).toBe('expected result')
  })

  it('should handle non-existent files', () => {
    FsMocker.mockNonExistentFile()
    
    const result = yourFunction('/path/to/missing.txt')
    
    expect(result).toBe('error result')
  })
})
```

### FileContentMock Namespace

The `FileContentMock` namespace provides utilities for creating test content and data structures.

```typescript
import { FileContentMock } from '@repo/test-unit/mocks'

// Create test package.json data
const packageData = FileContentMock.createValidPackageJson({
  name: '@scope/my-package',
  version: '2.0.0'
})

// Create Buffer from string
const buffer = FileContentMock.createBuffer('test content')
```

## Available Methods

### FsMocker Methods

#### Basic File Operations
- `FsMocker.mockFileStats(options)` - Mock file/directory stats
- `FsMocker.mockExistingFile(content)` - Mock a readable file
- `FsMocker.mockDirectory()` - Mock a directory
- `FsMocker.mockNonExistentFile()` - Mock file not found
- `FsMocker.mockEmptyFile()` - Mock an empty file

#### Error Scenarios
- `FsMocker.mockPermissionDenied()` - Mock permission denied for stat
- `FsMocker.mockReadPermissionDenied()` - Mock permission denied for read
- `FsMocker.mockStatSyncError(message)` - Mock custom stat error
- `FsMocker.mockReadFileSyncError(message)` - Mock custom read error

#### JSON Files
- `FsMocker.mockJsonFile(object)` - Mock valid JSON file
- `FsMocker.mockInvalidJsonFile()` - Mock malformed JSON

#### Utilities
- `FsMocker.clearAllMocks()` - Clear all mocks (use in beforeEach)

### FileContentMock Methods

#### Content Creation
- `FileContentMock.createValidPackageJson(overrides)` - Create package.json object
- `FileContentMock.createBuffer(content)` - Create Buffer from string

## Examples

### Testing File Reading

```typescript
import { FsMocker } from '@repo/test-unit/helpers'

it('should read file content', () => {
  const content = 'Hello, World!'
  FsMocker.mockExistingFile(content)
  
  const result = readFile('/path/to/file.txt')
  
  expect(result.isOk()).toBe(true)
  if (result.isOk()) {
    expect(result.value).toBe(content)
  }
})
```

### Testing Package.json Parsing

```typescript
import { FsMocker } from '@repo/test-unit/helpers'
import { FileContentMock } from '@repo/test-unit/mocks'

it('should parse valid package.json', () => {
  const packageData = FileContentMock.createValidPackageJson({
    name: '@scope/my-package',
    version: '2.0.0'
  })
  
  FsMocker.mockJsonFile(packageData)
  
  const result = parsePackageJson('/path/to/package.json')
  
  expect(result.isOk()).toBe(true)
  if (result.isOk()) {
    expect(result.value.name).toBe('@scope/my-package')
  }
})
```

### Testing Error Handling

```typescript
import { FsMocker } from '@repo/test-unit/helpers'

it('should handle permission errors', () => {
  FsMocker.mockPermissionDenied()
  
  const result = checkFileExists('/restricted/file.txt')
  
  expect(result.isErr()).toBe(true)
})
```

## Package Structure

The test-unit package is organized into two main exports:

- **`@repo/test-unit/helpers`** - File system mocking utilities (`FsMocker`)
- **`@repo/test-unit/mocks`** - Content creation utilities (`FileContentMock`)

This separation allows you to import only the utilities you need for your specific test scenarios.