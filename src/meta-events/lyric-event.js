import {Constants} from '../constants';
import {Utils} from '../utils';

/**
 * Object representation of a lyric meta event.
 * @param {string} text - Lyric text
 * @return {LyricEvent}
 */
class LyricEvent {
	constructor(text) {
		this.type = 'marker';

		const textBytes = Utils.stringToBytes(text);

		// Start with zero time delta
		this.data = Utils.numberToVariableLength(0x00).concat(
			Constants.META_EVENT_ID,
			Constants.META_LYRIC_ID,
			Utils.numberToVariableLength(textBytes.length), // Size
			textBytes, // Text
		);
	}
}

export {LyricEvent};
