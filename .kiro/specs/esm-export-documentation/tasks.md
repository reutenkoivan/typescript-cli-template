# Implementation Plan

- [ ] 1. Create main ESM documentation file structure
  - Create `.kiro/steering/esm-exports.md` with complete documentation sections
  - Include front-matter configuration for automatic inclusion in steering
  - Set up cross-references to existing tech.md and structure.md files
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 2. Document ESM fundamentals and concepts
  - Write comprehensive explanation of ES modules vs CommonJS differences
  - Include import/export syntax examples with proper TypeScript typing
  - Document static analysis benefits and tree-shaking capabilities
  - Add browser and Node.js compatibility information
  - _Requirements: 1.1, 1.2_

- [ ] 3. Document dual output strategy and configuration
  - Explain package.json export maps with real examples from our libraries
  - Document tsdown configuration patterns for dual ESM/CJS output
  - Include file naming conventions (.js/.cjs/.d.ts/.d.cts) explanation
  - Add conditional exports configuration examples
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 4. Create export pattern documentation with real examples
  - Document barrel export pattern using @repo/debug as example
  - Document subpath export pattern using @repo/file-system as example
  - Include guidelines for choosing between named and default exports
  - Add re-export patterns and best practices section
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 5. Document TypeScript and build tool configuration
  - Include TypeScript NodeNext module resolution configuration
  - Document tsdown configuration for different export patterns
  - Add workspace dependency configuration examples
  - Include package.json setup templates for new libraries
  - _Requirements: 2.4, 5.1, 5.2_

- [ ] 6. Create troubleshooting guide with solutions
  - Document common import resolution error solutions
  - Include mixed module type conflict resolution steps
  - Add build output problem diagnostic procedures
  - Document development tool ESM compatibility issues and fixes
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 7. Add comprehensive code examples section
  - Extract and document actual patterns from @repo/debug library
  - Extract and document actual patterns from @repo/file-system library
  - Include workspace dependency import examples
  - Add complete tsdown.config.ts examples for both patterns
  - _Requirements: 3.1, 3.2, 3.4_

- [ ] 8. Implement cross-reference system
  - Add references to tech.md for build system information
  - Add references to structure.md for package organization
  - Include links to actual library source code examples
  - Set up internal navigation between documentation sections
  - _Requirements: 1.4, 3.4_

- [ ] 9. Create validation examples and test cases
  - Include working import/export examples that can be tested
  - Add package.json configuration examples that produce correct builds
  - Include TypeScript configuration that passes type checking
  - Document how to verify dual output is working correctly
  - _Requirements: 2.1, 2.2, 4.3_

- [ ] 10. Add development workflow integration guidance
  - Document how ESM affects testing setup and configuration
  - Include guidance for development tool configuration (IDE, linters)
  - Add information about debugging ESM modules
  - Document performance considerations and best practices
  - _Requirements: 5.2, 5.3, 5.4_