import React, { Fragment, useEffect, useState } from 'react';
import EditExercise from './EditExercise';
import { Exercise } from '../../entity/Exercise';
import * as Constants from '../../AppConstants';

type ExerciseListViewData = {
	exercise: Exercise;
	filterIdCallback: any;
};

const ExerciseListView = (data: ExerciseListViewData) => {
	const exercise = data.exercise;
	const callback = data.filterIdCallback;

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
				callback(id);
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
			<tr className='exerciseListView softEdges' key={exercise.id}>
				<td className='exerciseNameSection'>
					<div className='exerciseName primaryText'>{exercise.name}</div>
				</td>
				<td className='exerciseDescriptorSection'>
					{/*<div>{exercise.description}</div>*/}
					<div className='primaryText'>{exercise.pushPull}</div>
					<div className='primaryText'>{exercise.upperLower}</div>
					<div className='primaryText'>{exercise.bodyPart}</div>
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

export default ExerciseListView;
