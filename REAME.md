# vue-express-graphql-docker-example

It is a express server example which routes to vue and graphql which is dockerized and deployed to heroku.

https://demo-docker-server.herokuapp.com/

graphql-playground https://demo-docker-server.herokuapp.com/graphql

### How to run

Should have docker installed and then

```
docker build -t veqd-example .
```

```
docker run -p 3000:3000 veqd-example:latest
```

now the server will start in **http://localhost:3000**
