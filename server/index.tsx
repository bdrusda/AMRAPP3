// basic imports
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

// mikro orm
import { initializeORM } from './mikroOrm/bootstrap';
import { RequestContext, MikroORM } from '@mikro-orm/core';

const app = express();

//gql
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');

const port = 3013;

export interface DBRequest extends Request {
	db?: any;
}

(async () => {
	const DB = await initializeORM();
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use((req: DBRequest, res: Response, next: NextFunction) => {
		RequestContext.create(DB.orm.em, next);
		req.db = DB;
	});

	//gql
	app.use(
		'/amrapp',
		graphqlHTTP({
			schema,
			context: { db: DB },
			graphiql: true,
		})
	);

	app.listen(port, () => {
		console.log('server has started on port ' + port);
	});
})();
