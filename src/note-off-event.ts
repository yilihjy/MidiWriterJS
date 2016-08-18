/**
 * Holds all data for a "note off" MIDI event
 * @param {object} fields {data: []}
 */
class NoteOffEvent {
	data: number[];

	constructor(fields: NoteOffEvent) {
		this.data = fields.data;
	}
}