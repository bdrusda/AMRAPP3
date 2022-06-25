import React, { Fragment, useState } from 'react';
import { Todo } from '../entity/Todo';
import * as Constants from '../AppConstants';

const EditTodo = (todo: Todo) => {
	// Our descripton variable is maintained by the setDescription method and init'd by useState here(?)
	const [description, setDescription] = useState(todo.description || '');
	const editTodo = async (e: React.MouseEvent) => {
		try {
			const promise = await fetch(Constants.baseUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `
						mutation addTodo($id: ID!, $description: String!){
							add(input: {id: $id, description: $description}) {
								id
								description
							}
						}
					`,
					variables: { id: todo.id, description: description },
				}),
			});
			const response = await promise.json();
			const data = response?.data;
			console.log(data);
			window.location.href = '/';
		} catch (e: any) {
			if (e instanceof Error) {
				console.error(e.message);
			}
		}
	};

	return (
		<Fragment>
			<button
				type='button'
				className='btn btn-primary'
				// Bootstrap item - Toggles our modal when clicked and has a set id so we know which todo this is
				data-bs-toggle='modal'
				// Bootstrap item - Takes in a css selector that points to the html element we want to change
				data-bs-target={`#id${todo.id}`}>
				Edit
			</button>

			<div
				className='modal fade'
				id={`id${todo.id}`}
				tabIndex={-1}
				aria-labelledby='editModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='editModalLabel'>
								Edit Todo Description
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
								// On close we set description to original value
								onClick={() => setDescription(todo.description)}></button>
						</div>
						<div className='modal-body'>
							<input
								type='text'
								className='form-control'
								value={description}
								// On change to text field we update description accordingly
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-primary'
								// On save we call  editTodo which grabs our updated global description value
								onClick={(e) => editTodo(e)}>
								Save
							</button>
							<button
								type='button'
								className='btn btn-danger'
								data-bs-dismiss='modal'
								// On cancel we return description to its original value
								onClick={() => setDescription(todo.description)}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default EditTodo;
