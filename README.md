# FAQ Service

This project is a backend service designed to leverage full-text search algorithms to find suitable answers among frequently asked questions (FAQs). The service is built to integrate with a chatbot and cache the most frequently asked questions to improve response times and accuracy.

## Pre-requirements 📋

Before starting, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Docker](https://www.docker.com/) - Containerization platform
- [PostgreSQL](https://www.postgresql.org) - Relational Database

## Installation and Deployment 🔧📦

_At the root of the project, create a `.env` file that contains the environment variables as shown in the `.env.example`._

_Ensure you have an instance of PostgreSQL running locally with the following environment variables:_

- `POSTGRES_HOST`: Set to `db` if running with Docker Compose, `localhost` if running locally, or `host.docker.internal` if running Docker locally.

1. **Local Development:**

   - Clone the repository and navigate to the project directory.
   - Create a `.env` file based on `.env.example` with necessary environment variables.
   - Install dependencies and start the server:

     ```bash
     npm install
     npm start
     ```

2. **Using Docker:**

   - Build and run the Docker image:

     ```bash
     docker build -t my-node-app-name .
     ```

   - Run the Docker image:

     ```bash
     docker run -p 3000:3000 my-node-app-name
     ```

3. **Using Docker Compose:**

   - Start the Docker Compose services:

     ```bash
     docker-compose up --build
     ```

The server will be available at [http://localhost:3000](http://localhost:3000).

## built using 🛠️

- [Node.js](https://nodejs.org/es/) - a cross-platform, open-source server JavaScript runtime environment
- [TypeScript](https://www.typescriptlang.org/) - a strongly typed programming language that builds on JavaScript.
- [Express](https://expressjs.com/es/) - a Node.js web application Infrastructure
- [Winston](https://github.com/winstonjs/winston) - A logger for express server
- [TypeORM](https://typeorm.io) - an ORM that can run in NodeJS and provide additional features that help you to develop any kind of application that uses databases
- [postgreSQL](https://www.postgresql.org) - relational SQL database

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
