# Development Guide

This guide covers the technical details for developing with this TypeScript CLI template.

## Build System

This template uses Turborepo with a sophisticated build configuration that supports both development and production modes.

### Build Modes

#### Development Build
```bash
turbo run build
```
- **Caching Enabled**: Leverages Turborepo's intelligent caching for fast incremental builds
- **Development Optimizations**: Includes source maps and debug information
- **Fast Iteration**: Optimized for development workflow

#### Production Build
```bash
NODE_ENV=production TSDOWN_VERBOSE=true turbo run build
```
- **Production Optimizations**: Minified output with smaller bundle sizes
- **Environment Detection**: Automatically detects `NODE_ENV=production`
- **Verbose Logging**: Includes `TSDOWN_VERBOSE=true` for detailed build information
- **Simplified Approach**: Uses existing build task with environment override

### Build Configuration Benefits

1. **Environment-Aware**: Build tools automatically detect production mode via `NODE_ENV`
2. **Optimized Output**: Production builds generate smaller, minified files
3. **Verbose Logging**: Both development and production builds include detailed logging via `TSDOWN_VERBOSE`
4. **Simplified Architecture**: Single build task for both development and production
5. **No Task Duplication**: Eliminates need for separate production build tasks
6. **Consistent Dependencies**: Same dependency graph across all build modes

## Available Scripts

```bash
# Development
bun run simple-cli:dev    # Start simple CLI in watch mode
bun run ink-cli:dev       # Start ink CLI in watch mode
bun run doc:start         # Start documentation server

# Building
bun run build             # Build all packages (development mode with verbose logging)
bun run build:production  # Build all packages (production mode with verbose logging)
turbo run build --filter=@repo/simple-cli   # Build specific package

# Code Quality
bun run check             # Run all linting checks
bun run check:fix         # Run all linting with auto-fix
bun run lint:code         # Biome code linting
bun run lint:deps         # Dependency analysis
bun run lint:secrets      # Secret detection

# Testing
bun run test              # Run tests across all packages
bun run test:watch        # Run tests in watch mode
```

## Technology Stack

- **Build System**: Turborepo with task orchestration and caching
- **Package Manager**: Bun (v1.2.10)
- **Language**: TypeScript with strict configuration
- **Module System**: ESM with CommonJS fallback
- **Build Tool**: tsdown for dual ESM/CJS output
- **Testing**: Vitest with shared configuration and presets
- **Code Quality**: Biome for formatting and linting
- **Error Handling**: neverthrow for functional error handling
- **Validation**: Zod for schema validation

## TypeScript Workspace Configuration

For workspace packages that export TypeScript files directly, ensure proper IDE support with both modern and legacy module resolution:

```json
{
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "import": "./src/index.ts", 
      "default": "./src/index.ts"
    }
  },
  "types": "./src/index.ts"
}
```

**Why both are needed:**
- `exports.types` - Modern TypeScript resolution (NodeNext/Bundler)
- Top-level `types` - Fallback for legacy resolution and IDE compatibility
- Workspace packages sometimes have different resolution behavior than published packages
- Ensures compatibility across different TypeScript versions and IDE configurations

**Without the top-level `types` field**, you may encounter:
- TS2307 errors in IDEs
- Module resolution failures in certain TypeScript configurations
- Inconsistent behavior between build tools and language servers

## Package Structure Conventions

All packages follow consistent patterns:
- `src/` for source code
- `dist/` for compiled output (generated)
- Dual ESM/CJS exports
- TypeScript with declaration files
- Workspace dependencies using `workspace:*`

## Testing Configuration

This template uses Vitest with a shared configuration package (`@repo/vitest-config`) that provides type-safe presets and configuration logging.

### Available Presets
- **`'unit'`** - Unit tests with optional coverage (enabled via `VITEST_COVERAGE=true`)
- **`'integration'`** - Integration tests with extended timeout
- **`'filesystem'`** - File system operation tests with mocking setup

