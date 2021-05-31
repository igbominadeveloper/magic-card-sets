# Magic Cards and Sets

This is a react site that pulls data from the Gathering API to get information on cards and sets

This project is served remotely and hosted on Vercel
[Magic Cards - Sets](https://magic-card-sets.vercel.app)

Locally, it is served by Vite [Vite.js](https://vitejs.dev/)

## Features

- [x] Select a set from all available sets
- [x] Show a list of the cards in that set with a bit of
      information about each card When I hit ‘Gather’.
- [x] Paginate result
- [x] Unit tests
- [x] End-to-end tests

## Installation and Setup Instructions

- Node
- NPM / Yarn
- Typescript

## Project setup

```
Run git clone `https://github.com/igbominadeveloper/magic-card-sets`
```

```
npm install or yarn
```

```
Create a .env file and add the following variables:

`VITE_API_BASE_URL="https://api.magicthegathering.io/v1"`

```

### Compiles and hot-reloads for development

```
npm run serve / yarn dev

Visit `http://localhost:3000`
```

### Compiles and minifies for production

```
npm run build / yarn build
```

### Run unit tests

```
npm run test:unit / yarn test:unit
```

### Run E2E tests

```
npm run test:e2e / yarn test:e2e
```
