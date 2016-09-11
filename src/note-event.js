class NoteEvent {
	/*
	type: string;
	pitch: any;
	wait: string | number;
	duration: string;
	sequential: boolean;
	velocity: number;
	channel: number;
	repeat: number;
	data: number[];
	*/

	/**
	 * Wrapper for noteOnEvent/noteOffEvent objects that builds both events.
	 * duration values: 4:quarter, 3:triplet quarter, 2: half, 1: whole
	 * @param {object} fields {pitch: '[C4]', duration: '4', wait: '4', velocity: 1-100}
	 */
	constructor(fields) {
		this.type 		= 'note';
		this.pitch 		= fields.pitch;
		this.wait 		= fields.wait || 0;
		this.duration 	= fields.duration;
		this.sequential = fields.sequential || false;
		this.velocity 	= fields.velocity || 50;
		this.channel 	= fields.channel || 1;
		this.repeat 	= fields.repeat || 1;
		this.velocity 	= this.convertVelocity(this.velocity);
		this.buildData();
	}


	buildData() {
		this.data = [];

		// Need to apply duration here.  Quarter note == Constants.HEADER_CHUNK_DIVISION
		// Rounding only applies to triplets, which the remainder is handled below
		var quarterTicks = Utils.numberFromBytes(Constants.HEADER_CHUNK_DIVISION);
		var tickDuration = Math.round(quarterTicks * this.getDurationMultiplier(this.duration, 'note'));
		var restDuration = Math.round(quarterTicks * this.getDurationMultiplier(this.wait, 'rest'));

		// fields.pitch could be an array of pitches.
		// If so create note events for each and apply the same duration.
		var noteOn, noteOff;
		if (Array.isArray(this.pitch)) {
			// By default this is a chord if it's an array of notes that requires one NoteOnEvent.
			// If this.sequential === true then it's a sequential string of notes that requires separate NoteOnEvents.
			if ( ! this.sequential) {
				// Handle repeat
				for (var j = 0; j < this.repeat; j++) {
					// Note on
					this.pitch.forEach(function(p, i) {
						if (i == 0) {
							noteOn = new NoteOnEvent({data: Utils.numberToVariableLength(restDuration).concat(this.getNoteOnStatus(), Utils.getPitch(p), this.velocity)});

						} else {
							// Running status (can ommit the note on status)
							noteOn = new NoteOnEvent({data: [0, Utils.getPitch(p), this.velocity]});
						}

						this.data = this.data.concat(noteOn.data);
					}, this);

					// Note off
					this.pitch.forEach(function(p, i) {
						if (i == 0) {
							noteOff = new NoteOffEvent({data: Utils.numberToVariableLength(tickDuration).concat(this.getNoteOffStatus(), Utils.getPitch(p), this.velocity)});

						} else {
							// Running status (can ommit the note off status)
							noteOff = new NoteOffEvent({data: [0, Utils.getPitch(p), this.velocity]});
						}

						this.data = this.data.concat(noteOff.data);
					}, this);
				}

			} else {
				// Handle repeat
				for (var j = 0; j < this.repeat; j++) {
					this.pitch.forEach(function(p, i) {
						// restDuration only applies to first note
						if (i > 0) {
							restDuration = 0;
						}

						// If duration is 8th triplets we need to make sure that the total ticks == quarter note.
						// So, the last one will need to be the remainder
						if (this.duration === '8t' && i == this.pitch.length - 1) {
							tickDuration = quarterTicks - (tickDuration * 2);
						}

						noteOn = new NoteOnEvent({data: Utils.numberToVariableLength(restDuration).concat([this.getNoteOnStatus(), Utils.getPitch(p), this.velocity])});
						noteOff = new NoteOffEvent({data: Utils.numberToVariableLength(tickDuration).concat([this.getNoteOffStatus(), Utils.getPitch(p), this.velocity])});

						this.data = this.data.concat(noteOn.data, noteOff.data);
					}, this);
				}
			}

		} else {
			console.error('pitch must be an array.');
		}
	};


	// Convert velocity to value 0-127
	convertVelocity(velocity) {
		// Max passed value limited to 100
		velocity = velocity > 100 ? 100 : velocity;
		return Math.round(velocity / 100 * 127);
	};


	/**
	 * Gets what to multiple ticks/quarter note by to get the specified duration.
	 * Note: type=='note' defaults to quarter note, type==='rest' defaults to 0
	 * @param {string} duration
	 * @param {string} type ['note','rest']
	 */
	getDurationMultiplier(duration, type) {
		// Need to apply duration here.  Quarter note == Constants.HEADER_CHUNK_DIVISION
		switch (duration) {
			case '0':
				return 0;
			case '1':
				return 4;
			case '2':
				return 2;
			case 'd2':
				return 3;
			case '4':
				return 1;
			case 'd4':
				return 1.5;
			case '8':
				return 0.5;
			case '8t':
				// For 8th triplets, let's divide a quarter by 3, round to the nearest int, and substract the remainder to the last one.
				return 0.33;
			case 'd8':
				return 0.75;
			case '16':
				return 0.25;
			default:
				// Notes default to a quarter, rests default to 0
				return type === 'note' ? 1 : 0;
		}
	};


	/**
	 * Gets the note on status code based on the selected channel. 0x9{0-F}
	 * Note on at channel 0 is 0x90 (144)
	 * 0 = Ch 1
	 * @returns {number}
	 */
	getNoteOnStatus() {return 144 + this.channel - 1}


	/**
	 * Gets the note off status code based on the selected channel. 0x8{0-F}
	 * Note off at channel 0 is 0x80 (128)
	 * 0 = Ch 1
	 * @returns {number}
	 */
	getNoteOffStatus() {return 128 + this.channel - 1}
}

exports.NoteEvent = NoteEvent;