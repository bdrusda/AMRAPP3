// This forces us to declare all of our variables
'use strict';

import { Entity, EntitySchema } from '@mikro-orm/core';
import { Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Exercise extends BaseEntity {
	@Property({ type: 'string', nullable: true })
	name: string;
	@Property({ type: 'string', nullable: true })
	description?: string;
	@Property({ type: 'string', nullable: true })
	bodyPart?: string;

	constructor(name: string, description: string, bodyPart: string) {
		super();
		this.name = name;
		this.description = description;
		this.bodyPart = bodyPart;
	}
}

export const schema = new EntitySchema<Exercise, BaseEntity>({
	class: Exercise,
	extends: 'BaseEntity',
	properties: {
		name: { type: 'string' },
		description: { type: 'string' },
		bodyPart: { type: 'string' },
	},
});

const metadata = {
	Exercise,
	entity: Exercise,
	schema,
	label: 'exerciseRepo',
};

export default metadata;
