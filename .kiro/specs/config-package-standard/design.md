# Design Document

## Overview

This design document outlines the standardized approach for creating configuration packages in the TypeScript CLI template monorepo. The design is based on successful patterns from `@repo/tsdown-config` and `@repo/vitest-config`, providing a blueprint for consistent, type-safe, and developer-friendly configuration packages.

## Architecture

### Configuration Package Structure

```
configs/{tool-name}/
├── src/
│   └── index.ts          # Main configuration factory
├── package.json          # Package configuration with workspace exports
├── tsconfig.json         # TypeScript configuration
├── tsdown.config.ts      # Build configuration (if needed)
└── README.md            # Comprehensive documentation
```

### Core Components

1. **Configuration Factory** (`createConfig` function)
2. **Preset System** (predefined configurations)
3. **Configuration Merging Engine** (deep merge logic)
4. **Logging System** (verbose debugging output)
5. **Type System** (TypeScript interfaces and constraints)

## Components and Interfaces

### 1. Configuration Factory Interface

```typescript
export const createConfig = <T extends ConfigType>(
  preset?: keyof typeof presetConfigs,
  configOverrides?: T
) => ConfigResult<T>
```

**Key Design Decisions:**
- Single function export for consistency
- Optional preset parameter with type constraints
- Generic type support for different configuration types
- Returns the underlying tool's configuration format

### 2. Preset System Design

```typescript
const presetConfigs: Record<string, ConfigType> = {
  preset1: { /* configuration */ },
  preset2: { /* configuration */ },
  // ...
}

// Type-safe preset parameter
type PresetName = keyof typeof presetConfigs
```

**Key Design Decisions:**
- Presets defined as a record for easy extension
- Type safety through `keyof typeof` pattern
- Clear separation between base, preset, and override configurations
- Preset names should be descriptive and use-case oriented

### 3. Configuration Merging Strategy

```typescript
const finalConfig = {
  ...baseConfig,
  ...presetConfig,
  ...configOverrides,
  // Deep merge for nested objects
  nestedProperty: {
    ...baseConfig.nestedProperty,
    ...presetConfig.nestedProperty,
    ...configOverrides.nestedProperty,
  }
}
```

**Merging Rules:**
1. Base configuration provides sensible defaults
2. Preset configuration overrides base for specific use cases
3. User overrides have highest precedence
4. Nested objects are deep-merged
5. Arrays are completely replaced (no merging)

### 4. Logging System Design

```typescript
const logConfiguration = (
  finalConfig: ConfigType,
  configOverrides: ConfigType,
  preset?: string
) => {
  const configTable = [
    { Setting: 'Preset', Value: preset || 'custom' },
    { Setting: 'Key Setting 1', Value: finalConfig.setting1 },
    // ... other settings
  ]

  console.log(`\n${'='.repeat(50)}`)
  console.log(`🔧 ${TOOL_NAME.toUpperCase()} CONFIGURATION`)
  console.log('='.repeat(50))
  console.table(configTable)
  console.log(`${'='.repeat(50)}\n`)
}
```

**Logging Features:**
- Consistent visual formatting across all tools
- Environment variable control (`{TOOL}_VERBOSE=true`)
- Tabular output for easy reading
- Shows active preset, key settings, and custom overrides

### 5. Package Export Strategy

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

**Export Design Decisions:**
- Direct TypeScript source export for workspace packages
- Both modern (`exports.types`) and legacy (`types`) fields
- ESM-first approach with fallbacks
- No build step required for workspace consumption

## Data Models

### Base Configuration Template

```typescript
interface ConfigPackageTemplate<T> {
  // Base configuration with sensible defaults
  baseConfig: T
  
  // Preset configurations for common use cases
  presetConfigs: Record<string, Partial<T>>
  
  // Configuration factory function
  createConfig: (preset?: keyof typeof presetConfigs, overrides?: Partial<T>) => T
  
  // Logging function for debugging
  logConfiguration: (config: T, overrides: Partial<T>, preset?: string) => void
}
```

