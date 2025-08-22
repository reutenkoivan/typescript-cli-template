# Project Structure

## Monorepo Organization

This repository follows a standard Turborepo monorepo structure with three main workspace categories:

```
├── configs/           # Shared configuration packages
├── libs/             # Reusable library packages
├── packages/         # Application packages
└── [root files]      # Monorepo configuration
```

## Workspace Categories

### `configs/`
Shared configuration packages used across the monorepo:
- `typescript/` - Base TypeScript configuration

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

## Package Structure Conventions

Each package follows a consistent structure:

```
package-name/
├── src/              # TypeScript source code
├── dist/             # Compiled output (generated)
├── package.json      # Package configuration
├── tsconfig.json     # TypeScript configuration
├── tsdown.config.ts  # Build configuration
└── README.md         # Package documentation
```

## Key Files & Directories

### Root Level
- `package.json` - Monorepo configuration and scripts
- `turbo.json` - Turborepo task definitions and caching
- `biome.json` - Code formatting and linting configuration
- `lefthook.yml` - Git hooks configuration
- `knip.json` - Dependency analysis configuration
- `.editorconfig` - Editor formatting rules

### Generated/Cache Directories
- `.turbo/` - Turborepo cache and logs
- `node_modules/` - Dependencies (managed by Bun)
- `dist/` - Compiled output in each package

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

## Development Workflow

1. **New Libraries**: Add to `libs/` for reusable utilities
2. **New Applications**: Add to `packages/` for end-user applications  
3. **Shared Config**: Add to `configs/` for configuration packages
4. **Dependencies**: Use workspace references for internal packages
5. **Building**: Turborepo handles dependency order and caching