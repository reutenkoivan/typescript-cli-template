#!/usr/bin/env node

import path from 'node:path'
import { tsTerInit } from '@repo/ts-ter-cli/ts-ter-init'

const packageJsonPath = path.resolve(import.meta.dirname, './package.json')

tsTerInit(packageJsonPath)
