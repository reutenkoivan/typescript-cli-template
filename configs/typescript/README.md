# @repo/typescript-config

Shared TypeScript configuration for the monorepo, providing consistent TypeScript settings across all packages.

## Features

- **Strict Configuration**: Strict TypeScript settings for maximum type safety
- **Modern Target**: ES2022 target with NodeNext module resolution
- **Monorepo Optimized**: Configured for workspace-based development
- **Path Mapping**: Support for workspace path resolution
- **Declaration Files**: Automatic generation of TypeScript declarations

## Usage

Extend the base configuration in your package's `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Configuration

The base configuration includes:

### Compiler Options

- **target**: ES2022 for modern JavaScript features
- **module**: NodeNext for Node.js module resolution
- **moduleResolution**: NodeNext for proper ESM/CJS handling
- **strict**: true for maximum type safety
- **esModuleInterop**: true for CommonJS compatibility
- **skipLibCheck**: true for faster compilation
- **forceConsistentCasingInFileNames**: true for cross-platform compatibility

### Type Checking

- **noImplicitAny**: true
- **noImplicitReturns**: true
- **noImplicitThis**: true
- **noUnusedLocals**: true (in strict mode)
- **noUnusedParameters**: true (in strict mode)

### Module Resolution

- **allowSyntheticDefaultImports**: true
- **resolveJsonModule**: true
- **isolatedModules**: true

## Package Structure

```
configs/typescript/
├── base.json          # Base TypeScript configuration
├── package.json       # Package configuration
└── README.md         # This file
```

## Integration

All packages in the monorepo extend this configuration:

```typescript
// Example package tsconfig.json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

## Development Workflow

The configuration supports:

- **Watch Mode**: Efficient incremental compilation
- **Declaration Generation**: Automatic .d.ts file creation
- **Source Maps**: Debug support in development
- **Strict Checking**: Catch errors at compile time

## Customization

Individual packages can override specific options:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

## Compatibility

- **Node.js**: >=18.0.0
- **TypeScript**: 5.8.3
- **Module Systems**: ESM and CommonJS
- **Build Tools**: Compatible with tsdown, tsc, and other TypeScript tools

## Best Practices

- Always extend the base configuration
- Override only necessary options
- Use consistent output directories
- Include source files explicitly
- Exclude build artifacts and dependencies