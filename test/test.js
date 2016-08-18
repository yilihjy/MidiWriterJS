var assert = require('assert');
var MidiWriter = require('../build/midi-writer-js');

describe('MidiWriterJS', function() {
	describe('#NoteEvent()', function () {
		describe('#getDurationMultiplier()', function () {
			it('should return 1 for a quarter note.', function () {
				var track = new MidiWriter.Track(); // Need to instantiate to build note object
				var note = new MidiWriter.NoteEvent({pitch: ['C4'], duration: '4'});
				assert.equal(note.getDurationMultiplier(note.duration), 1);
			});
		});
	});

	describe('#Writer()', function () {
		describe('#base64()', function () {
			it('should return specific base64 string when a single C4 quarter note is created.', function () {
				var track = new MidiWriter.Track();
				var note = new MidiWriter.NoteEvent({pitch: ['C4'], duration: '4'});
				track.addEvent(note);
				var write = new MidiWriter.Writer([track]);
				assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAADQCQPECBAIA8QAD/LwA=', write.base64());
			});
		});
	});

	describe('#numberFromBytes()', function () {
		it('should return 8463 when [0x21, 0x0f] is passed.', function () {
			assert.equal(8463, MidiWriter.numberFromBytes([0x21, 0x0f]));
		});
	});

	describe('#stringToBytes()', function () {
		it('should return [116, 101, 115, 116] when "test" is passed.', function () {
			assert.equal([116, 101, 115, 116].toString(), MidiWriter.stringToBytes('test').toString());
		});
	});
});