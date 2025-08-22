# @repo/debug

A lightweight debugging utility with namespace support, built on top of the popular `debug` package. Provides structured logging with hierarchical namespaces and JSON object formatting.

## Features

- **Namespace Support**: Hierarchical debug namespaces
- **JSON Formatting**: Automatic JSON object formatting
- **Extensible**: Create child debuggers with extended namespaces
- **Environment Control**: Enable/disable via DEBUG environment variable
- **TypeScript**: Full TypeScript support with type safety

## Installation

```bash
bun add @repo/debug
```

## Usage

### Basic Usage

```typescript
import { Debug } from '@repo/debug'

const debug = new Debug('my-app')

debug.log('Application started')
debug.error('Something went wrong')
```

### Namespace Arrays

```typescript
import { Debug } from '@repo/debug'

const debug = new Debug(['my-app', 'database', 'connection'])
// Creates namespace: my-app:database:connection

debug.log('Connected to database')
```

### Extending Namespaces

```typescript
import { Debug } from '@repo/debug'

const appDebug = new Debug('my-app')
const dbDebug = appDebug.extend('database')
const userDebug = dbDebug.extend(['user', 'service'])

appDebug.log('App message')        // my-app:log
dbDebug.log('DB message')          // my-app:database:log  
userDebug.log('User message')      // my-app:database:user:service:log
```

### Object Formatting

```typescript
import { Debug } from '@repo/debug'

const debug = new Debug('my-app')

const user = { id: 1, name: 'John', email: 'john@example.com' }
debug.log('User data:', user)
// Automatically formats objects as pretty JSON
```

## Environment Variables

Control debug output using the `DEBUG` environment variable:

```bash
# Enable all debug output
DEBUG=* node app.js

# Enable specific namespace
DEBUG=my-app:* node app.js

# Enable multiple namespaces
DEBUG=my-app:database:*,my-app:auth:* node app.js

# Enable only error messages
DEBUG=*:error node app.js
```

## API

### Constructor

```typescript
new Debug(namespace: string | string[])
```

Creates a new Debug instance with the specified namespace.

### Methods

#### `log(...args: unknown[]): void`

Log a message with the `:log` suffix.

#### `error(...args: unknown[]): void`

Log an error message with the `:error` suffix.

#### `extend(namespace: string | string[]): Debug`

Create a new Debug instance with an extended namespace.

## Integration

Works seamlessly with other packages in the monorepo:

```typescript
import { Debug } from '@repo/debug'
import { Logger } from '@repo/logger'

const debug = new Debug('my-cli')
const logger = new Logger({ namespace: 'my-cli' })

debug.log('Debug information')
logger.log('Production logging')
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

## Exports

The package provides dual module support:

- **ESM**: `./dist/debug.js`
- **CommonJS**: `./dist/debug.cjs`
- **Types**: `./dist/debug.d.cts`
