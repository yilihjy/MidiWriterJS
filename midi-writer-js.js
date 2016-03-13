//https://www.csie.ntu.edu.tw/~r92092/ref/midi/

var MIDI = {
};

MIDI.constants = {
	HEADER_CHUNK_TYPE  		: "MThd",
	HEADER_CHUNK_LENGTH  	: "\x00\x00\x00\x06", // Header size for SMF
	HEADER_CHUNK_FORMAT0    : ["\x00", "\x00"], // Midi Type 0 id
	HEADER_CHUNK_FORMAT1    : ["\x00", "\x01"], // Midi Type 1 id
	HEADER_CHUNK_DIVISION   : ["\x00", "\x80"] // Defaults to 128 ticks per beat
};

MIDI.Chunk = function(fields) {
	this.type = fields.type;
	this.size = MIDI.numberToBytes(fields.data.length, 4);
	this.data = fields.data;

	return this;
};

MIDI.NoteEvent = function() {

};

MIDI.MetaEvent = function() {

};

MIDI.SysexEvent = function() {

};

MIDI.Writer = function() {
	console.log(bto());
};

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

var header = new MIDI.Chunk({
							type: MIDI.constants.HEADER_CHUNK_TYPE, 
							data: [].concat(MIDI.constants.HEADER_CHUNK_FORMAT0, ["\x00", "\x01"], MIDI.constants.HEADER_CHUNK_DIVISION)});
console.log(btoa(header.type + header.size + header.data.join('')));






