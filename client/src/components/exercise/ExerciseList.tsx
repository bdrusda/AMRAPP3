import React, { Fragment, useEffect, useState } from 'react';
import ExerciseListView from './ExerciseListView';
import { Exercise } from '../../entity/Exercise';
import * as Constants from '../../AppConstants';

const ExerciseList = (data: any) => {
	const exerciseInfo = data.exerciseInfo;
	const exercises = exerciseInfo.exercises;
	const setExercises = exerciseInfo.setExercises;
	const [itemsToShow, setItemsToShow] = useState(10);

	const updateItemsToShow = (number: number) => {
		if (number == -1) number = 10000;
		setItemsToShow(number);
	};

	return (
		// TODO create layout fragment for exercises
		<Fragment>
			<table className='table mt-5 text-center'>
				<tbody>
					{exercises.slice(0, itemsToShow).map((exercise: Exercise) => (
						<ExerciseListView
							exercise={exercise}
							filterIdCallback={(id: any) => {
								setExercises(
									exercises.filter((exercise: Exercise) => exercise.id !== id)
								);
							}}
						/>
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
