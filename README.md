# A basic Ready-to-use express server for building RESTful APIs

## Pre-requirements 📋

[nodejs](https://nodejs.org/es/) - a cross-platform, open-source server JavaScript runtime environment
[docker](https://www.docker.com) - Automates the deployment of applications within software containers
[postgreSQL](https://www.postgresql.org) - relational SQL database

## Installation and Deployment 🔧📦

_At the root of the project, create a .env file that must contains the environment variables as shown in the .env.example:_

### local->

_Remember to have a postgreSQL instance running on a local server which must have the database already created_

```
$ npm install
$ npm start
```

### docker->

_Build a Docker container by running the following command in the root of your project directory_

```
$ docker-compose up --build
```

## built using 🛠️

- [Node.js](https://nodejs.org/es/) - a cross-platform, open-source server JavaScript runtime environment
- [TypeScript](https://www.typescriptlang.org/) - a strongly typed programming language that builds on JavaScript.
- [Express](https://expressjs.com/es/) - a Node.js web application Infrastructure
- [Winston](https://github.com/winstonjs/winston) - A logger for express server
- [TypeORM](https://typeorm.io) - an ORM that can run in NodeJS and provide additional features that help you to develop any kind of application that uses databases
- [postgreSQL](https://www.postgresql.org) - relational SQL database
