# Design Document

## Overview

The package.json structure guide will be a comprehensive documentation file that explains the patterns and conventions used across the monorepo. It will serve as both a reference guide and a template for creating new packages. The documentation will be organized by package type and include practical examples from the existing codebase.

## Architecture

The documentation will be structured as a single markdown file with the following sections:

1. **Root Package.json Structure** - Detailed breakdown of the monorepo root configuration
2. **Script Organization Patterns** - Explanation of global vs Turborepo scripts with clear examples
3. **Package Type Templates** - Standard structures for libs, packages, and configs
4. **Dependency Management** - Workspace patterns and version management
5. **Export Configurations** - Dual module support and entry point patterns
6. **Field Reference** - Complete reference of all package.json fields used

## Components and Interfaces

### Documentation Structure

```markdown
# Package.json Structure Guide

## Root Package.json
- Workspace configuration
- Script organization (before/after # separator)
- DevDependency management
- Monorepo metadata

## Package Types
### Library Packages (`libs/`)
### Application Packages (`packages/`)  
### Configuration Packages (`configs/`)

## Common Patterns
### Dependency Management
### Export Configurations
### Script Conventions
### Field Reference
```

### Script Organization Pattern

The root package.json uses a visual separator (`#`) to distinguish between:

**Before # (Global Scripts):**
- `lint:*` - Code quality checks that run globally
- Direct tool invocations (biome, knip, sherif, madge, gitleaks)
- Scripts that operate on the entire monorepo

**After # (Turborepo Scripts):**
- `build` - Orchestrated build tasks
- `check` - Aggregated quality checks using Turborepo
- `*:dev` - Development mode scripts with filtering
- Scripts that leverage Turborepo's task graph and caching

### Package Template Patterns

#### Library Package Template
```json
{
  "name": "@repo/package-name",
  "version": "0.0.0-stub",
  "license": "MIT",
  "description": "Description of the library",
  "scripts": {
    "dev": "bun run build --watch",
    "build": "tsdown --format cjs --format esm",
    "lint:types": "tsc --noEmit"
  },
  "dependencies": {},
  "devDependencies": {
    "@repo/tsdown-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/node": "20.19.3",
    "tsdown": "^0.12.9",
    "typescript": "5.8.3"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./package.json": "./package.json"
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.cts"
}
```

#### Application Package Template
```json
{
  "name": "@repo/app-name",
  "version": "0.0.0",
  "bin": {
    "app-name": "entry-script.js"
  },
  "scripts": {
    "dev": "bun run build --watch",
    "build": "tsdown --format cjs --format esm",
    "lint:types": "tsc --noEmit"
  },
  "dependencies": {},
  "devDependencies": {
    "@repo/tsdown-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/node": "20.19.3",
    "tsdown": "^0.12.9",
    "typescript": "5.8.3"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "type": "module",
  "exports": {
    "./command-name": {
      "import": "./dist/command-name.js",
      "require": "./dist/command-name.cjs"
    },
    "./package.json": "./package.json"
  }
}
```

## Data Models

### Package Type Classification

```typescript
type PackageType = 'root' | 'library' | 'application' | 'config';

interface PackageStructure {
  type: PackageType;
  requiredFields: string[];
  optionalFields: string[];
  scriptPatterns: ScriptPattern[];
  exportPattern: ExportPattern;
}
```

### Script Categories

```typescript
interface ScriptCategory {
  name: string;
  description: string;
  examples: string[];
  usesWorkspaces: boolean;
  usesTurborepo: boolean;
}
```

## Error Handling

The documentation will include common pitfalls and troubleshooting sections:

1. **Workspace Reference Errors** - How to properly use `workspace:*`
2. **Export Configuration Issues** - Common dual module export problems
3. **Script Organization** - When to use global vs Turborepo scripts
4. **Dependency Conflicts** - Managing version consistency across packages

## Testing Strategy

The documentation quality will be validated through:

1. **Example Validation** - All code examples must be valid JSON and match existing patterns
2. **Completeness Check** - Ensure all package types in the monorepo are covered
3. **Consistency Verification** - Cross-reference with actual package.json files
4. **Practical Testing** - Use the guide to create a new test package and verify it works

The documentation will include references to existing packages as working examples, making it easy to verify accuracy and completeness.