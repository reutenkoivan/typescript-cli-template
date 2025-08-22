# @repo/documentation

Documentation site built with Docusaurus for the TypeScript CLI Template monorepo.

## Features

- **Docusaurus v3**: Modern documentation framework
- **React Integration**: Custom components and interactive examples
- **TypeScript Support**: Full TypeScript integration
- **Responsive Design**: Mobile-friendly documentation
- **Search**: Built-in search functionality
- **Dark Mode**: Automatic dark/light theme switching

## Development

```bash
# Start development server
bun run doc:start

# Build for production
bun run doc:build

# Serve production build
bun run serve

# Type checking
bun run typecheck
```

## Structure

The documentation includes:

- **Getting Started**: Quick start guide and installation
- **CLI Applications**: Documentation for simple-cli and ink-cli
- **Shared Libraries**: API documentation for debug, file-system, and logger
- **Development Guide**: Contributing and development workflows
- **API Reference**: Complete API documentation

## Configuration

The site is configured through:

- `docusaurus.config.js`: Main configuration
- `sidebars.js`: Navigation structure
- `src/`: Custom pages and components
- `docs/`: Documentation content
- `blog/`: Blog posts (if enabled)

## Deployment

The documentation can be deployed to:

- **GitHub Pages**: Using the deploy script
- **Netlify**: Automatic deployment from git
- **Vercel**: Static site deployment
- **Custom hosting**: Build and serve static files

## Scripts

- `doc:start`: Start development server
- `doc:build`: Build for production
- `docusaurus`: Run Docusaurus CLI
- `swizzle`: Customize Docusaurus components
- `deploy`: Deploy to GitHub Pages
- `clear`: Clear cache
- `serve`: Serve production build
- `write-translations`: Generate translation files
- `write-heading-ids`: Generate heading IDs
- `typecheck`: TypeScript type checking

## Dependencies

- **@docusaurus/core**: Core Docusaurus functionality
- **@docusaurus/theme-classic**: Default theme
- **@docusaurus/plugin-content-docs**: Documentation plugin
- **@docusaurus/plugin-content-blog**: Blog plugin
- **@docusaurus/plugin-content-pages**: Pages plugin
- **@mdx-js/react**: MDX support
- **react**: React library
- **react-dom**: React DOM
