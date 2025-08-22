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
NODE_ENV=production turbo run build --force --ui=stream
```
- **Force Fresh Builds**: Uses `--force` flag to bypass Turborepo cache
- **Production Optimizations**: Minified output with smaller bundle sizes
- **Environment Detection**: Automatically detects `NODE_ENV=production`
- **Stream Output**: Real-time build progress with `--ui=stream`
- **Simplified Approach**: Uses existing build task with environment override

### Build Configuration Benefits

1. **Environment-Aware**: Build tools automatically detect production mode via `NODE_ENV`
2. **Optimized Output**: Production builds generate smaller, minified files
3. **Cache Control**: Development builds use caching for speed, production builds bypass cache with `--force`
4. **Visibility**: Stream UI provides real-time feedback during production builds
5. **Simplified Architecture**: Single build task for both development and production
6. **No Task Duplication**: Eliminates need for separate production build tasks
7. **Consistent Dependencies**: Same dependency graph across all build modes
8. **Fresh Builds**: `--force` flag ensures no stale cache affects production output

## Available Scripts

```bash
# Development
bun run simple-cli:dev    # Start simple CLI in watch mode
bun run ink-cli:dev       # Start ink CLI in watch mode
bun run doc:start         # Start documentation server

# Building
turbo run build                              # Build all packages (development mode)
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
```

## Technology Stack

- **Build System**: Turborepo with task orchestration and caching
- **Package Manager**: Bun (v1.2.10)
- **Language**: TypeScript with strict configuration
- **Module System**: ESM with CommonJS fallback
- **Build Tool**: tsdown for dual ESM/CJS output
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

## Monorepo Organization

### `configs/`
Shared configuration packages used across the monorepo:
- `typescript/` - Base TypeScript configuration
- `tsdown/` - Build configuration

### `libs/`
Reusable utility libraries with focused responsibilities:
- `debug/` - Debug logging utilities using the `debug` package
- `file-system/` - File system operations and utilities
- `logger/` - Structured logging with Winston

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

## Import/Export Patterns

- **ESM First**: All packages use ES modules as primary format
- **Dual Output**: Libraries provide both ESM and CommonJS builds
- **Barrel Exports**: Main entry points export from `src/index.ts` or specific files
- **Internal Dependencies**: Import from workspace packages using package names