# @repo/simple-cli

A traditional command-line application built with Commander.js, demonstrating best practices for CLI development with TypeScript.

## Features

- **Commander.js Integration**: Full-featured CLI with commands, options, and arguments
- **File Processing**: Built-in commands for file operations (`cat`, `ls`)
- **Environment Variables**: Support for configuration via environment variables
- **Input Validation**: Zod schemas for robust option parsing
- **Error Handling**: Comprehensive error handling with neverthrow
- **Structured Logging**: Winston-based logging with debug support
- **Dual Module Support**: ESM and CommonJS builds

## Installation

```bash
# Install dependencies
bun install

# Build the CLI
bun run build

# Run in development mode
bun run dev
```

## Usage

### Cat Command

Process and output file content with various options:

```bash
# Basic usage
simple-cli cat file.txt

# Output to file
simple-cli cat file.txt --output-file output.txt

# With debug logging
simple-cli cat file.txt --debug

# Using environment variables
CAT_OUTPUT=json CAT_OUTPUT_FILE=output.json simple-cli cat file.txt
```

### List Command

List files in a directory:

```bash
# List files in current directory
simple-cli ls .

# Recursive listing
simple-cli ls . --recursive
```

## Configuration

The CLI supports configuration through:

- **Command-line options**: Direct option passing
- **Environment variables**: `CAT_OUTPUT`, `CAT_OUTPUT_FILE`
- **Validation**: All inputs validated with Zod schemas

## Dependencies

- **@repo/debug**: Debug logging utilities
- **@repo/file-system**: Safe file system operations
- **@repo/logger**: Structured logging
- **commander**: CLI framework
- **zod**: Schema validation

## Development

```bash
# Watch mode for development
bun run dev

# Type checking
bun run lint:types

# Build for production
bun run build
```

## Exports

The package provides the following exports:

- `./cat-command`: Cat command implementation
- `./simple-cli-init`: CLI initialization function

## Binary

The package installs a `simple-cli` binary that can be used globally after installation.
