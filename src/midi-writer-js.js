// https://github.com/grimmdude/MidiWriterJS
// MIDI reference: https://www.csie.ntu.edu.tw/~r92092/ref/midi/

(function() {
	"use strict";

	var MidiWriter = this.MidiWriter = {
	};

	MidiWriter.constants = {
		HEADER_CHUNK_TYPE  		: [0x4d, 0x54, 0x68, 0x64], // Mthd
		HEADER_CHUNK_LENGTH  	: [0x00, 0x00, 0x00, 0x06], // Header size for SMF
		HEADER_CHUNK_FORMAT0    : [0x00, 0x00], // Midi Type 0 id
		HEADER_CHUNK_FORMAT1    : [0x00, 0x01], // Midi Type 1 id
		HEADER_CHUNK_DIVISION   : [0x00, 0x80], // Defaults to 128 ticks per beat
		TRACK_CHUNK_TYPE		: [0x4d, 0x54, 0x72, 0x6b], // MTrk,
		META_EVENT_ID			: 0xFF,
		META_TEXT_ID			: 0x01,
		META_COPYRIGHT_ID		: 0x02,
		META_TRACK_NAME_ID		: 0x03,
		META_INSTRUMENT_NAME_ID : 0x04,
		META_LYRIC_ID			: 0x05,
		META_MARKER_ID			: 0x06,
		META_CUE_POINT			: 0x07,
		META_TEMPO_ID			: 0x51,
		META_SMTPE_OFFSET		: 0x54,
		META_TIME_SIGNATURE_ID	: 0x58,
		META_KEY_SIGNATURE_ID	: 0x59,
		META_END_OF_TRACK_ID	: [0x2F, 0x00],
		NOTE_ON_STATUS			: 0x90, // includes channel number (0)
		NOTE_OFF_STATUS			: 0x80 // includes channel number (0)
	};

	MidiWriter.constants.notes = { "G9": 0x7F, "Gb9": 0x7E, "F9": 0x7D, "E9": 0x7C, "Eb9": 0x7B,
	"D9": 0x7A, "Db9": 0x79, "C9": 0x78, "B8": 0x77, "Bb8": 0x76, "A8": 0x75, "Ab8": 0x74,
	"G8": 0x73, "Gb8": 0x72, "F8": 0x71, "E8": 0x70, "Eb8": 0x6F, "D8": 0x6E, "Db8": 0x6D,
	"C8": 0x6C, "B7": 0x6B, "Bb7": 0x6A, "A7": 0x69, "Ab7": 0x68, "G7": 0x67, "Gb7": 0x66,
	"F7": 0x65, "E7": 0x64, "Eb7": 0x63, "D7": 0x62, "Db7": 0x61, "C7": 0x60, "B6": 0x5F,
	"Bb6": 0x5E, "A6": 0x5D, "Ab6": 0x5C, "G6": 0x5B, "Gb6": 0x5A, "F6": 0x59, "E6": 0x58,
	"Eb6": 0x57, "D6": 0x56, "Db6": 0x55, "C6": 0x54, "B5": 0x53, "Bb5": 0x52, "A5": 0x51,
	"Ab5": 0x50, "G5": 0x4F, "Gb5": 0x4E, "F5": 0x4D, "E5": 0x4C, "Eb5": 0x4B, "D5": 0x4A,
	"Db5": 0x49, "C5": 0x48, "B4": 0x47, "Bb4": 0x46, "A4": 0x45, "Ab4": 0x44, "G4": 0x43,
	"Gb4": 0x42, "F4": 0x41, "E4": 0x40, "Eb4": 0x3F, "D4": 0x3E, "Db4": 0x3D, "C4": 0x3C,
	"B3": 0x3B, "Bb3": 0x3A, "A3": 0x39, "Ab3": 0x38, "G3": 0x37, "Gb3": 0x36, "F3": 0x35,
	"E3": 0x34, "Eb3": 0x33, "D3": 0x32, "Db3": 0x31, "C3": 0x30, "B2": 0x2F, "Bb2": 0x2E,
	"A2": 0x2D, "Ab2": 0x2C, "G2": 0x2B, "Gb2": 0x2A, "F2": 0x29, "E2": 0x28, "Eb2": 0x27,
	"D2": 0x26, "Db2": 0x25, "C2": 0x24, "B1": 0x23, "Bb1": 0x22, "A1": 0x21, "Ab1": 0x20,
	"G1": 0x1F, "Gb1": 0x1E, "F1": 0x1D, "E1": 0x1C, "Eb1": 0x1B, "D1": 0x1A, "Db1": 0x19,
	"C1": 0x18, "B0": 0x17, "Bb0": 0x16, "A0": 0x15, "Ab0": 0x14, "G0": 0x13, "Gb0": 0x12,
	"F0": 0x11, "E0": 0x10, "Eb0": 0x0F, "D0": 0x0E, "Db0": 0x0D, "C0": 0x0C };

	MidiWriter.Chunk = function(fields) {
		this.type = fields.type;
		this.data = fields.data;
		this.size = [0, 0, 0, fields.data.length];
	};


	MidiWriter.Track = function() {
		this.type = MidiWriter.constants.TRACK_CHUNK_TYPE;
		this.data = [];
		this.size = [];
		this.currentRest = 0;
	};


	/**
	 * Method to add any event type the track.
	 * @param Object event {data:[]}
	 */
	MidiWriter.Track.prototype.addEvent = function(event) {
		this.data = this.data.concat(event.data);
		this.size = MidiWriter.numberToBytes(this.data.length, 4); // 4 bytes long
	};


	MidiWriter.Track.prototype.setTempo = function(tempo) {
		var event = new MidiWriter.MetaEvent({data: [MidiWriter.constants.META_TEMPO_ID]});
		event.data.push(0x03); // Size
		event.data = event.data.concat([0, 0, tempo]); // Tempo, 3 bytes
		this.addEvent(event);
	};


	MidiWriter.Track.prototype.addText = function(text) {
		var event = new MidiWriter.MetaEvent({data: [MidiWriter.constants.META_TEXT_ID]});
		var stringBytes = MidiWriter.stringToBytes(text);
		event.data = event.data.concat(MidiWriter.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		this.addEvent(event);
	};


	MidiWriter.Track.prototype.addCopyright = function(text) {
		var event = new MidiWriter.MetaEvent({data: [MidiWriter.constants.META_COPYRIGHT_ID]});
		var stringBytes = MidiWriter.stringToBytes(text);
		event.data = event.data.concat(MidiWriter.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		this.addEvent(event);
	};


	MidiWriter.Track.prototype.addInstrumentName = function(text) {
		var event = new MidiWriter.MetaEvent({data: [MidiWriter.constants.META_INSTRUMENT_NAME_ID]});
		var stringBytes = MidiWriter.stringToBytes(text);
		event.data = event.data.concat(MidiWriter.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		this.addEvent(event);
	};


	MidiWriter.Track.prototype.addMarker = function(text) {
		var event = new MidiWriter.MetaEvent({data: [MidiWriter.constants.META_MARKER_ID]});
		var stringBytes = MidiWriter.stringToBytes(text);
		event.data = event.data.concat(MidiWriter.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		this.addEvent(event);
	};


	MidiWriter.Track.prototype.addCuePoint = function(text) {
		var event = new MidiWriter.MetaEvent({data: [MidiWriter.constants.META_CUE_POINT]});
		var stringBytes = MidiWriter.stringToBytes(text);
		event.data = event.data.concat(MidiWriter.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		this.addEvent(event);
	};


	MidiWriter.Track.prototype.addLyric = function(lyric) {
		var event = new MidiWriter.MetaEvent({data: [MidiWriter.constants.META_LYRIC_ID]});
		var stringBytes = MidiWriter.stringToBytes(lyric);
		event.data = event.data.concat(MidiWriter.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Lyric
		this.addEvent(event);
	};


	/**	
	 * Wrapper for noteOnEvent/noteOffEvent objects that builds both events.
	 * duration values: 4:quarter, 3:triplet quarter, 2: half, 1: whole
	 * @param Object fields {pitch: '[C4]', duration: '4', wait: '4', velocity: 1-100}
	 */
	MidiWriter.NoteEvent = function(fields) {
		this.pitch = fields.pitch;
		this.wait = fields.wait || 0;
		this.duration = fields.timeValue;
		this.velocity = fields.velocity || 50;
		this.data = [];

		// Convert velocity to value 0-127
		this.velocity = Math.round(this.velocity / 100 * 127);

		// Need to apply duration here.  Quarter note == MidiWriter.HEADER_CHUNK_DIVISION
		var multiplier;
		switch (fields.duration) {
			case '1':
				multiplier = 4;
				break;
			case '2':
				multiplier = 2;
				break;
			case 'd2':
				multiplier = 3;
				break;
			case '4':
				multiplier = 1;
				break;
			case '8':
				multiplier = 0.5;
				break;
			case 'd8':
				multiplier = 0.75;
				break;
			case '16':
				multiplier = 0.25;
				break;
			default:
				multiplier = 1;
				break;
		}

		var tickDuration = MidiWriter.numberFromBytes(MidiWriter.constants.HEADER_CHUNK_DIVISION) * multiplier;

		switch (fields.wait) {
			case '1':
				multiplier = 4;
				break;
			case '2':
				multiplier = 2;
				break;
			case '4':
				multiplier = 1;
				break;
			case '8':
				multiplier = 0.5;
				break;
			case '16':
				multiplier = 0.25;
				break;
			default:
				multiplier = 0;
				break;
		}

		var restDuration = MidiWriter.numberFromBytes(MidiWriter.constants.HEADER_CHUNK_DIVISION) * multiplier;

		// fields.pitch could be an array of pitches.
		// If so create note events for each and apply the same duration.
		var noteOn, noteOff;
		if (Array.isArray(this.pitch)) {
			for (var i in this.pitch) {
				// restDuration only applies to first note
				if (i > 0) {
					restDuration = 0;
				}

				noteOn = new MidiWriter.NoteOnEvent({data: MidiWriter.numberToVariableLength(restDuration).concat([MidiWriter.constants.NOTE_ON_STATUS, MidiWriter.constants.notes[this.pitch[i]], this.velocity])});
				noteOff = new MidiWriter.NoteOffEvent({data: MidiWriter.numberToVariableLength(tickDuration).concat([MidiWriter.constants.NOTE_OFF_STATUS, MidiWriter.constants.notes[this.pitch[i]], this.velocity])});

				this.data = this.data.concat(noteOn.data.concat(noteOff.data));
			}

		} else {
			noteOn = new MidiWriter.NoteOnEvent({data: MidiWriter.numberToVariableLength(restDuration).concat([MidiWriter.constants.NOTE_ON_STATUS, MidiWriter.constants.notes[this.pitch], this.velocity])});
			noteOff = new MidiWriter.NoteOffEvent({data: MidiWriter.numberToVariableLength(tickDuration).concat([MidiWriter.constants.NOTE_OFF_STATUS, MidiWriter.constants.notes[this.pitch], this.velocity])});

			this.data = noteOn.data.concat(noteOff.data);
		}
	};


	/**	
	 * Holds all data for a "note on" MIDI event
	 * @param Object fields {data: []}
	 */
	MidiWriter.NoteOnEvent = function(fields) {
		this.data = fields.data;
	};


	/**	
	 * Holds all data for a "note off" MIDI event
	 * @param Object fields {data: []}
	 */
	MidiWriter.NoteOffEvent = function(fields) {
		this.data = fields.data;
	};

	MidiWriter.MetaEvent = function(fields) {
		this.data = MidiWriter.numberToVariableLength(0x00);// Start with zero time delta
		this.data = this.data.concat([MidiWriter.constants.META_EVENT_ID].concat(fields.data)); 
	};

	MidiWriter.SysexEvent = function() {

	};


	/**
	 * Object that puts together tracks and provides methods for file output.
	 * @param Object MidiWriter.Track
	 */
	MidiWriter.Writer = function(tracks) {
		this.data = [];

		var trackType = tracks.length > 1 ? MidiWriter.constants.HEADER_CHUNK_FORMAT1 : MidiWriter.constants.HEADER_CHUNK_FORMAT0;
		var numberOfTracks = MidiWriter.numberToBytes(tracks.length, 2); // two bytes long

		// Header chunk
		this.data.push(new MidiWriter.Chunk({
								type: MidiWriter.constants.HEADER_CHUNK_TYPE, 
								data: trackType.concat(numberOfTracks.concat(MidiWriter.constants.HEADER_CHUNK_DIVISION))}));


		// Track chunks
		for (var i in tracks) {
			tracks[i].addEvent(new MidiWriter.MetaEvent({data: MidiWriter.constants.META_END_OF_TRACK_ID}));
			this.data.push(tracks[i]);
		}
	};

	MidiWriter.Writer.prototype.buildFile = function(data) {
		var build = [];

		// Data consists of chunks which consists of data
		for (var i in this.data) {
			build = build.concat(this.data[i].type);
			build = build.concat(this.data[i].size);
			build = build.concat(this.data[i].data);
		}

		return build;
	};


	/**
	 * Convert file buffer to a base64 string.  Different methods depending on if browser or node.
	 * 
	 */
	MidiWriter.Writer.prototype.base64 = function() {
		if (typeof btoa === 'function') {
			return btoa(String.fromCharCode.apply(null, this.buildFile()));

		} else {
			return new Buffer(this.buildFile()).toString('base64');
		}
	};


	/**
	 * Translates number of ticks to MIDI timestamp format, returning an array of
	 * hex strings with the time values. Midi has a very particular time to express time,
	 * take a good look at the spec before ever touching this function.
	 * Thanks to https://github.com/sergi/jsmidi
	 *
	 * @param ticks {Integer} Number of ticks to be translated
	 * @returns Array of bytes that form the MIDI time value
	 */
	MidiWriter.numberToVariableLength = function(ticks) {
	    var buffer = ticks & 0x7F;

	    while (ticks = ticks >> 7) {
	        buffer <<= 8;
	        buffer |= ((ticks & 0x7F) | 0x80);
	    }

	    var bList = [];
	    while (true) {
	        bList.push(buffer & 0xff);

	        if (buffer & 0x80) { buffer >>= 8; }
	        else { break; }
	    }

	    return bList;
	};

	MidiWriter.stringByteCount = function (s) {
	    return encodeURI(s).split(/%..|./).length - 1;
	};


	/**
	 * Utility function to get an int from an array of bytes.
	 * @param Array bytes
	 * @return Number
	 */
	MidiWriter.numberFromBytes = function(bytes) {
		var hex = '';
		var stringResult;

		for (var i in bytes) {
			stringResult = bytes[i].toString(16);
			
			// ensure string is 2 chars
			if (stringResult.length === 1) {
				stringResult = "0" + stringResult;
			}

			hex += stringResult;
		}

		return parseInt(hex, 16);
	};


	/**
	 * Takes a number and splits it up into an array of bytes.  Can be padded by passing a number to bytesNeeded
	 * @param Number number
	 * @param Number bytesNeeded
	 * @return Array of bytes
	 */
	MidiWriter.numberToBytes = function(number, bytesNeeded) {
		bytesNeeded = bytesNeeded || 1;

		var hexString = number.toString(16);
		
		if (hexString.length & 1) { // Make sure hex string is even number of chars
			hexString = '0' + hexString;
		}

		// Split hex string into an array of two char elements
		var hexArray = hexString.match(/.{2}/g);

		// Now parse them out as integers
		hexArray = hexArray.map(function(item) {
			return parseInt(item, 16);
		});

		// Prepend empty bytes if we don't have enough
		if (hexArray.length < bytesNeeded) {
			while (bytesNeeded - hexArray.length > 0) {
				hexArray.unshift(0);
			}
		}

		return hexArray;
	};


	MidiWriter.stringToBytes = function(string) {
		var bytes = [];
		for (var i = 0; i < string.length; i++) {
			bytes.push(string[i].charCodeAt(0));
		}

		return bytes;
	};

	// Node support
	if( typeof exports !== 'undefined' ) {
		if( typeof module !== 'undefined' && module.exports ) {
	      exports = module.exports = MidiWriter;
	    }

    	exports.MidiWriterJS = MidiWriter;
  	} 

}).call(this);


