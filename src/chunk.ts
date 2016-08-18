class Chunk {
	type: string;
	data: number[];
	size: number[];

	constructor(fields: any) {
		this.type = fields.type;
		this.data = fields.data;
		this.size = [0, 0, 0, fields.data.length];
	}
}