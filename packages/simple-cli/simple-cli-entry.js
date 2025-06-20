#!/usr/bin/env node

import path from 'node:path'
import { simpleCliInit } from '@repo/simple-cli/simple-cli-init'

const packageJsonPath = path.resolve(import.meta.dirname, './package.json')

simpleCliInit(packageJsonPath)
