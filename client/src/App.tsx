import React, { Fragment } from 'react';

// components
import ExerciseInput from './components/exercise/ExerciseInput';
import ExerciseList from './components/exercise/ExerciseList';

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
