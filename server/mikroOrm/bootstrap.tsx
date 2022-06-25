// mikroorm
import mikroORMConfig from './config/mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';
// const entities = require('./entity');
import BaseEntity from './entity/BaseEntity';
import Todo from './entity/Exercise';

// TODO try to figure out why we need to do this and we can't just require the directory
const entities = [BaseEntity, Todo];

export const initializeORM = async () => {
	var DB: { [key: string]: any } = {};
	DB.orm = await MikroORM.init(mikroORMConfig);
	DB.em = DB?.orm?.em;
	// Loop through each of our entities
	for (const entity of entities) {
		// Skip the base entity
		if (entity.label === 'BaseEntity') {
			continue;
		}
		// Create an entry in DB for each entity - key is the label (entity name), value is the actual repository for the entity
		DB[entity.label] = await DB.orm.em.getRepository(entity.entity);
	}
	return DB;
};
