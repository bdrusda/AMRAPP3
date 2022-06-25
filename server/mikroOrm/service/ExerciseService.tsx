// mORM
import { wrap } from '@mikro-orm/core';

const { Exercise } = require('../../mikroOrm/entity/Exercise');

export const findExercise = async (db: any, id: number) => {
	console.log(`Finding exercise with id ${id}`);
	let response = await db.exerciseRepo.findOne(id);
	console.log(response);
	return response;
};

export const findExercises = async (db: any) => {
	console.log(`Finding all exercisex`);
	let response = await db.exerciseRepo.find();
	console.log(response);
	return response;
};

export const addExercise = async (
	db: any,
	id: number,
	name: string,
	description: string,
	bodyPart: string
) => {
	console.log(
		`Add exercise with id ${id}, name: ${name}, description ${description}, body part ${bodyPart}`
	);
	let exercise: typeof Exercise;
	// TODO do we want to try/catch everything? maybe we can just error check better, idk
	try {
		if (id) {
			console.log(
				`Updating exercise ${id} with name: ${name}, description ${description}, body part ${bodyPart}`
			);
			// We do not need to persist this entity because it was returned by the EM.  It is automatically tracked
			exercise = await db.exerciseRepo.findOne({ id: id });
			if (exercise) {
				wrap(exercise).assign({
					name: name || exercise.name,
					description: description || exercise.description,
					bodyPart: bodyPart || exercise.bodyPart,
				});
			}
		} else {
			console.log(
				`Creating new exercise with name: ${name}, description ${description}, body part ${bodyPart}`
			);
			exercise = new Exercise(name, description, bodyPart);
			await db.todoRepo.persist(exercise);
		}
		await db.todoRepo.flush();
	} catch (e: any) {
		console.error(e.message);
	}
	return exercise;
};

export const deleteExercise = async (db: any, id: number) => {
	console.log(`Deleting exercise with id ${id}`);
	try {
		if (id) {
			console.log('Deleting exercise with id ' + id);
			let response = await db.exerciseRepo.nativeDelete({ id: id });
			if (response) {
				console.log(`Successfully exercise todo with id ${id}`);
			} else {
				console.log(`No record found, unable to delete exercise with id ${id}`);
			}
		} else {
			console.error('Unable to delete exercise, no id provided');
		}
		await db.todoRepo.flush();
	} catch (e: any) {
		console.error(e.message);
	}
	return;
};

module.exports = {
	findExercise,
	findExercises,
	addExercise,
	deleteExercise,
};
