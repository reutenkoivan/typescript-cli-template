import { defineConfig, type Options } from 'tsdown'

const logConfiguration = (finalConfig: Options, options: Options, isProduction: boolean) => {
  const isDevelopment = !isProduction

  const configTable = [
    { Setting: 'Build Mode', Value: isProduction ? 'production' : 'development' },
    { Setting: 'Minification', Value: finalConfig.minify ? 'enabled' : 'disabled' },
    { Setting: 'Type Definitions', Value: finalConfig.dts ? 'enabled' : 'disabled' },
    { Setting: 'Package Exports', Value: finalConfig.exports ? 'enabled' : 'disabled' },
    { Setting: 'Output Dir', Value: finalConfig.outDir },
    { Setting: 'Custom Options', Value: Object.keys(options).length > 0 ? Object.keys(options).join(', ') : 'none' },
    { Setting: 'Build Target', Value: isDevelopment ? 'Development (with source maps)' : 'Production (optimized)' },
  ]

  console.log(`\n${'='.repeat(50)}`)
  console.log('🔧 TSDOWN CONFIGURATION')
  console.log('='.repeat(50))
  console.table(configTable)
  console.log(`${'='.repeat(50)}\n`)
}

export const createConfig = (options: Options = {}) => {
  const isProduction = process.env.NODE_ENV === 'production'
  const shouldLog = process.env.TSDOWN_VERBOSE === 'true'

  // Compute final configuration
  const finalConfig: Options = {
    dts: true,
    exports: true,
    minify: isProduction,
    outDir: './dist',
    ...options,
  } as const

  if (shouldLog) {
    logConfiguration(finalConfig, options, isProduction)
  }

  return defineConfig(finalConfig)
}

export { defineConfig, type Options } from 'tsdown'
