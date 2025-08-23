import { defineConfig, type ViteUserConfig } from 'vitest/config'

// Use ViteUserConfig which properly includes the test property
type VitestConfig = ViteUserConfig

const logConfiguration = (finalConfig: VitestConfig, configOverrides: VitestConfig, preset?: string) => {
  const testConfig = finalConfig.test || {}

  const configTable = [
    { Setting: 'Preset', Value: preset || 'custom' },
    { Setting: 'Environment', Value: testConfig.environment || 'node' },
    { Setting: 'Globals', Value: testConfig.globals ? 'enabled' : 'disabled' },
    { Setting: 'Coverage', Value: testConfig.coverage?.enabled ? 'enabled' : 'disabled' },
    { Setting: 'Test Timeout', Value: `${testConfig.testTimeout || 5000}ms` },
    { Setting: 'Include Patterns', Value: Array.isArray(testConfig.include) ? testConfig.include.length : 0 },
    { Setting: 'Setup Files', Value: Array.isArray(testConfig.setupFiles) ? testConfig.setupFiles.length : 0 },
    {
      Setting: 'Custom Options',
      Value: Object.keys(configOverrides).length > 0 ? Object.keys(configOverrides).join(', ') : 'none',
    },
  ]

  console.log(`\n${'='.repeat(50)}`)
  console.log('🧪 VITEST CONFIGURATION')
  console.log('='.repeat(50))
  console.table(configTable)
  console.log(`${'='.repeat(50)}\n`)
}

// Base configuration
const baseConfig: VitestConfig = {
  test: {
    environment: 'node',
    exclude: ['**/node_modules/**', '**/dist/**', '**/.turbo/**'],
    globals: true,
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
}

// Preset configurations
const presetConfigs = {
  filesystem: {
    test: {
      include: ['src/**/*.{test,spec}.ts'],
      setupFiles: ['./vitest.setup.ts'],
    },
  },
  integration: {
    test: {
      include: ['tests/**/*.integration.{test,spec}.ts'],
      testTimeout: 30000,
    },
  },
  unit: {
    test: {
      coverage: {
        enabled: process.env.VITEST_COVERAGE === 'true',
        exclude: ['src/**/*.{test,spec}.ts'],
        include: ['src/**/*.ts'],
        reporter: ['text', 'html'],
      },
      include: ['src/**/*.{test,spec}.ts'],
    },
  },
} satisfies Record<string, VitestConfig>

/**
 * Create a Vitest config with preset and optional overrides
 */
export const createConfig = (preset?: keyof typeof presetConfigs, configOverrides: VitestConfig = {}) => {
  const shouldLog = process.env.VITEST_VERBOSE === 'true'

  // Get preset config if specified
  const presetConfig: Partial<VitestConfig> = preset ? presetConfigs[preset] || {} : {}

  // Merge configurations: base -> preset -> overrides
  const finalConfig: VitestConfig = {
    ...baseConfig,
    ...presetConfig,
    ...configOverrides,
    test: {
      ...baseConfig.test,
      ...presetConfig.test,
      ...configOverrides.test,
    },
  }

  if (shouldLog) {
    logConfiguration(finalConfig, configOverrides, preset)
  }

  return defineConfig(finalConfig)
}
