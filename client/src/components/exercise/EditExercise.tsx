import React, { Fragment, useState } from 'react';
import { Exercise } from '../../entity/Exercise';
import * as Constants from '../../AppConstants';

const EditExercise = (exercise: Exercise) => {
	// Our descripton variable is maintained by the setDescription method and init'd by useState here(?)
	const [name, setName] = useState(exercise.name || '');
	const [description, setDescription] = useState(exercise.description || '');
	const [pushPull, setPushPull] = useState(exercise.pushPull || '');
	const [upperLower, setUpperLower] = useState(exercise.upperLower || '');
	const [bodyPart, setBodyPart] = useState(exercise.bodyPart || '');
	const editExercise = async (e: React.MouseEvent) => {
		try {
			const promise = await fetch(Constants.baseUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `
						mutation addExercise($input: ExerciseInput!){
							add(input: $input}) {
								id
							}
						}
					`,
					variables: {
						id: exercise.id,
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
			if (e instanceof Error) {
				console.error(e.message);
			}
		}
	};

	return (
		<Fragment>
			<button
				type='button'
				className='button'
				// Bootstrap item - Toggles our modal when clicked and has a set id so we know which exercise this is
				data-bs-toggle='modal'
				// Bootstrap item - Takes in a css selector that points to the html element we want to change
				data-bs-target={`#id${exercise.id}`}>
				Edit
			</button>

			<div
				className='modal fade'
				id={`id${exercise.id}`}
				tabIndex={-1}
				aria-labelledby='editModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='editModalLabel'>
								Edit Exercise Description
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
								// On close we set description to original value	// TODO we need to do much more here
								onClick={() => setDescription(exercise.description)}></button>
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
								className='button'
								// On save we call  editExercise which grabs our updated global description value
								onClick={(e) => editExercise(e)}>
								Save
							</button>
							<button
								type='button'
								className='button deleteButton'
								data-bs-dismiss='modal'
								// On cancel we return description to its original value
								onClick={() => setDescription(exercise.description)}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default EditExercise;
