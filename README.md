# react-ts-webpack-template

This is a template to create a react application with webpak

## Prerequisites

- Node.js >=14.0.0
- pnpm (Optional but recommended)
- chrome or chromium (Optional but recommended to run `lighthouseci` script)

## Getting Started

Clone the repository and run the following command in the project directory to install the dependencies:

- `npm install`
- `npm start`

## Scripts

### package.json

- `start`: Runs the aplication in dev mode
- `build`: Create a production build
- `build:analyze`: Create a production build and generate a repor with `webpack-bundle-analyzer`
- `lint`: Check `TS|JS` lint problems
- `lint:fix`: Check `TS|JS` lint problems and fix them
- `lint:styles`: Check `CSS|SCSS` lint problems
- `lint:styles:fix`: Check `CSS|SCSS` lint problems and fix them
- `test`: Runs all tests
- `test:watch`: Runs tests in watch mode
- `test:staged`: Runs only tests related to files that have been modified in the `project`
- `git:husky`: Run the husky installation
- `git:commit`: Runs `commitizen`
- `check:updates`: Runs `npm-check-updates` script to check for updates to the `package.json` dependencies
- `check:unused`: Runs `depcheck` script to search for unused dependencies in `package.json`
- `check:unimported`: Runs `unimported` to search for unused files in the `project`
- `lighthouseci`: Runs `@lhci/cli` script to perform an audit with `lighthouse`

### husky

- `commit-msg`: Verifies that the conventional commits standard is followed with `commitlint`
- `pre-commit`: Runs `lint-staged` to verify the modified files
- `prepare-commit-msg`: Runs `commitizen` wizard
- `git commit`: when you run this command and the husky commands were installed with `npm run git:husky`, it will run the `commitizen` wizard.

## Built With

- React
- TypeScript
- Webpack
- Babel
- Jest
- ESLint
- Husky
