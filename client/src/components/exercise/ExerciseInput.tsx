import React, { Fragment, useState } from 'react';
import { FormEvent } from 'react';
import * as Constants from '../../AppConstants';

const ExerciseInput = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [pushPull, setPushPull] = useState('');
	const [upperLower, setUpperLower] = useState('');
	const [bodyPart, setBodyPart] = useState('');

	const onSubmitForm = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const promise = await fetch(Constants.baseUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `
						mutation addExercise($input: ExerciseInput){
							add(input: {input: $input}) {
								id
							}
						}
					`,
					variables: {
						name: name,
						description: description,
						pushPull: pushPull,
						upperLower: upperLower,
						bodyPart: bodyPart,
					},
				}),
			});
			const response = await promise.json();
			const data = response?.data;
			console.log(data);
			window.location.href = '/';
		} catch (e: any) {
			console.error(e.message);
		}
	};

	return (
		<Fragment>
			<h1 className='text-center mt-5'>Exercise List</h1>
			<form className='d-flex mt-5' onSubmit={onSubmitForm}>
				<input
					type='text'
					className='form-control'
					value={description}
					// TODO lots to change here
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button className='btn btn-success'>Add</button>
			</form>
		</Fragment>
	);
};

export default ExerciseInput;
