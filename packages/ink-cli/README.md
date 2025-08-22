# @repo/ink-cli

An interactive command-line application built with React Ink, providing rich terminal user interfaces with React components.

## Features

- **React Ink Integration**: Build terminal UIs with React components
- **Interactive Components**: Rich, interactive terminal interfaces
- **Real-time Updates**: Dynamic content updates in the terminal
- **Commander.js Base**: Built on Commander.js for argument parsing
- **Structured Logging**: Winston-based logging with debug support
- **TypeScript Support**: Full TypeScript integration

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

### Run Command

Execute the interactive sample command:

```bash
# Basic usage
ink-cli run

# With recursive option
ink-cli run --recursive
```

## Architecture

The Ink CLI demonstrates how to:

- Integrate React Ink with Commander.js
- Create interactive terminal components
- Handle user input in terminal applications
- Manage state in terminal UIs
- Provide real-time feedback

## Dependencies

- **@repo/debug**: Debug logging utilities
- **@repo/file-system**: Safe file system operations  
- **@repo/logger**: Structured logging
- **commander**: CLI framework
- **ink**: React for terminal interfaces
- **react**: React library

## Development

```bash
# Watch mode for development
bun run dev

# Type checking
bun run lint:types

# Build for production
bun run build
```

## Sample Command

The included sample command demonstrates:

- React Ink component structure
- Terminal UI patterns
- State management in terminal apps
- Integration with the CLI framework

## Binary

The package installs an `ink-cli` binary that can be used globally after installation.

## Use Cases

Perfect for building:

- Interactive setup wizards
- Progress indicators
- Real-time monitoring tools
- Terminal-based dashboards
- File browsers and selectors
