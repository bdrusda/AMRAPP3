class Exercise {
	id: number;
	name: string;
	description: string;
	pushPull: string;
	upperLower: string;
	bodyPart: string;
	constructor(
		id: number,
		name: string,
		description: string,
		pushPull: string,
		upperLower: string,
		bodyPart: string
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.pushPull = pushPull;
		this.upperLower = upperLower;
		this.bodyPart = bodyPart;
	}
}

export { Exercise };
