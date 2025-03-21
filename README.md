# Task Manager Exercise

The project follows a simple Typescript monorepo structure using NPM workspaces with three main components:

- Backend (Express based API)
- Frontend (React based UI)
- Shared Library (For code reuse)

The application demonstrates a React based UI integrated with an Express API, providing basic task management functionality. While this is currently a minimal implementation based on requirements, the architecture and design choices allow for scalability and further development based on specific use cases.

Current Features:
- Basic backend and frontend integration
- Hot reload for both backend and frontend
- Unit tests coverage for core functionalities (88.28% of statements covered)

Possible Improvements:
- Add production build artifacts for entire monorepo
- Implement Dockerization capabilities
- Implement database support instead of temporary in-memory data
- Implement authentication & security measures
- Enhance error logging and monitoring
- Enhance application variable management
- Optimize unit tests performance
- Implement E2E tests for full application workflow testing
- Implement ESLint checking for consistent coding style and to catch potential issues
- Replace NPM Workspaces with a monorepo management tool such as Lerna for better dependency handling and package versioning

<img src="https://github.com/user-attachments/assets/9615633f-5523-4e6d-9a24-43b94c6f69b8" width="260"> <img src="https://github.com/user-attachments/assets/e3ad7fb5-6909-4459-8b53-708b0b7ffb8a" width="260"> <img src="https://github.com/user-attachments/assets/4470869b-65d1-4174-8ccb-62e5591fc543" width="260">

For information about how to run development environments, formatting of code, testing and for development notes, please read below.

> [!NOTE]
> All commands assume your location to be a **root** of application!

## Prerequisites

Developed with Node **v22.13.1** and NPM **v10.9.2**.

## Development

It is possible to run the application in development mode which enables hot reloading for both backend and frontend. Running the application in a concurrent development environment ensures a faster and smoother development experience.

### Quick start

1. Clone the repository
```shell
git clone git@github.com:hicotech/task-manager.git
```

2. Install dependencies
```shell
cd task-manager
npm install
```

3. Build shared library
```shell
cd shared-library
npm run build
cd ..
```

4. Run application development environment
```shell
npm run dev
```

5. Visit http://localhost:5000 for the UI and http://localhost:3000/api/tasksList for the API.

### Detailed instructions

#### Build shared library

Shared library currently contains only common type definitions for both frontend and backend. It needs to be built once before the first run or rebuilt whenever changes to shared-library folder are made.

```shell
cd shared-library
npm run build
```

Shared library content will be available for import as:

```jsx
import type { Task, TaskList } from '@task-manager/shared-library';
```

#### Running development environment

##### Concurrently

It is possible to run development environment for backend and frontend concurrently:

```shell
npm run dev
```

Backend development environment will be available at [http://localhost:3000](http://localhost:3000). URL of TaskList endpoint is [http://localhost:3000/api/tasksList](http://localhost:3000/api/tasksList).

Frontend development environment will be available at [http://localhost:5000](http://localhost:5000).

Any change to either backend, or frontend files will trigger hot reload of respective part of monorepo.

##### Separately

If needed, it is possible to run backend and frontend development environments separately:

```shell
npm run dev:backend
```

```shell
npm run dev:frontend
```

URLs of development environments and endpoints stay the same as in concurrently run environment.

## Formatting

The application enforces consistent formatting via Prettier.

```shell
npm run format
```

## Testing

### Unit tests

Application includes **46 unit test cases** in **8 test suites**, covering state management, API interactions, and UI behaviors. Additionally **26 snapshot tests** ensure the UI consistency and further checks for application behavior.

Currently the 88.28% of statements are covered.

Tests can be run sequentially for entire application:

```shell
npm run test:unit
```

If needed, it is possible to run backend and frontend unit tests separately:

```shell
npm run test:unit:backend
```

```shell
npm run test:unit:frontend
```

### E2E tests

End-to-end testing has not been implemented. Future improvements could include adding Cypress to cover full application workflows.

## Deployment

Application supports generating frontend and shared-library build artifacts. However, a fully production-ready backend deployment, including Dockerization and CI/CD integration, has not been implemented.

```shell
cd frontend
npm run build
```

```shell
cd shared-library
npm run build
```

## Used technologies

Used technologies are usually chosen based on the use cases and project needs. Given the assignment for simple Task Manager application, React with Typescript support was used in frontend; and core, routes and utils structure was used in backend with user experience, readability and scalability of application in mind.

Frontend uses [Vite](https://vite.dev) as development environment. Different solution could be used for bigger and more complex applications. Styling is done with [Styled Components](https://styled-components.com) library. Source code is formatted with [Prettier](https://prettier.io) code formatter.

Backend uses [TSX](https://tsx.is/) as development environment. Initially the TS-Node was used, but due to [Typescript issues](https://github.com/TypeStrong/ts-node/issues/1997) when NodeJS version v18 or more is used, it had to be dropped in favor of TSX. [Express](https://expressjs.com) was used as minimalist, but powerful framework. Source code is formatted with [Prettier](https://prettier.io) code formatter.
