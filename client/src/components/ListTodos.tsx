import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';
import { Todo } from '../entity/Todo';
import * as Constants from '../AppConstants';

const ListTodos = () => {
	const [todos, setTodos] = useState([]);

	const getTodos = async () => {
		try {
			const promise = await fetch(Constants.baseUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `
						query {
							todos {
								id
								description
							}
						}
					`,
					variables: {},
				}),
			});
			const response = await promise.json();
			const data = response?.data?.todos;
			if (data) {
				setTodos(data);
				console.log(`Successfully got todos ${data}`);
			} else {
				console.error(`Unable to get todos ${data}`);
			}
		} catch (e: any) {
			console.error(e.message);
		}
	};

	const deleteTodo = async (id: Number) => {
		try {
			const promise = await fetch(Constants.baseUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `
						mutation deleteTodo($id: ID!){
							delete(input: {id: $id}) {
								description
							}
						}
					`,
					variables: { id: id },
				}),
			});
			const response = await promise.json();
			const data = response?.data;
			if (data) {
				setTodos(todos.filter((todo: Todo) => todo.id !== id));
			} else {
				console.error(`Unable to delete todo ${id}`);
			}
			console.log(data);
		} catch (e: any) {
			console.error(e.message);
		}
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<Fragment>
			<table className='table mt-5 text-center'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Description</th>
						<td>Edit</td>
						<td>Delete</td>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo: Todo) => (
						<tr key={todo.id}>
							<td>{todo.id}</td>
							<td>{todo.description}</td>
							<td>
								<EditTodo {...todo} />
							</td>
							<td>
								<button
									className='btn btn-danger'
									onClick={() => deleteTodo(todo.id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Fragment>
	);
};

export default ListTodos;
