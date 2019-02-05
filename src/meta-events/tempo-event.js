import {Constants} from '../constants';
import {Utils} from '../utils';

/**
 * Object representation of a tempo meta event.
 * @param {number} bpm - Beats per minute
 * @return {TempoEvent}
 */
class TempoEvent {
	constructor(bpm) {
		this.type = 'tempo';

		const tempo = Math.round(60000000 / bpm);

		// Start with zero time delta
		this.data = Utils.numberToVariableLength(0x00).concat(
			Constants.META_EVENT_ID,
			Constants.META_TEMPO_ID,
			[0x03], // Size
			Utils.numberToBytes(tempo, 3), // Tempo, 3 bytes
		);
	}
}

export {TempoEvent};
