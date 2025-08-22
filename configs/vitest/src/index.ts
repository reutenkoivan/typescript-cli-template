import { defineConfig } from 'vitest/config'
import type { UserConfig } from 'vitest/node'

/**
 * Base Vitest test configuration
 */
export const baseTestConfig: UserConfig = {
  environment: 'node',
  exclude: ['**/node_modules/**', '**/dist/**', '**/.turbo/**'],
  globals: true,
  include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
}

/**
 * Create a Vitest config with optional test overrides
 */
export function defineVitestConfig(testOverrides: UserConfig = {}) {
  return defineConfig({
    test: {
      ...baseTestConfig,
      ...testOverrides,
    },
  })
}

/**
 * Preset configurations for common use cases
 */
export const presets = {
  /**
   * Configuration for packages with file system operations
   */
  filesystem: defineVitestConfig({
    include: ['src/**/*.{test,spec}.ts'],
    setupFiles: ['./vitest.setup.ts'],
  }),

  /**
   * Configuration for integration tests
   */
  integration: defineVitestConfig({
    include: ['tests/**/*.integration.{test,spec}.ts'],
    testTimeout: 30000,
  }),
  /**
   * Configuration for unit tests
   */
  unit: defineVitestConfig({
    coverage: {
      exclude: ['src/**/*.{test,spec}.ts'],
      include: ['src/**/*.ts'],
      reporter: ['text', 'html'],
    },
    include: ['src/**/*.{test,spec}.ts'],
  }),
}

// Default export for convenience
export { defineVitestConfig as default }
