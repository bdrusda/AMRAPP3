import React, { Fragment, useEffect, useState } from 'react';
import ExerciseListView from './ExerciseListView';
import { Exercise } from '../../entity/Exercise';
import * as Constants from '../../AppConstants';

const ExerciseList = () => {
	const [exercises, setExercises] = useState([]);
	const [itemsToShow, setItemsToShow] = useState(10);

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

	const updateItemsToShow = (number: number) => {
		if (number == -1) number = 10000;
		setItemsToShow(number);
	};

	useEffect(() => {
		getExercises();
	}, []);

	return (
		// TODO create layout fragment for exercises
		<Fragment>
			<table className='table mt-5 text-center'>
				<tbody>
					{exercises.slice(0, itemsToShow).map((exercise: Exercise) => (
						<ExerciseListView {...exercise} />
					))}
				</tbody>
			</table>
			<div className='options'>
				<div
					className={`button optionButton showMore ${
						itemsToShow == 10 ? '' : 'hide'
					}`}
					onClick={() => updateItemsToShow(-1)}>
					Show More
				</div>
				<div
					className={`button optionButton showLess ${
						itemsToShow == 10 ? 'hide' : ''
					}`}
					onClick={() => updateItemsToShow(10)}>
					Show Less
				</div>
			</div>
		</Fragment>
	);
};

export default ExerciseList;
