//https://www.csie.ntu.edu.tw/~r92092/ref/midi/

var MIDI = {
};

MIDI.constants = {
	HEADER_CHUNK_TYPE  		: "MThd",
	HEADER_CHUNK_LENGTH  	: "\x00\x00\x00\x06", // Header size for SMF
	HEADER_CHUNK_FORMAT0    : ["\x00", "\x00"], // Midi Type 0 id
	HEADER_CHUNK_FORMAT1    : ["\x00", "\x01"], // Midi Type 1 id
	HEADER_CHUNK_DIVISION   : ["\x00", "\x80"], // Defaults to 128 ticks per beat
	TRACK_CHUNK_TYPE		: "MTrk",
	META_EVENT_ID			: "\xFF",
	META_TEXT_ID			: "\x01",
	META_COPYRIGHT_ID		: "\x02",
	META_TRACK_NAME_ID		: "\x03",
	META_INSTRUMENT_NAME_ID : "\x04",
	META_LYRIC_ID			: "\x05",
	META_MARKER_ID			: "\x06",
	META_CUE_POINT			: "\x07",
	META_TEMPO_ID			: "\x51",
	META_SMTPE_OFFSET		: "\x54",
	META_TIME_SIGNATURE_ID	: "\x58",
	META_KEY_SIGNATURE_ID	: "\x59",
	META_END_OF_TRACK_ID	: "\x2F",
	NOTE_ON_STATUS			: "\x90", // includes channel number (0)
	NOTE_OFF_STATUS			: "\x80" // includes channel number (0)
};

MIDI.Chunk = function(fields) {
	this.type = fields.type;
	this.size = MIDI.numberToBytes(fields.data.length, 4);
	this.data = fields.data;
};

MIDI.Chunk.prototype.addEvent = function(event) {
	this.data = this.data.concat(MIDI.translateTickTime(128)); // Start all events with 128 Delta ticks time for now - quarter note
	this.data = this.data.concat(event.data);
	//console.log(this.data.length);
	this.size = MIDI.numberToBytes(this.size.charCodeAt(0) + this.data.length, 4);
};

MIDI.NoteOnEvent = function(fields) {
	this.data = fields.data;
};

MIDI.NoteOffEvent = function(fields) {
	this.data = fields.data;
};

MIDI.MetaEvent = function(fields) {
	this.data = [MIDI.constants.META_EVENT_ID].concat(fields.data); 
};

MIDI.SysexEvent = function() {

};

MIDI.Writer = function(events) {
	this.data = [];

	// Header chunk
	this.data.push(new MIDI.Chunk({
							type: MIDI.constants.HEADER_CHUNK_TYPE, 
							data: [].concat(MIDI.constants.HEADER_CHUNK_FORMAT0, ["\x00", "\x01"], MIDI.constants.HEADER_CHUNK_DIVISION)}));

	// Track chunks
	var track = new MIDI.Chunk({
		type: MIDI.constants.TRACK_CHUNK_TYPE,
		data: []
	});

	//["\x80","\x90", "\x3C"/*note*/, "\x40"].concat(MIDI.constants.META_END_OF_TRACK_ID)

	track.addEvent(new MIDI.NoteOnEvent({data: [MIDI.constants.NOTE_ON_STATUS, "\x3C", "\x40"]}));
	track.addEvent(new MIDI.NoteOffEvent({data: [MIDI.constants.NOTE_OFF_STATUS, "\x3C", "\x40"]}));
	track.addEvent(new MIDI.NoteOnEvent({data: [MIDI.constants.NOTE_ON_STATUS, "\x4E", "\x40"]}));
	track.addEvent(new MIDI.NoteOffEvent({data: [MIDI.constants.NOTE_OFF_STATUS, "\x4E", "\x40"]}));
	track.addEvent(new MIDI.MetaEvent({data: [MIDI.constants.META_END_OF_TRACK_ID, "\x00"]}));

	this.data.push(track);

	console.log('data:audio/midi;base64,' + btoa(this.buildFile(this.data)));
};

MIDI.Writer.prototype.buildFile = function(data) {
	var build = "";

	// Data consists of chunks which consists of data
	for (var i in data) {
		console.log(data[i].data);
		build += data[i].type + data[i].size + data[i].data.join('');
	}

	return build;
};

/**
 * Utilities
 * Converts a number into a hex string.
 */
MIDI.numberToBytes = function(number, neededBytes) {
	var str = number.toString(16);

    if (neededBytes) {
        while ((str.length / 2) < neededBytes) { str = "0" + str; }
    }

    var bytes = [];
    for (var i = str.length - 1; i >= 0; i = i - 2) {
        var chars = i === 0 ? str[i] : str[i-1] + str[i];
        bytes.unshift(parseInt(chars, 16));
    }

    return String.fromCharCode.apply(null, bytes);
}

/**
 * Translates number of ticks to MIDI timestamp format, returning an array of
 * hex strings with the time values. Midi has a very particular time to express time,
 * take a good look at the spec before ever touching this function.
 * Thanks to https://github.com/sergi/jsmidi
 *
 * @param ticks {Integer} Number of ticks to be translated
 * @returns Array of bytes that form the MIDI time value
 */
MIDI.translateTickTime = function(ticks) {
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

    return bList.map(function(item) {
    	return MIDI.numberToBytes(item);
    });
};


new MIDI.Writer();



