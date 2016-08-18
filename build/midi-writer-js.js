var Constants = {
    VERSION: '1.3.2',
    HEADER_CHUNK_TYPE: [0x4d, 0x54, 0x68, 0x64],
    HEADER_CHUNK_LENGTH: [0x00, 0x00, 0x00, 0x06],
    HEADER_CHUNK_FORMAT0: [0x00, 0x00],
    HEADER_CHUNK_FORMAT1: [0x00, 0x01],
    HEADER_CHUNK_DIVISION: [0x00, 0x80],
    TRACK_CHUNK_TYPE: [0x4d, 0x54, 0x72, 0x6b],
    META_EVENT_ID: 0xFF,
    META_TEXT_ID: 0x01,
    META_COPYRIGHT_ID: 0x02,
    META_TRACK_NAME_ID: 0x03,
    META_INSTRUMENT_NAME_ID: 0x04,
    META_LYRIC_ID: 0x05,
    META_MARKER_ID: 0x06,
    META_CUE_POINT: 0x07,
    META_TEMPO_ID: 0x51,
    META_SMTPE_OFFSET: 0x54,
    META_TIME_SIGNATURE_ID: 0x58,
    META_KEY_SIGNATURE_ID: 0x59,
    META_END_OF_TRACK_ID: [0x2F, 0x00],
    PROGRAM_CHANGE_STATUS: 0xC0,
    NOTES: {}
};
(function () {
    var allNotes = [['C'], ['C#', 'Db'], ['D'], ['D#', 'Eb'], ['E'], ['F'], ['F#', 'Gb'], ['G'], ['G#', 'Ab'], ['A'], ['A#', 'Bb'], ['B']];
    var counter = 0;
    for (var i = -1; i <= 9; i++) {
        allNotes.forEach(function (noteGroup) {
            noteGroup.forEach(function (note) { Constants.NOTES[note + i] = counter; });
            counter++;
        });
    }
})();
var MidiWriter = (function () {
    function MidiWriter() {
    }
    MidiWriter.version = function () {
        return Constants.VERSION;
    };
    MidiWriter.stringToBytes = function (string) {
        return string.split('').map(function (char) { return char.charCodeAt(); });
    };
    MidiWriter.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    MidiWriter.getPitch = function (pitch) {
        if (this.isNumeric(pitch)) {
            if (pitch >= 0 && pitch <= 127)
                console.error(pitch + ' is not within MIDI note range (0-127).');
            return pitch;
        }
        pitch = pitch.charAt(0).toUpperCase() + pitch.substring(1);
        return Constants.NOTES[pitch];
    };
    MidiWriter.numberToVariableLength = function (ticks) {
        var buffer = ticks & 0x7F;
        while (ticks = ticks >> 7) {
            buffer <<= 8;
            buffer |= ((ticks & 0x7F) | 0x80);
        }
        var bList = [];
        while (true) {
            bList.push(buffer & 0xff);
            if (buffer & 0x80)
                buffer >>= 8;
            else {
                break;
            }
        }
        return bList;
    };
    MidiWriter.stringByteCount = function (s) {
        return encodeURI(s).split(/%..|./).length - 1;
    };
    MidiWriter.numberFromBytes = function (bytes) {
        var hex = '';
        var stringResult;
        bytes.forEach(function (byte) {
            stringResult = byte.toString(16);
            if (stringResult.length == 1)
                stringResult = "0" + stringResult;
            hex += stringResult;
        });
        return parseInt(hex, 16);
    };
    MidiWriter.numberToBytes = function (number, bytesNeeded) {
        bytesNeeded = bytesNeeded || 1;
        var hexString = number.toString(16);
        if (hexString.length & 1) {
            hexString = '0' + hexString;
        }
        var hexArray = hexString.match(/.{2}/g);
        hexArray = hexArray.map(function (item) { return parseInt(item, 16); });
        if (hexArray.length < bytesNeeded) {
            while (bytesNeeded - hexArray.length > 0) {
                hexArray.unshift(0);
            }
        }
        return hexArray;
    };
    return MidiWriter;
}());
var Chunk = (function () {
    function Chunk(fields) {
        this.type = fields.type;
        this.data = fields.data;
        this.size = [0, 0, 0, fields.data.length];
    }
    return Chunk;
}());
var Track = (function () {
    function Track() {
        this.type = Constants.TRACK_CHUNK_TYPE;
        this.data = [];
        this.size = [];
        this.events = [];
    }
    Track.prototype.addEvent = function (event, mapFunction) {
        if (Array.isArray(event)) {
            event.forEach(function (e, i) {
                if (typeof mapFunction === 'function' && e.type === 'note') {
                    var properties = mapFunction(i, e);
                    if (typeof properties === 'object') {
                        for (var j in properties) {
                            switch (j) {
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
                        e.buildData();
                    }
                }
                this.data = this.data.concat(e.data);
                this.size = MidiWriter.numberToBytes(this.data.length, 4);
                this.events.push(e);
            }, this);
        }
        else {
            this.data = this.data.concat(event.data);
            this.size = MidiWriter.numberToBytes(this.data.length, 4);
            this.events.push(event);
        }
        return this;
    };
    Track.prototype.setTempo = function (bpm) {
        var event = new MetaEvent({ data: [Constants.META_TEMPO_ID] });
        event.data.push(0x03);
        var tempo = Math.round(60000000 / bpm);
        event.data = event.data.concat(MidiWriter.numberToBytes(tempo, 3));
        return this.addEvent(event);
    };
    Track.prototype.setTimeSignature = function (numerator, denominator, midiclockspertick, notespermidiclock) {
        var event = new MetaEvent({ data: [Constants.META_TIME_SIGNATURE_ID] });
        event.data.push(0x04);
        event.data = event.data.concat(MidiWriter.numberToBytes(numerator, 1));
        var _denominator = (denominator < 4) ? (denominator - 1) : Math.sqrt(denominator);
        event.data = event.data.concat(MidiWriter.numberToBytes(_denominator, 1));
        midiclockspertick = midiclockspertick || 24;
        event.data = event.data.concat(MidiWriter.numberToBytes(midiclockspertick, 1));
        notespermidiclock = notespermidiclock || 8;
        event.data = event.data.concat(MidiWriter.numberToBytes(notespermidiclock, 1));
        return this.addEvent(event);
    };
    Track.prototype.setKeySignature = function (sf, mi) {
        var event = new MetaEvent({ data: [Constants.META_KEY_SIGNATURE_ID] });
        event.data.push(0x02);
        var mode = mi || 0;
        sf = sf || 0;
        if (typeof mi === 'undefined') {
            var fifths = [
                ['Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'],
                ['ab', 'eb', 'bb', 'f', 'c', 'g', 'd', 'a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#']
            ];
            var _sflen = sf.length;
            var note = sf || 'C';
            if (sf[0] === sf[0].toLowerCase())
                mode = 1;
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
        event.data = event.data.concat(MidiWriter.numberToBytes(sf, 1));
        event.data = event.data.concat(MidiWriter.numberToBytes(mode, 1));
        return this.addEvent(event);
    };
    Track.prototype.addText = function (text) {
        var event = new MetaEvent({ data: [Constants.META_TEXT_ID] });
        var stringBytes = MidiWriter.stringToBytes(text);
        event.data = event.data.concat(MidiWriter.numberToVariableLength(stringBytes.length));
        event.data = event.data.concat(stringBytes);
        return this.addEvent(event);
    };
    Track.prototype.addCopyright = function (text) {
        var event = new MetaEvent({ data: [Constants.META_COPYRIGHT_ID] });
        var stringBytes = MidiWriter.stringToBytes(text);
        event.data = event.data.concat(MidiWriter.numberToVariableLength(stringBytes.length));
        event.data = event.data.concat(stringBytes);
        return this.addEvent(event);
    };
    Track.prototype.addInstrumentName = function (text) {
        var event = new MetaEvent({ data: [Constants.META_INSTRUMENT_NAME_ID] });
        var stringBytes = MidiWriter.stringToBytes(text);
        event.data = event.data.concat(MidiWriter.numberToVariableLength(stringBytes.length));
        event.data = event.data.concat(stringBytes);
        return this.addEvent(event);
    };
    Track.prototype.addMarker = function (text) {
        var event = new MetaEvent({ data: [Constants.META_MARKER_ID] });
        var stringBytes = MidiWriter.stringToBytes(text);
        event.data = event.data.concat(MidiWriter.numberToVariableLength(stringBytes.length));
        event.data = event.data.concat(stringBytes);
        return this.addEvent(event);
    };
    Track.prototype.addCuePoint = function (text) {
        var event = new MetaEvent({ data: [Constants.META_CUE_POINT] });
        var stringBytes = MidiWriter.stringToBytes(text);
        event.data = event.data.concat(MidiWriter.numberToVariableLength(stringBytes.length));
        event.data = event.data.concat(stringBytes);
        return this.addEvent(event);
    };
    Track.prototype.addLyric = function (lyric) {
        var event = new MetaEvent({ data: [Constants.META_LYRIC_ID] });
        var stringBytes = MidiWriter.stringToBytes(lyric);
        event.data = event.data.concat(MidiWriter.numberToVariableLength(stringBytes.length));
        event.data = event.data.concat(stringBytes);
        return this.addEvent(event);
    };
    Track.prototype.polyModeOn = function () {
        var event = new NoteOnEvent({ data: [0x00, 0xB0, 0x7E, 0x00] });
        this.addEvent(event);
        console.log(event);
    };
    return Track;
}());
var NoteOnEvent = (function () {
    function NoteOnEvent(fields) {
        this.data = fields.data;
    }
    return NoteOnEvent;
}());
var NoteOffEvent = (function () {
    function NoteOffEvent(fields) {
        this.data = fields.data;
    }
    return NoteOffEvent;
}());
var NoteEvent = (function () {
    function NoteEvent(fields) {
        this.type = 'note';
        this.pitch = fields.pitch;
        this.wait = fields.wait || 0;
        this.duration = fields.duration;
        this.sequential = fields.sequential || false;
        this.velocity = fields.velocity || 50;
        this.channel = fields.channel || 1;
        this.repeat = fields.repeat || 1;
        this.velocity = this.convertVelocity(this.velocity);
        this.buildData();
    }
    NoteEvent.prototype.buildData = function () {
        this.data = [];
        var quarterTicks = MidiWriter.numberFromBytes(Constants.HEADER_CHUNK_DIVISION);
        var tickDuration = Math.round(quarterTicks * this.getDurationMultiplier(this.duration, 'note'));
        var restDuration = Math.round(quarterTicks * this.getDurationMultiplier(this.wait, 'rest'));
        var noteOn, noteOff;
        if (Array.isArray(this.pitch)) {
            if (!this.sequential) {
                for (var j = 0; j < this.repeat; j++) {
                    this.pitch.forEach(function (p, i) {
                        if (i == 0) {
                            noteOn = new NoteOnEvent({ data: MidiWriter.numberToVariableLength(restDuration).concat(this.getNoteOnStatus(), MidiWriter.getPitch(p), this.velocity) });
                        }
                        else {
                            noteOn = new NoteOnEvent({ data: [0, MidiWriter.getPitch(p), this.velocity] });
                        }
                        this.data = this.data.concat(noteOn.data);
                    }, this);
                    this.pitch.forEach(function (p, i) {
                        if (i == 0) {
                            noteOff = new NoteOffEvent({ data: MidiWriter.numberToVariableLength(tickDuration).concat(this.getNoteOffStatus(), MidiWriter.getPitch(p), this.velocity) });
                        }
                        else {
                            noteOff = new NoteOffEvent({ data: [0, MidiWriter.getPitch(p), this.velocity] });
                        }
                        this.data = this.data.concat(noteOff.data);
                    }, this);
                }
            }
            else {
                for (var j = 0; j < this.repeat; j++) {
                    this.pitch.forEach(function (p, i) {
                        if (i > 0) {
                            restDuration = 0;
                        }
                        if (this.duration === '8t' && i == this.pitch.length - 1) {
                            tickDuration = quarterTicks - (tickDuration * 2);
                        }
                        noteOn = new NoteOnEvent({ data: MidiWriter.numberToVariableLength(restDuration).concat([this.getNoteOnStatus(), MidiWriter.getPitch(p), this.velocity]) });
                        noteOff = new NoteOffEvent({ data: MidiWriter.numberToVariableLength(tickDuration).concat([this.getNoteOffStatus(), MidiWriter.getPitch(p), this.velocity]) });
                        this.data = this.data.concat(noteOn.data, noteOff.data);
                    }, this);
                }
            }
        }
        else {
            console.error('pitch must be an array.');
        }
    };
    ;
    NoteEvent.prototype.convertVelocity = function (velocity) {
        velocity = velocity > 100 ? 100 : velocity;
        return Math.round(velocity / 100 * 127);
    };
    ;
    NoteEvent.prototype.getDurationMultiplier = function (duration, type) {
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
                return 0.33;
            case 'd8':
                return 0.75;
            case '16':
                return 0.25;
            default:
                return type === 'note' ? 1 : 0;
        }
    };
    ;
    NoteEvent.prototype.getNoteOnStatus = function () { return 144 + this.channel - 1; };
    NoteEvent.prototype.getNoteOffStatus = function () { return 128 + this.channel - 1; };
    return NoteEvent;
}());
var MetaEvent = (function () {
    function MetaEvent(fields) {
        this.type = 'meta';
        this.data = MidiWriter.numberToVariableLength(0x00);
        this.data = this.data.concat(Constants.META_EVENT_ID, fields.data);
    }
    return MetaEvent;
}());
var Writer = (function () {
    function Writer(tracks) {
        this.data = [];
        var trackType = tracks.length > 1 ? Constants.HEADER_CHUNK_FORMAT1 : Constants.HEADER_CHUNK_FORMAT0;
        var numberOfTracks = MidiWriter.numberToBytes(tracks.length, 2);
        this.data.push(new Chunk({
            type: Constants.HEADER_CHUNK_TYPE,
            data: trackType.concat(numberOfTracks, Constants.HEADER_CHUNK_DIVISION) }));
        tracks.forEach(function (track, i) {
            track.addEvent(new MetaEvent({ data: Constants.META_END_OF_TRACK_ID }));
            this.data.push(track);
        }, this);
    }
    Writer.prototype.buildFile = function () {
        var build = [];
        this.data.forEach(function (d) { return build = build.concat(d.type, d.size, d.data); });
        return new Uint8Array(build);
    };
    Writer.prototype.base64 = function () {
        if (typeof btoa === 'function')
            return btoa(String.fromCharCode.apply(null, this.buildFile()));
        return new Buffer(this.buildFile()).toString('base64');
    };
    Writer.prototype.dataUri = function () {
        return 'data:audio/midi;base64,' + this.base64();
    };
    return Writer;
}());
var VexFlow = (function () {
    function VexFlow() {
    }
    VexFlow.prototype.trackFromVoice = function (voice) {
        var track = new Track();
        var wait;
        var pitches = [];
        voice.tickables.forEach(function (tickable, i) {
            pitches = [];
            if (tickable.noteType === 'n') {
                notes[i].keys.forEach(function (key) {
                    pitches.push(this.convertPitch(key));
                });
            }
            else if (tickable.noteType === 'r') {
                wait = this.convertDuration(tickable);
                return;
            }
            track.addEvent(new NoteEvent({ pitch: pitches, duration: this.convertDuration(voice.tickables[i]), wait: wait }));
            wait = 0;
        });
        return track;
    };
    VexFlow.prototype.convertPitch = function (pitch) {
        return pitch.replace('/', '');
    };
    VexFlow.prototype.convertDuration = function (note) {
        switch (note.duration) {
            case 'w':
                return '1';
            case 'h':
                return note.isDotted() ? 'd2' : '2';
            case 'q':
                return note.isDotted() ? 'd4' : '4';
            case '8':
                return note.isDotted() ? 'd8' : '8';
        }
        return note.duration;
    };
    ;
    return VexFlow;
}());
MidiWriter.Chunk = Chunk;
MidiWriter.Track = Track;
MidiWriter.NoteEvent = NoteEvent;
MidiWriter.MetaEvent = MetaEvent;
MidiWriter.Writer = Writer;
MidiWriter.VexFlow = VexFlow;
module.exports = MidiWriter;
//# sourceMappingURL=midi-writer-js.js.map