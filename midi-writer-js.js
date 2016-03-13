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
	META_END_OF_TRACK_ID	: "\x2F",
	META_TEMPO_ID			: "\x51",
	META_SMTPE_OFFSET		: "\x54",
	META_TIME_SIGNATURE_ID	: "\x58",
	META_KEY_SIGNATURE_ID	: "\x59"
};

MIDI.Chunk = function(fields) {
	this.type = fields.type;
	this.size = MIDI.numberToBytes(fields.data.length, 4);
	this.data = fields.data;

	return this;
};

MIDI.NoteOnEvent = function() {
	// note, octave, duration
	return ["\x90", "\x3C"/*note*/, "\x40"];
};

MIDI.NoteOffEvent = function() {
	return ["\x80", "\x3C", "\x40"];
};

MIDI.MetaEvent = function(fields) {
	this.data = [MIDI.constants.META_EVENT_ID];
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
		data: ["\x90", "\x3C"/*note*/, "\x40"]
	});

	this.data.push(track);


	console.log('data:audio/midi;base64,' + btoa(this.buildFile(this.data)));
};

MIDI.Writer.prototype.buildFile = function(data) {
	var build = "";

	// Data consists of chunks which consists of data
	for (var i in data) {
		build += data[i].type + data[i].size + data[i].data.join('');
	}

	return build;
};

/**
 * Utilities
 *
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

MIDI.joinHexArray = function(array) {
	var hexString = "";

	for (var i in array) {
		hexString += array[i];
	}

	return hexString;
}

new MIDI.Writer();



