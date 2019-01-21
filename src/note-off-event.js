import {Utils} from './utils';

/**
 * Holds all data for a "note off" MIDI event
 * @param {object} fields {data: []}
 * @return {NoteOffEvent}
 */
class NoteOffEvent {
	constructor(fields) {
		this.type 		= 'note-off';
		this.channel 	= fields.channel || 1;
		this.pitch 		= fields.pitch;
		this.duration 	= fields.duration;
		this.velocity 	= fields.velocity || 50;
		this.noteOnTick = fields.noteOnTick || null;

		this.midiNumber = Utils.getPitch(this.pitch);
		this.tick 		= null;
		this.delta 		= Utils.getTickDuration(this.duration);
		this.data 		= fields.data;	
	}

	/**
	 * Builds int array for this event.
	 * @return {NoteOffEvent}
	 */
	buildData(track, eventIndex) {
		if (this.noteOnTick) {
			this.tick = this.noteOnTick + Utils.getTickDuration(this.duration);

		} else {
			this.tick = track.tickPointer;
		}

		this.data = Utils.numberToVariableLength(this.delta)
					.concat(
							this.getStatusByte(),
							this.midiNumber,
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