### Usage Examples
```typescript
// vitest.config.ts
import { createConfig } from '@repo/vitest-config'

// Use a preset
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

### Configuration Logging
Enable detailed configuration logging to see preset settings and merged configuration:
```bash
VITEST_VERBOSE=true turbo run test
```

Enable coverage collection for unit tests:
```bash
VITEST_COVERAGE=true turbo run test --filter=@repo/file-system
```

### Type Safety
The preset parameter is type-safe and provides IDE autocomplete for available presets: `'unit'`, `'integration'`, `'filesystem'`. The function signature is:

```typescript
createConfig(preset?: 'unit' | 'integration' | 'filesystem', configOverrides?: ViteUserConfig)
```

## Monorepo Organization

### `configs/`
Shared configuration packages used across the monorepo:
- `typescript/` - Base TypeScript configuration
- `tsdown/` - Build configuration
- `vitest/` - Vitest testing configuration with presets

### `libs/`
Reusable utility libraries with focused responsibilities:
- `debug/` - Debug logging utilities using the `debug` package
- `file-system/` - File system operations and utilities
- `logger/` - Structured logging with Winston
- `test-unit/` - Unit testing utilities and mocks for Vitest

### `packages/`
End-user applications and main deliverables:
- `simple-cli/` - Basic CLI application using Commander.js
- `ink-cli/` - Interactive CLI with React Ink for rich terminal UIs
- `documentation/` - Docusaurus documentation site

## Development Workflow

1. **New Libraries**: Add to `libs/` for reusable utilities
2. **New Applications**: Add to `packages/` for end-user applications  
3. **Shared Config**: Add to `configs/` for configuration packages
4. **Dependencies**: Use workspace references for internal packages
5. **Building**: Turborepo handles dependency order and caching

## Naming Conventions

- **Package Names**: Scoped with `@repo/` prefix (e.g., `@repo/simple-cli`)
- **Workspace Dependencies**: Use `workspace:*` for internal dependencies
- **File Names**: kebab-case for files, PascalCase for classes
- **Directory Names**: kebab-case consistently

## Environment Variables

The monorepo uses several environment variables to control build behavior, testing configuration, and CLI application settings.

### Build Configuration

#### `NODE_ENV`
- **Purpose**: Controls build mode and optimizations
- **Values**: `production` | `development` (default)
- **Usage**: Automatically detected by build tools for environment-specific optimizations
- **Example**: `NODE_ENV=production TSDOWN_VERBOSE=true turbo run build`

#### `TSDOWN_VERBOSE`
- **Purpose**: Enable detailed logging for tsdown build configuration
- **Values**: `true` | `false` (default)
- **Usage**: Shows build configuration details, preset information, and merged settings
- **Example**: `TSDOWN_VERBOSE=true turbo run build`
- **Turborepo**: Passed through via `passThroughEnv` in build tasks

### Testing Configuration

#### `VITEST_VERBOSE`
- **Purpose**: Enable detailed logging for Vitest configuration
- **Values**: `true` | `false` (default)
- **Usage**: Shows test configuration details, active presets, and merged settings
- **Example**: `VITEST_VERBOSE=true turbo run test`
- **Turborepo**: Passed through via `passThroughEnv` in test tasks

#### `VITEST_COVERAGE`
- **Purpose**: Enable coverage collection for unit tests
- **Values**: `true` | `false` (default)
- **Usage**: Activates coverage reporting in the 'unit' preset
- **Example**: `VITEST_COVERAGE=true turbo run test --filter=@repo/file-system`
- **Turborepo**: Passed through via `passThroughEnv` in test tasks

### CLI Application Configuration

#### `CAT_OUTPUT`
- **Purpose**: Default output format for the cat command in simple-cli
- **Values**: String (format specification)
- **Usage**: Overrides default output format when set
- **Location**: `packages/simple-cli/src/cat-command/cat-command-configuration.ts`

#### `CAT_OUTPUT_FILE`
- **Purpose**: Default output file path for the cat command in simple-cli
- **Values**: String (file path)
- **Usage**: Overrides default output file when set
- **Location**: `packages/simple-cli/src/cat-command/cat-command-configuration.ts`

### Environment Variable Usage Examples

```bash
# Production build with verbose logging
NODE_ENV=production TSDOWN_VERBOSE=true turbo run build

# Test with configuration logging and coverage
VITEST_VERBOSE=true VITEST_COVERAGE=true turbo run test

# Run specific package tests with verbose output
VITEST_VERBOSE=true turbo run test --filter=@repo/file-system

# Build specific package with verbose logging
TSDOWN_VERBOSE=true turbo run build --filter=@repo/simple-cli

# Run CLI with custom environment settings
CAT_OUTPUT=json CAT_OUTPUT_FILE=output.json bun run simple-cli:dev
```

### Turborepo Environment Variable Handling

The monorepo uses Turborepo's `passThroughEnv` configuration to ensure environment variables are properly passed to tasks:

- **Build tasks**: `NODE_ENV`, `TSDOWN_VERBOSE`
- **Test tasks**: `VITEST_VERBOSE`, `VITEST_COVERAGE`

This ensures consistent environment variable handling across all packages and proper caching behavior.

## Import/Export Patterns

- **ESM First**: All packages use ES modules as primary format
- **Dual Output**: Libraries provide both ESM and CommonJS builds
- **Barrel Exports**: Main entry points export from `src/index.ts` or specific files
- **Internal Dependencies**: Import from workspace packages using package names