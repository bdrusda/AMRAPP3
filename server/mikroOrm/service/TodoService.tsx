// mORM
import { wrap } from '@mikro-orm/core';

const { Todo } = require('../../mikroOrm/entity/Todo');

export const findTodo = async (db: any, id: number) => {
	console.log(`Finding todo with id ${id}`);
	let response = await db.todoRepo.findOne(id);
	console.log(response);
	return response;
};

export const findTodos = async (db: any) => {
	console.log(`Finding all todos`);
	let response = await db.todoRepo.find();
	console.log(response);
	return response;
};

export const addTodo = async (db: any, id: number, description: string) => {
	console.log(`Add todo with id ${id}, description ${description}`);
	let todo: typeof Todo;
	// TODO do we want to try/catch everything? maybe we can just error check better, idk
	try {
		if (id) {
			console.log(`Updating todo ${id} with description ${description}`);
			// We do not need to persist this entity because it was returned by the EM.  It is automatically tracked
			todo = await db.todoRepo.findOne({ id: id });
			if (todo) {
				wrap(todo).assign({
					description: description || todo.description,
				});
			}
		} else {
			console.log(`Creating new todo with description ${description}`);
			todo = new Todo(description);
			await db.todoRepo.persist(todo);
		}
		await db.todoRepo.flush();
	} catch (e: any) {
		console.error(e.message);
	}
	return todo;
};

export const deleteTodo = async (db: any, id: number) => {
	console.log(`Deleting todo with id ${id}`);
	try {
		if (id) {
			console.log('Deleting todo with id ' + id);
			let response = await db.todoRepo.nativeDelete({ id: id });
			if (response) {
				console.log(`Successfully deleted todo with id ${id}`);
			} else {
				console.log(`No record found, unable to delete todo with id ${id}`);
			}
		} else {
			console.error('Unable to delete todo, no id provided');
		}
		await db.todoRepo.flush();
	} catch (e: any) {
		console.error(e.message);
	}
	return;
};

module.exports = {
	findTodo,
	findTodos,
	addTodo,
	deleteTodo,
};
