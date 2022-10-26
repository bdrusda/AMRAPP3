import React, { Fragment } from 'react';

// components
import ExerciseInput from './ExerciseInput';
import ExerciseList from './ExerciseList';

function ExercisePage() {
	return (
		<Fragment>
			<div className='exercisePage softEdges'>
				<h1 className='text-center mt-5 title'>Exercise List</h1>
				<ExerciseInput />
				<ExerciseList />
			</div>
		</Fragment>
	);
}

export default ExercisePage;
