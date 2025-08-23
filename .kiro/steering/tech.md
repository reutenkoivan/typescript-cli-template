# Technology Stack

## Build System & Package Management

- **Turborepo**: Monorepo build system with task orchestration and caching
- **Bun**: Package manager and runtime (v1.2.10)
- **Workspaces**: Yarn/npm workspaces pattern for monorepo dependencies

## Core Technologies

- **TypeScript**: Primary language with strict configuration
- **Node.js**: Runtime environment (>=18.0.0)
- **ESM**: ES modules as the primary module system with CommonJS fallback

## Build & Compilation

- **tsdown**: TypeScript compiler for dual ESM/CJS output
- **TypeScript Config**: Shared base configuration in `configs/typescript/base.json`
- **Target**: ES2022 with NodeNext module resolution
- **Production Builds**: Environment-aware builds with optimizations and cache control
- **Turborepo Caching**: Intelligent caching for development, disabled for production builds

## Code Quality & Linting

- **Biome**: Code formatter and linter (replaces ESLint/Prettier)
- **Knip**: Dependency analysis and unused code detection
- **Sherif**: Dependency version consistency checker
- **Madge**: Circular dependency detection
- **Gitleaks**: Secret detection in git history

## Development Workflow

- **Lefthook**: Git hooks for pre-commit checks
- **Turbo UI**: Terminal UI for build visualization

## Key Libraries

- **CLI Frameworks**: Commander.js, React Ink
- **Logging**: Winston, custom debug utilities
- **Validation**: Zod for schema validation
- **File System**: Custom utilities built on Node.js fs
- **Testing**: Vitest with shared configuration and type-safe presets
- **Error Handling**: neverthrow for functional error handling

## Build Configuration

### Development vs Production Builds

The monorepo supports two distinct build modes optimized for different use cases:

**Development Build (`turbo run build`)**
- Turborepo caching enabled for fast incremental builds
- Source maps and debug information included
- Optimized for development workflow and iteration speed

**Production Build (`NODE_ENV=production turbo run build --force --ui=stream`)**
- Uses `--force` flag to bypass Turborepo cache for fresh builds
- `NODE_ENV=production` passed to all build processes for optimized output
- Minified output with smaller bundle sizes
- Stream UI (`--ui=stream`) for real-time build progress
- Simplified approach using existing build task with environment override

### Turborepo Configuration

```json
"build": {
  "dependsOn": ["^build"],
  "outputs": ["dist/**"],
  "passThroughEnv": ["NODE_ENV"]
}
```

### Benefits of Simplified Production Build

- **Single Build Task**: Uses the same `build` task for both development and production
- **Environment-Aware**: tsdown configs automatically detect `NODE_ENV=production` for optimizations
- **No Task Duplication**: Eliminates the need for separate `build:production` task definitions
- **Consistent Dependency Graph**: Maintains the same dependency resolution across all packages
- **Flexible Execution**: Production mode achieved through environment variables and CLI flags

## Common Commands

```bash
# Development
bun run simple-cli:dev    # Start simple CLI in watch mode
bun run ink-cli:dev       # Start ink CLI in watch mode
bun run doc:start         # Start documentation server

# Building
turbo run build                              # Build all packages (development mode with caching)
NODE_ENV=production turbo run build --force --ui=stream  # Build all packages (production mode, no cache)
turbo run build --filter=@repo/simple-cli   # Build specific package

# Code Quality
bun run check             # Run all linting checks
bun run check:fix         # Run all linting with auto-fix
bun run lint:code         # Biome code linting
bun run lint:deps         # Dependency analysis
bun run lint:secrets      # Secret detection

# Testing
turbo run test            # Run tests across all packages
turbo run test:watch      # Run tests in watch mode
VITEST_VERBOSE=true turbo run test  # Run tests with configuration logging
VITEST_COVERAGE=true turbo run test --filter=@repo/file-system  # Run tests with coverage
```

## Command Execution Patterns

### Turborepo-First Approach

**ALWAYS execute commands from the monorepo root using Turborepo patterns. NEVER `cd` into individual packages.**

This approach ensures:
- Proper dependency resolution and caching
- Consistent environment variables and context
- Optimal build orchestration and parallelization
- Correct workspace dependency handling

