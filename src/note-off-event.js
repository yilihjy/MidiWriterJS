/**
 * Holds all data for a "note off" MIDI event
 * @param {object} fields {data: []}
 * @return {NoteOffEvent}
 */
class NoteOffEvent {
	constructor(fields) {
		this.data = fields.data;
	}
}

exports.NoteOffEvent = NoteOffEvent;