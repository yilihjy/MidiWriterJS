import {Constants} from './constants';
import {Utils} from './utils';

/**
 * Object representation of a tempo meta event.
 * @param {number} bpm - Beats per minute
 * @return {TextEvent}
 */
class TextEvent {
	constructor(text) {
		this.type = 'text';

		const textBytes = Utils.stringToBytes(text);

		// Start with zero time delta
		this.data = Utils.numberToVariableLength(0x00).concat(
			Constants.META_EVENT_ID,
			Constants.META_TEXT_ID,
			Utils.numberToVariableLength(textBytes.length), // Size
			textBytes, // Text
		);
	}
}

export {TextEvent};
