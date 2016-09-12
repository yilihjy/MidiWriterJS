"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chunk = function Chunk(fields) {
	_classCallCheck(this, Chunk);

	this.type = fields.type;
	this.data = fields.data;
	this.size = [0, 0, 0, fields.data.length];
};

exports.Chunk = Chunk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNodW5rLmpzIl0sIm5hbWVzIjpbIkNodW5rIiwiZmllbGRzIiwidHlwZSIsImRhdGEiLCJzaXplIiwibGVuZ3RoIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztJQUFNQSxLLEdBQ0wsZUFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNuQixNQUFLQyxJQUFMLEdBQVlELE9BQU9DLElBQW5CO0FBQ0EsTUFBS0MsSUFBTCxHQUFZRixPQUFPRSxJQUFuQjtBQUNBLE1BQUtDLElBQUwsR0FBWSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVSCxPQUFPRSxJQUFQLENBQVlFLE1BQXRCLENBQVo7QUFDQSxDOztBQUdGQyxRQUFRTixLQUFSLEdBQWdCQSxLQUFoQiIsImZpbGUiOiJjaHVuay5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENodW5rIHtcblx0Y29uc3RydWN0b3IoZmllbGRzKSB7XG5cdFx0dGhpcy50eXBlID0gZmllbGRzLnR5cGU7XG5cdFx0dGhpcy5kYXRhID0gZmllbGRzLmRhdGE7XG5cdFx0dGhpcy5zaXplID0gWzAsIDAsIDAsIGZpZWxkcy5kYXRhLmxlbmd0aF07XG5cdH1cbn1cblxuZXhwb3J0cy5DaHVuayA9IENodW5rOyJdfQ==
'use strict';

var Constants = {
	VERSION: '1.4.0',
	HEADER_CHUNK_TYPE: [0x4d, 0x54, 0x68, 0x64], // Mthd
	HEADER_CHUNK_LENGTH: [0x00, 0x00, 0x00, 0x06], // Header size for SMF
	HEADER_CHUNK_FORMAT0: [0x00, 0x00], // Midi Type 0 id
	HEADER_CHUNK_FORMAT1: [0x00, 0x01], // Midi Type 1 id
	HEADER_CHUNK_DIVISION: [0x00, 0x80], // Defaults to 128 ticks per beat
	TRACK_CHUNK_TYPE: [0x4d, 0x54, 0x72, 0x6b], // MTrk,
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
	/*NOTE_ON_STATUS			: 0x90, // includes channel number (0)*/
	/*NOTE_OFF_STATUS			: 0x80, // includes channel number (0)*/
	PROGRAM_CHANGE_STATUS: 0xC0, // includes channel number (0)
	NOTES: {}
};

(function () {
	// Builds notes object for reference against binary values.
	var allNotes = [['C'], ['C#', 'Db'], ['D'], ['D#', 'Eb'], ['E'], ['F'], ['F#', 'Gb'], ['G'], ['G#', 'Ab'], ['A'], ['A#', 'Bb'], ['B']];
	var counter = 0;

	// All available octaves.
	for (var i = -1; i <= 9; i++) {
		allNotes.forEach(function (noteGroup) {
			noteGroup.forEach(function (note) {
				Constants.NOTES[note + i] = counter;
			});
			counter++;
		});
	}
})();

exports.Constants = Constants;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN0YW50cy5qcyJdLCJuYW1lcyI6WyJDb25zdGFudHMiLCJWRVJTSU9OIiwiSEVBREVSX0NIVU5LX1RZUEUiLCJIRUFERVJfQ0hVTktfTEVOR1RIIiwiSEVBREVSX0NIVU5LX0ZPUk1BVDAiLCJIRUFERVJfQ0hVTktfRk9STUFUMSIsIkhFQURFUl9DSFVOS19ESVZJU0lPTiIsIlRSQUNLX0NIVU5LX1RZUEUiLCJNRVRBX0VWRU5UX0lEIiwiTUVUQV9URVhUX0lEIiwiTUVUQV9DT1BZUklHSFRfSUQiLCJNRVRBX1RSQUNLX05BTUVfSUQiLCJNRVRBX0lOU1RSVU1FTlRfTkFNRV9JRCIsIk1FVEFfTFlSSUNfSUQiLCJNRVRBX01BUktFUl9JRCIsIk1FVEFfQ1VFX1BPSU5UIiwiTUVUQV9URU1QT19JRCIsIk1FVEFfU01UUEVfT0ZGU0VUIiwiTUVUQV9USU1FX1NJR05BVFVSRV9JRCIsIk1FVEFfS0VZX1NJR05BVFVSRV9JRCIsIk1FVEFfRU5EX09GX1RSQUNLX0lEIiwiUFJPR1JBTV9DSEFOR0VfU1RBVFVTIiwiTk9URVMiLCJhbGxOb3RlcyIsImNvdW50ZXIiLCJpIiwiZm9yRWFjaCIsIm5vdGVHcm91cCIsIm5vdGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFlBQVk7QUFDZkMsVUFBYyxPQURDO0FBRWZDLG9CQUF1QixDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixFQUFtQixJQUFuQixDQUZSLEVBRWtDO0FBQ2pEQyxzQkFBd0IsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FIVCxFQUdtQztBQUNsREMsdUJBQTBCLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FKWCxFQUl5QjtBQUN4Q0MsdUJBQTBCLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FMWCxFQUt5QjtBQUN4Q0Msd0JBQTBCLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FOWCxFQU15QjtBQUN4Q0MsbUJBQW9CLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLENBUEwsRUFPK0I7QUFDOUNDLGdCQUFrQixJQVJIO0FBU2ZDLGVBQWlCLElBVEY7QUFVZkMsb0JBQXFCLElBVk47QUFXZkMscUJBQXNCLElBWFA7QUFZZkMsMEJBQTBCLElBWlg7QUFhZkMsZ0JBQWtCLElBYkg7QUFjZkMsaUJBQW1CLElBZEo7QUFlZkMsaUJBQW1CLElBZko7QUFnQmZDLGdCQUFrQixJQWhCSDtBQWlCZkMsb0JBQXFCLElBakJOO0FBa0JmQyx5QkFBeUIsSUFsQlY7QUFtQmZDLHdCQUF3QixJQW5CVDtBQW9CZkMsdUJBQXVCLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FwQlI7QUFxQmY7QUFDQTtBQUNBQyx3QkFBd0IsSUF2QlQsRUF1QmU7QUFDOUJDLFFBQVk7QUF4QkcsQ0FBaEI7O0FBMkJBLENBQUMsWUFBVztBQUNYO0FBQ0EsS0FBSUMsV0FBVyxDQUFDLENBQUMsR0FBRCxDQUFELEVBQVEsQ0FBQyxJQUFELEVBQU0sSUFBTixDQUFSLEVBQXFCLENBQUMsR0FBRCxDQUFyQixFQUE0QixDQUFDLElBQUQsRUFBTSxJQUFOLENBQTVCLEVBQXlDLENBQUMsR0FBRCxDQUF6QyxFQUErQyxDQUFDLEdBQUQsQ0FBL0MsRUFBc0QsQ0FBQyxJQUFELEVBQU0sSUFBTixDQUF0RCxFQUFtRSxDQUFDLEdBQUQsQ0FBbkUsRUFBMEUsQ0FBQyxJQUFELEVBQU0sSUFBTixDQUExRSxFQUF1RixDQUFDLEdBQUQsQ0FBdkYsRUFBOEYsQ0FBQyxJQUFELEVBQU0sSUFBTixDQUE5RixFQUEyRyxDQUFDLEdBQUQsQ0FBM0csQ0FBZjtBQUNBLEtBQUlDLFVBQVUsQ0FBZDs7QUFFQTtBQUNBLE1BQUssSUFBSUMsSUFBSSxDQUFDLENBQWQsRUFBaUJBLEtBQUssQ0FBdEIsRUFBeUJBLEdBQXpCLEVBQThCO0FBQzdCRixXQUFTRyxPQUFULENBQWlCLFVBQVNDLFNBQVQsRUFBb0I7QUFDcENBLGFBQVVELE9BQVYsQ0FBa0IsVUFBU0UsSUFBVCxFQUFlO0FBQUM1QixjQUFVc0IsS0FBVixDQUFnQk0sT0FBT0gsQ0FBdkIsSUFBNEJELE9BQTVCO0FBQW9DLElBQXRFO0FBQ0FBO0FBQ0EsR0FIRDtBQUlBO0FBQ0QsQ0FaRDs7QUFjQUssUUFBUTdCLFNBQVIsR0FBb0JBLFNBQXBCIiwiZmlsZSI6ImNvbnN0YW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBDb25zdGFudHMgPSB7XG5cdFZFUlNJT05cdFx0XHRcdFx0OiAnMS40LjAnLFxuXHRIRUFERVJfQ0hVTktfVFlQRSAgXHRcdDogWzB4NGQsIDB4NTQsIDB4NjgsIDB4NjRdLCAvLyBNdGhkXG5cdEhFQURFUl9DSFVOS19MRU5HVEggIFx0OiBbMHgwMCwgMHgwMCwgMHgwMCwgMHgwNl0sIC8vIEhlYWRlciBzaXplIGZvciBTTUZcblx0SEVBREVSX0NIVU5LX0ZPUk1BVDAgICAgOiBbMHgwMCwgMHgwMF0sIC8vIE1pZGkgVHlwZSAwIGlkXG5cdEhFQURFUl9DSFVOS19GT1JNQVQxICAgIDogWzB4MDAsIDB4MDFdLCAvLyBNaWRpIFR5cGUgMSBpZFxuXHRIRUFERVJfQ0hVTktfRElWSVNJT04gICA6IFsweDAwLCAweDgwXSwgLy8gRGVmYXVsdHMgdG8gMTI4IHRpY2tzIHBlciBiZWF0XG5cdFRSQUNLX0NIVU5LX1RZUEVcdFx0OiBbMHg0ZCwgMHg1NCwgMHg3MiwgMHg2Yl0sIC8vIE1UcmssXG5cdE1FVEFfRVZFTlRfSURcdFx0XHQ6IDB4RkYsXG5cdE1FVEFfVEVYVF9JRFx0XHRcdDogMHgwMSxcblx0TUVUQV9DT1BZUklHSFRfSURcdFx0OiAweDAyLFxuXHRNRVRBX1RSQUNLX05BTUVfSURcdFx0OiAweDAzLFxuXHRNRVRBX0lOU1RSVU1FTlRfTkFNRV9JRCA6IDB4MDQsXG5cdE1FVEFfTFlSSUNfSURcdFx0XHQ6IDB4MDUsXG5cdE1FVEFfTUFSS0VSX0lEXHRcdFx0OiAweDA2LFxuXHRNRVRBX0NVRV9QT0lOVFx0XHRcdDogMHgwNyxcblx0TUVUQV9URU1QT19JRFx0XHRcdDogMHg1MSxcblx0TUVUQV9TTVRQRV9PRkZTRVRcdFx0OiAweDU0LFxuXHRNRVRBX1RJTUVfU0lHTkFUVVJFX0lEXHQ6IDB4NTgsXG5cdE1FVEFfS0VZX1NJR05BVFVSRV9JRFx0OiAweDU5LFxuXHRNRVRBX0VORF9PRl9UUkFDS19JRFx0OiBbMHgyRiwgMHgwMF0sXG5cdC8qTk9URV9PTl9TVEFUVVNcdFx0XHQ6IDB4OTAsIC8vIGluY2x1ZGVzIGNoYW5uZWwgbnVtYmVyICgwKSovXG5cdC8qTk9URV9PRkZfU1RBVFVTXHRcdFx0OiAweDgwLCAvLyBpbmNsdWRlcyBjaGFubmVsIG51bWJlciAoMCkqL1xuXHRQUk9HUkFNX0NIQU5HRV9TVEFUVVNcdDogMHhDMCwgLy8gaW5jbHVkZXMgY2hhbm5lbCBudW1iZXIgKDApXG5cdE5PVEVTXHRcdFx0XHRcdDoge31cbn07XG5cbihmdW5jdGlvbigpIHtcblx0Ly8gQnVpbGRzIG5vdGVzIG9iamVjdCBmb3IgcmVmZXJlbmNlIGFnYWluc3QgYmluYXJ5IHZhbHVlcy5cblx0dmFyIGFsbE5vdGVzID0gW1snQyddLCBbJ0MjJywnRGInXSwgWydEJ10sIFsnRCMnLCdFYiddLCBbJ0UnXSxbJ0YnXSwgWydGIycsJ0diJ10sIFsnRyddLCBbJ0cjJywnQWInXSwgWydBJ10sIFsnQSMnLCdCYiddLCBbJ0InXV07XG5cdHZhciBjb3VudGVyID0gMDtcblxuXHQvLyBBbGwgYXZhaWxhYmxlIG9jdGF2ZXMuXG5cdGZvciAodmFyIGkgPSAtMTsgaSA8PSA5OyBpKyspIHtcblx0XHRhbGxOb3Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG5vdGVHcm91cCkge1xuXHRcdFx0bm90ZUdyb3VwLmZvckVhY2goZnVuY3Rpb24obm90ZSkge0NvbnN0YW50cy5OT1RFU1tub3RlICsgaV0gPSBjb3VudGVyfSk7XG5cdFx0XHRjb3VudGVyICsrO1xuXHRcdH0pO1xuXHR9XG59KSgpO1xuXG5leHBvcnRzLkNvbnN0YW50cyA9IENvbnN0YW50czsiXX0=
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MetaEvent = function MetaEvent(fields) {
	_classCallCheck(this, MetaEvent);

	this.type = 'meta';
	this.data = Utils.numberToVariableLength(0x00); // Start with zero time delta
	this.data = this.data.concat(Constants.META_EVENT_ID, fields.data);
};

