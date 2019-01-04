import {Constants} from './constants';
import {Utils} from './utils';

/**
 * Holds all data for a "program change" MIDI event
 * @param {object} fields {instrument: integer}
 * @return {ProgramChangeEvent}
 */
class ProgramChangeEvent {
	constructor(fields) {
		this.type = 'program';
		// delta time defaults to 0.
		this.data = Utils.numberToVariableLength(0x00).concat(Constants.PROGRAM_CHANGE_STATUS, fields.instrument);
	}
}

export {ProgramChangeEvent};
