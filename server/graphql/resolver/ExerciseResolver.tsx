import {
	findExercise,
	findExercises,
	addExercise,
	deleteExercise,
} from '../../mikroOrm/service/ExerciseService';

export const Query = {
	exercise: async (parent: any, args: any, context: any) => {
		return findExercise(context.db, args.id);
	},
	// TODO update this to use input - so we can send bodyPart and it will get all by bodyPart
	exercises: async (parent: any, args: any, context: any) => {
		return findExercises(context.db, args.input);
	},
};

export const Mutation = {
	add: async (parent: any, args: any, context: any) => {
		return addExercise(
			context.db,
			args.input.id,
			args.input.name,
			args.input.description,
			args.input.upperLower,
			args.input.pushPull,
			args.input.bodyPart
		);
	},
	delete: async (parent: any, args: any, context: any) => {
		return deleteExercise(context.db, args.input.id);
	},
};

module.exports = { Query, Mutation };
