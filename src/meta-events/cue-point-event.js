import {Constants} from '../constants';
import {Utils} from '../utils';

/**
 * Object representation of a cue point meta event.
 * @param {string} text - Cue point text
 * @return {CuePointEvent}
 */
class CuePointEvent {
	constructor(text) {
		this.type = 'marker';

		const textBytes = Utils.stringToBytes(text);

		// Start with zero time delta
		this.data = Utils.numberToVariableLength(0x00).concat(
			Constants.META_EVENT_ID,
			Constants.META_CUE_POINT,
			Utils.numberToVariableLength(textBytes.length), // Size
			textBytes, // Text
		);
	}
}

export {CuePointEvent};
