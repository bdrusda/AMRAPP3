import React, { Fragment, useState, useEffect } from 'react';

// components
import ExerciseInput from './ExerciseInput';
import ExerciseList from './ExerciseList';
import * as Constants from '../../AppConstants';

let exercises: any, setExercises: any;

const getExercises = async () => {
	try {
		const promise = await fetch(Constants.baseUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: `
					query {
						exercises {
							id
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

function ExercisePage() {
	[exercises, setExercises] = useState([]);
	useEffect(() => {
		getExercises();
	}, []);

	return (
		<Fragment>
			<div className='exercisePage softEdges'>
				<h1 className='text-center mt-5 title'>Exercise List</h1>
				<ExerciseInput getExercises={() => getExercises()} />
				<ExerciseList exerciseInfo={{ exercises, setExercises }} />
			</div>
		</Fragment>
	);
}

export default ExercisePage;
