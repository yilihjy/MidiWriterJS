import {Utils} from './utils';

/**
 * Holds all data for a "note on" MIDI event
 * @param {object} fields {data: []}
 * @return {NoteOnEvent}
 */
class NoteOnEvent {
	constructor(fields) {
		this.channel 	= fields.channel || 1;
		this.pitch 		= fields.pitch;
		this.wait 		= fields.wait || 0;
		this.velocity 	= fields.velocity || 50;
		this.data 		= fields.data;
		if (this.pitch) {
			this.buildData();
		}
	}

	/**
	 * Builds int array for this event.
	 * @return {NoteOnEvent}
	 */
	buildData() {
		this.data = Utils.numberToVariableLength(Utils.getTickDuration(this.wait))
					.concat(
							this.getStatusByte(),
							Utils.getPitch(this.pitch),
							Utils.convertVelocity(this.velocity)
					);

		return this;
	}

	/**
	 * Gets the note on status code based on the selected channel. 0x9{0-F}
	 * Note on at channel 0 is 0x90 (144)
	 * 0 = Ch 1
	 * @return {number}
	 */
	getStatusByte() {return 144 + this.channel - 1}
}

export {NoteOnEvent};
