// mORM
import { wrap } from '@mikro-orm/core';

const { Exercise } = require('../../mikroOrm/entity/Exercise');

export const findExercise = async (db: any, id: number) => {
	console.log(`Finding exercise with id ${id}`);
	let response = await db.exerciseRepo.findOne(id);
	console.log(response);
	return response;
};

export const findExercises = async (db: any, input: any) => {
	let response;
	let name = input?.name;
	let pushPull = input?.pushPull;
	let upperLower = input?.upperLower;
	let bodyPart = input?.bodyPart;
	if (name) {
		// TODO going to have to figure out how to do a partial match here
		console.log(`Finding exercises that match name ${name}`);
		// TODO implement
	} else if (pushPull) {
		console.log(`Finding exercises by pushPull ${pushPull}`);
		response = await db.exerciseRepo.find(pushPull);
		// TODO implement
	} else if (upperLower) {
		console.log(`Finding exercises by upperLower ${upperLower}`);
		response = await db.exerciseRepo.find(upperLower);
		// TODO implement
	} else if (bodyPart) {
		console.log(`Finding exercises by bodyPart ${bodyPart}`);
		response = await db.exerciseRepo.find(bodyPart);
		// TODO implement
	} else {
		console.log(`Finding all exercises`);
		response = await db.exerciseRepo.find();
	}
	console.log(response);

	return response;
};

export const addExercise = async (
	db: any,
	id: number,
	name: string,
	description: string,
	upperLower: string,
	pushPull: string,
	bodyPart: string
) => {
	console.log(
		`Add exercise with id ${id}, name: ${name}, description ${description}, 
		upper lower ${upperLower}, push pull ${pushPull}, body part ${bodyPart}`
	);
	let exercise: typeof Exercise;
	// TODO do we want to try/catch everything? maybe we can just error check better, idk
	try {
		if (id) {
			console.log(
				`Updating exercise with id ${id}, name: ${name}, description ${description}, 
				upper lower ${upperLower}, push pull ${pushPull}, body part ${bodyPart}`
			);
			// We do not need to persist this entity because it was returned by the EM.  It is automatically tracked
			exercise = await db.exerciseRepo.findOne({ id: id });
			if (exercise) {
				wrap(exercise).assign({
					name: name || exercise.name,
					description: description || exercise.description,
					pushPull: pushPull || exercise.pushPull,
					upperLower: upperLower || exercise.upperLower,
					bodyPart: bodyPart || exercise.bodyPart,
				});
			}
		} else {
			console.log(
				`Creating new exercise with id ${id}, name: ${name}, description ${description}, 
				upper lower ${upperLower}, push pull ${pushPull}, body part ${bodyPart}`
			);
			exercise = new Exercise(
				name,
				description,
				pushPull,
				upperLower,
				bodyPart
			);
			await db.exerciseRepo.persist(exercise);
		}
		await db.exerciseRepo.flush();
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
				console.log(`Successfully exercise exercise with id ${id}`);
			} else {
				console.log(`No record found, unable to delete exercise with id ${id}`);
			}
		} else {
			console.error('Unable to delete exercise, no id provided');
		}
		await db.exerciseRepo.flush();
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