### Environment Detection

```typescript
interface EnvironmentConfig {
  isProduction: boolean
  isDevelopment: boolean
  verboseLogging: boolean
  toolSpecificEnvVars: Record<string, string>
}
```

## Error Handling

### Type-Level Error Prevention

1. **Preset Validation**: Use `keyof typeof presetConfigs` to constrain preset names
2. **Configuration Validation**: Leverage TypeScript's type system for compile-time validation
3. **Generic Constraints**: Use generic types to ensure configuration compatibility

### Runtime Error Handling

```typescript
const createConfig = (preset?: PresetName, overrides: ConfigType = {}) => {
  try {
    // Configuration merging logic
    const finalConfig = mergeConfigurations(baseConfig, presetConfig, overrides)
    
    // Validate final configuration if needed
    validateConfiguration(finalConfig)
    
    return defineConfig(finalConfig)
  } catch (error) {
    console.error(`Configuration error in @repo/${toolName}-config:`, error.message)
    throw error
  }
}
```

## Testing Strategy

### Unit Tests for Configuration Packages

1. **Preset Testing**: Verify each preset produces expected configuration
2. **Merging Logic**: Test configuration merging with various combinations
3. **Type Safety**: Ensure TypeScript compilation fails for invalid presets
4. **Environment Detection**: Test production vs development behavior
5. **Logging**: Verify verbose logging output format and content

### Integration Tests

1. **Real-World Usage**: Test configurations with actual tools
2. **Monorepo Integration**: Verify workspace package consumption
3. **Build Process**: Ensure configurations work in build pipelines

### Test Structure

```typescript
describe('@repo/{tool}-config', () => {
  describe('createConfig', () => {
    it('should return base config when no parameters provided')
    it('should apply preset configuration correctly')
    it('should merge user overrides with preset')
    it('should handle environment variables')
    it('should log configuration when verbose enabled')
  })
  
  describe('presets', () => {
    it('should provide valid configurations for each preset')
    it('should have type-safe preset names')
  })
})
```

## Implementation Guidelines

### 1. Configuration Package Creation Checklist

- [ ] Create package directory in `configs/{tool-name}/`
- [ ] Set up package.json with workspace exports
- [ ] Implement `createConfig` function with preset support
- [ ] Add type-safe preset definitions
- [ ] Implement configuration logging
- [ ] Add comprehensive README with examples
- [ ] Write unit tests for all functionality
- [ ] Update monorepo documentation

### 2. Naming Conventions

- **Package Name**: `@repo/{tool-name}-config`
- **Main Export**: `createConfig`
- **Preset Names**: Descriptive, use-case oriented (e.g., 'unit', 'integration', 'production')
- **Environment Variables**: `{TOOL_NAME}_VERBOSE` for logging

### 3. Documentation Requirements

Each configuration package must include:
- Basic usage examples
- Preset documentation with use cases
- Custom configuration examples
- API reference with type signatures
- Environment variable documentation
- Real-world examples from the monorepo

### 4. Backward Compatibility

When updating existing configuration packages:
- Maintain existing preset names and behavior
- Add new presets without breaking existing ones
- Use semantic versioning for breaking changes
- Provide migration guides for major updates

## Performance Considerations

1. **Lazy Loading**: Configuration should be computed only when needed
2. **Caching**: Avoid recomputing configurations in watch mode
3. **Memory Usage**: Keep preset configurations lightweight
4. **Build Performance**: Direct TypeScript exports avoid build overhead

## Security Considerations

1. **Environment Variables**: Validate environment variable inputs
2. **Configuration Validation**: Sanitize user-provided configuration objects
3. **Dependency Management**: Keep configuration package dependencies minimal
4. **Access Control**: Use workspace-only packages for internal configurations