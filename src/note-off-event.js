/**
 * Holds all data for a "note off" MIDI event
 * @param {object} fields {data: []}
 */
class NoteOffEvent {
	//data: number[];

	constructor(fields) {
		this.data = fields.data;
	}
}

exports.NoteOffEvent = NoteOffEvent;