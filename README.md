

## Description

This project provides a GraphQL API for accessing data from the Star Wars API (SWAPI). It uses NestJS, Apollo Server, and Redis for caching.

## Requirements
- Node >= 20
- Redis server

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Or run it with docker compose

```bash
docker-compose up
```
The app will be available at http://localhost:3000/graphql.

Redis will be running at localhost:6379.

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Documentation

 With your application running in the background, you can then open your web browser and navigate to http://localhost:3000/graphql to see the GraphQL playground with schema description. Or visit https://studio.apollographql.com/sandbox/explorer/. 
