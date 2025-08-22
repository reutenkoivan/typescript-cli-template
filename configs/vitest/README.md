# @repo/vitest-config

Shared Vitest configuration for the CLI template monorepo.

## Usage

### Basic Usage

```typescript
// vitest.config.ts
import { defineVitestConfig } from '@repo/vitest-config'

export default defineVitestConfig()
```

### With Custom Overrides

```typescript
// vitest.config.ts
import { defineVitestConfig } from '@repo/vitest-config'

export default defineVitestConfig({
  test: {
    include: ['src/**/*.{test,spec}.ts'],
    coverage: {
      reporter: ['text', 'json'],
    },
  },
})
```

### Using Presets

```typescript
// vitest.config.ts
import { presets } from '@repo/vitest-config'

// For unit tests
export default presets.unit

// For integration tests
export default presets.integration

// For packages with file system operations
export default presets.filesystem
```

### Advanced Configuration

```typescript
// vitest.config.ts
import { defineVitestConfig, baseConfig } from '@repo/vitest-config'

export default defineVitestConfig({
  test: {
    ...baseConfig.test,
    testTimeout: 10000,
    setupFiles: ['./test-setup.ts'],
  },
})
```

## Installation

Add to your package's `devDependencies`:

```json
{
  "devDependencies": {
    "@repo/vitest-config": "workspace:*",
    "vitest": "^2.1.8"
  }
}
```

## Configuration Options

The base configuration includes:

- **globals**: `true` - Global test functions available without imports
- **environment**: `node` - Node.js test environment
- **include**: Standard test file patterns
- **exclude**: Common directories to ignore (node_modules, dist, .turbo)

## Presets

### `presets.unit`
- Optimized for unit tests in `src/` directory
- Includes coverage configuration
- Excludes test files from coverage

### `presets.integration`
- For integration tests in `tests/` directory
- Extended timeout (30s)
- Suitable for slower, more complex tests

### `presets.filesystem`
- For packages that test file system operations
- Includes setup files for mocking
- Works well with `@repo/test-unit` package