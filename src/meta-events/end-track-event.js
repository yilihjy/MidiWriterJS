import {Constants} from '../constants';
import {Utils} from '../utils';

/**
 * Object representation of a end track meta event.
 * @return {EndTrackEvent}
 */
class EndTrackEvent {
	constructor() {
		this.type = 'end-track';

		// Start with zero time delta
		this.data = Utils.numberToVariableLength(0x00).concat(
			Constants.META_EVENT_ID,
			Constants.META_END_OF_TRACK_ID
		);
	}
}

export {EndTrackEvent};
