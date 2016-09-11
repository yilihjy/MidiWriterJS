class Chunk {
	constructor(fields) {
		this.type = fields.type;
		this.data = fields.data;
		this.size = [0, 0, 0, fields.data.length];
	}
}

exports.Chunk = Chunk;