/**
 * Object representation of the chunk section of a MIDI file.
 * @param {object} fields - {type: number, data: array, size: array}
 * @return {Chunk}
 */
class Chunk {
	constructor(fields) {
		this.type = fields.type;
		this.data = fields.data;
		this.size = [0, 0, 0, fields.data.length];
	}
}

exports.Chunk = Chunk;