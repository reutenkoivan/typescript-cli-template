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
```

## Package Structure

All packages follow consistent patterns:
- `src/` for source code
- `dist/` for compiled output
- Dual ESM/CJS exports
- TypeScript with declaration files
- Workspace dependencies using `workspace:*`

## TypeScript Module Resolution for Workspace Packages

When creating workspace packages that export TypeScript files directly (like configuration packages), ensure proper IDE support by including both modern and legacy module resolution fields:

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