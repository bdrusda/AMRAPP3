// mORM
import { wrap, QueryOrder } from '@mikro-orm/core';

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

	let queryParams = {} as any;
	if (name) queryParams.name = { $like: `%${name}%` };
	if (pushPull) queryParams.pushPull = pushPull;
	if (upperLower) queryParams.upperLower = upperLower;
	if (bodyPart) queryParams.bodyPart = bodyPart;

	console.log(`Finding all by queryParams: ${JSON.stringify(queryParams)}`);
	response = await db.exerciseRepo.find(queryParams, {
		orderBy: { name: QueryOrder.ASC },
	});

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
				console.log(`Successfully deleted exercise with id ${id}`);
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
