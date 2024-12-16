# File Picker

## Description

StackOne File Picker to navigate and select files from connected integrations.

The teck stack used inside in this package is composed by:

- [Node.js](https://nodejs.org) - JavaScript runtime
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Rollup](https://rollupjs.org/) - Module bundler
- [Vitest](https://vitest.dev) - Testing framework
- [Biome](https://biomejs.dev) - Linting and formatting

## Requirements

Node.js 20+ is required to run this project. The recommended way to install and manage Node.js versions is using
[Volta](https://volta.sh/).

## Installation

```bash
# install dependencies
$ npm install
```

This command will also install husky to ensure that all the commits follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

## Available commands

```bash
# clean build output
$ npm run clean
```

```bash
# build package
$ npm run build
```

```bash
# run tests
$ npm run test
```

```bash
# run tests with coverage report
$ npm run test:coverage
```

```bash
# run linter
$ npm run lint
```

```bash
# run linter and try to fix any error
$ npm run lint:fix
```

## Convential Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure that all the commits
follow a standard. This is done to ensure that the changelog can be automatically generated and to allow the automatic
versioning of the package.
