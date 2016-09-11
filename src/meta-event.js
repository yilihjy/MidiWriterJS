class MetaEvent {
	constructor(fields) {
		this.type = 'meta';
		this.data = Utils.numberToVariableLength(0x00);// Start with zero time delta
		this.data = this.data.concat(Constants.META_EVENT_ID, fields.data);
	}
}

exports.MetaEvent = MetaEvent;