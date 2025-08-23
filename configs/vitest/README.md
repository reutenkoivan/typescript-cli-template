# @repo/vitest-config

Shared Vitest configuration for the CLI template monorepo with type-safe presets and configuration logging.

## Usage

### Basic Usage with Presets

```typescript
// vitest.config.ts
import { createConfig } from '@repo/vitest-config'

// Use a preset for common configurations
export default createConfig('unit')
export default createConfig('integration')
export default createConfig('filesystem')

// Use base configuration without preset
export default createConfig()
```

### Custom Configuration with Presets

```typescript
// vitest.config.ts
import { createConfig } from '@repo/vitest-config'

// Unit tests with custom timeout
export default createConfig('unit', {
  test: {
    testTimeout: 10000,
    setupFiles: ['./custom-setup.ts'],
  },
})

// Integration tests with custom patterns
export default createConfig('integration', {
  test: {
    include: ['tests/**/*.e2e.{test,spec}.ts'],
    testTimeout: 60000,
  },
})
```

### Advanced Configuration Examples

#### Custom Unit Tests Configuration

```typescript
// vitest.config.ts
import { createConfig } from '@repo/vitest-config'

export default createConfig('unit', {
  test: {
    coverage: {
      reporter: ['text', 'html', 'json'],
      exclude: [
        'src/**/*.{test,spec}.ts',
        'src/**/types.ts',
        'src/**/constants.ts',
      ],
    },
    setupFiles: ['./vitest.setup.ts'],
  },
})
```

#### Browser Environment Tests

```typescript
// vitest.config.ts
import { createConfig } from '@repo/vitest-config'

export default createConfig(undefined, {
  test: {
    environment: 'jsdom',
    include: ['src/**/*.browser.{test,spec}.ts'],
  },
})
```

### Real-World Examples

The monorepo packages use these configurations:

```typescript
// libs/file-system/vitest.config.ts
import { createConfig } from '@repo/vitest-config'

export default createConfig('unit')
```

```typescript
// libs/test-unit/vitest.config.ts
import { createConfig } from '@repo/vitest-config'

export default createConfig('unit')
```

## Configuration Pattern

This package provides a simple, type-safe configuration factory:

- **`createConfig(preset?, configOverrides?)`**: Main configuration factory with type-safe presets
- **Type Safety**: Preset names are validated at compile time
- **Configuration Logging**: Set `VITEST_VERBOSE=true` to see detailed configuration output
- **Preset System**: Pre-configured setups for common testing scenarios

## Installation

Add to your package's `devDependencies`:

```json
{
  "devDependencies": {
    "@repo/vitest-config": "workspace:*",
    "vitest": "^3.2.4"
  }
}
```

Note: The `@repo/vitest-config` package includes `vitest` as both a devDependency and peerDependency to ensure proper TypeScript support and version compatibility.

## Configuration Options

The base configuration includes:

- **globals**: `true` - Global test functions available without imports
- **environment**: `node` - Node.js test environment
- **include**: Standard test file patterns (`**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`)
- **exclude**: Common directories to ignore (`node_modules`, `dist`, `.turbo`)

## API Reference

### `createConfig(preset?, configOverrides?)`

Creates a Vitest configuration with optional preset and overrides.

**Parameters:**
- `preset` (`'unit' | 'integration' | 'filesystem'` | `undefined`): Type-safe preset name
- `configOverrides` (ViteUserConfig): Vitest configuration options to merge with preset

**Returns:** ViteUserConfig - Vitest configuration object compatible with `defineConfig()`

**Type Safety:** The preset parameter is constrained to valid preset names, providing compile-time validation and IDE autocomplete.

## Presets

### `presets.unit`
- Optimized for unit tests in `src/` directory
- Coverage enabled only when `VITEST_COVERAGE=true` environment variable is set
- Includes coverage configuration with HTML and text reporters
- Excludes test files from coverage
- Includes only TypeScript test files

### `presets.integration`
- For integration tests in `tests/` directory
- Extended timeout (30s)
- Suitable for slower, more complex tests
- Includes integration test patterns

### `presets.filesystem`
- For packages that test file system operations
- Includes setup files for mocking (`./vitest.setup.ts`)
- Works well with `@repo/test-unit` package
- Focused on `src/` directory tests

## Environment Variables

- **`VITEST_VERBOSE=true`**: Enable configuration logging with detailed table output showing:
  - Active preset
  - Environment settings
  - Coverage configuration
  - Test timeout values
  - File patterns and setup files
  - Custom configuration options

- **`VITEST_COVERAGE=true`**: Enable coverage collection for the `unit` preset. When not set, unit tests run without coverage collection for faster execution.

## Configuration Logging

When `VITEST_VERBOSE=true` is set, you'll see detailed configuration information:

```bash
VITEST_VERBOSE=true bun run test
```

To run unit tests with coverage enabled:

```bash
VITEST_COVERAGE=true turbo run test --filter=@repo/file-system
```

Output:
```
==================================================
🧪 VITEST CONFIGURATION
==================================================
┌─────────┬────────────────────┬───────────┐
│ (index) │ Setting            │ Value     │
├─────────┼────────────────────┼───────────┤
│ 0       │ 'Preset'           │ 'unit'    │
│ 1       │ 'Environment'      │ 'node'    │
│ 2       │ 'Globals'          │ 'enabled' │
│ 3       │ 'Coverage'         │ 'enabled' │
│ 4       │ 'Test Timeout'     │ '5000ms'  │
│ 5       │ 'Include Patterns' │ 1         │
│ 6       │ 'Setup Files'      │ 0         │
│ 7       │ 'Custom Options'   │ 'none'    │
└─────────┴────────────────────┴───────────┘
==================================================
```