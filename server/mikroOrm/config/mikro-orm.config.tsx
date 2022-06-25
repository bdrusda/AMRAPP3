import { Options } from '@mikro-orm/core';
// const entities = require('./entity');
import { BaseEntity } from '../entity/BaseEntity';
import { Todo } from '../entity/Todo';

const config: Options = {
	type: 'postgresql',
	clientUrl: 'http://localhost',
	port: 5432,
	dbName: 'perntodo',
	user: 'admin',
	password: 'admin',
	entities: [BaseEntity, Todo],
};

export default config;

module.exports = config;
