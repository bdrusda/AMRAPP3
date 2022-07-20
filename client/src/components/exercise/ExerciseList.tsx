import React, { Fragment, useEffect, useState } from 'react';
import ExerciseListView from './ExerciseListView';
import { Exercise } from '../../entity/Exercise';
import * as Constants from '../../AppConstants';

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

	// TODO we might need to see how to do delete and update list now that the exercise is encapsulated

	useEffect(() => {
		getExercises();
	}, []);

	return (
		// TODO create layout fragment for exercises
		<Fragment>
			<table className='table mt-5 text-center'>
				<tbody>
					{exercises.map((exercise: Exercise) => (
						<ExerciseListView {...exercise} />
					))}
				</tbody>
			</table>
		</Fragment>
	);
};

export default ExerciseList;
