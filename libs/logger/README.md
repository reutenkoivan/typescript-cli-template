# @repo/logger

Structured logging library built on Winston with namespace support, multiple transports, and specialized formatting utilities. Designed for CLI applications with both console and file logging capabilities.

## Features

- **Winston Integration**: Built on the robust Winston logging framework
- **Multiple Transports**: Console, file, and error file logging
- **Namespace Support**: Hierarchical logger namespaces
- **Zod Error Formatting**: Pretty-print Zod validation errors
- **Header Formatting**: Styled headers for CLI output
- **Configurable Levels**: Standard Winston log levels
- **TypeScript Support**: Full type safety and IntelliSense

## Installation

```bash
bun add @repo/logger
```

## Usage

### Basic Logger

```typescript
import { Logger } from '@repo/logger'

const logger = new Logger({
  namespace: 'my-app'
})

logger.log('Application started')
logger.error('Something went wrong')
```

### File Logging

```typescript
import { Logger } from '@repo/logger'

const logger = new Logger({
  namespace: 'my-app',
  level: 'debug',
  filePath: 'app.log',
  errorFilePath: 'error.log'
})

logger.log('This goes to console and app.log')
logger.error('This goes to console, app.log, and error.log')
```

### Extended Loggers

```typescript
import { Logger } from '@repo/logger'

const appLogger = new Logger({ namespace: 'my-app' })
const dbLogger = appLogger.extend({ namespace: 'database' })
const userLogger = dbLogger.extend({ namespace: 'user-service' })

appLogger.log('App message')     // [my-app]
dbLogger.log('DB message')       // [my-app:database]  
userLogger.log('User message')   // [my-app:database:user-service]
```

### Zod Error Formatting

```typescript
import { Logger } from '@repo/logger'
import { z } from 'zod'

const logger = new Logger({ namespace: 'validation' })

const schema = z.object({
  name: z.string(),
  age: z.number()
})

try {
  schema.parse({ name: 123, age: 'invalid' })
} catch (error) {
  if (error instanceof z.ZodError) {
    logger.zodError(error) // Pretty-printed validation errors
  }
}
```

### Header Formatting

```typescript
import { Logger } from '@repo/logger'

const logger = new Logger({ namespace: 'cli' })

logger.header('Starting Application')
// Outputs a styled header with borders
```

## Configuration

### LoggerConfig

```typescript
type LoggerConfig = {
  namespace: string           // Logger namespace (required)
  level?: string             // Log level (default: 'info')
  filePath?: string          // General log file path
  errorFilePath?: string     // Error-only log file path
}
```

### Log Levels

Standard Winston log levels (in order of priority):

- `error`: Error messages only
- `warn`: Warning and error messages
- `info`: Info, warning, and error messages (default)
- `http`: HTTP, info, warning, and error messages
- `verbose`: Verbose and above
- `debug`: All messages including debug
- `silly`: All messages including silly

## Transport Configuration

### Console Transport

Always enabled with CLI formatting for readable terminal output.

### File Transport

When `filePath` is provided:
- JSON formatted logs
- Includes timestamp and namespace labels
- All messages at configured level and above

### Error File Transport

When `errorFilePath` is provided:
- JSON formatted logs
- Only error-level messages
- Separate from general log file

## API

### Constructor

```typescript
new Logger(config: LoggerConfig)
```

### Methods

#### `log(message: string): void`

Log an info-level message.

#### `error(message: string): void`

Log an error-level message.

#### `zodError(error: z.ZodError): void`

Pretty-print Zod validation errors with proper formatting.

#### `header(text: string): void`

Output a styled header with decorative borders.

#### `extend(config: Partial<LoggerConfig> & Pick<LoggerConfig, 'namespace'>): Logger`

Create a child logger with extended namespace.

## Integration Examples

### CLI Application

```typescript
import { Logger } from '@repo/logger'
import { Debug } from '@repo/debug'

const logger = new Logger({
  namespace: 'my-cli',
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  filePath: 'cli.log',
  errorFilePath: 'cli-errors.log'
})

const debug = new Debug('my-cli')

logger.header('My CLI Application')
logger.log('Starting application...')
debug.log('Debug information')
```

### Error Handling

```typescript
import { Logger } from '@repo/logger'
import { readFile } from '@repo/file-system/readFile'

const logger = new Logger({ namespace: 'file-processor' })

const result = readFile('config.json', 'utf8')

if (result.isErr()) {
  logger.error(`Failed to read config: ${result.error.message}`)
  process.exit(1)
}

logger.log('Config loaded successfully')
```

## Development

```bash
# Watch mode for development
bun run dev

# Type checking
bun run lint:types

# Build for production
bun run build
```

## Dependencies

- **winston**: Core logging functionality
- **zod**: Schema validation and error formatting

## Exports

The package provides a single main export:

- **ESM**: `./dist/logger.js`
- **CommonJS**: `./dist/logger.cjs`
- **Types**: `./dist/logger.d.cts`
