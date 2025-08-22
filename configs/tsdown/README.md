# @repo/tsdown-config

Shared tsdown configuration for the monorepo.

## Usage

```typescript
import { createConfig } from '@repo/tsdown-config'

export default createConfig({
  entry: ['./src/index.ts'],
})
```

## Features

- Automatic minification in production (`NODE_ENV=production`)
- TypeScript declaration files generation
- ES module exports
- Consistent output directory structure