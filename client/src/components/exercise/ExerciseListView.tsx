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
			<tr className='exerciseListView' key={exercise.id}>
				<td className='exerciseNameSection'>
					<div className='exerciseName darkBlueText'>{exercise.name}</div>
				</td>
				<td className='exerciseDescriptorSection'>
					{/*<div>{exercise.description}</div>*/}
					<div className='darkBlueText'>{exercise.pushPull}</div>
					<div className='darkBlueText'>{exercise.upperLower}</div>
					<div className='darkBlueText'>{exercise.bodyPart}</div>
				</td>
				<td className='exerciseMutatorSection'>
					<div>
						<EditExercise {...exercise} />
					</div>
					<div>
						<button
							className='button deleteButton'
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
