class ProgramChangeEvent {
	constructor(fields) {
		this.type = 'program';
		// delta time defaults to 0.
		this.data = Utils.numberToVariableLength(0x00).concat(Constants.PROGRAM_CHANGE_STATUS, fields.instrument);
	}
}

exports.ProgramChangeEvent = ProgramChangeEvent;