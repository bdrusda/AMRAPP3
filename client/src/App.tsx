import React, { Fragment } from 'react';

// components
import ExerciseInput from './components/ExerciseInput';
import ExerciseList from './components/ExerciseList';

function App() {
	return (
		<Fragment>
			<div className='container'>
				<ExerciseInput />
				<ExerciseList />
			</div>
		</Fragment>
	);
}

export default App;
