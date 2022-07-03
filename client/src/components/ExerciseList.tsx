import React, { Fragment, useEffect, useState } from 'react';
import EditExercise from './EditExercise';
import { Exercise } from '../entity/Exercise';
import * as Constants from '../AppConstants';

const ExerciseList = () => {
	const [exercises, setExercises] = useState([]);

	const getExercises = async () => {
		try {
			const promise = await fetch(Constants.baseUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `
						query {
							exercises {
								name
								description
								pushPull
								upperLower
								bodyPart
							}
						}
					`,
					variables: {},
				}),
			});
			const response = await promise.json();
			const data = response?.data?.exercises;
			if (data) {
				setExercises(data);
				console.log(`Successfully got exercises ${data}`);
			} else {
				console.error(`Unable to get exercises ${data}`);
			}
		} catch (e: any) {
			console.error(e.message);
		}
	};

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

	useEffect(() => {
		getExercises();
	}, []);

	return (
		// TODO create layout fragment for exercises
		<Fragment>
			<table className='table mt-5 text-center'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Push/Pull</th>
						<th>Upper/Lower</th>
						<th>Body Part</th>
						<td>Edit</td>
						<td>Delete</td>
					</tr>
				</thead>
				<tbody>
					{exercises.map((exercise: Exercise) => (
						<tr key={exercise.id}>
							<td>{exercise.name}</td>
							<td>{exercise.description}</td>
							<td>{exercise.pushPull}</td>
							<td>{exercise.upperLower}</td>
							<td>{exercise.bodyPart}</td>
							<td>
								<EditExercise {...exercise} />
							</td>
							<td>
								<button
									className='btn btn-danger'
									onClick={() => deleteExercise(exercise.id)}>
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

export default ExerciseList;
