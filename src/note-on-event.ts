/**
 * Holds all data for a "note on" MIDI event
 * @param {object} fields {data: []}
 */
class NoteOnEvent {
	data: number[];

	constructor(fields: NoteOnEvent) {
		this.data = fields.data;
	}
}