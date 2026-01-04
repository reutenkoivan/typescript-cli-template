# TypeScript CLI Template

A comprehensive Turborepo monorepo template for building command-line applications with TypeScript. This template provides a solid foundation for creating CLI tools with shared libraries, utilities, and best practices.

## Features

- **Monorepo Structure**: Organized with Turborepo for efficient builds and caching
- **TypeScript First**: Full TypeScript support with strict configuration
- **Dual Module Support**: ESM and CommonJS builds for maximum compatibility
- **CLI Examples**: Two different CLI approaches (Commander.js and React Ink)
- **Shared Libraries**: Reusable utilities for logging, debugging, and file operations
- **Modern Tooling**: Biome for linting/formatting, Bun for package management
- **Error Handling**: Robust error handling with neverthrow
- **Documentation**: Docusaurus-based documentation site

## Quick Start

```bash
# Install dependencies
bun install

# Build all packages (development)
turbo run build

# Build all packages (production)
NODE_ENV=production turbo run build --force --ui=stream

# Run CLI applications
bun run simple-cli:dev
bun run ink-cli:dev

# Start documentation
bun run doc:start

# Run tests
turbo run test

# Run tests with verbose configuration logging
VITEST_VERBOSE=true turbo run test

# Run tests with coverage enabled
VITEST_COVERAGE=true turbo run test --filter=@repo/file-system
```

## Project Structure

```
├── configs/           # Shared configuration packages
│   ├── tsdown/       # Build configuration
│   ├── typescript/   # TypeScript configuration
│   └── vitest/       # Vitest testing configuration
├── libs/             # Reusable library packages
│   ├── debug/        # Debug logging utilities
│   ├── file-system/  # File system operations
│   ├── logger/       # Structured logging with Winston
│   └── test-unit/    # Unit testing utilities and mocks
├── packages/         # Application packages
│   ├── simple-cli/   # Basic CLI with Commander.js
│   ├── ink-cli/      # Interactive CLI with React Ink
│   └── documentation/ # Docusaurus documentation
└── [root files]      # Monorepo configuration
```

## CLI Applications

### Simple CLI (`@repo/simple-cli`)
A traditional CLI application built with Commander.js featuring:
- File processing commands (`cat`, `ls`)
- Environment variable support
- Zod validation for options
- Structured logging and debugging

### Ink CLI (`@repo/ink-cli`)
An interactive CLI application built with React Ink for rich terminal UIs:
- React-based terminal interfaces
- Interactive components
- Real-time updates

## Shared Libraries

### Debug (`@repo/debug`)
Lightweight debugging utility with namespace support:
- Hierarchical namespaces
- JSON object formatting
- Extensible debug contexts

### File System (`@repo/file-system`)
Safe file system operations with error handling:
- `readFile` - Read files with error handling
- `parseJson` - Parse JSON with validation
- `parsePackageJson` - Parse package.json files
- `getFileStats` - Get file statistics
- `isFileExists` - Check file existence

### Logger (`@repo/logger`)
Structured logging with Winston:
- Multiple transport support (console, file)
- Namespace-based loggers
- Zod error formatting
- Header formatting utilities

### Test Unit (`@repo/test-unit`)
Unit testing utilities and helpers:
- `FsMocker` - File system mocking utilities for Vitest
- `FileContentMock` - Content creation utilities for tests
- Type-safe testing helpers
- Organized into separate helpers and mocks exports

## Available Commands

All commands should be run from the monorepo root. The project uses Turborepo for task orchestration and Bun as the package manager.

### Code Quality & Linting

| Command | Description |
|---------|-------------|
| `bun run lint:code` | Run Biome code formatter and linter checks across all packages |
| `bun run lint:code:fix` | Run Biome with auto-fix to automatically resolve formatting and linting issues |
| `bun run lint:deps` | Analyze dependencies for unused code and inconsistencies using Knip |
| `bun run lint:deps:fix` | Automatically fix dependency issues where possible |
| `bun run lint:deps:versions` | Check for dependency version consistency across workspace packages using Sherif |
| `bun run lint:deps:versions:fix` | Automatically align dependency versions across packages |
| `bun run lint:deps:graph` | Detect circular dependencies in the codebase using Madge |
| `bun run lint:secrets` | Scan git history for potential secrets and sensitive information using Gitleaks |

### Build Commands

| Command | Description |
|---------|-------------|
| `bun run build` | Build all packages in development mode with verbose tsdown logging and Turborepo caching |
| `bun run build:production` | Build all packages in production mode with optimizations, minification, and verbose logging |

### Quality Checks (Aggregated)

| Command | Description |
|---------|-------------|
| `bun run check` | Run all linting checks (code, dependencies, versions, circular deps) across the monorepo |
| `bun run check:fix` | Run all linting checks with auto-fix enabled where possible |

### Testing

| Command | Description |
|---------|-------------|
| `bun run test` | Run all tests across packages using Vitest with Turborepo orchestration |
| `bun run test:watch` | Run tests in watch mode for continuous testing during development |

### Documentation

| Command | Description |
|---------|-------------|
| `bun run doc:start` | Start the Docusaurus documentation development server |

### Development (CLI Applications)

| Command | Description |
|---------|-------------|
| `bun run simple-cli:dev` | Start the simple CLI application in development mode with watch and dependency building |
| `bun run ink-cli:dev` | Start the interactive Ink CLI application in development mode with watch and dependency building |

### Command Categories Explained

**Linting Commands**: Ensure code quality, dependency health, and security across the monorepo. The project uses multiple specialized tools for different aspects of code quality.

**Build Commands**: Compile TypeScript packages with environment-aware optimizations. Development builds include caching for speed, while production builds prioritize optimization.

**Aggregated Checks**: Convenient commands that run multiple quality checks in sequence, useful for CI/CD pipelines and pre-commit validation.

**Testing Commands**: Execute the comprehensive test suite with Vitest, supporting both one-time runs and continuous development workflows.

**Development Commands**: Start CLI applications in watch mode with automatic rebuilding of dependencies, enabling rapid development iteration.

### Environment Variables

Several commands support environment variables for enhanced functionality:

- `TSDOWN_VERBOSE=true` - Enable verbose build logging
- `VITEST_VERBOSE=true` - Enable verbose test configuration logging  
- `VITEST_COVERAGE=true` - Enable test coverage reporting
- `NODE_ENV=production` - Enable production optimizations

### Turborepo Integration

Most commands leverage Turborepo's task orchestration for:
- **Dependency-aware execution**: Tasks run in correct order based on package dependencies
- **Intelligent caching**: Skip unchanged packages in development builds
- **Parallel execution**: Run tasks across multiple packages simultaneously
- **Incremental builds**: Only rebuild what's necessary

## Development

For detailed development information, build configuration, and technical details, see [DEVELOPMENT.md](./DEVELOPMENT.md).

## License

MIT
