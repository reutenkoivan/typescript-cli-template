#!/usr/bin/env node

import path from 'node:path'
import { initTaskExample } from '@cli-template/cli-example-1/taskExample'

const packageJsonPath = path.resolve(import.meta.dirname, './package.json')

initTaskExample(packageJsonPath)
