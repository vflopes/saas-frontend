# SaaS Frontend

This project is a SPA built with React and TypeScript, `yarn` is used as the package manager.

## Technologies used

- `shadcn/ui` for component library (the components are in the `src/components/ui` folder).
- `Tailwind CSS` for styling.
- `React Query (TanStack Query)` for data fetching and state management (only for external states like backend APIs and external services).
- `TanStack Router` for routing.
- `TanStack Form` for form handling and validation (using `zod` as the schema validation library).
- `AWS Amplify` only for authentication functionality (AWS Cognito User Pools).

## Project structure

- `src/components`: Contains all the reusable components used throughout the application.
  - `ui`: Contains the base components from `shadcn/ui` that can be extended or customized.
  - `layout`: Contains layout components like headers, footers, and sidebars.
- `src/hooks`: Contains custom React hooks for various functionalities.
- `src/lib`: Contains utility functions and helper modules.
- `src/providers`: Contains context providers for managing global state (React Context).
- `src/routes`: Contains route definitions and page components (TanStack Router using file based routing).
- `src/features`: Contains feature-specific modules, each with its own components, hooks, and services.
  - `<feature-name>`: Each feature has its own folder containing components, hooks, and services related to that feature.
    - `components`: Contains components specific to the feature.
    - `hooks`: Contains custom hooks specific to the feature.
    - `apis`: Contains API calls and business logic related to the feature.
    - `types`: Contains TypeScript types and interfaces related to the feature.
    - `pages`: Contains page components specific to the feature.

## Coding conventions

- TypeScript strict mode is enabled.
- `@/*` alias is used to refer to the `src` directory.
- Double quotes (`"`) are used for strings.
- Semicolons are used at the end of statements.
- Prefer `async/await` over `.then()` for handling promises.
- Use functional components with hooks, avoid class components.
- Isolate hooks from components for better reusability and testability.
- Watch for security best practices, especially when dealing with authentication and sensitive data. If needed consult OWASP guidelines.
- Follow accessibility best practices (ARIA roles, keyboard navigation, etc.) when building UI components.

## Testing

Testing is done using `vitest` and `@testing-library` for unit and browser testing. Test files are located alongside the components/code they test, with a `.test.tsx` or `.test.ts` extension. Browser tests run in headless Chrome using `playwright`.

When testing any piece of code with TSX (React components), prefer using `@testing-library/react` to render the components and interact with them as a user would. For non-UI code, use `vitest` to write unit tests.

The test files must end with `.browser.test.tsx` for browser tests and `.unit.test.ts` for non-UI unit tests.

## Commands

- `yarn dev`: Starts the development server.
- `yarn build`: Builds the application for production.
- `yarn preview`: Previews the production build locally.
- `yarn test`: Runs unit tests with `vitest` but keeps the test runner active for watching file changes.
- `yarn coverage`: Runs unit tests and generates a coverage report.
- `yarn lint`: Runs ESLint to check for code quality and style issues.

## CI

The project uses GitHub Actions for continuous integration. The CI pipeline includes:

- Linting the codebase.
- Running unit tests and generating coverage reports.
- Building the application to ensure there are no build errors.

When a new Pull Request is created or updated against the `main` branch, the CI pipeline is triggered automatically (see @.github/workflows/react_checks_on_pr.yml for details).