exports.MetaEvent = MetaEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEtZXZlbnQuanMiXSwibmFtZXMiOlsiTWV0YUV2ZW50IiwiZmllbGRzIiwidHlwZSIsImRhdGEiLCJVdGlscyIsIm51bWJlclRvVmFyaWFibGVMZW5ndGgiLCJjb25jYXQiLCJDb25zdGFudHMiLCJNRVRBX0VWRU5UX0lEIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztJQUFNQSxTLEdBQ0wsbUJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFDbkIsTUFBS0MsSUFBTCxHQUFZLE1BQVo7QUFDQSxNQUFLQyxJQUFMLEdBQVlDLE1BQU1DLHNCQUFOLENBQTZCLElBQTdCLENBQVosQ0FGbUIsQ0FFNEI7QUFDL0MsTUFBS0YsSUFBTCxHQUFZLEtBQUtBLElBQUwsQ0FBVUcsTUFBVixDQUFpQkMsVUFBVUMsYUFBM0IsRUFBMENQLE9BQU9FLElBQWpELENBQVo7QUFDQSxDOztBQUdGTSxRQUFRVCxTQUFSLEdBQW9CQSxTQUFwQiIsImZpbGUiOiJtZXRhLWV2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTWV0YUV2ZW50IHtcblx0Y29uc3RydWN0b3IoZmllbGRzKSB7XG5cdFx0dGhpcy50eXBlID0gJ21ldGEnO1xuXHRcdHRoaXMuZGF0YSA9IFV0aWxzLm51bWJlclRvVmFyaWFibGVMZW5ndGgoMHgwMCk7Ly8gU3RhcnQgd2l0aCB6ZXJvIHRpbWUgZGVsdGFcblx0XHR0aGlzLmRhdGEgPSB0aGlzLmRhdGEuY29uY2F0KENvbnN0YW50cy5NRVRBX0VWRU5UX0lELCBmaWVsZHMuZGF0YSk7XG5cdH1cbn1cblxuZXhwb3J0cy5NZXRhRXZlbnQgPSBNZXRhRXZlbnQ7Il19
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoteEvent = function () {
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
	function NoteEvent(fields) {
		_classCallCheck(this, NoteEvent);

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

	_createClass(NoteEvent, [{
		key: 'buildData',
		value: function buildData() {
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
				if (!this.sequential) {
					// Handle repeat
					for (var j = 0; j < this.repeat; j++) {
						// Note on
						this.pitch.forEach(function (p, i) {
							if (i == 0) {
								noteOn = new NoteOnEvent({ data: Utils.numberToVariableLength(restDuration).concat(this.getNoteOnStatus(), Utils.getPitch(p), this.velocity) });
							} else {
								// Running status (can ommit the note on status)
								noteOn = new NoteOnEvent({ data: [0, Utils.getPitch(p), this.velocity] });
							}

							this.data = this.data.concat(noteOn.data);
						}, this);

						// Note off
						this.pitch.forEach(function (p, i) {
							if (i == 0) {
								noteOff = new NoteOffEvent({ data: Utils.numberToVariableLength(tickDuration).concat(this.getNoteOffStatus(), Utils.getPitch(p), this.velocity) });
							} else {
								// Running status (can ommit the note off status)
								noteOff = new NoteOffEvent({ data: [0, Utils.getPitch(p), this.velocity] });
							}

							this.data = this.data.concat(noteOff.data);
						}, this);
					}
				} else {
					// Handle repeat
					for (var j = 0; j < this.repeat; j++) {
						this.pitch.forEach(function (p, i) {
							// restDuration only applies to first note
							if (i > 0) {
								restDuration = 0;
							}

							// If duration is 8th triplets we need to make sure that the total ticks == quarter note.
							// So, the last one will need to be the remainder
							if (this.duration === '8t' && i == this.pitch.length - 1) {
								tickDuration = quarterTicks - tickDuration * 2;
							}

							noteOn = new NoteOnEvent({ data: Utils.numberToVariableLength(restDuration).concat([this.getNoteOnStatus(), Utils.getPitch(p), this.velocity]) });
							noteOff = new NoteOffEvent({ data: Utils.numberToVariableLength(tickDuration).concat([this.getNoteOffStatus(), Utils.getPitch(p), this.velocity]) });

							this.data = this.data.concat(noteOn.data, noteOff.data);
						}, this);
					}
				}
			} else {
				console.error('pitch must be an array.');
			}
		}
	}, {
		key: 'convertVelocity',


		// Convert velocity to value 0-127
		value: function convertVelocity(velocity) {
			// Max passed value limited to 100
			velocity = velocity > 100 ? 100 : velocity;
			return Math.round(velocity / 100 * 127);
		}
	}, {
		key: 'getDurationMultiplier',


		/**
   * Gets what to multiple ticks/quarter note by to get the specified duration.
   * Note: type=='note' defaults to quarter note, type==='rest' defaults to 0
   * @param {string} duration
   * @param {string} type ['note','rest']
   */
		value: function getDurationMultiplier(duration, type) {
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
		}
	}, {
		key: 'getNoteOnStatus',


		/**
   * Gets the note on status code based on the selected channel. 0x9{0-F}
   * Note on at channel 0 is 0x90 (144)
   * 0 = Ch 1
   * @returns {number}
   */
		value: function getNoteOnStatus() {
			return 144 + this.channel - 1;
		}

		/**
   * Gets the note off status code based on the selected channel. 0x8{0-F}
   * Note off at channel 0 is 0x80 (128)
   * 0 = Ch 1
   * @returns {number}
   */

	}, {
		key: 'getNoteOffStatus',
		value: function getNoteOffStatus() {
			return 128 + this.channel - 1;
		}
	}]);

	return NoteEvent;
}();

