// resolvers
import { Query, Mutation } from './resolver/ExerciseResolver';

//graphql file support
import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';

const gqlFiles = readdirSync(join(__dirname, './schema'));

let typeDefs = '';

gqlFiles.forEach((file: string) => {
	typeDefs += readFileSync(join(__dirname, './schema', file), {
		encoding: 'utf8',
	});
});

/* TODO if we have multiple resolvers we'll need to use something like this:
import _ from 'lodash'

export default _.merge(
  user,
  foo
)
*/

const resolvers = {
	Query,
	Mutation,
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

module.exports = schema;
