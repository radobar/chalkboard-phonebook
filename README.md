# Boilerplate source
Cloned the following repo to get a base for the project:
https://github.com/dyshaev-working/nodejs-nestjs-typescript-sqlite-passport-crud-example.git

# Reasoning
Wanted a solid base for an API that can easily run in a container
with development environment prepared for further extensions.

Next time might start a more barebones project to get basic functionality working and build on that

Might use basic nodejs http server instead of starting out with a framework.

# Description
Example simple Nest.js CRUD application

# Set of tools
Node.js, Nest.js, Docker, Sqlite, Typescript, Swagger

# To start application
1. npm install
2. docker-compose up -d sqlite
3. npm run migrate:up
4. docker-compose up -d app

 The application will be available at <b>http://localhost:3000/</b>
 
 Swagger documentation will be available at <b>http://localhost:3000/docs/</b>
 
