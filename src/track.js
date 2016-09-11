class Track {
	//type: number[];
	//data: number[];
	//size: number[];
	//events: any;

	constructor() {
		this.type = Constants.TRACK_CHUNK_TYPE;
		this.data = [];
		this.size = [];
		this.events = [];
	}

	// Method to add any event type the track.
	addEvent(event, mapFunction) {
		if (Array.isArray(event)) {
			event.forEach(function(e, i) {
				// Handle map function if provided
				if (typeof mapFunction === 'function' && e.type === 'note') {
					var properties = mapFunction(i, e);

					if (typeof properties === 'object') {
						for (var j in properties) {
							switch(j) {
								case 'duration':
									e.duration = properties[j];
									break;
								case 'sequential':
									e.sequential = properties[j];
									break;
								case 'velocity':
									e.velocity = e.convertVelocity(properties[j]);
									break;
							}
						}		

						// Gotta build that data
						e.buildData();
					}
				}

				this.data = this.data.concat(e.data);
				this.size = Utils.numberToBytes(this.data.length, 4); // 4 bytes long
				this.events.push(e);
			}, this);

		} else {
			this.data = this.data.concat(event.data);
			this.size = Utils.numberToBytes(this.data.length, 4); // 4 bytes long
			this.events.push(event);
		}

		return this;
	}

	setTempo(bpm) {
		var event = new MetaEvent({data: [Constants.META_TEMPO_ID]});
		event.data.push(0x03); // Size
		var tempo = Math.round(60000000 / bpm);
		event.data = event.data.concat(Utils.numberToBytes(tempo, 3)); // Tempo, 3 bytes
		return this.addEvent(event);
	}


	setTimeSignature(numerator, denominator, midiclockspertick, notespermidiclock) {
		var event = new MetaEvent({data: [Constants.META_TIME_SIGNATURE_ID]});
		event.data.push(0x04); // Size
		event.data = event.data.concat(Utils.numberToBytes(numerator, 1)); // Numerator, 1 bytes
		var _denominator = (denominator < 4) ? (denominator - 1) : Math.sqrt(denominator);	// Denominator is expressed as pow of 2
		event.data = event.data.concat(Utils.numberToBytes(_denominator, 1)); // Denominator, 1 bytes
		midiclockspertick = midiclockspertick || 24;
		event.data = event.data.concat(Utils.numberToBytes(midiclockspertick, 1)); // MIDI Clocks per tick, 1 bytes
		notespermidiclock = notespermidiclock || 8;
		event.data = event.data.concat(Utils.numberToBytes(notespermidiclock, 1)); // Number of 1/32 notes per MIDI clocks, 1 bytes
		return this.addEvent(event);
	}

	setKeySignature(sf, mi) {
		var event = new MetaEvent({data: [Constants.META_KEY_SIGNATURE_ID]});
		event.data.push(0x02); // Size

		var mode = mi || 0;
		sf = sf || 0;

		//	Function called with string notation
		if (typeof mi === 'undefined') {
			var fifths = [
				['Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'],
				['ab', 'eb', 'bb', 'f', 'c', 'g', 'd', 'a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#']
			];
			var _sflen = sf.length;
			var note = sf || 'C';

			if (sf[0] === sf[0].toLowerCase()) mode = 1

			if (_sflen > 1) {
				switch (sf.charAt(_sflen - 1)) {
					case 'm':
						mode = 1;
						note = sf.charAt(0).toLowerCase();
						note = note.concat(sf.substring(1, _sflen - 1));
						break;
					case '-':
						mode = 1;
						note = sf.charAt(0).toLowerCase();
						note = note.concat(sf.substring(1, _sflen - 1));
						break;
					case 'M':
						mode = 0;
						note = sf.charAt(0).toUpperCase();
						note = note.concat(sf.substring(1, _sflen - 1));
						break;
					case '+':
						mode = 0;
						note = sf.charAt(0).toUpperCase();
						note = note.concat(sf.substring(1, _sflen - 1));
						break;
				}
			}

			var fifthindex = fifths[mode].indexOf(note);
			sf = fifthindex === -1 ? 0 : fifthindex - 7;
		}

		event.data = event.data.concat(Utils.numberToBytes(sf, 1)); // Number of sharp or flats ( < 0 flat; > 0 sharp)
		event.data = event.data.concat(Utils.numberToBytes(mode, 1)); // Mode: 0 major, 1 minor
		return this.addEvent(event);
	}

	addText(text) {
		var event = new MetaEvent({data: [Constants.META_TEXT_ID]});
		var stringBytes = Utils.stringToBytes(text);
		event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		return this.addEvent(event);
	}


	addCopyright(text) {
		var event = new MetaEvent({data: [Constants.META_COPYRIGHT_ID]});
		var stringBytes = Utils.stringToBytes(text);
		event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		return this.addEvent(event);
	}


	addInstrumentName(text) {
		var event = new MetaEvent({data: [Constants.META_INSTRUMENT_NAME_ID]});
		var stringBytes = Utils.stringToBytes(text);
		event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		return this.addEvent(event);
	}


	addMarker(text) {
		var event = new MetaEvent({data: [Constants.META_MARKER_ID]});
		var stringBytes = Utils.stringToBytes(text);
		event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		return this.addEvent(event);
	}


	addCuePoint(text) {
		var event = new MetaEvent({data: [Constants.META_CUE_POINT]});
		var stringBytes = Utils.stringToBytes(text);
		event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		return this.addEvent(event);
	}


	addLyric(lyric) {
		var event = new MetaEvent({data: [Constants.META_LYRIC_ID]});
		var stringBytes = Utils.stringToBytes(lyric);
		event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Lyric
		return this.addEvent(event);
	}

	/** Channel Mode Messages **/
	polyModeOn() {
		var event = new NoteOnEvent({data: [0x00, 0xB0, 0x7E, 0x00]});
		this.addEvent(event);
		console.log(event);
	}

}

exports.Track = Track;