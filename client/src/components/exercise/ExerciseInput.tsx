import React, { Fragment, useState } from 'react';
import { FormEvent } from 'react';
import * as Constants from '../../AppConstants';
import Label from '../generics/Label';

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
	//<Label {...{ name: 'name', text: 'text' }} />

	return (
		<Fragment>
			<div className='exerciseAdd softEdges'>
				<div className='heading'>Add an exercise</div>
				<form className='exerciseForm' onSubmit={onSubmitForm}>
					<Label {...{ name: 'Name', id: 'exerciseAddNameLabel' }} />
					<input
						type='text'
						className='form-control'
						id='exerciseAddName'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Label
						{...{ name: 'Description', id: 'exerciseAddDescriptionLabel' }}
					/>
					<input
						type='text'
						className='form-control'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<button className='button addButton'>Add</button>
				</form>
			</div>
		</Fragment>
	);
};

export default ExerciseInput;
