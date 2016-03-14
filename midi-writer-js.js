// https://github.com/grimmdude/MidiWriterJS
// MIDI reference: https://www.csie.ntu.edu.tw/~r92092/ref/midi/

var MidiWriter = {
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
	META_END_OF_TRACK_ID	: 0x2F,
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
};

MidiWriter.Track.prototype.addEvent = function(event) {
	//this.data = this.data.concat(MidiWriter.numberToVariableLength(0x80)); // Start all events with 128 Delta ticks time for now - quarter note
	this.data = this.data.concat(event.data);
	this.size = [0, 0, 0, this.data.length];
};


MidiWriter.Track.prototype.setTempo = function(tempo) {
	var event = new MidiWriter.MetaEvent({data: [MidiWriter.constants.META_TEMPO_ID]});
	event.data.push(0x03); // Size
	event.data.concat([0, 0, tempo]); // 3 bytes
	this.addEvent(event);
};

MidiWriter.Track.prototype.addLyric = function(lyric) {
	var event = new MidiWriter.MetaEvent({data: [MidiWriter.constants.META_LYRIC_ID]});
	event.data.concat(MidiWriter.numberToVariableLength(MidiWriter.stringByteCount(lyric))); // Size
	event.data.push(lyric);
	this.addEvent(event);
};


/**	
 * Wrapper for noteOnEvent/noteOffEvent objects that builds both events.
 * @param Object fields {pitch: 'C4', timeValue: '1/4'}
 */
MidiWriter.NoteEvent = function(fields) {
	this.pitch = fields.pitch;
	this.timeValue = fields.timeValue;

	// Start all events with 128 Delta ticks time for now - quarter note
	var noteOn = new MidiWriter.NoteOnEvent({data: MidiWriter.numberToVariableLength(0x80).concat([MidiWriter.constants.NOTE_ON_STATUS, MidiWriter.constants.notes[this.pitch], 0x40])});
	var noteOff = new MidiWriter.NoteOffEvent({data: MidiWriter.numberToVariableLength(0x80).concat([MidiWriter.constants.NOTE_OFF_STATUS, MidiWriter.constants.notes[this.pitch], 0x40])});

	this.data = noteOn.data.concat(noteOff.data);
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
	this.data = [MidiWriter.constants.META_EVENT_ID].concat(fields.data); 
};

MidiWriter.SysexEvent = function() {

};


/**
 * Object that puts together tracks and provides methods for file output.
 * @param Object MidiWriter.Track
 */
MidiWriter.Writer = function(track) {
	this.data = [];

	// Header chunk
	this.data.push(new MidiWriter.Chunk({
							type: MidiWriter.constants.HEADER_CHUNK_TYPE, 
							data: [].concat(MidiWriter.constants.HEADER_CHUNK_FORMAT0, [0x00, 0x01], MidiWriter.constants.HEADER_CHUNK_DIVISION)}));


	// Track chunks
	track.addEvent(new MidiWriter.MetaEvent({data: MidiWriter.numberToVariableLength(0x80).concat([MidiWriter.constants.META_END_OF_TRACK_ID, 0x00])}));
	this.data.push(track);
	document.getElementById('midi-play').href = "javascript:void(play('data:audio/midi;base64," + btoa(this.buildFile(this.data)) + "'));";
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

MidiWriter.Writer.prototype.base64 = function() {
	return btoa(String.fromCharCode.apply(null, this.buildFile()));
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


/* Example */
var track = new MidiWriter.Track();
//track.setTempo(100000);
//track.addLyric('test this mofo out');
var note = new MidiWriter.NoteEvent({pitch: 'C4', timeValue: '1/4'});
track.addEvent(note);

var write = new MidiWriter.Writer(track);
console.log('data:audio/midi;base64,' + write.base64());