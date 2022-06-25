// This forces us to declare all of our variables
'use strict';

import { Entity, EntitySchema } from '@mikro-orm/core';
import { Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Todo extends BaseEntity {
	@Property({ type: 'string', nullable: true })
	description?: string;

	constructor(description: string) {
		super();
		this.description = description;
	}
}

export const schema = new EntitySchema<Todo, BaseEntity>({
	class: Todo,
	extends: 'BaseEntity',
	properties: { description: { type: 'string' } },
});

const metadata = {
	Todo,
	entity: Todo,
	schema,
	label: 'todoRepo',
};

export default metadata;
