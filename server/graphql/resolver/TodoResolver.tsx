import {
	findTodo,
	findTodos,
	addTodo,
	deleteTodo,
} from '../../mikroOrm/service/TodoService';

export const Query = {
	todo: async (parent: any, args: any, context: any) => {
		return findTodo(context.db, args.id);
	},
	todos: async (parent: any, args: any, context: any) => {
		return findTodos(context.db);
	},
};

export const Mutation = {
	add: async (parent: any, args: any, context: any) => {
		return addTodo(context.db, args.input.id, args.input.description);
	},
	delete: async (parent: any, args: any, context: any) => {
		return deleteTodo(context.db, args.input.id);
	},
};

module.exports = { Query, Mutation };
