import {Constants} from '../constants';
import {Utils} from '../utils';

/**
 * Object representation of a marker meta event.
 * @param {string} text - Marker text
 * @return {MarkerEvent}
 */
class MarkerEvent {
	constructor(text) {
		this.type = 'marker';

		const textBytes = Utils.stringToBytes(text);

		// Start with zero time delta
		this.data = Utils.numberToVariableLength(0x00).concat(
			Constants.META_EVENT_ID,
			Constants.META_MARKER_ID,
			Utils.numberToVariableLength(textBytes.length), // Size
			textBytes, // Text
		);
	}
}

export {MarkerEvent};