### Package Targeting with Filters

Use Turborepo's `--filter` flag to target specific packages:

```bash
# ✅ CORRECT: Target specific package from root
turbo run build --filter=@repo/simple-cli
turbo run test --filter=@repo/file-system
turbo run dev --filter=@repo/ink-cli

# ✅ CORRECT: Target multiple packages
turbo run build --filter=@repo/simple-cli --filter=@repo/ink-cli
turbo run test --filter="@repo/*-cli"

# ❌ INCORRECT: Don't cd into packages
cd packages/simple-cli && npm run build  # DON'T DO THIS
cd libs/file-system && npm test          # DON'T DO THIS
```

### Workspace-Aware Commands

For package-specific scripts that aren't Turborepo tasks, use Bun's workspace targeting:

```bash
# ✅ CORRECT: Run package-specific scripts from root
bun run simple-cli:dev     # Runs dev script in @repo/simple-cli
bun run ink-cli:start      # Runs start script in @repo/ink-cli
bun run doc:build          # Runs build script in documentation package

# ✅ CORRECT: Install dependencies for specific packages
bun add --filter=@repo/simple-cli commander
bun add --filter=@repo/vitest-config --dev vitest

# ❌ INCORRECT: Don't cd for package management
cd packages/simple-cli && bun add commander  # DON'T DO THIS
```

### Development Workflow Commands

```bash
# ✅ CORRECT: Development commands from root
turbo run dev --filter=@repo/simple-cli     # Start CLI in watch mode
turbo run build --filter=@repo/file-system  # Build specific library
turbo run test --filter=libs/*              # Test all libraries

# ✅ CORRECT: Global operations
turbo run build                             # Build all packages
turbo run test                              # Test all packages
turbo run lint:code                         # Lint all packages
```

### Environment Variables and Context

When using environment variables, set them at the root level:

```bash
# ✅ CORRECT: Environment variables from root
NODE_ENV=production turbo run build --filter=@repo/simple-cli
VITEST_VERBOSE=true turbo run test --filter=@repo/file-system
TSDOWN_VERBOSE=true turbo run build --filter=configs/*

# ✅ CORRECT: Multiple environment variables
NODE_ENV=production TSDOWN_VERBOSE=true turbo run build --force
```

### Debugging and Troubleshooting

```bash
# ✅ CORRECT: Debug specific packages from root
turbo run build --filter=@repo/simple-cli --verbose
turbo run test --filter=@repo/file-system --ui=stream

# ✅ CORRECT: Dry run to see what would execute
turbo run build --filter=@repo/simple-cli --dry-run

# ✅ CORRECT: Force rebuild without cache
turbo run build --filter=@repo/simple-cli --force
```

### Package Dependency Patterns

Leverage Turborepo's dependency awareness:

```bash
# ✅ CORRECT: Build package and its dependencies
turbo run build --filter=@repo/simple-cli...

# ✅ CORRECT: Build dependents of a package
turbo run build --filter=...@repo/file-system

# ✅ CORRECT: Build changed packages only
turbo run build --filter=[HEAD^1]
```

### Why This Approach Matters

1. **Dependency Resolution**: Turborepo understands package dependencies and builds in correct order
2. **Caching**: Only works properly when executed from root with proper context
3. **Environment Consistency**: Ensures all packages see the same environment variables
4. **Workspace Context**: Bun and Turborepo need workspace context for proper resolution
5. **Build Orchestration**: Parallel execution and resource management work optimally from root
6. **Debugging**: Easier to debug issues when all commands follow the same pattern

### Anti-Patterns to Avoid

```bash
# ❌ DON'T: Change directories
cd packages/simple-cli
cd libs/file-system

# ❌ DON'T: Use npm/yarn directly in packages
npm run build
yarn test

# ❌ DON'T: Install dependencies in individual packages
npm install commander
bun add vitest

# ❌ DON'T: Run scripts without workspace context
node src/index.js
./scripts/build.sh
```

## Package Structure

All packages follow consistent patterns:
- `src/` for source code
- `dist/` for compiled output (when built packages are needed)
- Dual ESM/CJS exports for published packages
- TypeScript with declaration files
- Workspace dependencies using `workspace:*`

