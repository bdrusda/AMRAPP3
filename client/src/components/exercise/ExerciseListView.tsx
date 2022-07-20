import React, { Fragment, useEffect, useState } from 'react';
import EditExercise from './EditExercise';
import { Exercise } from '../../entity/Exercise';
import * as Constants from '../../AppConstants';

const ExerciseList = (exercise: Exercise) => {
	const [exercises, setExercises] = useState([]);

	const deleteExercise = async (id: Number) => {
		try {
			const promise = await fetch(Constants.baseUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `
						mutation deleteExercise($id: ID!){
							delete(input: {id: $id}) {
								id
							}
						}
					`,
					variables: { id: id },
				}),
			});
			const response = await promise.json();
			const data = response?.data;
			if (data) {
				setExercises(
					exercises.filter((exercise: Exercise) => exercise.id !== id)
				);
			} else {
				console.error(`Unable to delete exercise ${id}`);
			}
			console.log(data);
		} catch (e: any) {
			console.error(e.message);
		}
	};

	useEffect(() => {}, []);

	return (
		<Fragment>
			<tr key={exercise.id}>
				<td className='exerciseNameSection'>
					<div className='exerciseName'>{exercise.name}</div>
				</td>
				<td className='exerciseDescriptorSection'>
					{/*<div>{exercise.description}</div>*/}
					<div>{exercise.pushPull}</div>
					<div>{exercise.upperLower}</div>
					<div>{exercise.bodyPart}</div>
				</td>
				<td className='exerciseMutatorSection'>
					<div>
						<EditExercise {...exercise} />
					</div>
					<div>
						<button
							className='btn btn-danger'
							onClick={() => deleteExercise(exercise.id)}>
							Delete
						</button>
					</div>
				</td>
			</tr>
		</Fragment>
	);
};

export default ExerciseList;
