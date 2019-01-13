import {Utils} from './utils';

/**
 * Holds all data for a "note off" MIDI event
 * @param {object} fields {data: []}
 * @return {NoteOffEvent}
 */
class NoteOffEvent {
	constructor(fields) {
		this.channel 	= fields.channel || 1;
		this.pitch 		= fields.pitch;
		this.duration 	= fields.duration;
		this.velocity 	= fields.velocity || 50;
		this.data 		= fields.data;
		if (this.pitch) {
			this.buildData();
		}		
	}

	/**
	 * Builds int array for this event.
	 * @return {NoteOffEvent}
	 */
	buildData() {
		this.data = Utils.numberToVariableLength(Utils.getTickDuration(this.duration))
					.concat(
							this.getStatusByte(),
							Utils.getPitch(this.pitch),
							Utils.convertVelocity(this.velocity)
					);

		return this;
	}

	/**
	 * Gets the note off status code based on the selected channel. 0x8{0-F}
	 * Note off at channel 0 is 0x80 (128)
	 * 0 = Ch 1
	 * @return {number}
	 */
	getStatusByte() {return 128 + this.channel - 1}
}

export {NoteOffEvent};
