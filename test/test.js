var assert = require('assert');
var MidiWriter = require('..');

describe('MidiWriterJS', function() {
	describe('#NoteEvent()', function () {
		describe('#getTickDuration()', function () {
			it('should create a dotted half note if passed three quarter notes.', function () {
				var track = new MidiWriter.Track(); // Need to instantiate to build note object
				var note = new MidiWriter.NoteEvent({pitch: ['C4'], duration: ['4', '4', '4']});
				track.addEvent(note);
				var write = new MidiWriter.Writer([track]);
				assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAADQCQPECDAIA8QAD/LwA=', write.base64());
			});
		});

		describe('#getDurationMultiplier()', function () {
			it('should return 1 for a quarter note.', function () {
				var note = new MidiWriter.NoteEvent({pitch: ['C4'], duration: '4'});
				assert.equal(note.getDurationMultiplier(note.duration), 1);
			});
		});
	});

	describe('#Track()', function() {
		describe('#Time Signature', function() {
			it('should return specific base64 string when time signature is 4/4', function() {
				var track = new MidiWriter.Track();
				track.setTimeSignature(4, 4);
				var write = new MidiWriter.Writer([track]);
				assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAADAD/WAQEAhgIAP8vAA==', write.base64());
			});

			it('should return specific base64 string when time signature is 2/2', function() {
				var track = new MidiWriter.Track();
				track.setTimeSignature(2, 2);
				var write = new MidiWriter.Writer([track]);
				assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAADAD/WAQCARgIAP8vAA==', write.base64());
			});

			it('should return specific base64 string when time signature is 2/8', function() {
				var track = new MidiWriter.Track();
				track.setTimeSignature(2, 8);
				var write = new MidiWriter.Writer([track]);
				assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAADAD/WAQCAxgIAP8vAA==', write.base64());
			});
		});
	});

	describe('#Writer()', function() {
		describe('#base64()', function() {
			it('should return specific base64 string when a single C4 quarter note is created.', function () {
				var track = new MidiWriter.Track();
				var note = new MidiWriter.NoteEvent({pitch: ['C4'], duration: '4'});
				track.addEvent(note);
				var write = new MidiWriter.Writer([track]);
				assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAADQCQPECBAIA8QAD/LwA=', write.base64());
			});
		});

		describe('#Hot Cross Buns', function() {
			it('should return specific base64 string when hot cross buns is created.', function () {
				var hcb = require('../examples/hot-cross-buns.js');
				assert.equal('data:audio/midi;base64,TVRoZAAAAAYAAAABAIBNVHJrAAAAlQCQQECBAIBAQACQPkCBAIA+QACQPECCAIA8QACQQECBAIBAQACQPkCBAIA+QACQPECCAIA8QACQPEBAgDxAAJA8QECAPEAAkDxAQIA8QACQPEBAgDxAAJA+QECAPkAAkD5AQIA+QACQPkBAgD5AAJA+QECAPkAAkEBAgQCAQEAAkD5AgQCAPkAAkDxAggCAPEAA/y8A', hcb);
			});
		});
	});

	describe('#Utils()', function() {
		describe('#stringToBytes()', function () {
			it('should return [116, 101, 115, 116] when "test" is passed.', function () {
				assert.equal([116, 101, 115, 116].toString(), MidiWriter.Utils.stringToBytes('test').toString());
			});
		});

		describe('#isNumeric()', function () {
			it('should return false when "t" is passed.', function () {
				assert.equal(false, MidiWriter.Utils.isNumeric('t'));
			});
		});

		describe('#getPitch()', function () {
			it('should return 101 when "F7" is passed.', function () {
				assert.equal(101, MidiWriter.Utils.getPitch('F7'));
			});
		});

		describe('#getPitch()', function () {
			it('should return 72 (C5) when "B#4" is passed.', function () {
				assert.equal(72, MidiWriter.Utils.getPitch('B#4'));
			});
		});

		describe('#stringByteCount()', function () {
			it('should return 7 when "Garrett" is passed.', function () {
				assert.equal(7, MidiWriter.Utils.stringByteCount('Garrett'));
			});
		});

		describe('#numberFromBytes()', function () {
			it('should return 8463 when [0x21, 0x0f] is passed.', function () {
				assert.equal(8463, MidiWriter.Utils.numberFromBytes([0x21, 0x0f]));
			});
		});

		describe('#numberToBytes()', function () {
			it('should return [0, 5] when converting the number 5 into two bytes.', function() {
				assert.equal([0, 5].toString(), MidiWriter.Utils.numberToBytes(5,2));
			});
		});

	});

	describe('#VexFlow()', function () {
		it('should instantiate', function() {
			var v = new MidiWriter.VexFlow();
			assert.notEqual(typeof v, 'undefined');
			assert.equal(v instanceof MidiWriter.VexFlow, true);
		});

		it('should trackFromVoice', function() {
			var v = new MidiWriter.VexFlow();
			var mockVoice = {
				tickables: []
			}
			var track = v.trackFromVoice(mockVoice);
			assert.notEqual(typeof track, 'undefined');
			assert.equal(track instanceof MidiWriter.Track, true);
		});

		it('should convertPitch', function() {
			var v = new MidiWriter.VexFlow();
			var p = 'pit/ch';
			p = v.convertPitch(p);
			assert.equal(p, 'pitch');
		});

		it('should convertDuration', function () {
			var v = new MidiWriter.VexFlow();
			var mockNote = {
				duration: 'w',
				isDotted: () => true,
			}
			assert.equal(v.convertDuration(mockNote), '1');
			mockNote.duration = 'h';
			assert.equal(v.convertDuration(mockNote), 'd2');
			mockNote.duration = 'q';
			assert.equal(v.convertDuration(mockNote), 'd4');
			mockNote.duration = '8';
			assert.equal(v.convertDuration(mockNote), 'd8');
			mockNote.isDotted = () => false;
			mockNote.duration = 'h';
			assert.equal(v.convertDuration(mockNote), '2');
			mockNote.duration = 'q';
			assert.equal(v.convertDuration(mockNote), '4');
			mockNote.duration = '8';
			assert.equal(v.convertDuration(mockNote), '8');

			mockNote.duration = 'some stuff'
			assert.equal(v.convertDuration(mockNote), 'some stuff');
		})
	})

});