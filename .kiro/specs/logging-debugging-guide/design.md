# Design Document

## Overview

This design outlines a comprehensive logging and debugging guide that will standardize logging practices across the monorepo. The guide will leverage the existing `@repo/debug` and `@repo/logger` libraries while providing clear patterns, examples, and best practices for consistent implementation across all packages.

## Architecture

### Current Library Analysis

The monorepo already has two well-designed logging utilities:

1. **@repo/debug**: A wrapper around the `debug` package providing structured debug output with namespace support
2. **@repo/logger**: A Winston-based logger with console and file output capabilities, including structured logging and error formatting

### Guide Structure

The logging and debugging guide will be organized into the following sections:

```
docs/
├── logging-debugging-guide.md
├── examples/
│   ├── library-setup.md
│   ├── cli-setup.md
│   ├── error-handling.md
│   └── performance-debugging.md
└── checklists/
    ├── code-review-checklist.md
    └── logging-standards.md
```

## Components and Interfaces

### 1. Core Logging Patterns

#### Debug Namespace Hierarchy
```typescript
// Package level: @repo/package-name
const debug = new Debug('@repo/simple-cli')

// Module level: @repo/package-name:module
const moduleDebug = debug.extend('file-processor')

// Function level: @repo/package-name:module:function
const functionDebug = moduleDebug.extend('parseFile')
```

#### Logger Configuration Patterns
```typescript
// Base logger for package
const logger = new Logger({
  namespace: '@repo/simple-cli',
  level: 'info',
  filePath: './logs/app.log',
  errorFilePath: './logs/error.log'
})

// Extended logger for modules
const moduleLogger = logger.extend({ namespace: 'file-processor' })
```

### 2. ActionContext Pattern

Standardized context object for CLI commands:
```typescript
type ActionContextType = {
  debug: Debug
  logger: Logger
}

// Usage in command actions
const actionCtx: ActionContextType = {
  debug: new Debug('@repo/package-name'),
  logger: new Logger({ namespace: '@repo/package-name' })
}
```

### 3. Logging Level Guidelines

| Level | When to Use | Examples |
|-------|-------------|----------|
| `debug.log()` | Development debugging, trace execution flow | Function entry/exit, variable values |
| `debug.error()` | Debug-level error information | Detailed error context for debugging |
| `logger.log()` | User-facing information | Operation success, progress updates |
| `logger.error()` | Production errors | User-facing error messages |
| `logger.header()` | Command/section headers | CLI command start indicators |

### 4. Error Handling Patterns

#### Result Pattern Integration
```typescript
const result = someOperation()
if (result.isErr()) {
  debug.error('Operation failed:', result.error)
  logger.error('Failed to process file')
  return result
}
debug.log('Operation succeeded:', result.value)
```

#### Zod Validation Errors
```typescript
if (validationResult.error) {
  debug.error('Validation failed:', validationResult.error.message)
  logger.zodError(validationResult.error)
  process.exit(1)
}
```

## Data Models

### Logging Configuration Schema
```typescript
interface PackageLoggingConfig {
  packageName: string
  debugNamespace: string
  loggerConfig: {
    namespace: string
    level?: 'error' | 'warn' | 'info' | 'debug'
    filePath?: string
    errorFilePath?: string
  }
}
```

### Debug Namespace Schema
```typescript
interface DebugNamespacePattern {
  package: string        // @repo/package-name
  module?: string        // module-name
  function?: string      // function-name
  operation?: string     // specific-operation
}
```

## Error Handling

### Logging Error Categories

1. **User Input Errors**: Log with `logger.error()` for user feedback
2. **System Errors**: Log with both `debug.error()` and `logger.error()`
3. **Validation Errors**: Use `logger.zodError()` for structured output
4. **File System Errors**: Log with context about file paths and operations
5. **Network Errors**: Include retry information and endpoint details

### Error Context Requirements

All error logging must include:
- Operation being performed
- Input parameters (sanitized)
- Error message and code
- Suggested resolution (when applicable)

## Testing Strategy

### Debug Output Testing
- Verify debug namespaces follow conventions
- Test debug output in different environments
- Validate conditional debug logging performance

### Logger Testing
- Test log level filtering
- Verify file output formatting
- Test structured logging with various data types
- Validate error formatting and Zod integration

### Integration Testing
- Test logging across package boundaries
- Verify namespace inheritance in extended loggers
- Test performance impact of logging in production scenarios

## Implementation Guidelines

### Package Setup Checklist

For new packages:
1. Add `@repo/debug` and `@repo/logger` dependencies
2. Create ActionContext type with debug and logger instances
3. Initialize debug with package namespace
4. Configure logger with appropriate file paths
5. Document package-specific logging patterns

### Function-Level Logging

```typescript
export const processFile = async (filePath: string, ctx: ActionContextType) => {
  const debug = ctx.debug.extend('processFile')
  const logger = ctx.logger.extend({ namespace: 'file-processor' })
  
  debug.log('Starting file processing:', { filePath })
  
  try {
    // Operation logic
    const result = await fileOperation(filePath)
    debug.log('File processed successfully:', { result })
    logger.log(`Processed file: ${filePath}`)
    return ok(result)
  } catch (error) {
    debug.error('File processing failed:', { filePath, error })
    logger.error(`Failed to process file: ${filePath}`)
    return err(error)
  }
}
```

### Performance Considerations

- Use conditional debug logging for expensive operations
- Implement lazy evaluation for debug message formatting
- Consider log rotation for file-based logging
- Monitor log file sizes in production

### Environment Configuration

```bash
# Enable debug output
DEBUG=@repo:*

# Enable specific package debugging
DEBUG=@repo:simple-cli:*

# Production logging level
LOG_LEVEL=info
```

## Best Practices Summary

1. **Namespace Consistency**: Always use package name as base namespace
2. **Context Propagation**: Pass ActionContext through function calls
3. **Error Correlation**: Include operation context in all error logs
4. **Performance Awareness**: Use debug logging judiciously in hot paths
5. **User Experience**: Provide clear, actionable error messages via logger
6. **Development Experience**: Include detailed debug information for troubleshooting