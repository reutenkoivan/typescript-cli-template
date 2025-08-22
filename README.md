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
```

## Project Structure

```
├── configs/           # Shared configuration packages
│   ├── tsdown/       # Build configuration
│   └── typescript/   # TypeScript configuration
├── libs/             # Reusable library packages
│   ├── debug/        # Debug logging utilities
│   ├── file-system/  # File system operations
│   └── logger/       # Structured logging with Winston
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

## Development

For detailed development information, build configuration, and technical details, see [DEVELOPMENT.md](./DEVELOPMENT.md).

## License

MIT
