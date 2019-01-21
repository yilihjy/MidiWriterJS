import {Constants} from './constants';
import {Utils} from './utils';

/**
 * Object representation of a tempo meta event.
 * @param {string} text - Copyright text
 * @return {CopyrightEvent}
 */
class CopyrightEvent {
	constructor(text) {
		this.type = 'copyright';

		const textBytes = Utils.stringToBytes(text);

		// Start with zero time delta
		this.data = Utils.numberToVariableLength(0x00).concat(
			Constants.META_EVENT_ID,
			Constants.META_COPYRIGHT_ID,
			Utils.numberToVariableLength(textBytes.length), // Size
			textBytes, // Text
		);
	}
}

export {CopyrightEvent};
