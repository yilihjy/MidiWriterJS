/**
 * Holds all data for a "note on" MIDI event
 * @param {object} fields {data: []}
 * @return {NoteOnEvent}
 */
class NoteOnEvent {
	constructor(fields) {
		this.data = fields.data;
	}
}

exports.NoteOnEvent = NoteOnEvent;