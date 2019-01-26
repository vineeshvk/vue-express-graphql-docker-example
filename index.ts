import { ApolloServer, gql } from 'apollo-server-express';
import * as express from 'express';
import * as path from 'path';
import serveStatic = require('serve-static');

const typeDefs = gql`
	type Query {
		test(test: String): String
	}
`;
const resolvers = {
	Query: {
		test: (_, { test }, { user }) => {
			return test + user;
		}
	}
};
const app = express();

app.use((req, res, next) => {
	req.user = req.headers.authorization;
	next();
});

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context({ req } /* :{req:Request} */) {
		console.log(req.user + 'from context');

		return {
			user: req.user
		};
	}
});

server.applyMiddleware({ app, path: '/graphql' });

app.use(serveStatic(path.join(__dirname, '/dist/')));

app.get('*', (req, res) => {
	res.sendFile(__dirname + '/dist/index.html');
});

app.listen({ port: process.env.PORT || 3000 }, () => {
	console.log('Connected');
});
