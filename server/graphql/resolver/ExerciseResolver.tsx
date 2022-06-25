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
	exercises: async (parent: any, args: any, context: any) => {
		return findExercises(context.db);
	},
};

export const Mutation = {
	add: async (parent: any, args: any, context: any) => {
		return addExercise(
			context.db,
			args.input.id,
			args.input.name,
			args.input.description,
			args.input.bodyPart
		);
	},
	delete: async (parent: any, args: any, context: any) => {
		return deleteExercise(context.db, args.input.id);
	},
};

module.exports = { Query, Mutation };
