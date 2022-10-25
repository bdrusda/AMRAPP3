import React, { Fragment } from 'react';

// components
import ExerciseInput from './ExerciseInput';
import ExerciseList from './ExerciseList';

function ExercisePage() {
	return (
		<Fragment>
			<div className='exercisePage'>
				<h1 className='text-center mt-5'>Exercise List</h1>
				<ExerciseInput />
				<ExerciseList />
			</div>
		</Fragment>
	);
}

export default ExercisePage;
