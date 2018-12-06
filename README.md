# bitimulate

> This service is now available at https://bitimulate.com/

## About

Bitimulate is compound word of **Bit**coin and S**imulate**. This service provides a simulated cryptocurrency trading system. Data used in this service rely on realtime information at [Poloniex](https://poloniex.com).

Currently, Korean is the only supported language in this service. English, and other languages might be implemented later on...

## Stack

Everything in this project is in JavaScript. 

### Frontend

- react
- react-router
- redux
- CSS Module + Sass
- [Atomic React Component (ARc)](https://arc.js.org)
- EChart

### Server

- Node.js
- Koa
- MongoDB (mongoose)
- Redis
- Websocket

#### AWS
- EC2
- S3
- Cloudfront
- ElasticLoadbalancer

## Running on your Machine

These instructions will get you a copy of the project up and running on your local machine for development or testing purposes.

### Prerequisites
- Node.js v8^
- yarn
- MongoDB
- Redis

### Installation
Clone this project from the github repository.

```bash
$ git clone https://github.com/velopert/bitimulate
```

Install packages in both backend and frontend directory using following command:

```bash
$ yarn
```

### Rename .env.bak file

You have to rename `.env.bak` file to `.env` in bitimulate-backend directory. This file contains environment variable for the server.

### Uncomment the registerInitialExchangeRate line @ crawler

Open the [crawler file](https://github.com/velopert/bitimulate/blob/master/bitimulate-backend/src/crawler/index.js#L15) and uncomment following code:

```javascript
  await registerInitialExchangeRate();
```
This function crawls exchangerate data from poloniex and creates document for each currency.

### Running Backend Development Server

To run the development server, execute following command inside bitimulate-backend directory:

```bash
$ yarn dev
```

Then, make sure you comment the `await registerInitialExchangeRate();` again. I know this procedure is bit inefficient. I will come up with better solution later on :)

### Running Frontend Webpack Development Server

To run the webpack-dev-server for frontend, execute following command inside bitimulate-frontend directory:

```bash
$ yarn start
```

### Questions

Feel free to submit new issue when you have questions or find some bugs.