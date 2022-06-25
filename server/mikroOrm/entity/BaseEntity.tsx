import { EntitySchema } from '@mikro-orm/core';

import { PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';

export abstract class BaseEntity {
	@PrimaryKey({ type: 'number' })
	id!: number;

	@Property({ type: 'date' })
	createdDate = new Date();

	@Property({ type: 'date', onUpdate: () => new Date() })
	updatedDate = new Date();
}

const schema = new EntitySchema<BaseEntity>({
	name: 'BaseEntity',
	abstract: true,
	properties: {
		id: { type: 'number' },
		createdDate: { type: 'Date', onCreate: () => new Date() },
		updatedDate: { type: 'Date', onUpdate: () => new Date() },
	},
});

const metadata = {
	BaseEntity,
	entity: BaseEntity,
	schema,
	label: 'BaseEntity',
};

export default metadata;