### Monorepo Organization

```
├── configs/           # Shared configuration packages
│   ├── tsdown/       # Build configuration with createConfig interface
│   ├── typescript/   # Base TypeScript configuration
│   └── vitest/       # Testing configuration with type-safe presets
├── libs/             # Reusable library packages
│   ├── debug/        # Debug logging utilities
│   ├── file-system/  # File system operations with error handling
│   ├── logger/       # Structured logging with Winston
│   └── test-unit/    # Unit testing utilities and mocks
├── packages/         # Application packages
│   ├── simple-cli/   # Basic CLI with Commander.js
│   ├── ink-cli/      # Interactive CLI with React Ink
│   └── documentation/ # Docusaurus documentation
└── [root files]      # Monorepo configuration
```

## Configuration Package Standard

The monorepo follows a standardized approach for configuration packages that ensures consistency, type safety, and developer experience across all tools.

### Configuration Factory Pattern

All configuration packages export a single `createConfig` function with the following interface:

```typescript
export const createConfig = (preset?, configOverrides?) => ConfigResult
```

**Key Features:**
- **Type-Safe Presets**: Preset names are validated at compile time using `keyof typeof presetConfigs`
- **Configuration Merging**: Base config → preset config → user overrides
- **Environment Awareness**: Automatic production vs development optimizations
- **Verbose Logging**: Set `{TOOL}_VERBOSE=true` for detailed configuration output
- **Consistent API**: Same pattern across all configuration packages

### Current Configuration Packages

- **`@repo/tsdown-config`**: Build configuration with production/development modes (exports TypeScript source)
- **`@repo/vitest-config`**: Testing configuration with presets ('unit', 'integration', 'filesystem') (exports built files)
- **`@repo/typescript-config`**: Base TypeScript configuration for workspace packages

### Configuration Usage Examples

```typescript
// Basic usage with preset
import { createConfig } from '@repo/vitest-config'
export default createConfig('unit')

// Custom configuration with preset
export default createConfig('unit', {
  test: {
    testTimeout: 10000,
    setupFiles: ['./custom-setup.ts'],
  },
})

// Environment-aware build configuration
import { createConfig } from '@repo/tsdown-config'
export default createConfig({
  entry: ['./src/index.ts'],
  // Automatically applies minification in production
})
```

### Configuration Logging

Enable verbose logging for any configuration package:

```bash
# Vitest configuration logging
VITEST_VERBOSE=true turbo run test

# Tsdown configuration logging
TSDOWN_VERBOSE=true turbo run build
```

## TypeScript Module Resolution for Workspace Packages

When creating workspace packages that export TypeScript files directly (like `@repo/tsdown-config`), ensure proper IDE support by including both modern and legacy module resolution fields:

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

## Testing Architecture

### Testing Framework

- **Vitest**: Primary testing framework with shared configuration
- **Type-Safe Presets**: 'unit', 'integration', 'filesystem' presets for different testing scenarios
- **Mocking Utilities**: `@repo/test-unit` package provides file system mocking and test helpers

### Testing Utilities (`@repo/test-unit`)

```typescript
import { FsMocker } from '@repo/test-unit/helpers'
import { FileContentMock } from '@repo/test-unit/mocks'

// File system mocking for unit tests
FsMocker.mockExistingFile('file content')
FsMocker.mockJsonFile({ key: 'value' })
FsMocker.mockPermissionDenied()

// Content creation utilities
const packageData = FileContentMock.createValidPackageJson({
  name: '@scope/package',
  version: '1.0.0'
})
```

### Testing Patterns

- **Unit Tests**: Use 'unit' preset with optional coverage (enabled via `VITEST_COVERAGE=true`)
- **Integration Tests**: Use 'integration' preset with extended timeout
- **File System Tests**: Use 'filesystem' preset with mocking setup
- **Error Handling**: Test both success and error paths using neverthrow patterns

### Test Configuration Examples

```typescript
// Unit tests with coverage
import { createConfig } from '@repo/vitest-config'
export default createConfig('unit')

// Integration tests with custom timeout
export default createConfig('integration', {
  test: {
    testTimeout: 60000,
    include: ['tests/**/*.e2e.{test,spec}.ts'],
  },
})
```