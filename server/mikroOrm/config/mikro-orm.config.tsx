import { Options } from '@mikro-orm/core';
// const entities = require('./entity');
import { BaseEntity } from '../entity/BaseEntity';
import { Exercise } from '../entity/Exercise';

const config: Options = {
	type: 'postgresql',
	clientUrl: 'http://localhost',
	port: 5432,
	dbName: 'amrapp',
	user: 'admin',
	password: 'admin',
	entities: [BaseEntity, Exercise],
};

export default config;

module.exports = config;
