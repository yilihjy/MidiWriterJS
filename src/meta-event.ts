class MetaEvent {
	type: string;
	data: number[];
	
	constructor(fields: any) {
		this.type = 'meta';
		this.data = MidiWriter.numberToVariableLength(0x00);// Start with zero time delta
		this.data = this.data.concat(Constants.META_EVENT_ID, fields.data);
	}
}