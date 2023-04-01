import React, { Fragment, useState } from 'react';
import { FormEvent } from 'react';
import * as Constants from '../../AppConstants';
import Label from '../generics/Label';

const ExerciseInput = (callback: any) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [pushPull, setPushPull] = useState('PUSH');
	const [upperLower, setUpperLower] = useState('UPPER');
	const [bodyPart, setBodyPart] = useState('ABS');

	const onSubmitForm = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const exerciseInput = {
				name: name,
				description: description,
				pushPull: pushPull,
				upperLower: upperLower,
				bodyPart: bodyPart,
			};
			const promise = await fetch(Constants.baseUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `
						mutation addExercise($input: ExerciseInput){
							add(input: $input) {
								id
							}
						}
					`,
					variables: { input: exerciseInput },
				}),
			});
			const response = await promise.json();
			const data = response?.data;
			console.log(data);
			if (!data.error) {
				callback.callback();
			}
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
					<div className='coreInfo'>
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
					</div>
					<div className='auxiliaryInfo'>
						<select
							className='pushPull dropdown'
							onChange={(e) => setPushPull(e.target.value)}>
							<option value='PUSH'>Push</option>
							<option value='PULL'>Pull</option>
						</select>
						<select
							className='upperLower dropdown'
							onChange={(e) => setUpperLower(e.target.value)}>
							<option value='UPPER'>Upper</option>
							<option value='LOWER'>Lower</option>
							<option value='CORE'>Core</option>
						</select>
						<select
							className='bodyPart dropdown'
							onChange={(e) => setBodyPart(e.target.value)}>
							<option value='ABS'>Abs</option>
							<option value='BACK'>Back</option>
							<option value='BIS'>Biceps</option>
							<option value='CALVES'>Calves</option>
							<option value='CHEST'>Chest</option>
							<option value='HAMS'>Hamstrings</option>
							<option value='QUADS'>Quads</option>
							<option value='SHOULDERS'>Shoulders</option>
							<option value='TRIS'>Triceps</option>
						</select>
					</div>
					<div className='addButtonDiv'>
						<button className='button addButton'>Add</button>
					</div>
				</form>
			</div>
		</Fragment>
	);
};

export default ExerciseInput;
