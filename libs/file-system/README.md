# @repo/file-system

Safe file system operations with comprehensive error handling using neverthrow. Provides a collection of utilities for common file system tasks with functional error handling patterns.

## Features

- **Error Handling**: Functional error handling with neverthrow Result types
- **Type Safety**: Full TypeScript support with strict typing
- **Debug Logging**: Integrated debug logging for all operations
- **JSON Parsing**: Safe JSON parsing with Zod validation
- **Package.json Support**: Specialized package.json parsing utilities
- **File Statistics**: File metadata and existence checking

## Installation

```bash
bun add @repo/file-system
```

## Usage

### Reading Files

```typescript
import { readFile } from '@repo/file-system/readFile'

const result = readFile('path/to/file.txt', 'utf8')

if (result.isOk()) {
  console.log('File content:', result.value)
} else {
  console.error('Failed to read file:', result.error.message)
}
```

### Checking File Existence

```typescript
import { isFileExists } from '@repo/file-system/isFileExists'

const exists = await isFileExists('path/to/file.txt')

if (exists.isOk() && exists.value) {
  console.log('File exists')
} else {
  console.log('File does not exist or error occurred')
}
```

### Parsing JSON

```typescript
import { parseJson } from '@repo/file-system/parseJson'
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
  version: z.string()
})

const result = parseJson('config.json', schema)

if (result.isOk()) {
  console.log('Parsed config:', result.value)
} else {
  console.error('Failed to parse JSON:', result.error.message)
}
```

### Parsing Package.json

```typescript
import { parsePackageJson } from '@repo/file-system/parsePackageJson'

const result = parsePackageJson('package.json')

if (result.isOk()) {
  const pkg = result.value
  console.log(`${pkg.name} v${pkg.version}`)
} else {
  console.error('Failed to parse package.json:', result.error.message)
}
```

### Getting File Statistics

```typescript
import { getFileStats } from '@repo/file-system/getFileStats'

const stats = await getFileStats('path/to/file.txt')

if (stats.isOk()) {
  console.log('File size:', stats.value.size)
  console.log('Is directory:', stats.value.isDirectory())
  console.log('Modified:', stats.value.mtime)
} else {
  console.error('Failed to get file stats:', stats.error.message)
}
```

## Error Handling Pattern

All functions return `Result<T, Error>` types from neverthrow:

```typescript
import { readFile } from '@repo/file-system/readFile'

const result = readFile('file.txt', 'utf8')

// Pattern matching
result.match(
  (content) => console.log('Success:', content),
  (error) => console.error('Error:', error.message)
)

// Chaining operations
const processedResult = result
  .map(content => content.toUpperCase())
  .mapErr(error => new Error(`Processing failed: ${error.message}`))
```

## Available Functions

### File Operations

- **`readFile(filePath, options?)`**: Read file content with error handling
- **`isFileExists(filePath)`**: Check if file exists (async)
- **`getFileStats(filePath)`**: Get file statistics (async)

### JSON Operations

- **`parseJson(filePath, schema)`**: Parse JSON file with Zod validation
- **`parsePackageJson(filePath)`**: Parse package.json with built-in schema

## Debug Logging

All operations include debug logging. Enable with:

```bash
DEBUG=@repo/file-system:* node app.js
```

## Dependencies

- **neverthrow**: Functional error handling
- **zod**: Schema validation
- **@repo/debug**: Debug logging utilities

## Development

```bash
# Watch mode for development
bun run dev

# Type checking
bun run lint:types

# Build for production
bun run build
```

## Exports

The package provides granular exports for tree-shaking:

- `./readFile`: File reading utilities
- `./isFileExists`: File existence checking
- `./getFileStats`: File statistics
- `./parseJson`: JSON parsing utilities
- `./parsePackageJson`: Package.json parsing

Each export supports both ESM and CommonJS formats.
