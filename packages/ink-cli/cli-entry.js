#!/usr/bin/env node

import path from 'node:path'
import { inkCliInit } from '@repo/ink-cli/ink-cli-init'

const packageJsonPath = path.resolve(import.meta.dirname, './package.json')

inkCliInit(packageJsonPath)
