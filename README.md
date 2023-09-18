# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `api`: express app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Express app is in packages folder, because it exports the AppRouter type, that frontend apps need for typesafety.
It's completely safe, because Express app is installed as devDependency and we consume only the type, and during the build process, types are stripped away and the dependency vanishes.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### REMEMBER TO INSTALL DEPENDENCIES BEFORE RUNNNING ANY SCRIPT BELOW

To do that, run the following command:

```
pnpm i
```

### Build

To build all apps and packages, run the following command:

```
turbo build
```

To build specific package/app, run the following command:

```
turbo build --filter ${packageName}

```

for example:

```
turbo build --filter api

```

### Develop

To develop all apps and packages, run the following command:

```
turbo dev
```

To develop specific package/app, run the following command:

```
turbo dev --filter ${packageName}

```

for example:

```
turbo dev --filter api

```

### installing additional packages from npm registry:

To install an npm package, do it and specify the app/package you want to install it to for example:

if you want to add 'express' package to 'api' app:

```
pnpm add express --filter api
pnpm add -D @types/express --filter api
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