exports.NoteEvent = NoteEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGUtZXZlbnQuanMiXSwibmFtZXMiOlsiTm90ZUV2ZW50IiwiZmllbGRzIiwidHlwZSIsInBpdGNoIiwid2FpdCIsImR1cmF0aW9uIiwic2VxdWVudGlhbCIsInZlbG9jaXR5IiwiY2hhbm5lbCIsInJlcGVhdCIsImNvbnZlcnRWZWxvY2l0eSIsImJ1aWxkRGF0YSIsImRhdGEiLCJxdWFydGVyVGlja3MiLCJVdGlscyIsIm51bWJlckZyb21CeXRlcyIsIkNvbnN0YW50cyIsIkhFQURFUl9DSFVOS19ESVZJU0lPTiIsInRpY2tEdXJhdGlvbiIsIk1hdGgiLCJyb3VuZCIsImdldER1cmF0aW9uTXVsdGlwbGllciIsInJlc3REdXJhdGlvbiIsIm5vdGVPbiIsIm5vdGVPZmYiLCJBcnJheSIsImlzQXJyYXkiLCJqIiwiZm9yRWFjaCIsInAiLCJpIiwiTm90ZU9uRXZlbnQiLCJudW1iZXJUb1ZhcmlhYmxlTGVuZ3RoIiwiY29uY2F0IiwiZ2V0Tm90ZU9uU3RhdHVzIiwiZ2V0UGl0Y2giLCJOb3RlT2ZmRXZlbnQiLCJnZXROb3RlT2ZmU3RhdHVzIiwibGVuZ3RoIiwiY29uc29sZSIsImVycm9yIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU1BLFM7QUFDTDs7Ozs7Ozs7Ozs7O0FBWUE7Ozs7O0FBS0Esb0JBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFDbkIsT0FBS0MsSUFBTCxHQUFjLE1BQWQ7QUFDQSxPQUFLQyxLQUFMLEdBQWVGLE9BQU9FLEtBQXRCO0FBQ0EsT0FBS0MsSUFBTCxHQUFjSCxPQUFPRyxJQUFQLElBQWUsQ0FBN0I7QUFDQSxPQUFLQyxRQUFMLEdBQWlCSixPQUFPSSxRQUF4QjtBQUNBLE9BQUtDLFVBQUwsR0FBa0JMLE9BQU9LLFVBQVAsSUFBcUIsS0FBdkM7QUFDQSxPQUFLQyxRQUFMLEdBQWlCTixPQUFPTSxRQUFQLElBQW1CLEVBQXBDO0FBQ0EsT0FBS0MsT0FBTCxHQUFnQlAsT0FBT08sT0FBUCxJQUFrQixDQUFsQztBQUNB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QUFVSCxJLEVBQU07QUFDckM7QUFDQSxXQUFRRyxRQUFSO0FBQ0MsU0FBSyxHQUFMO0FBQ0MsWUFBTyxDQUFQO0FBQ0QsU0FBSyxHQUFMO0FBQ0MsWUFBTyxDQUFQO0FBQ0QsU0FBSyxHQUFMO0FBQ0MsWUFBTyxDQUFQO0FBQ0QsU0FBSyxJQUFMO0FBQ0MsWUFBTyxDQUFQO0FBQ0QsU0FBSyxHQUFMO0FBQ0MsWUFBTyxDQUFQO0FBQ0QsU0FBSyxJQUFMO0FBQ0MsWUFBTyxHQUFQO0FBQ0QsU0FBSyxHQUFMO0FBQ0MsWUFBTyxHQUFQO0FBQ0QsU0FBSyxJQUFMO0FBQ0M7QUFDQSxZQUFPLElBQVA7QUFDRCxTQUFLLElBQUw7QUFDQyxZQUFPLElBQVA7QUFDRCxTQUFLLElBQUw7QUFDQyxZQUFPLElBQVA7QUFDRDtBQUNDO0FBQ0EsWUFBT0gsU0FBUyxNQUFULEdBQWtCLENBQWxCLEdBQXNCLENBQTdCO0FBeEJGO0FBMEJBOzs7OztBQUdEOzs7Ozs7b0NBTWtCO0FBQUMsVUFBTyxNQUFNLEtBQUtNLE9BQVgsR0FBcUIsQ0FBNUI7QUFBOEI7O0FBR2pEOzs7Ozs7Ozs7cUNBTW1CO0FBQUMsVUFBTyxNQUFNLEtBQUtBLE9BQVgsR0FBcUIsQ0FBNUI7QUFBOEI7Ozs7OztBQUduRGlDLFFBQVF6QyxTQUFSLEdBQW9CQSxTQUFwQiIsImZpbGUiOiJub3RlLWV2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTm90ZUV2ZW50IHtcblx0Lypcblx0dHlwZTogc3RyaW5nO1xuXHRwaXRjaDogYW55O1xuXHR3YWl0OiBzdHJpbmcgfCBudW1iZXI7XG5cdGR1cmF0aW9uOiBzdHJpbmc7XG5cdHNlcXVlbnRpYWw6IGJvb2xlYW47XG5cdHZlbG9jaXR5OiBudW1iZXI7XG5cdGNoYW5uZWw6IG51bWJlcjtcblx0cmVwZWF0OiBudW1iZXI7XG5cdGRhdGE6IG51bWJlcltdO1xuXHQqL1xuXG5cdC8qKlxuXHQgKiBXcmFwcGVyIGZvciBub3RlT25FdmVudC9ub3RlT2ZmRXZlbnQgb2JqZWN0cyB0aGF0IGJ1aWxkcyBib3RoIGV2ZW50cy5cblx0ICogZHVyYXRpb24gdmFsdWVzOiA0OnF1YXJ0ZXIsIDM6dHJpcGxldCBxdWFydGVyLCAyOiBoYWxmLCAxOiB3aG9sZVxuXHQgKiBAcGFyYW0ge29iamVjdH0gZmllbGRzIHtwaXRjaDogJ1tDNF0nLCBkdXJhdGlvbjogJzQnLCB3YWl0OiAnNCcsIHZlbG9jaXR5OiAxLTEwMH1cblx0ICovXG5cdGNvbnN0cnVjdG9yKGZpZWxkcykge1xuXHRcdHRoaXMudHlwZSBcdFx0PSAnbm90ZSc7XG5cdFx0dGhpcy5waXRjaCBcdFx0PSBmaWVsZHMucGl0Y2g7XG5cdFx0dGhpcy53YWl0IFx0XHQ9IGZpZWxkcy53YWl0IHx8IDA7XG5cdFx0dGhpcy5kdXJhdGlvbiBcdD0gZmllbGRzLmR1cmF0aW9uO1xuXHRcdHRoaXMuc2VxdWVudGlhbCA9IGZpZWxkcy5zZXF1ZW50aWFsIHx8IGZhbHNlO1xuXHRcdHRoaXMudmVsb2NpdHkgXHQ9IGZpZWxkcy52ZWxvY2l0eSB8fCA1MDtcblx0XHR0aGlzLmNoYW5uZWwgXHQ9IGZpZWxkcy5jaGFubmVsIHx8IDE7XG5cdFx0dGhpcy5yZXBlYXQgXHQ9IGZpZWxkcy5yZXBlYXQgfHwgMTtcblx0XHR0aGlzLnZlbG9jaXR5IFx0PSB0aGlzLmNvbnZlcnRWZWxvY2l0eSh0aGlzLnZlbG9jaXR5KTtcblx0XHR0aGlzLmJ1aWxkRGF0YSgpO1xuXHR9XG5cblxuXHRidWlsZERhdGEoKSB7XG5cdFx0dGhpcy5kYXRhID0gW107XG5cblx0XHQvLyBOZWVkIHRvIGFwcGx5IGR1cmF0aW9uIGhlcmUuICBRdWFydGVyIG5vdGUgPT0gQ29uc3RhbnRzLkhFQURFUl9DSFVOS19ESVZJU0lPTlxuXHRcdC8vIFJvdW5kaW5nIG9ubHkgYXBwbGllcyB0byB0cmlwbGV0cywgd2hpY2ggdGhlIHJlbWFpbmRlciBpcyBoYW5kbGVkIGJlbG93XG5cdFx0dmFyIHF1YXJ0ZXJUaWNrcyA9IFV0aWxzLm51bWJlckZyb21CeXRlcyhDb25zdGFudHMuSEVBREVSX0NIVU5LX0RJVklTSU9OKTtcblx0XHR2YXIgdGlja0R1cmF0aW9uID0gTWF0aC5yb3VuZChxdWFydGVyVGlja3MgKiB0aGlzLmdldER1cmF0aW9uTXVsdGlwbGllcih0aGlzLmR1cmF0aW9uLCAnbm90ZScpKTtcblx0XHR2YXIgcmVzdER1cmF0aW9uID0gTWF0aC5yb3VuZChxdWFydGVyVGlja3MgKiB0aGlzLmdldER1cmF0aW9uTXVsdGlwbGllcih0aGlzLndhaXQsICdyZXN0JykpO1xuXG5cdFx0Ly8gZmllbGRzLnBpdGNoIGNvdWxkIGJlIGFuIGFycmF5IG9mIHBpdGNoZXMuXG5cdFx0Ly8gSWYgc28gY3JlYXRlIG5vdGUgZXZlbnRzIGZvciBlYWNoIGFuZCBhcHBseSB0aGUgc2FtZSBkdXJhdGlvbi5cblx0XHR2YXIgbm90ZU9uLCBub3RlT2ZmO1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMucGl0Y2gpKSB7XG5cdFx0XHQvLyBCeSBkZWZhdWx0IHRoaXMgaXMgYSBjaG9yZCBpZiBpdCdzIGFuIGFycmF5IG9mIG5vdGVzIHRoYXQgcmVxdWlyZXMgb25lIE5vdGVPbkV2ZW50LlxuXHRcdFx0Ly8gSWYgdGhpcy5zZXF1ZW50aWFsID09PSB0cnVlIHRoZW4gaXQncyBhIHNlcXVlbnRpYWwgc3RyaW5nIG9mIG5vdGVzIHRoYXQgcmVxdWlyZXMgc2VwYXJhdGUgTm90ZU9uRXZlbnRzLlxuXHRcdFx0aWYgKCAhIHRoaXMuc2VxdWVudGlhbCkge1xuXHRcdFx0XHQvLyBIYW5kbGUgcmVwZWF0XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5yZXBlYXQ7IGorKykge1xuXHRcdFx0XHRcdC8vIE5vdGUgb25cblx0XHRcdFx0XHR0aGlzLnBpdGNoLmZvckVhY2goZnVuY3Rpb24ocCwgaSkge1xuXHRcdFx0XHRcdFx0aWYgKGkgPT0gMCkge1xuXHRcdFx0XHRcdFx0XHRub3RlT24gPSBuZXcgTm90ZU9uRXZlbnQoe2RhdGE6IFV0aWxzLm51bWJlclRvVmFyaWFibGVMZW5ndGgocmVzdER1cmF0aW9uKS5jb25jYXQodGhpcy5nZXROb3RlT25TdGF0dXMoKSwgVXRpbHMuZ2V0UGl0Y2gocCksIHRoaXMudmVsb2NpdHkpfSk7XG5cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIFJ1bm5pbmcgc3RhdHVzIChjYW4gb21taXQgdGhlIG5vdGUgb24gc3RhdHVzKVxuXHRcdFx0XHRcdFx0XHRub3RlT24gPSBuZXcgTm90ZU9uRXZlbnQoe2RhdGE6IFswLCBVdGlscy5nZXRQaXRjaChwKSwgdGhpcy52ZWxvY2l0eV19KTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dGhpcy5kYXRhID0gdGhpcy5kYXRhLmNvbmNhdChub3RlT24uZGF0YSk7XG5cdFx0XHRcdFx0fSwgdGhpcyk7XG5cblx0XHRcdFx0XHQvLyBOb3RlIG9mZlxuXHRcdFx0XHRcdHRoaXMucGl0Y2guZm9yRWFjaChmdW5jdGlvbihwLCBpKSB7XG5cdFx0XHRcdFx0XHRpZiAoaSA9PSAwKSB7XG5cdFx0XHRcdFx0XHRcdG5vdGVPZmYgPSBuZXcgTm90ZU9mZkV2ZW50KHtkYXRhOiBVdGlscy5udW1iZXJUb1ZhcmlhYmxlTGVuZ3RoKHRpY2tEdXJhdGlvbikuY29uY2F0KHRoaXMuZ2V0Tm90ZU9mZlN0YXR1cygpLCBVdGlscy5nZXRQaXRjaChwKSwgdGhpcy52ZWxvY2l0eSl9KTtcblxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gUnVubmluZyBzdGF0dXMgKGNhbiBvbW1pdCB0aGUgbm90ZSBvZmYgc3RhdHVzKVxuXHRcdFx0XHRcdFx0XHRub3RlT2ZmID0gbmV3IE5vdGVPZmZFdmVudCh7ZGF0YTogWzAsIFV0aWxzLmdldFBpdGNoKHApLCB0aGlzLnZlbG9jaXR5XX0pO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0aGlzLmRhdGEgPSB0aGlzLmRhdGEuY29uY2F0KG5vdGVPZmYuZGF0YSk7XG5cdFx0XHRcdFx0fSwgdGhpcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSGFuZGxlIHJlcGVhdFxuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMucmVwZWF0OyBqKyspIHtcblx0XHRcdFx0XHR0aGlzLnBpdGNoLmZvckVhY2goZnVuY3Rpb24ocCwgaSkge1xuXHRcdFx0XHRcdFx0Ly8gcmVzdER1cmF0aW9uIG9ubHkgYXBwbGllcyB0byBmaXJzdCBub3RlXG5cdFx0XHRcdFx0XHRpZiAoaSA+IDApIHtcblx0XHRcdFx0XHRcdFx0cmVzdER1cmF0aW9uID0gMDtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSWYgZHVyYXRpb24gaXMgOHRoIHRyaXBsZXRzIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHRvdGFsIHRpY2tzID09IHF1YXJ0ZXIgbm90ZS5cblx0XHRcdFx0XHRcdC8vIFNvLCB0aGUgbGFzdCBvbmUgd2lsbCBuZWVkIHRvIGJlIHRoZSByZW1haW5kZXJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmR1cmF0aW9uID09PSAnOHQnICYmIGkgPT0gdGhpcy5waXRjaC5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdFx0XHRcdHRpY2tEdXJhdGlvbiA9IHF1YXJ0ZXJUaWNrcyAtICh0aWNrRHVyYXRpb24gKiAyKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0bm90ZU9uID0gbmV3IE5vdGVPbkV2ZW50KHtkYXRhOiBVdGlscy5udW1iZXJUb1ZhcmlhYmxlTGVuZ3RoKHJlc3REdXJhdGlvbikuY29uY2F0KFt0aGlzLmdldE5vdGVPblN0YXR1cygpLCBVdGlscy5nZXRQaXRjaChwKSwgdGhpcy52ZWxvY2l0eV0pfSk7XG5cdFx0XHRcdFx0XHRub3RlT2ZmID0gbmV3IE5vdGVPZmZFdmVudCh7ZGF0YTogVXRpbHMubnVtYmVyVG9WYXJpYWJsZUxlbmd0aCh0aWNrRHVyYXRpb24pLmNvbmNhdChbdGhpcy5nZXROb3RlT2ZmU3RhdHVzKCksIFV0aWxzLmdldFBpdGNoKHApLCB0aGlzLnZlbG9jaXR5XSl9KTtcblxuXHRcdFx0XHRcdFx0dGhpcy5kYXRhID0gdGhpcy5kYXRhLmNvbmNhdChub3RlT24uZGF0YSwgbm90ZU9mZi5kYXRhKTtcblx0XHRcdFx0XHR9LCB0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ3BpdGNoIG11c3QgYmUgYW4gYXJyYXkuJyk7XG5cdFx0fVxuXHR9O1xuXG5cblx0Ly8gQ29udmVydCB2ZWxvY2l0eSB0byB2YWx1ZSAwLTEyN1xuXHRjb252ZXJ0VmVsb2NpdHkodmVsb2NpdHkpIHtcblx0XHQvLyBNYXggcGFzc2VkIHZhbHVlIGxpbWl0ZWQgdG8gMTAwXG5cdFx0dmVsb2NpdHkgPSB2ZWxvY2l0eSA+IDEwMCA/IDEwMCA6IHZlbG9jaXR5O1xuXHRcdHJldHVybiBNYXRoLnJvdW5kKHZlbG9jaXR5IC8gMTAwICogMTI3KTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBHZXRzIHdoYXQgdG8gbXVsdGlwbGUgdGlja3MvcXVhcnRlciBub3RlIGJ5IHRvIGdldCB0aGUgc3BlY2lmaWVkIGR1cmF0aW9uLlxuXHQgKiBOb3RlOiB0eXBlPT0nbm90ZScgZGVmYXVsdHMgdG8gcXVhcnRlciBub3RlLCB0eXBlPT09J3Jlc3QnIGRlZmF1bHRzIHRvIDBcblx0ICogQHBhcmFtIHtzdHJpbmd9IGR1cmF0aW9uXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFsnbm90ZScsJ3Jlc3QnXVxuXHQgKi9cblx0Z2V0RHVyYXRpb25NdWx0aXBsaWVyKGR1cmF0aW9uLCB0eXBlKSB7XG5cdFx0Ly8gTmVlZCB0byBhcHBseSBkdXJhdGlvbiBoZXJlLiAgUXVhcnRlciBub3RlID09IENvbnN0YW50cy5IRUFERVJfQ0hVTktfRElWSVNJT05cblx0XHRzd2l0Y2ggKGR1cmF0aW9uKSB7XG5cdFx0XHRjYXNlICcwJzpcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRjYXNlICcxJzpcblx0XHRcdFx0cmV0dXJuIDQ7XG5cdFx0XHRjYXNlICcyJzpcblx0XHRcdFx0cmV0dXJuIDI7XG5cdFx0XHRjYXNlICdkMic6XG5cdFx0XHRcdHJldHVybiAzO1xuXHRcdFx0Y2FzZSAnNCc6XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0Y2FzZSAnZDQnOlxuXHRcdFx0XHRyZXR1cm4gMS41O1xuXHRcdFx0Y2FzZSAnOCc6XG5cdFx0XHRcdHJldHVybiAwLjU7XG5cdFx0XHRjYXNlICc4dCc6XG5cdFx0XHRcdC8vIEZvciA4dGggdHJpcGxldHMsIGxldCdzIGRpdmlkZSBhIHF1YXJ0ZXIgYnkgMywgcm91bmQgdG8gdGhlIG5lYXJlc3QgaW50LCBhbmQgc3Vic3RyYWN0IHRoZSByZW1haW5kZXIgdG8gdGhlIGxhc3Qgb25lLlxuXHRcdFx0XHRyZXR1cm4gMC4zMztcblx0XHRcdGNhc2UgJ2Q4Jzpcblx0XHRcdFx0cmV0dXJuIDAuNzU7XG5cdFx0XHRjYXNlICcxNic6XG5cdFx0XHRcdHJldHVybiAwLjI1O1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Ly8gTm90ZXMgZGVmYXVsdCB0byBhIHF1YXJ0ZXIsIHJlc3RzIGRlZmF1bHQgdG8gMFxuXHRcdFx0XHRyZXR1cm4gdHlwZSA9PT0gJ25vdGUnID8gMSA6IDA7XG5cdFx0fVxuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIG5vdGUgb24gc3RhdHVzIGNvZGUgYmFzZWQgb24gdGhlIHNlbGVjdGVkIGNoYW5uZWwuIDB4OXswLUZ9XG5cdCAqIE5vdGUgb24gYXQgY2hhbm5lbCAwIGlzIDB4OTAgKDE0NClcblx0ICogMCA9IENoIDFcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdGdldE5vdGVPblN0YXR1cygpIHtyZXR1cm4gMTQ0ICsgdGhpcy5jaGFubmVsIC0gMX1cblxuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBub3RlIG9mZiBzdGF0dXMgY29kZSBiYXNlZCBvbiB0aGUgc2VsZWN0ZWQgY2hhbm5lbC4gMHg4ezAtRn1cblx0ICogTm90ZSBvZmYgYXQgY2hhbm5lbCAwIGlzIDB4ODAgKDEyOClcblx0ICogMCA9IENoIDFcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdGdldE5vdGVPZmZTdGF0dXMoKSB7cmV0dXJuIDEyOCArIHRoaXMuY2hhbm5lbCAtIDF9XG59XG5cbmV4cG9ydHMuTm90ZUV2ZW50ID0gTm90ZUV2ZW50OyJdfQ==
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Holds all data for a "note off" MIDI event
 * @param {object} fields {data: []}
 */
var NoteOffEvent =
//data: number[];

function NoteOffEvent(fields) {
	_classCallCheck(this, NoteOffEvent);

	this.data = fields.data;
};

exports.NoteOffEvent = NoteOffEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGUtb2ZmLWV2ZW50LmpzIl0sIm5hbWVzIjpbIk5vdGVPZmZFdmVudCIsImZpZWxkcyIsImRhdGEiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7SUFJTUEsWTtBQUNMOztBQUVBLHNCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ25CLE1BQUtDLElBQUwsR0FBWUQsT0FBT0MsSUFBbkI7QUFDQSxDOztBQUdGQyxRQUFRSCxZQUFSLEdBQXVCQSxZQUF2QiIsImZpbGUiOiJub3RlLW9mZi1ldmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSG9sZHMgYWxsIGRhdGEgZm9yIGEgXCJub3RlIG9mZlwiIE1JREkgZXZlbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBmaWVsZHMge2RhdGE6IFtdfVxuICovXG5jbGFzcyBOb3RlT2ZmRXZlbnQge1xuXHQvL2RhdGE6IG51bWJlcltdO1xuXG5cdGNvbnN0cnVjdG9yKGZpZWxkcykge1xuXHRcdHRoaXMuZGF0YSA9IGZpZWxkcy5kYXRhO1xuXHR9XG59XG5cbmV4cG9ydHMuTm90ZU9mZkV2ZW50ID0gTm90ZU9mZkV2ZW50OyJdfQ==
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Holds all data for a "note on" MIDI event
 * @param {object} fields {data: []}
 */
var NoteOnEvent =
//data: number[];

function NoteOnEvent(fields) {
	_classCallCheck(this, NoteOnEvent);

	this.data = fields.data;
};

exports.NoteOnEvent = NoteOnEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGUtb24tZXZlbnQuanMiXSwibmFtZXMiOlsiTm90ZU9uRXZlbnQiLCJmaWVsZHMiLCJkYXRhIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0lBSU1BLFc7QUFDTDs7QUFFQSxxQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNuQixNQUFLQyxJQUFMLEdBQVlELE9BQU9DLElBQW5CO0FBQ0EsQzs7QUFHRkMsUUFBUUgsV0FBUixHQUFzQkEsV0FBdEIiLCJmaWxlIjoibm90ZS1vbi1ldmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSG9sZHMgYWxsIGRhdGEgZm9yIGEgXCJub3RlIG9uXCIgTUlESSBldmVudFxuICogQHBhcmFtIHtvYmplY3R9IGZpZWxkcyB7ZGF0YTogW119XG4gKi9cbmNsYXNzIE5vdGVPbkV2ZW50IHtcblx0Ly9kYXRhOiBudW1iZXJbXTtcblxuXHRjb25zdHJ1Y3RvcihmaWVsZHMpIHtcblx0XHR0aGlzLmRhdGEgPSBmaWVsZHMuZGF0YTtcblx0fVxufVxuXG5leHBvcnRzLk5vdGVPbkV2ZW50ID0gTm90ZU9uRXZlbnQ7Il19
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgramChangeEvent = function ProgramChangeEvent(fields) {
	_classCallCheck(this, ProgramChangeEvent);

	this.type = 'program';
	// delta time defaults to 0.
	this.data = Utils.numberToVariableLength(0x00).concat(Constants.PROGRAM_CHANGE_STATUS, fields.instrument);
};

