# AssembleUI

AssembleUI is a React UI library for building reusable and composable
interfaces with Sass and TypeScript declarations.

## Features

- Reusable UI components.
- Composable patterns and page templates.
- Sass-based styling and design tokens.
- Public entry points for modular imports.
- TypeScript declarations.
- CI-friendly development workflow with lint, typecheck, and coverage checks.

## Quality standards

This project follows a release-ready workflow:

- TypeScript-first public API
- Vite-based build pipeline
- Vitest test suite with coverage support
- ESLint checks for consistency and maintainability
- Architecture tests for public API and design-system boundaries

## Requirements

- React 19
- React DOM 19
- Node.js 20+
- npm 10+
- A JavaScript or TypeScript project with npm-compatible package management

## Installation

```bash
npm install @vnallmini/react react react-dom
```

## Development

```bash
npm install
npm run lint
npm run typecheck
npm run test -- --run
npm run build
```
