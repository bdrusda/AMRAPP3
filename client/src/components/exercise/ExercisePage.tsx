import React, { Fragment } from 'react';

// components
import ExerciseInput from './ExerciseInput';
import ExerciseList from './ExerciseList';

function ExercisePage() {
	return (
		<Fragment>
			<div className='exercisePage'>
				<ExerciseInput />
				<ExerciseList />
			</div>
		</Fragment>
	);
}

export default ExercisePage;