exports.ProgramChangeEvent = ProgramChangeEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2dyYW0tY2hhbmdlLWV2ZW50LmpzIl0sIm5hbWVzIjpbIlByb2dyYW1DaGFuZ2VFdmVudCIsImZpZWxkcyIsInR5cGUiLCJkYXRhIiwiVXRpbHMiLCJudW1iZXJUb1ZhcmlhYmxlTGVuZ3RoIiwiY29uY2F0IiwiQ29uc3RhbnRzIiwiUFJPR1JBTV9DSEFOR0VfU1RBVFVTIiwiaW5zdHJ1bWVudCIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7SUFBTUEsa0IsR0FDTCw0QkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNuQixNQUFLQyxJQUFMLEdBQVksU0FBWjtBQUNBO0FBQ0EsTUFBS0MsSUFBTCxHQUFZQyxNQUFNQyxzQkFBTixDQUE2QixJQUE3QixFQUFtQ0MsTUFBbkMsQ0FBMENDLFVBQVVDLHFCQUFwRCxFQUEyRVAsT0FBT1EsVUFBbEYsQ0FBWjtBQUNBLEM7O0FBR0ZDLFFBQVFWLGtCQUFSLEdBQTZCQSxrQkFBN0IiLCJmaWxlIjoicHJvZ3JhbS1jaGFuZ2UtZXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQcm9ncmFtQ2hhbmdlRXZlbnQge1xuXHRjb25zdHJ1Y3RvcihmaWVsZHMpIHtcblx0XHR0aGlzLnR5cGUgPSAncHJvZ3JhbSc7XG5cdFx0Ly8gZGVsdGEgdGltZSBkZWZhdWx0cyB0byAwLlxuXHRcdHRoaXMuZGF0YSA9IFV0aWxzLm51bWJlclRvVmFyaWFibGVMZW5ndGgoMHgwMCkuY29uY2F0KENvbnN0YW50cy5QUk9HUkFNX0NIQU5HRV9TVEFUVVMsIGZpZWxkcy5pbnN0cnVtZW50KTtcblx0fVxufVxuXG5leHBvcnRzLlByb2dyYW1DaGFuZ2VFdmVudCA9IFByb2dyYW1DaGFuZ2VFdmVudDsiXX0=
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Track = function () {
	//type: number[];
	//data: number[];
	//size: number[];
	//events: any;

	function Track() {
		_classCallCheck(this, Track);

		this.type = Constants.TRACK_CHUNK_TYPE;
		this.data = [];
		this.size = [];
		this.events = [];
	}

	// Method to add any event type the track.


	_createClass(Track, [{
		key: 'addEvent',
		value: function addEvent(event, mapFunction) {
			if (Array.isArray(event)) {
				event.forEach(function (e, i) {
					// Handle map function if provided
					if (typeof mapFunction === 'function' && e.type === 'note') {
						var properties = mapFunction(i, e);

						if ((typeof properties === 'undefined' ? 'undefined' : _typeof(properties)) === 'object') {
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
	}, {
		key: 'setTempo',
		value: function setTempo(bpm) {
			var event = new MetaEvent({ data: [Constants.META_TEMPO_ID] });
			event.data.push(0x03); // Size
			var tempo = Math.round(60000000 / bpm);
			event.data = event.data.concat(Utils.numberToBytes(tempo, 3)); // Tempo, 3 bytes
			return this.addEvent(event);
		}
	}, {
		key: 'setTimeSignature',
		value: function setTimeSignature(numerator, denominator, midiclockspertick, notespermidiclock) {
			var event = new MetaEvent({ data: [Constants.META_TIME_SIGNATURE_ID] });
			event.data.push(0x04); // Size
			event.data = event.data.concat(Utils.numberToBytes(numerator, 1)); // Numerator, 1 bytes
			var _denominator = denominator < 4 ? denominator - 1 : Math.sqrt(denominator); // Denominator is expressed as pow of 2
			event.data = event.data.concat(Utils.numberToBytes(_denominator, 1)); // Denominator, 1 bytes
			midiclockspertick = midiclockspertick || 24;
			event.data = event.data.concat(Utils.numberToBytes(midiclockspertick, 1)); // MIDI Clocks per tick, 1 bytes
			notespermidiclock = notespermidiclock || 8;
			event.data = event.data.concat(Utils.numberToBytes(notespermidiclock, 1)); // Number of 1/32 notes per MIDI clocks, 1 bytes
			return this.addEvent(event);
		}
	}, {
		key: 'setKeySignature',
		value: function setKeySignature(sf, mi) {
			var event = new MetaEvent({ data: [Constants.META_KEY_SIGNATURE_ID] });
			event.data.push(0x02); // Size

			var mode = mi || 0;
			sf = sf || 0;

			//	Function called with string notation
			if (typeof mi === 'undefined') {
				var fifths = [['Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'], ['ab', 'eb', 'bb', 'f', 'c', 'g', 'd', 'a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#']];
				var _sflen = sf.length;
				var note = sf || 'C';

				if (sf[0] === sf[0].toLowerCase()) mode = 1;

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
	}, {
		key: 'addText',
		value: function addText(text) {
			var event = new MetaEvent({ data: [Constants.META_TEXT_ID] });
			var stringBytes = Utils.stringToBytes(text);
			event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
			event.data = event.data.concat(stringBytes); // Text
			return this.addEvent(event);
		}
	}, {
		key: 'addCopyright',
		value: function addCopyright(text) {
			var event = new MetaEvent({ data: [Constants.META_COPYRIGHT_ID] });
			var stringBytes = Utils.stringToBytes(text);
			event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
			event.data = event.data.concat(stringBytes); // Text
			return this.addEvent(event);
		}
	}, {
		key: 'addInstrumentName',
		value: function addInstrumentName(text) {
			var event = new MetaEvent({ data: [Constants.META_INSTRUMENT_NAME_ID] });
			var stringBytes = Utils.stringToBytes(text);
			event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
			event.data = event.data.concat(stringBytes); // Text
			return this.addEvent(event);
		}
	}, {
		key: 'addMarker',
		value: function addMarker(text) {
			var event = new MetaEvent({ data: [Constants.META_MARKER_ID] });
			var stringBytes = Utils.stringToBytes(text);
			event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
			event.data = event.data.concat(stringBytes); // Text
			return this.addEvent(event);
		}
	}, {
		key: 'addCuePoint',
		value: function addCuePoint(text) {
			var event = new MetaEvent({ data: [Constants.META_CUE_POINT] });
			var stringBytes = Utils.stringToBytes(text);
			event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
			event.data = event.data.concat(stringBytes); // Text
			return this.addEvent(event);
		}
	}, {
		key: 'addLyric',
		value: function addLyric(lyric) {
			var event = new MetaEvent({ data: [Constants.META_LYRIC_ID] });
			var stringBytes = Utils.stringToBytes(lyric);
			event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
			event.data = event.data.concat(stringBytes); // Lyric
			return this.addEvent(event);
		}

		/** Channel Mode Messages **/

	}, {
		key: 'polyModeOn',
		value: function polyModeOn() {
			var event = new NoteOnEvent({ data: [0x00, 0xB0, 0x7E, 0x00] });
			this.addEvent(event);
			console.log(event);
		}
	}]);

	return Track;
}();

exports.Track = Track;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyYWNrLmpzIl0sIm5hbWVzIjpbIlRyYWNrIiwidHlwZSIsIkNvbnN0YW50cyIsIlRSQUNLX0NIVU5LX1RZUEUiLCJkYXRhIiwic2l6ZSIsImV2ZW50cyIsImV2ZW50IiwibWFwRnVuY3Rpb24iLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwiZSIsImkiLCJwcm9wZXJ0aWVzIiwiaiIsImR1cmF0aW9uIiwic2VxdWVudGlhbCIsInZlbG9jaXR5IiwiY29udmVydFZlbG9jaXR5IiwiYnVpbGREYXRhIiwiY29uY2F0IiwiVXRpbHMiLCJudW1iZXJUb0J5dGVzIiwibGVuZ3RoIiwicHVzaCIsImJwbSIsIk1ldGFFdmVudCIsIk1FVEFfVEVNUE9fSUQiLCJ0ZW1wbyIsIk1hdGgiLCJyb3VuZCIsImFkZEV2ZW50IiwibnVtZXJhdG9yIiwiZGVub21pbmF0b3IiLCJtaWRpY2xvY2tzcGVydGljayIsIm5vdGVzcGVybWlkaWNsb2NrIiwiTUVUQV9USU1FX1NJR05BVFVSRV9JRCIsIl9kZW5vbWluYXRvciIsInNxcnQiLCJzZiIsIm1pIiwiTUVUQV9LRVlfU0lHTkFUVVJFX0lEIiwibW9kZSIsImZpZnRocyIsIl9zZmxlbiIsIm5vdGUiLCJ0b0xvd2VyQ2FzZSIsImNoYXJBdCIsInN1YnN0cmluZyIsInRvVXBwZXJDYXNlIiwiZmlmdGhpbmRleCIsImluZGV4T2YiLCJ0ZXh0IiwiTUVUQV9URVhUX0lEIiwic3RyaW5nQnl0ZXMiLCJzdHJpbmdUb0J5dGVzIiwibnVtYmVyVG9WYXJpYWJsZUxlbmd0aCIsIk1FVEFfQ09QWVJJR0hUX0lEIiwiTUVUQV9JTlNUUlVNRU5UX05BTUVfSUQiLCJNRVRBX01BUktFUl9JRCIsIk1FVEFfQ1VFX1BPSU5UIiwibHlyaWMiLCJNRVRBX0xZUklDX0lEIiwiTm90ZU9uRXZlbnQiLCJjb25zb2xlIiwibG9nIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFBTUEsSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtC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QUFaO0FBQ0EsT0FBSVIsY0FBY2pDLE1BQU1rQyxhQUFOLENBQW9CTSxLQUFwQixDQUFsQjtBQUNBdkQsU0FBTUgsSUFBTixHQUFhRyxNQUFNSCxJQUFOLENBQVdpQixNQUFYLENBQWtCQyxNQUFNbUMsc0JBQU4sQ0FBNkJGLFlBQVkvQixNQUF6QyxDQUFsQixDQUFiLENBSGUsQ0FHbUU7QUFDbEZqQixTQUFNSCxJQUFOLEdBQWFHLE1BQU1ILElBQU4sQ0FBV2lCLE1BQVgsQ0FBa0JrQyxXQUFsQixDQUFiLENBSmUsQ0FJOEI7QUFDN0MsVUFBTyxLQUFLdkIsUUFBTCxDQUFjekIsS0FBZCxDQUFQO0FBQ0E7O0FBRUQ7Ozs7K0JBQ2E7QUFDWixPQUFJQSxRQUFRLElBQUl5RCxXQUFKLENBQWdCLEVBQUM1RCxNQUFNLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLENBQVAsRUFBaEIsQ0FBWjtBQUNBLFFBQUs0QixRQUFMLENBQWN6QixLQUFkO0FBQ0EwRCxXQUFRQyxHQUFSLENBQVkzRCxLQUFaO0FBQ0E7Ozs7OztBQUlGNEQsUUFBUW5FLEtBQVIsR0FBZ0JBLEtBQWhCIiwiZmlsZSI6InRyYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVHJhY2sge1xuXHQvL3R5cGU6IG51bWJlcltdO1xuXHQvL2RhdGE6IG51bWJlcltdO1xuXHQvL3NpemU6IG51bWJlcltdO1xuXHQvL2V2ZW50czogYW55O1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMudHlwZSA9IENvbnN0YW50cy5UUkFDS19DSFVOS19UWVBFO1xuXHRcdHRoaXMuZGF0YSA9IFtdO1xuXHRcdHRoaXMuc2l6ZSA9IFtdO1xuXHRcdHRoaXMuZXZlbnRzID0gW107XG5cdH1cblxuXHQvLyBNZXRob2QgdG8gYWRkIGFueSBldmVudCB0eXBlIHRoZSB0cmFjay5cblx0YWRkRXZlbnQoZXZlbnQsIG1hcEZ1bmN0aW9uKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoZXZlbnQpKSB7XG5cdFx0XHRldmVudC5mb3JFYWNoKGZ1bmN0aW9uKGUsIGkpIHtcblx0XHRcdFx0Ly8gSGFuZGxlIG1hcCBmdW5jdGlvbiBpZiBwcm92aWRlZFxuXHRcdFx0XHRpZiAodHlwZW9mIG1hcEZ1bmN0aW9uID09PSAnZnVuY3Rpb24nICYmIGUudHlwZSA9PT0gJ25vdGUnKSB7XG5cdFx0XHRcdFx0dmFyIHByb3BlcnRpZXMgPSBtYXBGdW5jdGlvbihpLCBlKTtcblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgcHJvcGVydGllcyA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdGZvciAodmFyIGogaW4gcHJvcGVydGllcykge1xuXHRcdFx0XHRcdFx0XHRzd2l0Y2goaikge1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ2R1cmF0aW9uJzpcblx0XHRcdFx0XHRcdFx0XHRcdGUuZHVyYXRpb24gPSBwcm9wZXJ0aWVzW2pdO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAnc2VxdWVudGlhbCc6XG5cdFx0XHRcdFx0XHRcdFx0XHRlLnNlcXVlbnRpYWwgPSBwcm9wZXJ0aWVzW2pdO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAndmVsb2NpdHknOlxuXHRcdFx0XHRcdFx0XHRcdFx0ZS52ZWxvY2l0eSA9IGUuY29udmVydFZlbG9jaXR5KHByb3BlcnRpZXNbal0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cdFx0XG5cblx0XHRcdFx0XHRcdC8vIEdvdHRhIGJ1aWxkIHRoYXQgZGF0YVxuXHRcdFx0XHRcdFx0ZS5idWlsZERhdGEoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmRhdGEgPSB0aGlzLmRhdGEuY29uY2F0KGUuZGF0YSk7XG5cdFx0XHRcdHRoaXMuc2l6ZSA9IFV0aWxzLm51bWJlclRvQnl0ZXModGhpcy5kYXRhLmxlbmd0aCwgNCk7IC8vIDQgYnl0ZXMgbG9uZ1xuXHRcdFx0XHR0aGlzLmV2ZW50cy5wdXNoKGUpO1xuXHRcdFx0fSwgdGhpcyk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5kYXRhID0gdGhpcy5kYXRhLmNvbmNhdChldmVudC5kYXRhKTtcblx0XHRcdHRoaXMuc2l6ZSA9IFV0aWxzLm51bWJlclRvQnl0ZXModGhpcy5kYXRhLmxlbmd0aCwgNCk7IC8vIDQgYnl0ZXMgbG9uZ1xuXHRcdFx0dGhpcy5ldmVudHMucHVzaChldmVudCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRUZW1wbyhicG0pIHtcblx0XHR2YXIgZXZlbnQgPSBuZXcgTWV0YUV2ZW50KHtkYXRhOiBbQ29uc3RhbnRzLk1FVEFfVEVNUE9fSURdfSk7XG5cdFx0ZXZlbnQuZGF0YS5wdXNoKDB4MDMpOyAvLyBTaXplXG5cdFx0dmFyIHRlbXBvID0gTWF0aC5yb3VuZCg2MDAwMDAwMCAvIGJwbSk7XG5cdFx0ZXZlbnQuZGF0YSA9IGV2ZW50LmRhdGEuY29uY2F0KFV0aWxzLm51bWJlclRvQnl0ZXModGVtcG8sIDMpKTsgLy8gVGVtcG8sIDMgYnl0ZXNcblx0XHRyZXR1cm4gdGhpcy5hZGRFdmVudChldmVudCk7XG5cdH1cblxuXG5cdHNldFRpbWVTaWduYXR1cmUobnVtZXJhdG9yLCBkZW5vbWluYXRvciwgbWlkaWNsb2Nrc3BlcnRpY2ssIG5vdGVzcGVybWlkaWNsb2NrKSB7XG5cdFx0dmFyIGV2ZW50ID0gbmV3IE1ldGFFdmVudCh7ZGF0YTogW0NvbnN0YW50cy5NRVRBX1RJTUVfU0lHTkFUVVJFX0lEXX0pO1xuXHRcdGV2ZW50LmRhdGEucHVzaCgweDA0KTsgLy8gU2l6ZVxuXHRcdGV2ZW50LmRhdGEgPSBldmVudC5kYXRhLmNvbmNhdChVdGlscy5udW1iZXJUb0J5dGVzKG51bWVyYXRvciwgMSkpOyAvLyBOdW1lcmF0b3IsIDEgYnl0ZXNcblx0XHR2YXIgX2Rlbm9taW5hdG9yID0gKGRlbm9taW5hdG9yIDwgNCkgPyAoZGVub21pbmF0b3IgLSAxKSA6IE1hdGguc3FydChkZW5vbWluYXRvcik7XHQvLyBEZW5vbWluYXRvciBpcyBleHByZXNzZWQgYXMgcG93IG9mIDJcblx0XHRldmVudC5kYXRhID0gZXZlbnQuZGF0YS5jb25jYXQoVXRpbHMubnVtYmVyVG9CeXRlcyhfZGVub21pbmF0b3IsIDEpKTsgLy8gRGVub21pbmF0b3IsIDEgYnl0ZXNcblx0XHRtaWRpY2xvY2tzcGVydGljayA9IG1pZGljbG9ja3NwZXJ0aWNrIHx8IDI0O1xuXHRcdGV2ZW50LmRhdGEgPSBldmVudC5kYXRhLmNvbmNhdChVdGlscy5udW1iZXJUb0J5dGVzKG1pZGljbG9ja3NwZXJ0aWNrLCAxKSk7IC8vIE1JREkgQ2xvY2tzIHBlciB0aWNrLCAxIGJ5dGVzXG5cdFx0bm90ZXNwZXJtaWRpY2xvY2sgPSBub3Rlc3Blcm1pZGljbG9jayB8fCA4O1xuXHRcdGV2ZW50LmRhdGEgPSBldmVudC5kYXRhLmNvbmNhdChVdGlscy5udW1iZXJUb0J5dGVzKG5vdGVzcGVybWlkaWNsb2NrLCAxKSk7IC8vIE51bWJlciBvZiAxLzMyIG5vdGVzIHBlciBNSURJIGNsb2NrcywgMSBieXRlc1xuXHRcdHJldHVybiB0aGlzLmFkZEV2ZW50KGV2ZW50KTtcblx0fVxuXG5cdHNldEtleVNpZ25hdHVyZShzZiwgbWkpIHtcblx0XHR2YXIgZXZlbnQgPSBuZXcgTWV0YUV2ZW50KHtkYXRhOiBbQ29uc3RhbnRzLk1FVEFfS0VZX1NJR05BVFVSRV9JRF19KTtcblx0XHRldmVudC5kYXRhLnB1c2goMHgwMik7IC8vIFNpemVcblxuXHRcdHZhciBtb2RlID0gbWkgfHwgMDtcblx0XHRzZiA9IHNmIHx8IDA7XG5cblx0XHQvL1x0RnVuY3Rpb24gY2FsbGVkIHdpdGggc3RyaW5nIG5vdGF0aW9uXG5cdFx0aWYgKHR5cGVvZiBtaSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHZhciBmaWZ0aHMgPSBbXG5cdFx0XHRcdFsnQ2InLCAnR2InLCAnRGInLCAnQWInLCAnRWInLCAnQmInLCAnRicsICdDJywgJ0cnLCAnRCcsICdBJywgJ0UnLCAnQicsICdGIycsICdDIyddLFxuXHRcdFx0XHRbJ2FiJywgJ2ViJywgJ2JiJywgJ2YnLCAnYycsICdnJywgJ2QnLCAnYScsICdlJywgJ2InLCAnZiMnLCAnYyMnLCAnZyMnLCAnZCMnLCAnYSMnXVxuXHRcdFx0XTtcblx0XHRcdHZhciBfc2ZsZW4gPSBzZi5sZW5ndGg7XG5cdFx0XHR2YXIgbm90ZSA9IHNmIHx8ICdDJztcblxuXHRcdFx0aWYgKHNmWzBdID09PSBzZlswXS50b0xvd2VyQ2FzZSgpKSBtb2RlID0gMVxuXG5cdFx0XHRpZiAoX3NmbGVuID4gMSkge1xuXHRcdFx0XHRzd2l0Y2ggKHNmLmNoYXJBdChfc2ZsZW4gLSAxKSkge1xuXHRcdFx0XHRcdGNhc2UgJ20nOlxuXHRcdFx0XHRcdFx0bW9kZSA9IDE7XG5cdFx0XHRcdFx0XHRub3RlID0gc2YuY2hhckF0KDApLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRub3RlID0gbm90ZS5jb25jYXQoc2Yuc3Vic3RyaW5nKDEsIF9zZmxlbiAtIDEpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJy0nOlxuXHRcdFx0XHRcdFx0bW9kZSA9IDE7XG5cdFx0XHRcdFx0XHRub3RlID0gc2YuY2hhckF0KDApLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRub3RlID0gbm90ZS5jb25jYXQoc2Yuc3Vic3RyaW5nKDEsIF9zZmxlbiAtIDEpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ00nOlxuXHRcdFx0XHRcdFx0bW9kZSA9IDA7XG5cdFx0XHRcdFx0XHRub3RlID0gc2YuY2hhckF0KDApLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRub3RlID0gbm90ZS5jb25jYXQoc2Yuc3Vic3RyaW5nKDEsIF9zZmxlbiAtIDEpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJysnOlxuXHRcdFx0XHRcdFx0bW9kZSA9IDA7XG5cdFx0XHRcdFx0XHRub3RlID0gc2YuY2hhckF0KDApLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRub3RlID0gbm90ZS5jb25jYXQoc2Yuc3Vic3RyaW5nKDEsIF9zZmxlbiAtIDEpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciBmaWZ0aGluZGV4ID0gZmlmdGhzW21vZGVdLmluZGV4T2Yobm90ZSk7XG5cdFx0XHRzZiA9IGZpZnRoaW5kZXggPT09IC0xID8gMCA6IGZpZnRoaW5kZXggLSA3O1xuXHRcdH1cblxuXHRcdGV2ZW50LmRhdGEgPSBldmVudC5kYXRhLmNvbmNhdChVdGlscy5udW1iZXJUb0J5dGVzKHNmLCAxKSk7IC8vIE51bWJlciBvZiBzaGFycCBvciBmbGF0cyAoIDwgMCBmbGF0OyA+IDAgc2hhcnApXG5cdFx0ZXZlbnQuZGF0YSA9IGV2ZW50LmRhdGEuY29uY2F0KFV0aWxzLm51bWJlclRvQnl0ZXMobW9kZSwgMSkpOyAvLyBNb2RlOiAwIG1ham9yLCAxIG1pbm9yXG5cdFx0cmV0dXJuIHRoaXMuYWRkRXZlbnQoZXZlbnQpO1xuXHR9XG5cblx0YWRkVGV4dCh0ZXh0KSB7XG5cdFx0dmFyIGV2ZW50ID0gbmV3IE1ldGFFdmVudCh7ZGF0YTogW0NvbnN0YW50cy5NRVRBX1RFWFRfSURdfSk7XG5cdFx0dmFyIHN0cmluZ0J5dGVzID0gVXRpbHMuc3RyaW5nVG9CeXRlcyh0ZXh0KTtcblx0XHRldmVudC5kYXRhID0gZXZlbnQuZGF0YS5jb25jYXQoVXRpbHMubnVtYmVyVG9WYXJpYWJsZUxlbmd0aChzdHJpbmdCeXRlcy5sZW5ndGgpKTsgLy8gU2l6ZVxuXHRcdGV2ZW50LmRhdGEgPSBldmVudC5kYXRhLmNvbmNhdChzdHJpbmdCeXRlcyk7IC8vIFRleHRcblx0XHRyZXR1cm4gdGhpcy5hZGRFdmVudChldmVudCk7XG5cdH1cblxuXG5cdGFkZENvcHlyaWdodCh0ZXh0KSB7XG5cdFx0dmFyIGV2ZW50ID0gbmV3IE1ldGFFdmVudCh7ZGF0YTogW0NvbnN0YW50cy5NRVRBX0NPUFlSSUdIVF9JRF19KTtcblx0XHR2YXIgc3RyaW5nQnl0ZXMgPSBVdGlscy5zdHJpbmdUb0J5dGVzKHRleHQpO1xuXHRcdGV2ZW50LmRhdGEgPSBldmVudC5kYXRhLmNvbmNhdChVdGlscy5udW1iZXJUb1ZhcmlhYmxlTGVuZ3RoKHN0cmluZ0J5dGVzLmxlbmd0aCkpOyAvLyBTaXplXG5cdFx0ZXZlbnQuZGF0YSA9IGV2ZW50LmRhdGEuY29uY2F0KHN0cmluZ0J5dGVzKTsgLy8gVGV4dFxuXHRcdHJldHVybiB0aGlzLmFkZEV2ZW50KGV2ZW50KTtcblx0fVxuXG5cblx0YWRkSW5zdHJ1bWVudE5hbWUodGV4dCkge1xuXHRcdHZhciBldmVudCA9IG5ldyBNZXRhRXZlbnQoe2RhdGE6IFtDb25zdGFudHMuTUVUQV9JTlNUUlVNRU5UX05BTUVfSURdfSk7XG5cdFx0dmFyIHN0cmluZ0J5dGVzID0gVXRpbHMuc3RyaW5nVG9CeXRlcyh0ZXh0KTtcblx0XHRldmVudC5kYXRhID0gZXZlbnQuZGF0YS5jb25jYXQoVXRpbHMubnVtYmVyVG9WYXJpYWJsZUxlbmd0aChzdHJpbmdCeXRlcy5sZW5ndGgpKTsgLy8gU2l6ZVxuXHRcdGV2ZW50LmRhdGEgPSBldmVudC5kYXRhLmNvbmNhdChzdHJpbmdCeXRlcyk7IC8vIFRleHRcblx0XHRyZXR1cm4gdGhpcy5hZGRFdmVudChldmVudCk7XG5cdH1cblxuXG5cdGFkZE1hcmtlcih0ZXh0KSB7XG5cdFx0dmFyIGV2ZW50ID0gbmV3IE1ldGFFdmVudCh7ZGF0YTogW0NvbnN0YW50cy5NRVRBX01BUktFUl9JRF19KTtcblx0XHR2YXIgc3RyaW5nQnl0ZXMgPSBVdGlscy5zdHJpbmdUb0J5dGVzKHRleHQpO1xuXHRcdGV2ZW50LmRhdGEgPSBldmVudC5kYXRhLmNvbmNhdChVdGlscy5udW1iZXJUb1ZhcmlhYmxlTGVuZ3RoKHN0cmluZ0J5dGVzLmxlbmd0aCkpOyAvLyBTaXplXG5cdFx0ZXZlbnQuZGF0YSA9IGV2ZW50LmRhdGEuY29uY2F0KHN0cmluZ0J5dGVzKTsgLy8gVGV4dFxuXHRcdHJldHVybiB0aGlzLmFkZEV2ZW50KGV2ZW50KTtcblx0fVxuXG5cblx0YWRkQ3VlUG9pbnQodGV4dCkge1xuXHRcdHZhciBldmVudCA9IG5ldyBNZXRhRXZlbnQoe2RhdGE6IFtDb25zdGFudHMuTUVUQV9DVUVfUE9JTlRdfSk7XG5cdFx0dmFyIHN0cmluZ0J5dGVzID0gVXRpbHMuc3RyaW5nVG9CeXRlcyh0ZXh0KTtcblx0XHRldmVudC5kYXRhID0gZXZlbnQuZGF0YS5jb25jYXQoVXRpbHMubnVtYmVyVG9WYXJpYWJsZUxlbmd0aChzdHJpbmdCeXRlcy5sZW5ndGgpKTsgLy8gU2l6ZVxuXHRcdGV2ZW50LmRhdGEgPSBldmVudC5kYXRhLmNvbmNhdChzdHJpbmdCeXRlcyk7IC8vIFRleHRcblx0XHRyZXR1cm4gdGhpcy5hZGRFdmVudChldmVudCk7XG5cdH1cblxuXG5cdGFkZEx5cmljKGx5cmljKSB7XG5cdFx0dmFyIGV2ZW50ID0gbmV3IE1ldGFFdmVudCh7ZGF0YTogW0NvbnN0YW50cy5NRVRBX0xZUklDX0lEXX0pO1xuXHRcdHZhciBzdHJpbmdCeXRlcyA9IFV0aWxzLnN0cmluZ1RvQnl0ZXMobHlyaWMpO1xuXHRcdGV2ZW50LmRhdGEgPSBldmVudC5kYXRhLmNvbmNhdChVdGlscy5udW1iZXJUb1ZhcmlhYmxlTGVuZ3RoKHN0cmluZ0J5dGVzLmxlbmd0aCkpOyAvLyBTaXplXG5cdFx0ZXZlbnQuZGF0YSA9IGV2ZW50LmRhdGEuY29uY2F0KHN0cmluZ0J5dGVzKTsgLy8gTHlyaWNcblx0XHRyZXR1cm4gdGhpcy5hZGRFdmVudChldmVudCk7XG5cdH1cblxuXHQvKiogQ2hhbm5lbCBNb2RlIE1lc3NhZ2VzICoqL1xuXHRwb2x5TW9kZU9uKCkge1xuXHRcdHZhciBldmVudCA9IG5ldyBOb3RlT25FdmVudCh7ZGF0YTogWzB4MDAsIDB4QjAsIDB4N0UsIDB4MDBdfSk7XG5cdFx0dGhpcy5hZGRFdmVudChldmVudCk7XG5cdFx0Y29uc29sZS5sb2coZXZlbnQpO1xuXHR9XG5cbn1cblxuZXhwb3J0cy5UcmFjayA9IFRyYWNrOyJdfQ==
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
	function Utils() {
		_classCallCheck(this, Utils);
	}

	_createClass(Utils, null, [{
		key: 'version',
		value: function version() {
			return Constants.VERSION;
		}

		/**
   * Convert a string to an array of bytes
   * @param {string}
   * @returns {array}
   */

	}, {
		key: 'stringToBytes',
		value: function stringToBytes(string) {
			return string.split('').map(function (char) {
				return char.charCodeAt();
			});
		}
	}, {
		key: 'isNumeric',
		value: function isNumeric(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}

		/**
      * Returns the correct MIDI number for the specified pitch.
      * @param {string/number} 'C#4' or midi note code
      * @return {number}
      */

	}, {
		key: 'getPitch',
		value: function getPitch(pitch) {
			if (this.isNumeric(pitch)) {
				if (pitch >= 0 && pitch <= 127) console.error(pitch + ' is not within MIDI note range (0-127).');
				return pitch;
			}

			// Change letter to uppercase
			pitch = pitch.charAt(0).toUpperCase() + pitch.substring(1);
			return Constants.NOTES[pitch];
		}

		/**
   * Translates number of ticks to MIDI timestamp format, returning an array of
   * hex strings with the time values. Midi has a very particular time to express time,
   * take a good look at the spec before ever touching this function.
   * Thanks to https://github.com/sergi/jsmidi
   *
   * @param {number} Number of ticks to be translated
   * @returns {array} of bytes that form the MIDI time value
   */

	}, {
		key: 'numberToVariableLength',
		value: function numberToVariableLength(ticks) {
			var buffer = ticks & 0x7F;

			while (ticks = ticks >> 7) {
				buffer <<= 8;
				buffer |= ticks & 0x7F | 0x80;
			}

			var bList = [];
			while (true) {
				bList.push(buffer & 0xff);

				if (buffer & 0x80) buffer >>= 8;else {
					break;
				}
			}

			return bList;
		}
	}, {
		key: 'stringByteCount',
		value: function stringByteCount(s) {
			return encodeURI(s).split(/%..|./).length - 1;
		}

		/**
   * Utility function to get an int from an array of bytes.
   * @param {array} bytes
   * @returns {number}
   */

	}, {
		key: 'numberFromBytes',
		value: function numberFromBytes(bytes) {
			var hex = '';
			var stringResult;

			bytes.forEach(function (byte) {
				stringResult = byte.toString(16);

				// ensure string is 2 chars
				if (stringResult.length == 1) stringResult = "0" + stringResult;

				hex += stringResult;
			});

			return parseInt(hex, 16);
		}

		/**
   * Takes a number and splits it up into an array of bytes.  Can be padded by passing a number to bytesNeeded
   * @param {number} number
   * @param {number} bytesNeeded
   * @returns {array} of bytes
   */

	}, {
		key: 'numberToBytes',
		value: function numberToBytes(number, bytesNeeded) {
			bytesNeeded = bytesNeeded || 1;

			var hexString = number.toString(16);

			if (hexString.length & 1) {
				// Make sure hex string is even number of chars
				hexString = '0' + hexString;
			}

			// Split hex string into an array of two char elements
			var hexArray = hexString.match(/.{2}/g);

			// Now parse them out as integers
			hexArray = hexArray.map(function (item) {
				return parseInt(item, 16);
			});

			// Prepend empty bytes if we don't have enough
			if (hexArray.length < bytesNeeded) {
				while (bytesNeeded - hexArray.length > 0) {
					hexArray.unshift(0);
				}
			}

			return hexArray;
		}
	}]);

	return Utils;
}();

exports.Utils = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbIlV0aWxzIiwiQ29uc3RhbnRzIiwiVkVSU0lPTiIsInN0cmluZyIsInNwbGl0IiwibWFwIiwiY2hhciIsImNoYXJDb2RlQXQiLCJuIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwiaXNGaW5pdGUiLCJwaXRjaCIsImlzTnVtZXJpYyIsImNvbnNvbGUiLCJlcnJvciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic3Vic3RyaW5nIiwiTk9URVMiLCJ0aWNrcyIsImJ1ZmZlciIsImJMaXN0IiwicHVzaCIsInMiLCJlbmNvZGVVUkkiLCJsZW5ndGgiLCJieXRlcyIsImhleCIsInN0cmluZ1Jlc3VsdCIsImZvckVhY2giLCJieXRlIiwidG9TdHJpbmciLCJwYXJzZUludCIsIm51bWJlciIsImJ5dGVzTmVlZGVkIiwiaGV4U3RyaW5nIiwiaGV4QXJyYXkiLCJtYXRjaCIsIml0ZW0iLCJ1bnNoaWZ0IiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU1BLEs7Ozs7Ozs7NEJBRVk7QUFDaEIsVUFBT0MsVUFBVUMsT0FBakI7QUFDQTs7QUFFRDs7Ozs7Ozs7Z0NBS3FCQyxNLEVBQVE7QUFDNUIsVUFBT0EsT0FBT0MsS0FBUCxDQUFhLEVBQWIsRUFBaUJDLEdBQWpCLENBQXFCO0FBQUEsV0FBUUMsS0FBS0MsVUFBTCxFQUFSO0FBQUEsSUFBckIsQ0FBUDtBQUNBOzs7NEJBRWdCQyxDLEVBQUc7QUFDbkIsVUFBTyxDQUFDQyxNQUFNQyxXQUFXRixDQUFYLENBQU4sQ0FBRCxJQUF5QkcsU0FBU0gsQ0FBVCxDQUFoQztBQUNBOztBQUVEOzs7Ozs7OzsyQkFLb0JJLEssRUFBTztBQUN0QixPQUFJLEtBQUtDLFNBQUwsQ0FBZUQsS0FBZixDQUFKLEVBQTJCO0FBQzFCLFFBQUlBLFNBQVMsQ0FBVCxJQUFjQSxTQUFTLEdBQTNCLEVBQWdDRSxRQUFRQyxLQUFSLENBQWNILFFBQVEseUNBQXRCO0FBQ2hDLFdBQU9BLEtBQVA7QUFDQTs7QUFFSjtBQUNBQSxXQUFRQSxNQUFNSSxNQUFOLENBQWEsQ0FBYixFQUFnQkMsV0FBaEIsS0FBZ0NMLE1BQU1NLFNBQU4sQ0FBZ0IsQ0FBaEIsQ0FBeEM7QUFDQSxVQUFPakIsVUFBVWtCLEtBQVYsQ0FBZ0JQLEtBQWhCLENBQVA7QUFDRzs7QUFHTDs7Ozs7Ozs7Ozs7O3lDQVM4QlEsSyxFQUFPO0FBQ2pDLE9BQUlDLFNBQVNELFFBQVEsSUFBckI7O0FBRUEsVUFBT0EsUUFBUUEsU0FBUyxDQUF4QixFQUEyQjtBQUN2QkMsZUFBVyxDQUFYO0FBQ0FBLGNBQVlELFFBQVEsSUFBVCxHQUFpQixJQUE1QjtBQUNIOztBQUVELE9BQUlFLFFBQVEsRUFBWjtBQUNBLFVBQU8sSUFBUCxFQUFhO0FBQ1RBLFVBQU1DLElBQU4sQ0FBV0YsU0FBUyxJQUFwQjs7QUFFQSxRQUFJQSxTQUFTLElBQWIsRUFBbUJBLFdBQVcsQ0FBWCxDQUFuQixLQUNLO0FBQUU7QUFBUTtBQUNsQjs7QUFFRCxVQUFPQyxLQUFQO0FBQ0g7OztrQ0FFc0JFLEMsRUFBRztBQUN6QixVQUFPQyxVQUFVRCxDQUFWLEVBQWFwQixLQUFiLENBQW1CLE9BQW5CLEVBQTRCc0IsTUFBNUIsR0FBcUMsQ0FBNUM7QUFDQTs7QUFFRDs7Ozs7Ozs7a0NBS3VCQyxLLEVBQU87QUFDN0IsT0FBSUMsTUFBTSxFQUFWO0FBQ0EsT0FBSUMsWUFBSjs7QUFFQUYsU0FBTUcsT0FBTixDQUFjLFVBQVNDLElBQVQsRUFBZTtBQUM1QkYsbUJBQWVFLEtBQUtDLFFBQUwsQ0FBYyxFQUFkLENBQWY7O0FBRUE7QUFDQSxRQUFJSCxhQUFhSCxNQUFiLElBQXVCLENBQTNCLEVBQThCRyxlQUFlLE1BQU1BLFlBQXJCOztBQUU5QkQsV0FBT0MsWUFBUDtBQUNBLElBUEQ7O0FBU0EsVUFBT0ksU0FBU0wsR0FBVCxFQUFjLEVBQWQsQ0FBUDtBQUNBOztBQUdEOzs7Ozs7Ozs7Z0NBTXFCTSxNLEVBQVFDLFcsRUFBYTtBQUN6Q0EsaUJBQWNBLGVBQWUsQ0FBN0I7O0FBRUEsT0FBSUMsWUFBWUYsT0FBT0YsUUFBUCxDQUFnQixFQUFoQixDQUFoQjs7QUFFQSxPQUFJSSxVQUFVVixNQUFWLEdBQW1CLENBQXZCLEVBQTBCO0FBQUU7QUFDM0JVLGdCQUFZLE1BQU1BLFNBQWxCO0FBQ0E7O0FBRUQ7QUFDQSxPQUFJQyxXQUFXRCxVQUFVRSxLQUFWLENBQWdCLE9BQWhCLENBQWY7O0FBRUE7QUFDQUQsY0FBV0EsU0FBU2hDLEdBQVQsQ0FBYTtBQUFBLFdBQVE0QixTQUFTTSxJQUFULEVBQWUsRUFBZixDQUFSO0FBQUEsSUFBYixDQUFYOztBQUVBO0FBQ0EsT0FBSUYsU0FBU1gsTUFBVCxHQUFrQlMsV0FBdEIsRUFBbUM7QUFDbEMsV0FBT0EsY0FBY0UsU0FBU1gsTUFBdkIsR0FBZ0MsQ0FBdkMsRUFBMEM7QUFDekNXLGNBQVNHLE9BQVQsQ0FBaUIsQ0FBakI7QUFDQTtBQUNEOztBQUVELFVBQU9ILFFBQVA7QUFDQTs7Ozs7O0FBR0ZJLFFBQVF6QyxLQUFSLEdBQWdCQSxLQUFoQiIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFV0aWxzIHtcblxuXHRzdGF0aWMgdmVyc2lvbigpIHtcblx0XHRyZXR1cm4gQ29uc3RhbnRzLlZFUlNJT047XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydCBhIHN0cmluZyB0byBhbiBhcnJheSBvZiBieXRlc1xuXHQgKiBAcGFyYW0ge3N0cmluZ31cblx0ICogQHJldHVybnMge2FycmF5fVxuXHQgKi9cblx0c3RhdGljIHN0cmluZ1RvQnl0ZXMoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5zcGxpdCgnJykubWFwKGNoYXIgPT4gY2hhci5jaGFyQ29kZUF0KCkpXG5cdH1cblxuXHRzdGF0aWMgaXNOdW1lcmljKG4pIHtcblx0XHRyZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmIGlzRmluaXRlKG4pXG5cdH1cblxuXHQvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb3JyZWN0IE1JREkgbnVtYmVyIGZvciB0aGUgc3BlY2lmaWVkIHBpdGNoLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nL251bWJlcn0gJ0MjNCcgb3IgbWlkaSBub3RlIGNvZGVcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgIHN0YXRpYyBnZXRQaXRjaChwaXRjaCkge1xuICAgICBcdGlmICh0aGlzLmlzTnVtZXJpYyhwaXRjaCkpIHtcbiAgICAgXHRcdGlmIChwaXRjaCA+PSAwICYmIHBpdGNoIDw9IDEyNykgY29uc29sZS5lcnJvcihwaXRjaCArICcgaXMgbm90IHdpdGhpbiBNSURJIG5vdGUgcmFuZ2UgKDAtMTI3KS4nKTtcbiAgICAgXHRcdHJldHVybiBwaXRjaDtcbiAgICAgXHR9XG5cbiBcdFx0Ly8gQ2hhbmdlIGxldHRlciB0byB1cHBlcmNhc2VcbiBcdFx0cGl0Y2ggPSBwaXRjaC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHBpdGNoLnN1YnN0cmluZygxKTtcbiBcdFx0cmV0dXJuIENvbnN0YW50cy5OT1RFU1twaXRjaF07XG4gICAgIH1cblxuXG5cdC8qKlxuXHQgKiBUcmFuc2xhdGVzIG51bWJlciBvZiB0aWNrcyB0byBNSURJIHRpbWVzdGFtcCBmb3JtYXQsIHJldHVybmluZyBhbiBhcnJheSBvZlxuXHQgKiBoZXggc3RyaW5ncyB3aXRoIHRoZSB0aW1lIHZhbHVlcy4gTWlkaSBoYXMgYSB2ZXJ5IHBhcnRpY3VsYXIgdGltZSB0byBleHByZXNzIHRpbWUsXG5cdCAqIHRha2UgYSBnb29kIGxvb2sgYXQgdGhlIHNwZWMgYmVmb3JlIGV2ZXIgdG91Y2hpbmcgdGhpcyBmdW5jdGlvbi5cblx0ICogVGhhbmtzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9zZXJnaS9qc21pZGlcblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IE51bWJlciBvZiB0aWNrcyB0byBiZSB0cmFuc2xhdGVkXG5cdCAqIEByZXR1cm5zIHthcnJheX0gb2YgYnl0ZXMgdGhhdCBmb3JtIHRoZSBNSURJIHRpbWUgdmFsdWVcblx0ICovXG5cdHN0YXRpYyBudW1iZXJUb1ZhcmlhYmxlTGVuZ3RoKHRpY2tzKSB7XG5cdCAgICB2YXIgYnVmZmVyID0gdGlja3MgJiAweDdGO1xuXG5cdCAgICB3aGlsZSAodGlja3MgPSB0aWNrcyA+PiA3KSB7XG5cdCAgICAgICAgYnVmZmVyIDw8PSA4O1xuXHQgICAgICAgIGJ1ZmZlciB8PSAoKHRpY2tzICYgMHg3RikgfCAweDgwKTtcblx0ICAgIH1cblxuXHQgICAgdmFyIGJMaXN0ID0gW107XG5cdCAgICB3aGlsZSAodHJ1ZSkge1xuXHQgICAgICAgIGJMaXN0LnB1c2goYnVmZmVyICYgMHhmZik7XG5cblx0ICAgICAgICBpZiAoYnVmZmVyICYgMHg4MCkgYnVmZmVyID4+PSA4XG5cdCAgICAgICAgZWxzZSB7IGJyZWFrOyB9XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBiTGlzdDtcblx0fVxuXG5cdHN0YXRpYyBzdHJpbmdCeXRlQ291bnQocykge1xuXHRcdHJldHVybiBlbmNvZGVVUkkocykuc3BsaXQoLyUuLnwuLykubGVuZ3RoIC0gMVxuXHR9XG5cblx0LyoqXG5cdCAqIFV0aWxpdHkgZnVuY3Rpb24gdG8gZ2V0IGFuIGludCBmcm9tIGFuIGFycmF5IG9mIGJ5dGVzLlxuXHQgKiBAcGFyYW0ge2FycmF5fSBieXRlc1xuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIG51bWJlckZyb21CeXRlcyhieXRlcykge1xuXHRcdHZhciBoZXggPSAnJztcblx0XHR2YXIgc3RyaW5nUmVzdWx0O1xuXG5cdFx0Ynl0ZXMuZm9yRWFjaChmdW5jdGlvbihieXRlKSB7XG5cdFx0XHRzdHJpbmdSZXN1bHQgPSBieXRlLnRvU3RyaW5nKDE2KTtcblxuXHRcdFx0Ly8gZW5zdXJlIHN0cmluZyBpcyAyIGNoYXJzXG5cdFx0XHRpZiAoc3RyaW5nUmVzdWx0Lmxlbmd0aCA9PSAxKSBzdHJpbmdSZXN1bHQgPSBcIjBcIiArIHN0cmluZ1Jlc3VsdFxuXG5cdFx0XHRoZXggKz0gc3RyaW5nUmVzdWx0O1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHBhcnNlSW50KGhleCwgMTYpO1xuXHR9XG5cblxuXHQvKipcblx0ICogVGFrZXMgYSBudW1iZXIgYW5kIHNwbGl0cyBpdCB1cCBpbnRvIGFuIGFycmF5IG9mIGJ5dGVzLiAgQ2FuIGJlIHBhZGRlZCBieSBwYXNzaW5nIGEgbnVtYmVyIHRvIGJ5dGVzTmVlZGVkXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJcblx0ICogQHBhcmFtIHtudW1iZXJ9IGJ5dGVzTmVlZGVkXG5cdCAqIEByZXR1cm5zIHthcnJheX0gb2YgYnl0ZXNcblx0ICovXG5cdHN0YXRpYyBudW1iZXJUb0J5dGVzKG51bWJlciwgYnl0ZXNOZWVkZWQpIHtcblx0XHRieXRlc05lZWRlZCA9IGJ5dGVzTmVlZGVkIHx8IDE7XG5cblx0XHR2YXIgaGV4U3RyaW5nID0gbnVtYmVyLnRvU3RyaW5nKDE2KTtcblxuXHRcdGlmIChoZXhTdHJpbmcubGVuZ3RoICYgMSkgeyAvLyBNYWtlIHN1cmUgaGV4IHN0cmluZyBpcyBldmVuIG51bWJlciBvZiBjaGFyc1xuXHRcdFx0aGV4U3RyaW5nID0gJzAnICsgaGV4U3RyaW5nO1xuXHRcdH1cblxuXHRcdC8vIFNwbGl0IGhleCBzdHJpbmcgaW50byBhbiBhcnJheSBvZiB0d28gY2hhciBlbGVtZW50c1xuXHRcdHZhciBoZXhBcnJheSA9IGhleFN0cmluZy5tYXRjaCgvLnsyfS9nKTtcblxuXHRcdC8vIE5vdyBwYXJzZSB0aGVtIG91dCBhcyBpbnRlZ2Vyc1xuXHRcdGhleEFycmF5ID0gaGV4QXJyYXkubWFwKGl0ZW0gPT4gcGFyc2VJbnQoaXRlbSwgMTYpKVxuXG5cdFx0Ly8gUHJlcGVuZCBlbXB0eSBieXRlcyBpZiB3ZSBkb24ndCBoYXZlIGVub3VnaFxuXHRcdGlmIChoZXhBcnJheS5sZW5ndGggPCBieXRlc05lZWRlZCkge1xuXHRcdFx0d2hpbGUgKGJ5dGVzTmVlZGVkIC0gaGV4QXJyYXkubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRoZXhBcnJheS51bnNoaWZ0KDApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBoZXhBcnJheTtcblx0fVxufVxuXG5leHBvcnRzLlV0aWxzID0gVXRpbHM7Il19
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VexFlow = function () {
	function VexFlow() {
		_classCallCheck(this, VexFlow);
	}
	// code...


	/**
  * Support for converting VexFlow voice into MidiWriterJS track
  * @return MidiWritier.Track object
  */


	_createClass(VexFlow, [{
		key: 'trackFromVoice',
		value: function trackFromVoice(voice) {
			var track = new Track();
			var wait;
			var pitches = [];

			voice.tickables.forEach(function (tickable, i) {
				pitches = [];

				if (tickable.noteType === 'n') {
					notes[i].keys.forEach(function (key) {
						// build array of pitches
						pitches.push(this.convertPitch(key));
					});
				} else if (tickable.noteType === 'r') {
					// move on to the next tickable and use this rest as a `wait` property for the next event
					wait = this.convertDuration(tickable);
					return;
				}

				track.addEvent(new NoteEvent({ pitch: pitches, duration: this.convertDuration(voice.tickables[i]), wait: wait }));

				// reset wait
				wait = 0;
			});

			return track;
		}

		/**
   * Converts VexFlow pitch syntax to MidiWriterJS syntax
   * @param pitch string
   */

	}, {
		key: 'convertPitch',
		value: function convertPitch(pitch) {
			return pitch.replace('/', '');
		}

		/**
   * Converts VexFlow duration syntax to MidiWriterJS syntax
   * @param note struct from VexFlow
   */

	}, {
		key: 'convertDuration',
		value: function convertDuration(note) {
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
		}
	}]);

	return VexFlow;
}();

exports.VexFlow = VexFlow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZleGZsb3cuanMiXSwibmFtZXMiOlsiVmV4RmxvdyIsInZvaWNlIiwidHJhY2siLCJUcmFjayIsIndhaXQiLCJwaXRjaGVzIiwidGlja2FibGVzIiwiZm9yRWFjaCIsInRpY2thYmxlIiwiaSIsIm5vdGVUeXBlIiwibm90ZXMiLCJrZXlzIiwia2V5IiwicHVzaCIsImNvbnZlcnRQaXRjaCIsImNvbnZlcnREdXJhdGlvbiIsImFkZEV2ZW50IiwiTm90ZUV2ZW50IiwicGl0Y2giLCJkdXJhdGlvbiIsInJlcGxhY2UiLCJub3RlIiwiaXNEb3R0ZWQiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBTUEsTztBQUVMLG9CQUFjO0FBQUE7QUFFYjtBQURBOzs7QUFHRDs7Ozs7Ozs7aUNBSWVDLEssRUFBTztBQUNyQixPQUFJQyxRQUFRLElBQUlDLEtBQUosRUFBWjtBQUNBLE9BQUlDLElBQUo7QUFDQSxPQUFJQyxVQUFVLEVBQWQ7O0FBRUFKLFNBQU1LLFNBQU4sQ0FBZ0JDLE9BQWhCLENBQXdCLFVBQVNDLFFBQVQsRUFBbUJDLENBQW5CLEVBQXNCO0FBQzdDSixjQUFVLEVBQVY7O0FBRUEsUUFBSUcsU0FBU0UsUUFBVCxLQUFzQixHQUExQixFQUErQjtBQUM5QkMsV0FBTUYsQ0FBTixFQUFTRyxJQUFULENBQWNMLE9BQWQsQ0FBc0IsVUFBU00sR0FBVCxFQUFjO0FBQ25DO0FBQ0FSLGNBQVFTLElBQVIsQ0FBYSxLQUFLQyxZQUFMLENBQWtCRixHQUFsQixDQUFiO0FBQ0EsTUFIRDtBQUtBLEtBTkQsTUFNTyxJQUFJTCxTQUFTRSxRQUFULEtBQXNCLEdBQTFCLEVBQStCO0FBQ3JDO0FBQ0FOLFlBQU8sS0FBS1ksZUFBTCxDQUFxQlIsUUFBckIsQ0FBUDtBQUNBO0FBQ0E7O0FBRUROLFVBQU1lLFFBQU4sQ0FBZSxJQUFJQyxTQUFKLENBQWMsRUFBQ0MsT0FBT2QsT0FBUixFQUFpQmUsVUFBVSxLQUFLSixlQUFMLENBQXFCZixNQUFNSyxTQUFOLENBQWdCRyxDQUFoQixDQUFyQixDQUEzQixFQUFxRUwsTUFBTUEsSUFBM0UsRUFBZCxDQUFmOztBQUVBO0FBQ0FBLFdBQU8sQ0FBUDtBQUNBLElBbkJEOztBQXFCQSxVQUFPRixLQUFQO0FBQ0E7O0FBR0Q7Ozs7Ozs7K0JBSWFpQixLLEVBQU87QUFDbkIsVUFBT0EsTUFBTUUsT0FBTixDQUFjLEdBQWQsRUFBbUIsRUFBbkIsQ0FBUDtBQUNBOztBQUdEOzs7Ozs7O2tDQUlnQkMsSSxFQUFNO0FBQ3JCLFdBQVFBLEtBQUtGLFFBQWI7QUFDQyxTQUFLLEdBQUw7QUFDQyxZQUFPLEdBQVA7QUFDRCxTQUFLLEdBQUw7QUFDQyxZQUFPRSxLQUFLQyxRQUFMLEtBQWtCLElBQWxCLEdBQXlCLEdBQWhDO0FBQ0QsU0FBSyxHQUFMO0FBQ0MsWUFBT0QsS0FBS0MsUUFBTCxLQUFrQixJQUFsQixHQUF5QixHQUFoQztBQUNELFNBQUssR0FBTDtBQUNDLFlBQU9ELEtBQUtDLFFBQUwsS0FBa0IsSUFBbEIsR0FBeUIsR0FBaEM7QUFSRjs7QUFXQSxVQUFPRCxLQUFLRixRQUFaO0FBQ0E7Ozs7OztBQUdGSSxRQUFReEIsT0FBUixHQUFrQkEsT0FBbEIiLCJmaWxlIjoidmV4Zmxvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFZleEZsb3cge1xuXHRcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Ly8gY29kZS4uLlxuXHR9XG5cblx0LyoqXG5cdCAqIFN1cHBvcnQgZm9yIGNvbnZlcnRpbmcgVmV4RmxvdyB2b2ljZSBpbnRvIE1pZGlXcml0ZXJKUyB0cmFja1xuXHQgKiBAcmV0dXJuIE1pZGlXcml0aWVyLlRyYWNrIG9iamVjdFxuXHQgKi9cblx0dHJhY2tGcm9tVm9pY2Uodm9pY2UpIHtcblx0XHR2YXIgdHJhY2sgPSBuZXcgVHJhY2soKTtcblx0XHR2YXIgd2FpdDtcblx0XHR2YXIgcGl0Y2hlcyA9IFtdO1xuXG5cdFx0dm9pY2UudGlja2FibGVzLmZvckVhY2goZnVuY3Rpb24odGlja2FibGUsIGkpIHtcblx0XHRcdHBpdGNoZXMgPSBbXTtcblxuXHRcdFx0aWYgKHRpY2thYmxlLm5vdGVUeXBlID09PSAnbicpIHtcblx0XHRcdFx0bm90ZXNbaV0ua2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0XHRcdC8vIGJ1aWxkIGFycmF5IG9mIHBpdGNoZXNcblx0XHRcdFx0XHRwaXRjaGVzLnB1c2godGhpcy5jb252ZXJ0UGl0Y2goa2V5KSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9IGVsc2UgaWYgKHRpY2thYmxlLm5vdGVUeXBlID09PSAncicpIHtcblx0XHRcdFx0Ly8gbW92ZSBvbiB0byB0aGUgbmV4dCB0aWNrYWJsZSBhbmQgdXNlIHRoaXMgcmVzdCBhcyBhIGB3YWl0YCBwcm9wZXJ0eSBmb3IgdGhlIG5leHQgZXZlbnRcblx0XHRcdFx0d2FpdCA9IHRoaXMuY29udmVydER1cmF0aW9uKHRpY2thYmxlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0cmFjay5hZGRFdmVudChuZXcgTm90ZUV2ZW50KHtwaXRjaDogcGl0Y2hlcywgZHVyYXRpb246IHRoaXMuY29udmVydER1cmF0aW9uKHZvaWNlLnRpY2thYmxlc1tpXSksIHdhaXQ6IHdhaXR9KSk7XG5cdFx0XHRcblx0XHRcdC8vIHJlc2V0IHdhaXRcblx0XHRcdHdhaXQgPSAwO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRyYWNrO1xuXHR9XG5cblxuXHQvKipcblx0ICogQ29udmVydHMgVmV4RmxvdyBwaXRjaCBzeW50YXggdG8gTWlkaVdyaXRlckpTIHN5bnRheFxuXHQgKiBAcGFyYW0gcGl0Y2ggc3RyaW5nXG5cdCAqL1xuXHRjb252ZXJ0UGl0Y2gocGl0Y2gpIHtcblx0XHRyZXR1cm4gcGl0Y2gucmVwbGFjZSgnLycsICcnKTtcblx0fSBcblxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBWZXhGbG93IGR1cmF0aW9uIHN5bnRheCB0byBNaWRpV3JpdGVySlMgc3ludGF4XG5cdCAqIEBwYXJhbSBub3RlIHN0cnVjdCBmcm9tIFZleEZsb3dcblx0ICovXG5cdGNvbnZlcnREdXJhdGlvbihub3RlKSB7XG5cdFx0c3dpdGNoIChub3RlLmR1cmF0aW9uKSB7XG5cdFx0XHRjYXNlICd3Jzpcblx0XHRcdFx0cmV0dXJuICcxJztcblx0XHRcdGNhc2UgJ2gnOlxuXHRcdFx0XHRyZXR1cm4gbm90ZS5pc0RvdHRlZCgpID8gJ2QyJyA6ICcyJztcblx0XHRcdGNhc2UgJ3EnOlxuXHRcdFx0XHRyZXR1cm4gbm90ZS5pc0RvdHRlZCgpID8gJ2Q0JyA6ICc0Jztcblx0XHRcdGNhc2UgJzgnOlxuXHRcdFx0XHRyZXR1cm4gbm90ZS5pc0RvdHRlZCgpID8gJ2Q4JyA6ICc4Jztcblx0XHR9XG5cblx0XHRyZXR1cm4gbm90ZS5kdXJhdGlvbjtcblx0fTtcbn1cblxuZXhwb3J0cy5WZXhGbG93ID0gVmV4RmxvdzsiXX0=
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Writer = function () {
	//data: Chunk[] & Track[];

	/**
  * Object that puts together tracks and provides methods for file output.
  * @param {object} MidiWriter.Track
  */
	function Writer(tracks) {
		_classCallCheck(this, Writer);

		this.data = [];

		var trackType = tracks.length > 1 ? Constants.HEADER_CHUNK_FORMAT1 : Constants.HEADER_CHUNK_FORMAT0;
		var numberOfTracks = Utils.numberToBytes(tracks.length, 2); // two bytes long

		// Header chunk
		this.data.push(new Chunk({
			type: Constants.HEADER_CHUNK_TYPE,
			data: trackType.concat(numberOfTracks, Constants.HEADER_CHUNK_DIVISION) }));

		// Track chunks
		tracks.forEach(function (track, i) {
			track.addEvent(new MetaEvent({ data: Constants.META_END_OF_TRACK_ID }));
			this.data.push(track);
		}, this);
	}

	/**
  * Builds the file into a Uint8Array
  * @returns Uint8Array
  */


	_createClass(Writer, [{
		key: 'buildFile',
		value: function buildFile() {
			var build = [];

			// Data consists of chunks which consists of data
			this.data.forEach(function (d) {
				return build = build.concat(d.type, d.size, d.data);
			});

			return new Uint8Array(build);
		}

		/**
   * Convert file buffer to a base64 string.  Different methods depending on if browser or node.
   *
   */

	}, {
		key: 'base64',
		value: function base64() {
			if (typeof btoa === 'function') return btoa(String.fromCharCode.apply(null, this.buildFile()));
			return new Buffer(this.buildFile()).toString('base64');
		}

		/**
   * Get the data URI.
   *
   */

	}, {
		key: 'dataUri',
		value: function dataUri() {
			return 'data:audio/midi;base64,' + this.base64();
		}
	}, {
		key: 'stdout',
		value: function stdout() {
			return process.stdout.write(new Buffer(this.buildFile()));
		}
	}]);

	return Writer;
}();

exports.Writer = Writer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndyaXRlci5qcyJdLCJuYW1lcyI6WyJXcml0ZXIiLCJ0cmFja3MiLCJkYXRhIiwidHJhY2tUeXBlIiwibGVuZ3RoIiwiQ29uc3RhbnRzIiwiSEVBREVSX0NIVU5LX0ZPUk1BVDEiLCJIRUFERVJfQ0hVTktfRk9STUFUMCIsIm51bWJlck9mVHJhY2tzIiwiVXRpbHMiLCJudW1iZXJUb0J5dGVzIiwicHVzaCIsIkNodW5rIiwidHlwZSIsIkhFQURFUl9DSFVOS19UWVBFIiwiY29uY2F0IiwiSEVBREVSX0NIVU5LX0RJVklTSU9OIiwiZm9yRWFjaCIsInRyYWNrIiwiaSIsImFkZEV2ZW50IiwiTWV0YUV2ZW50IiwiTUVUQV9FTkRfT0ZfVFJBQ0tfSUQiLCJidWlsZCIsImQiLCJzaXplIiwiVWludDhBcnJheSIsImJ0b2EiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJhcHBseSIsImJ1aWxkRmlsZSIsIkJ1ZmZlciIsInRvU3RyaW5nIiwiYmFzZTY0IiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU1BLE07QUFDTDs7QUFFQTs7OztBQUlBLGlCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ25CLE9BQUtDLElBQUwsR0FBWSxFQUFaOztBQUVBLE1BQUlDLFlBQVlGLE9BQU9HLE1BQVAsR0FBZ0IsQ0FBaEIsR0FBb0JDLFVBQVVDLG9CQUE5QixHQUFxREQsVUFBVUUsb0JBQS9FO0FBQ0EsTUFBSUMsaUJBQWlCQyxNQUFNQyxhQUFOLENBQW9CVCxPQUFPRyxNQUEzQixFQUFtQyxDQUFuQyxDQUFyQixDQUptQixDQUl5Qzs7QUFFNUQ7QUFDQSxPQUFLRixJQUFMLENBQVVTLElBQVYsQ0FBZSxJQUFJQyxLQUFKLENBQVU7QUFDbkJDLFNBQU1SLFVBQVVTLGlCQURHO0FBRW5CWixTQUFNQyxVQUFVWSxNQUFWLENBQWlCUCxjQUFqQixFQUFpQ0gsVUFBVVcscUJBQTNDLENBRmEsRUFBVixDQUFmOztBQUlBO0FBQ0FmLFNBQU9nQixPQUFQLENBQWUsVUFBU0MsS0FBVCxFQUFnQkMsQ0FBaEIsRUFBbUI7QUFDakNELFNBQU1FLFFBQU4sQ0FBZSxJQUFJQyxTQUFKLENBQWMsRUFBQ25CLE1BQU1HLFVBQVVpQixvQkFBakIsRUFBZCxDQUFmO0FBQ0EsUUFBS3BCLElBQUwsQ0FBVVMsSUFBVixDQUFlTyxLQUFmO0FBQ0EsR0FIRCxFQUdHLElBSEg7QUFJQTs7QUFFRDs7Ozs7Ozs7OEJBSVk7QUFDWCxPQUFJSyxRQUFRLEVBQVo7O0FBRUE7QUFDQSxRQUFLckIsSUFBTCxDQUFVZSxPQUFWLENBQWtCLFVBQUNPLENBQUQ7QUFBQSxXQUFPRCxRQUFRQSxNQUFNUixNQUFOLENBQWFTLEVBQUVYLElBQWYsRUFBcUJXLEVBQUVDLElBQXZCLEVBQTZCRCxFQUFFdEIsSUFBL0IsQ0FBZjtBQUFBLElBQWxCOztBQUVBLFVBQU8sSUFBSXdCLFVBQUosQ0FBZUgsS0FBZixDQUFQO0FBQ0E7O0FBR0Q7Ozs7Ozs7MkJBSVM7QUFDUixPQUFJLE9BQU9JLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0MsT0FBT0EsS0FBS0MsT0FBT0MsWUFBUCxDQUFvQkMsS0FBcEIsQ0FBMEIsSUFBMUIsRUFBZ0MsS0FBS0MsU0FBTCxFQUFoQyxDQUFMLENBQVA7QUFDaEMsVUFBTyxJQUFJQyxNQUFKLENBQVcsS0FBS0QsU0FBTCxFQUFYLEVBQTZCRSxRQUE3QixDQUFzQyxRQUF0QyxDQUFQO0FBQ0E7O0FBR0U7Ozs7Ozs7NEJBSVU7QUFDVCxVQUFPLDRCQUE0QixLQUFLQyxNQUFMLEVBQW5DO0FBQ0E7OzsyQkFJUTtBQUNSLFVBQU9DLFFBQVFDLE1BQVIsQ0FBZUMsS0FBZixDQUFxQixJQUFJTCxNQUFKLENBQVcsS0FBS0QsU0FBTCxFQUFYLENBQXJCLENBQVA7QUFDQTs7Ozs7O0FBR0xPLFFBQVF0QyxNQUFSLEdBQWlCQSxNQUFqQiIsImZpbGUiOiJ3cml0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBXcml0ZXIge1xuXHQvL2RhdGE6IENodW5rW10gJiBUcmFja1tdO1xuXG5cdC8qKlxuXHQgKiBPYmplY3QgdGhhdCBwdXRzIHRvZ2V0aGVyIHRyYWNrcyBhbmQgcHJvdmlkZXMgbWV0aG9kcyBmb3IgZmlsZSBvdXRwdXQuXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBNaWRpV3JpdGVyLlRyYWNrXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcih0cmFja3MpIHtcblx0XHR0aGlzLmRhdGEgPSBbXTtcblxuXHRcdHZhciB0cmFja1R5cGUgPSB0cmFja3MubGVuZ3RoID4gMSA/IENvbnN0YW50cy5IRUFERVJfQ0hVTktfRk9STUFUMSA6IENvbnN0YW50cy5IRUFERVJfQ0hVTktfRk9STUFUMDtcblx0XHR2YXIgbnVtYmVyT2ZUcmFja3MgPSBVdGlscy5udW1iZXJUb0J5dGVzKHRyYWNrcy5sZW5ndGgsIDIpOyAvLyB0d28gYnl0ZXMgbG9uZ1xuXG5cdFx0Ly8gSGVhZGVyIGNodW5rXG5cdFx0dGhpcy5kYXRhLnB1c2gobmV3IENodW5rKHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBDb25zdGFudHMuSEVBREVSX0NIVU5LX1RZUEUsXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YTogdHJhY2tUeXBlLmNvbmNhdChudW1iZXJPZlRyYWNrcywgQ29uc3RhbnRzLkhFQURFUl9DSFVOS19ESVZJU0lPTil9KSk7XG5cblx0XHQvLyBUcmFjayBjaHVua3Ncblx0XHR0cmFja3MuZm9yRWFjaChmdW5jdGlvbih0cmFjaywgaSkge1xuXHRcdFx0dHJhY2suYWRkRXZlbnQobmV3IE1ldGFFdmVudCh7ZGF0YTogQ29uc3RhbnRzLk1FVEFfRU5EX09GX1RSQUNLX0lEfSkpO1xuXHRcdFx0dGhpcy5kYXRhLnB1c2godHJhY2spO1xuXHRcdH0sIHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkcyB0aGUgZmlsZSBpbnRvIGEgVWludDhBcnJheVxuXHQgKiBAcmV0dXJucyBVaW50OEFycmF5XG5cdCAqL1xuXHRidWlsZEZpbGUoKSB7XG5cdFx0dmFyIGJ1aWxkID0gW107XG5cblx0XHQvLyBEYXRhIGNvbnNpc3RzIG9mIGNodW5rcyB3aGljaCBjb25zaXN0cyBvZiBkYXRhXG5cdFx0dGhpcy5kYXRhLmZvckVhY2goKGQpID0+IGJ1aWxkID0gYnVpbGQuY29uY2F0KGQudHlwZSwgZC5zaXplLCBkLmRhdGEpKTtcblxuXHRcdHJldHVybiBuZXcgVWludDhBcnJheShidWlsZCk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0IGZpbGUgYnVmZmVyIHRvIGEgYmFzZTY0IHN0cmluZy4gIERpZmZlcmVudCBtZXRob2RzIGRlcGVuZGluZyBvbiBpZiBicm93c2VyIG9yIG5vZGUuXG5cdCAqXG5cdCAqL1xuXHRiYXNlNjQoKSB7XG5cdFx0aWYgKHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSByZXR1cm4gYnRvYShTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIHRoaXMuYnVpbGRGaWxlKCkpKTtcdFx0XG5cdFx0cmV0dXJuIG5ldyBCdWZmZXIodGhpcy5idWlsZEZpbGUoKSkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuXHR9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGF0YSBVUkkuXG4gICAgICpcbiAgICAgKi9cbiAgICBkYXRhVXJpKCkge1xuICAgIFx0cmV0dXJuICdkYXRhOmF1ZGlvL21pZGk7YmFzZTY0LCcgKyB0aGlzLmJhc2U2NCgpO1xuICAgIH1cblxuXG4gXG4gICAgc3Rkb3V0KCkge1xuICAgIFx0cmV0dXJuIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG5ldyBCdWZmZXIodGhpcy5idWlsZEZpbGUoKSkpO1xuICAgIH1cbn1cblxuZXhwb3J0cy5Xcml0ZXIgPSBXcml0ZXI7Il19
