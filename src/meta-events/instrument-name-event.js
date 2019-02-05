import {Constants} from '../constants';
import {Utils} from '../utils';

/**
 * Object representation of an instrument name meta event.
 * @param {number} bpm - Beats per minute
 * @return {InstrumentNameEvent}
 */
class InstrumentNameEvent {
	constructor(text) {
		this.type = 'instrument-name';

		const textBytes = Utils.stringToBytes(text);

		// Start with zero time delta
		this.data = Utils.numberToVariableLength(0x00).concat(
			Constants.META_EVENT_ID,
			Constants.META_INSTRUMENT_NAME_ID,
			Utils.numberToVariableLength(textBytes.length), // Size
			textBytes, // Instrument name
		);
	}
}

export {InstrumentNameEvent};
