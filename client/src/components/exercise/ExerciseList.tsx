import React, { Fragment, useEffect, useState } from 'react';
import ExerciseListView from './ExerciseListView';
import { Exercise } from '../../entity/Exercise';
import * as Constants from '../../AppConstants';

const ExerciseList = (exerciseInfo: any) => {
	const exercises = exerciseInfo.exercises;
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
