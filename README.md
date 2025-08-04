# FAQ Service

This project is a backend service that leverages PostgreSQL full-text search to find the most relevant answers to frequently asked questions (FAQs). It exposes a REST API suitable for chatbot integration and includes a small in-memory cache to speed up repeated queries.

## Prerequisites 📋

Before starting, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Docker](https://www.docker.com/) - Containerization platform
- [Docker Compose](https://docs.docker.com/compose/) - Orchestration for multi-container Docker applications
- [PostgreSQL](https://www.postgresql.org) - Relational Database

## Installation and Deployment 🔧📦

At the root of the project copy the example files and adjust the environment values to your needs:

```bash
cp .env.example .env
cp docker-compose.example.yml docker-compose.yml
```

_Ensure you have an instance of PostgreSQL running or let Docker Compose start one for you. Key variables include:_

- `POSTGRES_HOST`: `db` when using Docker Compose, `localhost` for local execution, or `host.docker.internal` when running the container directly.

1. **Local Development (npm):**

   ```bash
   git clone <repo-url>
   cd FAQs-nodejs-microservice
   npm install
   npm start
   ```

2. **Using Docker:**

   - Build the image:

     ```bash
     docker build -t my-node-app-name .
     ```

   - Run the container (passes environment from `.env`):

     ```bash
     docker run --env-file .env -p 3000:3000 my-node-app-name
     ```

3. **Using Docker Compose (recommended):**

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

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](./LICENSE) file for details.
