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
			noteGroup.forEach(function (note) {
				Constants.NOTES[note + i] = counter;
			});
			counter++;
		});
	}
})();

exports.Constants = Constants;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN0YW50cy5qcyJdLCJuYW1lcyI6WyJDb25zdGFudHMiLCJWRVJTSU9OIiwiSEVBREVSX0NIVU5LX1RZUEUiLCJIRUFERVJfQ0hVTktfTEVOR1RIIiwiSEVBREVSX0NIVU5LX0ZPUk1BVDAiLCJIRUFERVJfQ0hVTktfRk9STUFUMSIsIkhFQURFUl9DSFVOS19ESVZJU0lPTiIsIlRSQUNLX0NIVU5LX1RZUEUiLCJNRVRBX0VWRU5UX0lEIiwiTUVUQV9URVhUX0lEIiwiTUVUQV9DT1BZUklHSFRfSUQiLCJNRVRBX1RSQUNLX05BTUVfSUQiLCJNRVRBX0lOU1RSVU1FTlRfTkFNRV9JRCIsIk1FVEFfTFlSSUNfSUQiLCJNRVRBX01BUktFUl9JRCIsIk1FVEFfQ1VFX1BPSU5UIiwiTUVUQV9URU1QT19JRCIsIk1FVEFfU01UUEVfT0ZGU0VUIiwiTUVUQV9USU1FX1NJR05BVFVSRV9JRCIsIk1FVEFfS0VZX1NJR05BVFVSRV9JRCIsIk1FVEFfRU5EX09GX1RSQUNLX0lEIiwiUFJPR1JBTV9DSEFOR0VfU1RBVFVTIiwiTk9URVMiLCJhbGxOb3RlcyIsImNvdW50ZXIiLCJpIiwiZm9yRWFjaCIsIm5vdGVHcm91cCIsIm5vdGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFlBQVk7QUFDZkMsVUFBYyxPQURDO0FBRWZDLG9CQUF1QixDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixFQUFtQixJQUFuQixDQUZSO0FBR2ZDLHNCQUF3QixDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixFQUFtQixJQUFuQixDQUhUO0FBSWZDLHVCQUEwQixDQUFDLElBQUQsRUFBTyxJQUFQLENBSlg7QUFLZkMsdUJBQTBCLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FMWDtBQU1mQyx3QkFBMEIsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQU5YO0FBT2ZDLG1CQUFvQixDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixFQUFtQixJQUFuQixDQVBMO0FBUWZDLGdCQUFrQixJQVJIO0FBU2ZDLGVBQWlCLElBVEY7QUFVZkMsb0JBQXFCLElBVk47QUFXZkMscUJBQXNCLElBWFA7QUFZZkMsMEJBQTBCLElBWlg7QUFhZkMsZ0JBQWtCLElBYkg7QUFjZkMsaUJBQW1CLElBZEo7QUFlZkMsaUJBQW1CLElBZko7QUFnQmZDLGdCQUFrQixJQWhCSDtBQWlCZkMsb0JBQXFCLElBakJOO0FBa0JmQyx5QkFBeUIsSUFsQlY7QUFtQmZDLHdCQUF3QixJQW5CVDtBQW9CZkMsdUJBQXVCLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FwQlI7O0FBdUJmQyx3QkFBd0IsSUF2QlQ7QUF3QmZDLFFBQVk7QUF4QkcsQ0FBaEI7O0FBMkJBLENBQUMsWUFBVztBQUVYLEtBQUlDLFdBQVcsQ0FBQyxDQUFDLEdBQUQsQ0FBRCxFQUFRLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FBUixFQUFxQixDQUFDLEdBQUQsQ0FBckIsRUFBNEIsQ0FBQyxJQUFELEVBQU0sSUFBTixDQUE1QixFQUF5QyxDQUFDLEdBQUQsQ0FBekMsRUFBK0MsQ0FBQyxHQUFELENBQS9DLEVBQXNELENBQUMsSUFBRCxFQUFNLElBQU4sQ0FBdEQsRUFBbUUsQ0FBQyxHQUFELENBQW5FLEVBQTBFLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FBMUUsRUFBdUYsQ0FBQyxHQUFELENBQXZGLEVBQThGLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FBOUYsRUFBMkcsQ0FBQyxHQUFELENBQTNHLENBQWY7QUFDQSxLQUFJQyxVQUFVLENBQWQ7O0FBR0EsTUFBSyxJQUFJQyxJQUFJLENBQUMsQ0FBZCxFQUFpQkEsS0FBSyxDQUF0QixFQUF5QkEsR0FBekIsRUFBOEI7QUFDN0JGLFdBQVNHLE9BQVQsQ0FBaUIsVUFBU0MsU0FBVCxFQUFvQjtBQUNwQ0EsYUFBVUQsT0FBVixDQUFrQixVQUFTRSxJQUFULEVBQWU7QUFBQzVCLGNBQVVzQixLQUFWLENBQWdCTSxPQUFPSCxDQUF2QixJQUE0QkQsT0FBNUI7QUFBb0MsSUFBdEU7QUFDQUE7QUFDQSxHQUhEO0FBSUE7QUFDRCxDQVpEOztBQWNBSyxRQUFRN0IsU0FBUixHQUFvQkEsU0FBcEIiLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbnN0YW50cyA9IHtcblx0VkVSU0lPTlx0XHRcdFx0XHQ6ICcxLjMuMicsXG5cdEhFQURFUl9DSFVOS19UWVBFICBcdFx0OiBbMHg0ZCwgMHg1NCwgMHg2OCwgMHg2NF0sIC8vIE10aGRcblx0SEVBREVSX0NIVU5LX0xFTkdUSCAgXHQ6IFsweDAwLCAweDAwLCAweDAwLCAweDA2XSwgLy8gSGVhZGVyIHNpemUgZm9yIFNNRlxuXHRIRUFERVJfQ0hVTktfRk9STUFUMCAgICA6IFsweDAwLCAweDAwXSwgLy8gTWlkaSBUeXBlIDAgaWRcblx0SEVBREVSX0NIVU5LX0ZPUk1BVDEgICAgOiBbMHgwMCwgMHgwMV0sIC8vIE1pZGkgVHlwZSAxIGlkXG5cdEhFQURFUl9DSFVOS19ESVZJU0lPTiAgIDogWzB4MDAsIDB4ODBdLCAvLyBEZWZhdWx0cyB0byAxMjggdGlja3MgcGVyIGJlYXRcblx0VFJBQ0tfQ0hVTktfVFlQRVx0XHQ6IFsweDRkLCAweDU0LCAweDcyLCAweDZiXSwgLy8gTVRyayxcblx0TUVUQV9FVkVOVF9JRFx0XHRcdDogMHhGRixcblx0TUVUQV9URVhUX0lEXHRcdFx0OiAweDAxLFxuXHRNRVRBX0NPUFlSSUdIVF9JRFx0XHQ6IDB4MDIsXG5cdE1FVEFfVFJBQ0tfTkFNRV9JRFx0XHQ6IDB4MDMsXG5cdE1FVEFfSU5TVFJVTUVOVF9OQU1FX0lEIDogMHgwNCxcblx0TUVUQV9MWVJJQ19JRFx0XHRcdDogMHgwNSxcblx0TUVUQV9NQVJLRVJfSURcdFx0XHQ6IDB4MDYsXG5cdE1FVEFfQ1VFX1BPSU5UXHRcdFx0OiAweDA3LFxuXHRNRVRBX1RFTVBPX0lEXHRcdFx0OiAweDUxLFxuXHRNRVRBX1NNVFBFX09GRlNFVFx0XHQ6IDB4NTQsXG5cdE1FVEFfVElNRV9TSUdOQVRVUkVfSURcdDogMHg1OCxcblx0TUVUQV9LRVlfU0lHTkFUVVJFX0lEXHQ6IDB4NTksXG5cdE1FVEFfRU5EX09GX1RSQUNLX0lEXHQ6IFsweDJGLCAweDAwXSxcblx0LypOT1RFX09OX1NUQVRVU1x0XHRcdDogMHg5MCwgLy8gaW5jbHVkZXMgY2hhbm5lbCBudW1iZXIgKDApKi9cblx0LypOT1RFX09GRl9TVEFUVVNcdFx0XHQ6IDB4ODAsIC8vIGluY2x1ZGVzIGNoYW5uZWwgbnVtYmVyICgwKSovXG5cdFBST0dSQU1fQ0hBTkdFX1NUQVRVU1x0OiAweEMwLCAvLyBpbmNsdWRlcyBjaGFubmVsIG51bWJlciAoMClcblx0Tk9URVNcdFx0XHRcdFx0OiB7fVxufTtcblxuKGZ1bmN0aW9uKCkge1xuXHQvLyBCdWlsZHMgbm90ZXMgb2JqZWN0IGZvciByZWZlcmVuY2UgYWdhaW5zdCBiaW5hcnkgdmFsdWVzLlxuXHR2YXIgYWxsTm90ZXMgPSBbWydDJ10sIFsnQyMnLCdEYiddLCBbJ0QnXSwgWydEIycsJ0ViJ10sIFsnRSddLFsnRiddLCBbJ0YjJywnR2InXSwgWydHJ10sIFsnRyMnLCdBYiddLCBbJ0EnXSwgWydBIycsJ0JiJ10sIFsnQiddXTtcblx0dmFyIGNvdW50ZXIgPSAwO1xuXG5cdC8vIEFsbCBhdmFpbGFibGUgb2N0YXZlcy5cblx0Zm9yICh2YXIgaSA9IC0xOyBpIDw9IDk7IGkrKykge1xuXHRcdGFsbE5vdGVzLmZvckVhY2goZnVuY3Rpb24obm90ZUdyb3VwKSB7XG5cdFx0XHRub3RlR3JvdXAuZm9yRWFjaChmdW5jdGlvbihub3RlKSB7Q29uc3RhbnRzLk5PVEVTW25vdGUgKyBpXSA9IGNvdW50ZXJ9KTtcblx0XHRcdGNvdW50ZXIgKys7XG5cdFx0fSk7XG5cdH1cbn0pKCk7XG5cbmV4cG9ydHMuQ29uc3RhbnRzID0gQ29uc3RhbnRzOyJdfQ==
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MetaEvent = function MetaEvent(fields) {
	_classCallCheck(this, MetaEvent);

	this.type = 'meta';
	this.data = Utils.numberToVariableLength(0x00);
	this.data = this.data.concat(Constants.META_EVENT_ID, fields.data);
};

exports.MetaEvent = MetaEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEtZXZlbnQuanMiXSwibmFtZXMiOlsiTWV0YUV2ZW50IiwiZmllbGRzIiwidHlwZSIsImRhdGEiLCJVdGlscyIsIm51bWJlclRvVmFyaWFibGVMZW5ndGgiLCJjb25jYXQiLCJDb25zdGFudHMiLCJNRVRBX0VWRU5UX0lEIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztJQUFNQSxTLEdBQ0wsbUJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFDbkIsTUFBS0MsSUFBTCxHQUFZLE1BQVo7QUFDQSxNQUFLQyxJQUFMLEdBQVlDLE1BQU1DLHNCQUFOLENBQTZCLElBQTdCLENBQVo7QUFDQSxNQUFLRixJQUFMLEdBQVksS0FBS0EsSUFBTCxDQUFVRyxNQUFWLENBQWlCQyxVQUFVQyxhQUEzQixFQUEwQ1AsT0FBT0UsSUFBakQsQ0FBWjtBQUNBLEM7O0FBR0ZNLFFBQVFULFNBQVIsR0FBb0JBLFNBQXBCIiwiZmlsZSI6Im1ldGEtZXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBNZXRhRXZlbnQge1xuXHRjb25zdHJ1Y3RvcihmaWVsZHMpIHtcblx0XHR0aGlzLnR5cGUgPSAnbWV0YSc7XG5cdFx0dGhpcy5kYXRhID0gVXRpbHMubnVtYmVyVG9WYXJpYWJsZUxlbmd0aCgweDAwKTsvLyBTdGFydCB3aXRoIHplcm8gdGltZSBkZWx0YVxuXHRcdHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5jb25jYXQoQ29uc3RhbnRzLk1FVEFfRVZFTlRfSUQsIGZpZWxkcy5kYXRhKTtcblx0fVxufVxuXG5leHBvcnRzLk1ldGFFdmVudCA9IE1ldGFFdmVudDsiXX0=
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoteEvent = function () {
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

			var quarterTicks = Utils.numberFromBytes(Constants.HEADER_CHUNK_DIVISION);
			var tickDuration = Math.round(quarterTicks * this.getDurationMultiplier(this.duration, 'note'));
			var restDuration = Math.round(quarterTicks * this.getDurationMultiplier(this.wait, 'rest'));

			var noteOn, noteOff;
			if (Array.isArray(this.pitch)) {
				if (!this.sequential) {
					for (var j = 0; j < this.repeat; j++) {
						this.pitch.forEach(function (p, i) {
							if (i == 0) {
								noteOn = new NoteOnEvent({ data: Utils.numberToVariableLength(restDuration).concat(this.getNoteOnStatus(), Utils.getPitch(p), this.velocity) });
							} else {
								noteOn = new NoteOnEvent({ data: [0, Utils.getPitch(p), this.velocity] });
							}

							this.data = this.data.concat(noteOn.data);
						}, this);

						this.pitch.forEach(function (p, i) {
							if (i == 0) {
								noteOff = new NoteOffEvent({ data: Utils.numberToVariableLength(tickDuration).concat(this.getNoteOffStatus(), Utils.getPitch(p), this.velocity) });
							} else {
								noteOff = new NoteOffEvent({ data: [0, Utils.getPitch(p), this.velocity] });
							}

							this.data = this.data.concat(noteOff.data);
						}, this);
					}
				} else {
					for (var j = 0; j < this.repeat; j++) {
						this.pitch.forEach(function (p, i) {
							if (i > 0) {
								restDuration = 0;
							}

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
		value: function convertVelocity(velocity) {
			velocity = velocity > 100 ? 100 : velocity;
			return Math.round(velocity / 100 * 127);
		}
	}, {
		key: 'getDurationMultiplier',
		value: function getDurationMultiplier(duration, type) {
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
		}
	}, {
		key: 'getNoteOnStatus',
		value: function getNoteOnStatus() {
			return 144 + this.channel - 1;
		}
	}, {
		key: 'getNoteOffStatus',
		value: function getNoteOffStatus() {
			return 128 + this.channel - 1;
		}
	}]);

	return NoteEvent;
}();

exports.NoteEvent = NoteEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGUtZXZlbnQuanMiXSwibmFtZXMiOlsiTm90ZUV2ZW50IiwiZmllbGRzIiwidHlwZSIsInBpdGNoIiwid2FpdCIsImR1cmF0aW9uIiwic2VxdWVudGlhbCIsInZlbG9jaXR5IiwiY2hhbm5lbCIsInJlcGVhdCIsImNvbnZlcnRWZWxvY2l0eSIsImJ1aWxkRGF0YSIsImRhdGEiLCJxdWFydGVyVGlja3MiLCJVdGlscyIsIm51bWJlckZyb21CeXRlcyIsIkNvbnN0YW50cyIsIkhFQURFUl9DSFVOS19ESVZJU0lPTiIsInRpY2tEdXJhdGlvbiIsIk1hdGgiLCJyb3VuZCIsImdldER1cmF0aW9uTXVsdGlwbGllciIsInJlc3REdXJhdGlvbiIsIm5vdGVPbiIsIm5vdGVPZmYiLCJBcnJheSIsImlzQXJyYXkiLCJqIiwiZm9yRWFjaCIsInAiLCJpIiwiTm90ZU9uRXZlbnQiLCJudW1iZXJUb1ZhcmlhYmxlTGVuZ3RoIiwiY29uY2F0IiwiZ2V0Tm90ZU9uU3RhdHVzIiwiZ2V0UGl0Y2giLCJOb3RlT2ZmRXZlbnQiLCJnZXROb3RlT2ZmU3RhdHVzIiwibGVuZ3RoIiwiY29uc29sZSIsImVycm9yIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU1BLFM7QUFrQkwsb0JBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFDbkIsT0FBS0MsSUFBTCxHQUFjLE1BQWQ7QUFDQSxPQUFLQyxLQUFMLEdBQWVGLE9BQU9FLEtBQXRCO0FBQ0EsT0FBS0MsSUFBTCxHQUFjSCxPQUFPRyxJQUFQLElBQWUsQ0FBN0I7QUFDQSxPQUFLQyxRQUFMLEdBQWlCSixPQUFPSSxRQUF4QjtBQUNBLE9BQUtDLFVBQUwsR0FBa0JMLE9BQU9LLFVBQVAsSUFBcUIsS0FBdkM7QUFDQSxPQUFLQyxRQUFMLEdBQWlCTixPQUFPTSxRQUFQLElBQW1CLEVBQXBDO0FBQ0EsT0FBS0MsT0FBTCxHQUFnQlAsT0FBT08sT0FBUCxJQUFrQixDQUFsQztBQUNBLE9BQUtDLE1BQUwsR0FBZVIsT0FBT1Es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U0FBSyxJQUFMO0FBQ0MsWUFBTyxDQUFQO0FBQ0QsU0FBSyxHQUFMO0FBQ0MsWUFBTyxDQUFQO0FBQ0QsU0FBSyxJQUFMO0FBQ0MsWUFBTyxHQUFQO0FBQ0QsU0FBSyxHQUFMO0FBQ0MsWUFBTyxHQUFQO0FBQ0QsU0FBSyxJQUFMO0FBRUMsWUFBTyxJQUFQO0FBQ0QsU0FBSyxJQUFMO0FBQ0MsWUFBTyxJQUFQO0FBQ0QsU0FBSyxJQUFMO0FBQ0MsWUFBTyxJQUFQO0FBQ0Q7QUFFQyxZQUFPSCxTQUFTLE1BQVQsR0FBa0IsQ0FBbEIsR0FBc0IsQ0FBN0I7QUF4QkY7QUEwQkE7OztvQ0FTaUI7QUFBQyxVQUFPLE1BQU0sS0FBS00sT0FBWCxHQUFxQixDQUE1QjtBQUE4Qjs7O3FDQVM5QjtBQUFDLFVBQU8sTUFBTSxLQUFLQSxPQUFYLEdBQXFCLENBQTVCO0FBQThCOzs7Ozs7QUFHbkRpQyxRQUFRekMsU0FBUixHQUFvQkEsU0FBcEIiLCJmaWxlIjoibm90ZS1ldmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE5vdGVFdmVudCB7XG5cdC8qXG5cdHR5cGU6IHN0cmluZztcblx0cGl0Y2g6IGFueTtcblx0d2FpdDogc3RyaW5nIHwgbnVtYmVyO1xuXHRkdXJhdGlvbjogc3RyaW5nO1xuXHRzZXF1ZW50aWFsOiBib29sZWFuO1xuXHR2ZWxvY2l0eTogbnVtYmVyO1xuXHRjaGFubmVsOiBudW1iZXI7XG5cdHJlcGVhdDogbnVtYmVyO1xuXHRkYXRhOiBudW1iZXJbXTtcblx0Ki9cblxuXHQvKipcblx0ICogV3JhcHBlciBmb3Igbm90ZU9uRXZlbnQvbm90ZU9mZkV2ZW50IG9iamVjdHMgdGhhdCBidWlsZHMgYm90aCBldmVudHMuXG5cdCAqIGR1cmF0aW9uIHZhbHVlczogNDpxdWFydGVyLCAzOnRyaXBsZXQgcXVhcnRlciwgMjogaGFsZiwgMTogd2hvbGVcblx0ICogQHBhcmFtIHtvYmplY3R9IGZpZWxkcyB7cGl0Y2g6ICdbQzRdJywgZHVyYXRpb246ICc0Jywgd2FpdDogJzQnLCB2ZWxvY2l0eTogMS0xMDB9XG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihmaWVsZHMpIHtcblx0XHR0aGlzLnR5cGUgXHRcdD0gJ25vdGUnO1xuXHRcdHRoaXMucGl0Y2ggXHRcdD0gZmllbGRzLnBpdGNoO1xuXHRcdHRoaXMud2FpdCBcdFx0PSBmaWVsZHMud2FpdCB8fCAwO1xuXHRcdHRoaXMuZHVyYXRpb24gXHQ9IGZpZWxkcy5kdXJhdGlvbjtcblx0XHR0aGlzLnNlcXVlbnRpYWwgPSBmaWVsZHMuc2VxdWVudGlhbCB8fCBmYWxzZTtcblx0XHR0aGlzLnZlbG9jaXR5IFx0PSBmaWVsZHMudmVsb2NpdHkgfHwgNTA7XG5cdFx0dGhpcy5jaGFubmVsIFx0PSBmaWVsZHMuY2hhbm5lbCB8fCAxO1xuXHRcdHRoaXMucmVwZWF0IFx0PSBmaWVsZHMucmVwZWF0IHx8IDE7XG5cdFx0dGhpcy52ZWxvY2l0eSBcdD0gdGhpcy5jb252ZXJ0VmVsb2NpdHkodGhpcy52ZWxvY2l0eSk7XG5cdFx0dGhpcy5idWlsZERhdGEoKTtcblx0fVxuXG5cblx0YnVpbGREYXRhKCkge1xuXHRcdHRoaXMuZGF0YSA9IFtdO1xuXG5cdFx0Ly8gTmVlZCB0byBhcHBseSBkdXJhdGlvbiBoZXJlLiAgUXVhcnRlciBub3RlID09IENvbnN0YW50cy5IRUFERVJfQ0hVTktfRElWSVNJT05cblx0XHQvLyBSb3VuZGluZyBvbmx5IGFwcGxpZXMgdG8gdHJpcGxldHMsIHdoaWNoIHRoZSByZW1haW5kZXIgaXMgaGFuZGxlZCBiZWxvd1xuXHRcdHZhciBxdWFydGVyVGlja3MgPSBVdGlscy5udW1iZXJGcm9tQnl0ZXMoQ29uc3RhbnRzLkhFQURFUl9DSFVOS19ESVZJU0lPTik7XG5cdFx0dmFyIHRpY2tEdXJhdGlvbiA9IE1hdGgucm91bmQocXVhcnRlclRpY2tzICogdGhpcy5nZXREdXJhdGlvbk11bHRpcGxpZXIodGhpcy5kdXJhdGlvbiwgJ25vdGUnKSk7XG5cdFx0dmFyIHJlc3REdXJhdGlvbiA9IE1hdGgucm91bmQocXVhcnRlclRpY2tzICogdGhpcy5nZXREdXJhdGlvbk11bHRpcGxpZXIodGhpcy53YWl0LCAncmVzdCcpKTtcblxuXHRcdC8vIGZpZWxkcy5waXRjaCBjb3VsZCBiZSBhbiBhcnJheSBvZiBwaXRjaGVzLlxuXHRcdC8vIElmIHNvIGNyZWF0ZSBub3RlIGV2ZW50cyBmb3IgZWFjaCBhbmQgYXBwbHkgdGhlIHNhbWUgZHVyYXRpb24uXG5cdFx0dmFyIG5vdGVPbiwgbm90ZU9mZjtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnBpdGNoKSkge1xuXHRcdFx0Ly8gQnkgZGVmYXVsdCB0aGlzIGlzIGEgY2hvcmQgaWYgaXQncyBhbiBhcnJheSBvZiBub3RlcyB0aGF0IHJlcXVpcmVzIG9uZSBOb3RlT25FdmVudC5cblx0XHRcdC8vIElmIHRoaXMuc2VxdWVudGlhbCA9PT0gdHJ1ZSB0aGVuIGl0J3MgYSBzZXF1ZW50aWFsIHN0cmluZyBvZiBub3RlcyB0aGF0IHJlcXVpcmVzIHNlcGFyYXRlIE5vdGVPbkV2ZW50cy5cblx0XHRcdGlmICggISB0aGlzLnNlcXVlbnRpYWwpIHtcblx0XHRcdFx0Ly8gSGFuZGxlIHJlcGVhdFxuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMucmVwZWF0OyBqKyspIHtcblx0XHRcdFx0XHQvLyBOb3RlIG9uXG5cdFx0XHRcdFx0dGhpcy5waXRjaC5mb3JFYWNoKGZ1bmN0aW9uKHAsIGkpIHtcblx0XHRcdFx0XHRcdGlmIChpID09IDApIHtcblx0XHRcdFx0XHRcdFx0bm90ZU9uID0gbmV3IE5vdGVPbkV2ZW50KHtkYXRhOiBVdGlscy5udW1iZXJUb1ZhcmlhYmxlTGVuZ3RoKHJlc3REdXJhdGlvbikuY29uY2F0KHRoaXMuZ2V0Tm90ZU9uU3RhdHVzKCksIFV0aWxzLmdldFBpdGNoKHApLCB0aGlzLnZlbG9jaXR5KX0pO1xuXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBSdW5uaW5nIHN0YXR1cyAoY2FuIG9tbWl0IHRoZSBub3RlIG9uIHN0YXR1cylcblx0XHRcdFx0XHRcdFx0bm90ZU9uID0gbmV3IE5vdGVPbkV2ZW50KHtkYXRhOiBbMCwgVXRpbHMuZ2V0UGl0Y2gocCksIHRoaXMudmVsb2NpdHldfSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5jb25jYXQobm90ZU9uLmRhdGEpO1xuXHRcdFx0XHRcdH0sIHRoaXMpO1xuXG5cdFx0XHRcdFx0Ly8gTm90ZSBvZmZcblx0XHRcdFx0XHR0aGlzLnBpdGNoLmZvckVhY2goZnVuY3Rpb24ocCwgaSkge1xuXHRcdFx0XHRcdFx0aWYgKGkgPT0gMCkge1xuXHRcdFx0XHRcdFx0XHRub3RlT2ZmID0gbmV3IE5vdGVPZmZFdmVudCh7ZGF0YTogVXRpbHMubnVtYmVyVG9WYXJpYWJsZUxlbmd0aCh0aWNrRHVyYXRpb24pLmNvbmNhdCh0aGlzLmdldE5vdGVPZmZTdGF0dXMoKSwgVXRpbHMuZ2V0UGl0Y2gocCksIHRoaXMudmVsb2NpdHkpfSk7XG5cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIFJ1bm5pbmcgc3RhdHVzIChjYW4gb21taXQgdGhlIG5vdGUgb2ZmIHN0YXR1cylcblx0XHRcdFx0XHRcdFx0bm90ZU9mZiA9IG5ldyBOb3RlT2ZmRXZlbnQoe2RhdGE6IFswLCBVdGlscy5nZXRQaXRjaChwKSwgdGhpcy52ZWxvY2l0eV19KTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dGhpcy5kYXRhID0gdGhpcy5kYXRhLmNvbmNhdChub3RlT2ZmLmRhdGEpO1xuXHRcdFx0XHRcdH0sIHRoaXMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIEhhbmRsZSByZXBlYXRcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnJlcGVhdDsgaisrKSB7XG5cdFx0XHRcdFx0dGhpcy5waXRjaC5mb3JFYWNoKGZ1bmN0aW9uKHAsIGkpIHtcblx0XHRcdFx0XHRcdC8vIHJlc3REdXJhdGlvbiBvbmx5IGFwcGxpZXMgdG8gZmlyc3Qgbm90ZVxuXHRcdFx0XHRcdFx0aWYgKGkgPiAwKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3REdXJhdGlvbiA9IDA7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIElmIGR1cmF0aW9uIGlzIDh0aCB0cmlwbGV0cyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSB0b3RhbCB0aWNrcyA9PSBxdWFydGVyIG5vdGUuXG5cdFx0XHRcdFx0XHQvLyBTbywgdGhlIGxhc3Qgb25lIHdpbGwgbmVlZCB0byBiZSB0aGUgcmVtYWluZGVyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5kdXJhdGlvbiA9PT0gJzh0JyAmJiBpID09IHRoaXMucGl0Y2gubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRcdFx0XHR0aWNrRHVyYXRpb24gPSBxdWFydGVyVGlja3MgLSAodGlja0R1cmF0aW9uICogMik7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdG5vdGVPbiA9IG5ldyBOb3RlT25FdmVudCh7ZGF0YTogVXRpbHMubnVtYmVyVG9WYXJpYWJsZUxlbmd0aChyZXN0RHVyYXRpb24pLmNvbmNhdChbdGhpcy5nZXROb3RlT25TdGF0dXMoKSwgVXRpbHMuZ2V0UGl0Y2gocCksIHRoaXMudmVsb2NpdHldKX0pO1xuXHRcdFx0XHRcdFx0bm90ZU9mZiA9IG5ldyBOb3RlT2ZmRXZlbnQoe2RhdGE6IFV0aWxzLm51bWJlclRvVmFyaWFibGVMZW5ndGgodGlja0R1cmF0aW9uKS5jb25jYXQoW3RoaXMuZ2V0Tm90ZU9mZlN0YXR1cygpLCBVdGlscy5nZXRQaXRjaChwKSwgdGhpcy52ZWxvY2l0eV0pfSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5jb25jYXQobm90ZU9uLmRhdGEsIG5vdGVPZmYuZGF0YSk7XG5cdFx0XHRcdFx0fSwgdGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdwaXRjaCBtdXN0IGJlIGFuIGFycmF5LicpO1xuXHRcdH1cblx0fTtcblxuXG5cdC8vIENvbnZlcnQgdmVsb2NpdHkgdG8gdmFsdWUgMC0xMjdcblx0Y29udmVydFZlbG9jaXR5KHZlbG9jaXR5KSB7XG5cdFx0Ly8gTWF4IHBhc3NlZCB2YWx1ZSBsaW1pdGVkIHRvIDEwMFxuXHRcdHZlbG9jaXR5ID0gdmVsb2NpdHkgPiAxMDAgPyAxMDAgOiB2ZWxvY2l0eTtcblx0XHRyZXR1cm4gTWF0aC5yb3VuZCh2ZWxvY2l0eSAvIDEwMCAqIDEyNyk7XG5cdH07XG5cblxuXHQvKipcblx0ICogR2V0cyB3aGF0IHRvIG11bHRpcGxlIHRpY2tzL3F1YXJ0ZXIgbm90ZSBieSB0byBnZXQgdGhlIHNwZWNpZmllZCBkdXJhdGlvbi5cblx0ICogTm90ZTogdHlwZT09J25vdGUnIGRlZmF1bHRzIHRvIHF1YXJ0ZXIgbm90ZSwgdHlwZT09PSdyZXN0JyBkZWZhdWx0cyB0byAwXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkdXJhdGlvblxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBbJ25vdGUnLCdyZXN0J11cblx0ICovXG5cdGdldER1cmF0aW9uTXVsdGlwbGllcihkdXJhdGlvbiwgdHlwZSkge1xuXHRcdC8vIE5lZWQgdG8gYXBwbHkgZHVyYXRpb24gaGVyZS4gIFF1YXJ0ZXIgbm90ZSA9PSBDb25zdGFudHMuSEVBREVSX0NIVU5LX0RJVklTSU9OXG5cdFx0c3dpdGNoIChkdXJhdGlvbikge1xuXHRcdFx0Y2FzZSAnMCc6XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0Y2FzZSAnMSc6XG5cdFx0XHRcdHJldHVybiA0O1xuXHRcdFx0Y2FzZSAnMic6XG5cdFx0XHRcdHJldHVybiAyO1xuXHRcdFx0Y2FzZSAnZDInOlxuXHRcdFx0XHRyZXR1cm4gMztcblx0XHRcdGNhc2UgJzQnOlxuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdGNhc2UgJ2Q0Jzpcblx0XHRcdFx0cmV0dXJuIDEuNTtcblx0XHRcdGNhc2UgJzgnOlxuXHRcdFx0XHRyZXR1cm4gMC41O1xuXHRcdFx0Y2FzZSAnOHQnOlxuXHRcdFx0XHQvLyBGb3IgOHRoIHRyaXBsZXRzLCBsZXQncyBkaXZpZGUgYSBxdWFydGVyIGJ5IDMsIHJvdW5kIHRvIHRoZSBuZWFyZXN0IGludCwgYW5kIHN1YnN0cmFjdCB0aGUgcmVtYWluZGVyIHRvIHRoZSBsYXN0IG9uZS5cblx0XHRcdFx0cmV0dXJuIDAuMzM7XG5cdFx0XHRjYXNlICdkOCc6XG5cdFx0XHRcdHJldHVybiAwLjc1O1xuXHRcdFx0Y2FzZSAnMTYnOlxuXHRcdFx0XHRyZXR1cm4gMC4yNTtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8vIE5vdGVzIGRlZmF1bHQgdG8gYSBxdWFydGVyLCByZXN0cyBkZWZhdWx0IHRvIDBcblx0XHRcdFx0cmV0dXJuIHR5cGUgPT09ICdub3RlJyA/IDEgOiAwO1xuXHRcdH1cblx0fTtcblxuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBub3RlIG9uIHN0YXR1cyBjb2RlIGJhc2VkIG9uIHRoZSBzZWxlY3RlZCBjaGFubmVsLiAweDl7MC1GfVxuXHQgKiBOb3RlIG9uIGF0IGNoYW5uZWwgMCBpcyAweDkwICgxNDQpXG5cdCAqIDAgPSBDaCAxXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHRnZXROb3RlT25TdGF0dXMoKSB7cmV0dXJuIDE0NCArIHRoaXMuY2hhbm5lbCAtIDF9XG5cblxuXHQvKipcblx0ICogR2V0cyB0aGUgbm90ZSBvZmYgc3RhdHVzIGNvZGUgYmFzZWQgb24gdGhlIHNlbGVjdGVkIGNoYW5uZWwuIDB4OHswLUZ9XG5cdCAqIE5vdGUgb2ZmIGF0IGNoYW5uZWwgMCBpcyAweDgwICgxMjgpXG5cdCAqIDAgPSBDaCAxXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHRnZXROb3RlT2ZmU3RhdHVzKCkge3JldHVybiAxMjggKyB0aGlzLmNoYW5uZWwgLSAxfVxufVxuXG5leHBvcnRzLk5vdGVFdmVudCA9IE5vdGVFdmVudDsiXX0=
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoteOffEvent = function NoteOffEvent(fields) {
	_classCallCheck(this, NoteOffEvent);

	this.data = fields.data;
};

exports.NoteOffEvent = NoteOffEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGUtb2ZmLWV2ZW50LmpzIl0sIm5hbWVzIjpbIk5vdGVPZmZFdmVudCIsImZpZWxkcyIsImRhdGEiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0lBSU1BLFksR0FHTCxzQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNuQixNQUFLQyxJQUFMLEdBQVlELE9BQU9DLElBQW5CO0FBQ0EsQzs7QUFHRkMsUUFBUUgsWUFBUixHQUF1QkEsWUFBdkIiLCJmaWxlIjoibm90ZS1vZmYtZXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEhvbGRzIGFsbCBkYXRhIGZvciBhIFwibm90ZSBvZmZcIiBNSURJIGV2ZW50XG4gKiBAcGFyYW0ge29iamVjdH0gZmllbGRzIHtkYXRhOiBbXX1cbiAqL1xuY2xhc3MgTm90ZU9mZkV2ZW50IHtcblx0Ly9kYXRhOiBudW1iZXJbXTtcblxuXHRjb25zdHJ1Y3RvcihmaWVsZHMpIHtcblx0XHR0aGlzLmRhdGEgPSBmaWVsZHMuZGF0YTtcblx0fVxufVxuXG5leHBvcnRzLk5vdGVPZmZFdmVudCA9IE5vdGVPZmZFdmVudDsiXX0=
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoteOnEvent = function NoteOnEvent(fields) {
	_classCallCheck(this, NoteOnEvent);

	this.data = fields.data;
};

exports.NoteOnEvent = NoteOnEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGUtb24tZXZlbnQuanMiXSwibmFtZXMiOlsiTm90ZU9uRXZlbnQiLCJmaWVsZHMiLCJkYXRhIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztJQUlNQSxXLEdBR0wscUJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFDbkIsTUFBS0MsSUFBTCxHQUFZRCxPQUFPQyxJQUFuQjtBQUNBLEM7O0FBR0ZDLFFBQVFILFdBQVIsR0FBc0JBLFdBQXRCIiwiZmlsZSI6Im5vdGUtb24tZXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEhvbGRzIGFsbCBkYXRhIGZvciBhIFwibm90ZSBvblwiIE1JREkgZXZlbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBmaWVsZHMge2RhdGE6IFtdfVxuICovXG5jbGFzcyBOb3RlT25FdmVudCB7XG5cdC8vZGF0YTogbnVtYmVyW107XG5cblx0Y29uc3RydWN0b3IoZmllbGRzKSB7XG5cdFx0dGhpcy5kYXRhID0gZmllbGRzLmRhdGE7XG5cdH1cbn1cblxuZXhwb3J0cy5Ob3RlT25FdmVudCA9IE5vdGVPbkV2ZW50OyJdfQ==
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgramChangeEvent = function ProgramChangeEvent(fields) {
	_classCallCheck(this, ProgramChangeEvent);

	this.type = 'program';

	this.data = Utils.numberToVariableLength(0x00).concat(Constants.PROGRAM_CHANGE_STATUS, fields.instrument);
};

exports.ProgramChangeEvent = ProgramChangeEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2dyYW0tY2hhbmdlLWV2ZW50LmpzIl0sIm5hbWVzIjpbIlByb2dyYW1DaGFuZ2VFdmVudCIsImZpZWxkcyIsInR5cGUiLCJkYXRhIiwiVXRpbHMiLCJudW1iZXJUb1ZhcmlhYmxlTGVuZ3RoIiwiY29uY2F0IiwiQ29uc3RhbnRzIiwiUFJPR1JBTV9DSEFOR0VfU1RBVFVTIiwiaW5zdHJ1bWVudCIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7SUFBTUEsa0IsR0FDTCw0QkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNuQixNQUFLQyxJQUFMLEdBQVksU0FBWjs7QUFFQSxNQUFLQyxJQUFMLEdBQVlDLE1BQU1DLHNCQUFOLENBQTZCLElBQTdCLEVBQW1DQyxNQUFuQyxDQUEwQ0MsVUFBVUMscUJBQXBELEVBQTJFUCxPQUFPUSxVQUFsRixDQUFaO0FBQ0EsQzs7QUFHRkMsUUFBUVYsa0JBQVIsR0FBNkJBLGtCQUE3QiIsImZpbGUiOiJwcm9ncmFtLWNoYW5nZS1ldmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFByb2dyYW1DaGFuZ2VFdmVudCB7XG5cdGNvbnN0cnVjdG9yKGZpZWxkcykge1xuXHRcdHRoaXMudHlwZSA9ICdwcm9ncmFtJztcblx0XHQvLyBkZWx0YSB0aW1lIGRlZmF1bHRzIHRvIDAuXG5cdFx0dGhpcy5kYXRhID0gVXRpbHMubnVtYmVyVG9WYXJpYWJsZUxlbmd0aCgweDAwKS5jb25jYXQoQ29uc3RhbnRzLlBST0dSQU1fQ0hBTkdFX1NUQVRVUywgZmllbGRzLmluc3RydW1lbnQpO1xuXHR9XG59XG5cbmV4cG9ydHMuUHJvZ3JhbUNoYW5nZUV2ZW50ID0gUHJvZ3JhbUNoYW5nZUV2ZW50OyJdfQ==
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Track = function () {
	function Track() {
		_classCallCheck(this, Track);

		this.type = Constants.TRACK_CHUNK_TYPE;
		this.data = [];
		this.size = [];
		this.events = [];
	}

	_createClass(Track, [{
		key: 'addEvent',
		value: function addEvent(event, mapFunction) {
			if (Array.isArray(event)) {
				event.forEach(function (e, i) {
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

							e.buildData();
						}
					}

					this.data = this.data.concat(e.data);
					this.size = Utils.numberToBytes(this.data.length, 4);
					this.events.push(e);
				}, this);
			} else {
				this.data = this.data.concat(event.data);
				this.size = Utils.numberToBytes(this.data.length, 4);
				this.events.push(event);
			}

			return this;
		}
	}, {
		key: 'setTempo',
		value: function setTempo(bpm) {
			var event = new MetaEvent({ data: [Constants.META_TEMPO_ID] });
			event.data.push(0x03);
			var tempo = Math.round(60000000 / bpm);
			event.data = event.data.concat(Utils.numberToBytes(tempo, 3));
			return this.addEvent(event);
		}
	}, {
		key: 'setTimeSignature',
		value: function setTimeSignature(numerator, denominator, midiclockspertick, notespermidiclock) {
			var event = new MetaEvent({ data: [Constants.META_TIME_SIGNATURE_ID] });
			event.data.push(0x04);
			event.data = event.data.concat(Utils.numberToBytes(numerator, 1));
			var _denominator = denominator < 4 ? denominator - 1 : Math.sqrt(denominator);
			event.data = event.data.concat(Utils.numberToBytes(_denominator, 1));
			midiclockspertick = midiclockspertick || 24;
			event.data = event.data.concat(Utils.numberToBytes(midiclockspertick, 1));
			notespermidiclock = notespermidiclock || 8;
			event.data = event.data.concat(Utils.numberToBytes(notespermidiclock, 1));
			return this.addEvent(event);
		}
	}, {
		key: 'setKeySignature',
		value: function setKeySignature(sf, mi) {
			var event = new MetaEvent({ data: [Constants.META_KEY_SIGNATURE_ID] });
			event.data.push(0x02);

			var mode = mi || 0;
			sf = sf || 0;

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

			event.data = event.data.concat(Utils.numberToBytes(sf, 1));
			event.data = event.data.concat(Utils.numberToBytes(mode, 1));
			return this.addEvent(event);
		}
	}, {
		key: 'addText',
		value: function addText(text) {
			var event = new MetaEvent({ data: [Constants.META_TEXT_ID] });
			var stringBytes = Utils.stringToBytes(text);
			event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length));
			event.data = event.data.concat(stringBytes);
			return this.addEvent(event);
		}
	}, {
		key: 'addCopyright',
		value: function addCopyright(text) {
			var event = new MetaEvent({ data: [Constants.META_COPYRIGHT_ID] });
			var stringBytes = Utils.stringToBytes(text);
			event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length));
			event.data = event.data.concat(stringBytes);
			return this.addEvent(event);
		}
	}, {
		key: 'addInstrumentName',
		value: function addInstrumentName(text) {
			var event = new MetaEvent({ data: [Constants.META_INSTRUMENT_NAME_ID] });
			var stringBytes = Utils.stringToBytes(text);
			event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length));
			event.data = event.data.concat(stringBytes);
			return this.addEvent(event);
		}
	}, {
		key: 'addMarker',
		value: function addMarker(text) {
			var event = new MetaEvent({ data: [Constants.META_MARKER_ID] });
			var stringBytes = Utils.stringToBytes(text);
			event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length));
			event.data = event.data.concat(stringBytes);
			return this.addEvent(event);
		}
	}, {
		key: 'addCuePoint',
		value: function addCuePoint(text) {
			var event = new MetaEvent({ data: [Constants.META_CUE_POINT] });
			var stringBytes = Utils.stringToBytes(text);
			event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length));
			event.data = event.data.concat(stringBytes);
			return this.addEvent(event);
		}
	}, {
		key: 'addLyric',
		value: function addLyric(lyric) {
			var event = new MetaEvent({ data: [Constants.META_LYRIC_ID] });
			var stringBytes = Utils.stringToBytes(lyric);
			event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length));
			event.data = event.data.concat(stringBytes);
			return this.addEvent(event);
		}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyYWNrLmpzIl0sIm5hbWVzIjpbIlRyYWNrIiwidHlwZSIsIkNvbnN0YW50cyIsIlRSQUNLX0NIVU5LX1RZUEUiLCJkYXRhIiwic2l6ZSIsImV2ZW50cyIsImV2ZW50IiwibWFwRnVuY3Rpb24iLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwiZSIsImkiLCJwcm9wZXJ0aWVzIiwiaiIsImR1cmF0aW9uIiwic2VxdWVudGlhbCIsInZlbG9jaXR5IiwiY29udmVydFZlbG9jaXR5IiwiYnVpbGREYXRhIiwiY29uY2F0IiwiVXRpbHMiLCJudW1iZXJUb0J5dGVzIiwibGVuZ3RoIiwicHVzaCIsImJwbSIsIk1ldGFFdmVudCIsIk1FVEFfVEVNUE9fSUQiLCJ0ZW1wbyIsIk1hdGgiLCJyb3VuZCIsImFkZEV2ZW50IiwibnVtZXJhdG9yIiwiZGVub21pbmF0b3IiLCJtaWRpY2xvY2tzcGVydGljayIsIm5vdGVzcGVybWlkaWNsb2NrIiwiTUVUQV9USU1FX1NJR05BVFVSRV9JRCIsIl9kZW5vbWluYXRvciIsInNxcnQiLCJzZiIsIm1pIiwiTUVUQV9LRVlfU0lHTkFUVVJFX0lEIiwibW9kZSIsImZpZnRocyIsIl9zZmxlbiIsIm5vdGUiLCJ0b0xvd2VyQ2FzZSIsImNoYXJBdCIsInN1YnN0cmluZyIsInRvVXBwZXJDYXNlIiwiZmlmdGhpbmRleCIsImluZGV4T2YiLCJ0ZXh0IiwiTUVUQV9URVhUX0lEIiwic3RyaW5nQnl0ZXMiLCJzdHJpbmdUb0J5dGVzIiwibnVtYmVyVG9WYXJpYWJsZUxlbmd0aCIsIk1FVEFfQ09QWVJJR0hUX0lEIiwiTUVUQV9JTlNUUlVNRU5UX05BTUVfSUQiLCJNRVRBX01BUktFUl9JRCIsIk1FVEFfQ1VFX1BPSU5UIiwibHlyaWMiLCJNRVRBX0xZUklDX0lEIiwiTm90ZU9uRXZlbnQiLCJjb25zb2xlIiwibG9nIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFBTUEsSztBQU1MLGtCQUFjO0FBQUE7O0FBQ2IsT0FBS0Ms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LEVBQWEsSUFBYixFQUFtQixJQUFuQixDQUFQLEVBQWhCLENBQVo7QUFDQSxRQUFLNEIsUUFBTCxDQUFjekIsS0FBZDtBQUNBMEQsV0FBUUMsR0FBUixDQUFZM0QsS0FBWjtBQUNBOzs7Ozs7QUFJRjRELFFBQVFuRSxLQUFSLEdBQWdCQSxLQUFoQiIsImZpbGUiOiJ0cmFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRyYWNrIHtcblx0Ly90eXBlOiBudW1iZXJbXTtcblx0Ly9kYXRhOiBudW1iZXJbXTtcblx0Ly9zaXplOiBudW1iZXJbXTtcblx0Ly9ldmVudHM6IGFueTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnR5cGUgPSBDb25zdGFudHMuVFJBQ0tfQ0hVTktfVFlQRTtcblx0XHR0aGlzLmRhdGEgPSBbXTtcblx0XHR0aGlzLnNpemUgPSBbXTtcblx0XHR0aGlzLmV2ZW50cyA9IFtdO1xuXHR9XG5cblx0Ly8gTWV0aG9kIHRvIGFkZCBhbnkgZXZlbnQgdHlwZSB0aGUgdHJhY2suXG5cdGFkZEV2ZW50KGV2ZW50LCBtYXBGdW5jdGlvbikge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGV2ZW50KSkge1xuXHRcdFx0ZXZlbnQuZm9yRWFjaChmdW5jdGlvbihlLCBpKSB7XG5cdFx0XHRcdC8vIEhhbmRsZSBtYXAgZnVuY3Rpb24gaWYgcHJvdmlkZWRcblx0XHRcdFx0aWYgKHR5cGVvZiBtYXBGdW5jdGlvbiA9PT0gJ2Z1bmN0aW9uJyAmJiBlLnR5cGUgPT09ICdub3RlJykge1xuXHRcdFx0XHRcdHZhciBwcm9wZXJ0aWVzID0gbWFwRnVuY3Rpb24oaSwgZSk7XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mIHByb3BlcnRpZXMgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBqIGluIHByb3BlcnRpZXMpIHtcblx0XHRcdFx0XHRcdFx0c3dpdGNoKGopIHtcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdkdXJhdGlvbic6XG5cdFx0XHRcdFx0XHRcdFx0XHRlLmR1cmF0aW9uID0gcHJvcGVydGllc1tqXTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3NlcXVlbnRpYWwnOlxuXHRcdFx0XHRcdFx0XHRcdFx0ZS5zZXF1ZW50aWFsID0gcHJvcGVydGllc1tqXTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3ZlbG9jaXR5Jzpcblx0XHRcdFx0XHRcdFx0XHRcdGUudmVsb2NpdHkgPSBlLmNvbnZlcnRWZWxvY2l0eShwcm9wZXJ0aWVzW2pdKTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XHRcdFxuXG5cdFx0XHRcdFx0XHQvLyBHb3R0YSBidWlsZCB0aGF0IGRhdGFcblx0XHRcdFx0XHRcdGUuYnVpbGREYXRhKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5kYXRhID0gdGhpcy5kYXRhLmNvbmNhdChlLmRhdGEpO1xuXHRcdFx0XHR0aGlzLnNpemUgPSBVdGlscy5udW1iZXJUb0J5dGVzKHRoaXMuZGF0YS5sZW5ndGgsIDQpOyAvLyA0IGJ5dGVzIGxvbmdcblx0XHRcdFx0dGhpcy5ldmVudHMucHVzaChlKTtcblx0XHRcdH0sIHRoaXMpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5jb25jYXQoZXZlbnQuZGF0YSk7XG5cdFx0XHR0aGlzLnNpemUgPSBVdGlscy5udW1iZXJUb0J5dGVzKHRoaXMuZGF0YS5sZW5ndGgsIDQpOyAvLyA0IGJ5dGVzIGxvbmdcblx0XHRcdHRoaXMuZXZlbnRzLnB1c2goZXZlbnQpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0VGVtcG8oYnBtKSB7XG5cdFx0dmFyIGV2ZW50ID0gbmV3IE1ldGFFdmVudCh7ZGF0YTogW0NvbnN0YW50cy5NRVRBX1RFTVBPX0lEXX0pO1xuXHRcdGV2ZW50LmRhdGEucHVzaCgweDAzKTsgLy8gU2l6ZVxuXHRcdHZhciB0ZW1wbyA9IE1hdGgucm91bmQoNjAwMDAwMDAgLyBicG0pO1xuXHRcdGV2ZW50LmRhdGEgPSBldmVudC5kYXRhLmNvbmNhdChVdGlscy5udW1iZXJUb0J5dGVzKHRlbXBvLCAzKSk7IC8vIFRlbXBvLCAzIGJ5dGVzXG5cdFx0cmV0dXJuIHRoaXMuYWRkRXZlbnQoZXZlbnQpO1xuXHR9XG5cblxuXHRzZXRUaW1lU2lnbmF0dXJlKG51bWVyYXRvciwgZGVub21pbmF0b3IsIG1pZGljbG9ja3NwZXJ0aWNrLCBub3Rlc3Blcm1pZGljbG9jaykge1xuXHRcdHZhciBldmVudCA9IG5ldyBNZXRhRXZlbnQoe2RhdGE6IFtDb25zdGFudHMuTUVUQV9USU1FX1NJR05BVFVSRV9JRF19KTtcblx0XHRldmVudC5kYXRhLnB1c2goMHgwNCk7IC8vIFNpemVcblx0XHRldmVudC5kYXRhID0gZXZlbnQuZGF0YS5jb25jYXQoVXRpbHMubnVtYmVyVG9CeXRlcyhudW1lcmF0b3IsIDEpKTsgLy8gTnVtZXJhdG9yLCAxIGJ5dGVzXG5cdFx0dmFyIF9kZW5vbWluYXRvciA9IChkZW5vbWluYXRvciA8IDQpID8gKGRlbm9taW5hdG9yIC0gMSkgOiBNYXRoLnNxcnQoZGVub21pbmF0b3IpO1x0Ly8gRGVub21pbmF0b3IgaXMgZXhwcmVzc2VkIGFzIHBvdyBvZiAyXG5cdFx0ZXZlbnQuZGF0YSA9IGV2ZW50LmRhdGEuY29uY2F0KFV0aWxzLm51bWJlclRvQnl0ZXMoX2Rlbm9taW5hdG9yLCAxKSk7IC8vIERlbm9taW5hdG9yLCAxIGJ5dGVzXG5cdFx0bWlkaWNsb2Nrc3BlcnRpY2sgPSBtaWRpY2xvY2tzcGVydGljayB8fCAyNDtcblx0XHRldmVudC5kYXRhID0gZXZlbnQuZGF0YS5jb25jYXQoVXRpbHMubnVtYmVyVG9CeXRlcyhtaWRpY2xvY2tzcGVydGljaywgMSkpOyAvLyBNSURJIENsb2NrcyBwZXIgdGljaywgMSBieXRlc1xuXHRcdG5vdGVzcGVybWlkaWNsb2NrID0gbm90ZXNwZXJtaWRpY2xvY2sgfHwgODtcblx0XHRldmVudC5kYXRhID0gZXZlbnQuZGF0YS5jb25jYXQoVXRpbHMubnVtYmVyVG9CeXRlcyhub3Rlc3Blcm1pZGljbG9jaywgMSkpOyAvLyBOdW1iZXIgb2YgMS8zMiBub3RlcyBwZXIgTUlESSBjbG9ja3MsIDEgYnl0ZXNcblx0XHRyZXR1cm4gdGhpcy5hZGRFdmVudChldmVudCk7XG5cdH1cblxuXHRzZXRLZXlTaWduYXR1cmUoc2YsIG1pKSB7XG5cdFx0dmFyIGV2ZW50ID0gbmV3IE1ldGFFdmVudCh7ZGF0YTogW0NvbnN0YW50cy5NRVRBX0tFWV9TSUdOQVRVUkVfSURdfSk7XG5cdFx0ZXZlbnQuZGF0YS5wdXNoKDB4MDIpOyAvLyBTaXplXG5cblx0XHR2YXIgbW9kZSA9IG1pIHx8IDA7XG5cdFx0c2YgPSBzZiB8fCAwO1xuXG5cdFx0Ly9cdEZ1bmN0aW9uIGNhbGxlZCB3aXRoIHN0cmluZyBub3RhdGlvblxuXHRcdGlmICh0eXBlb2YgbWkgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR2YXIgZmlmdGhzID0gW1xuXHRcdFx0XHRbJ0NiJywgJ0diJywgJ0RiJywgJ0FiJywgJ0ViJywgJ0JiJywgJ0YnLCAnQycsICdHJywgJ0QnLCAnQScsICdFJywgJ0InLCAnRiMnLCAnQyMnXSxcblx0XHRcdFx0WydhYicsICdlYicsICdiYicsICdmJywgJ2MnLCAnZycsICdkJywgJ2EnLCAnZScsICdiJywgJ2YjJywgJ2MjJywgJ2cjJywgJ2QjJywgJ2EjJ11cblx0XHRcdF07XG5cdFx0XHR2YXIgX3NmbGVuID0gc2YubGVuZ3RoO1xuXHRcdFx0dmFyIG5vdGUgPSBzZiB8fCAnQyc7XG5cblx0XHRcdGlmIChzZlswXSA9PT0gc2ZbMF0udG9Mb3dlckNhc2UoKSkgbW9kZSA9IDFcblxuXHRcdFx0aWYgKF9zZmxlbiA+IDEpIHtcblx0XHRcdFx0c3dpdGNoIChzZi5jaGFyQXQoX3NmbGVuIC0gMSkpIHtcblx0XHRcdFx0XHRjYXNlICdtJzpcblx0XHRcdFx0XHRcdG1vZGUgPSAxO1xuXHRcdFx0XHRcdFx0bm90ZSA9IHNmLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0bm90ZSA9IG5vdGUuY29uY2F0KHNmLnN1YnN0cmluZygxLCBfc2ZsZW4gLSAxKSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICctJzpcblx0XHRcdFx0XHRcdG1vZGUgPSAxO1xuXHRcdFx0XHRcdFx0bm90ZSA9IHNmLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0bm90ZSA9IG5vdGUuY29uY2F0KHNmLnN1YnN0cmluZygxLCBfc2ZsZW4gLSAxKSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdNJzpcblx0XHRcdFx0XHRcdG1vZGUgPSAwO1xuXHRcdFx0XHRcdFx0bm90ZSA9IHNmLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0bm90ZSA9IG5vdGUuY29uY2F0KHNmLnN1YnN0cmluZygxLCBfc2ZsZW4gLSAxKSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICcrJzpcblx0XHRcdFx0XHRcdG1vZGUgPSAwO1xuXHRcdFx0XHRcdFx0bm90ZSA9IHNmLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0bm90ZSA9IG5vdGUuY29uY2F0KHNmLnN1YnN0cmluZygxLCBfc2ZsZW4gLSAxKSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZmlmdGhpbmRleCA9IGZpZnRoc1ttb2RlXS5pbmRleE9mKG5vdGUpO1xuXHRcdFx0c2YgPSBmaWZ0aGluZGV4ID09PSAtMSA/IDAgOiBmaWZ0aGluZGV4IC0gNztcblx0XHR9XG5cblx0XHRldmVudC5kYXRhID0gZXZlbnQuZGF0YS5jb25jYXQoVXRpbHMubnVtYmVyVG9CeXRlcyhzZiwgMSkpOyAvLyBOdW1iZXIgb2Ygc2hhcnAgb3IgZmxhdHMgKCA8IDAgZmxhdDsgPiAwIHNoYXJwKVxuXHRcdGV2ZW50LmRhdGEgPSBldmVudC5kYXRhLmNvbmNhdChVdGlscy5udW1iZXJUb0J5dGVzKG1vZGUsIDEpKTsgLy8gTW9kZTogMCBtYWpvciwgMSBtaW5vclxuXHRcdHJldHVybiB0aGlzLmFkZEV2ZW50KGV2ZW50KTtcblx0fVxuXG5cdGFkZFRleHQodGV4dCkge1xuXHRcdHZhciBldmVudCA9IG5ldyBNZXRhRXZlbnQoe2RhdGE6IFtDb25zdGFudHMuTUVUQV9URVhUX0lEXX0pO1xuXHRcdHZhciBzdHJpbmdCeXRlcyA9IFV0aWxzLnN0cmluZ1RvQnl0ZXModGV4dCk7XG5cdFx0ZXZlbnQuZGF0YSA9IGV2ZW50LmRhdGEuY29uY2F0KFV0aWxzLm51bWJlclRvVmFyaWFibGVMZW5ndGgoc3RyaW5nQnl0ZXMubGVuZ3RoKSk7IC8vIFNpemVcblx0XHRldmVudC5kYXRhID0gZXZlbnQuZGF0YS5jb25jYXQoc3RyaW5nQnl0ZXMpOyAvLyBUZXh0XG5cdFx0cmV0dXJuIHRoaXMuYWRkRXZlbnQoZXZlbnQpO1xuXHR9XG5cblxuXHRhZGRDb3B5cmlnaHQodGV4dCkge1xuXHRcdHZhciBldmVudCA9IG5ldyBNZXRhRXZlbnQoe2RhdGE6IFtDb25zdGFudHMuTUVUQV9DT1BZUklHSFRfSURdfSk7XG5cdFx0dmFyIHN0cmluZ0J5dGVzID0gVXRpbHMuc3RyaW5nVG9CeXRlcyh0ZXh0KTtcblx0XHRldmVudC5kYXRhID0gZXZlbnQuZGF0YS5jb25jYXQoVXRpbHMubnVtYmVyVG9WYXJpYWJsZUxlbmd0aChzdHJpbmdCeXRlcy5sZW5ndGgpKTsgLy8gU2l6ZVxuXHRcdGV2ZW50LmRhdGEgPSBldmVudC5kYXRhLmNvbmNhdChzdHJpbmdCeXRlcyk7IC8vIFRleHRcblx0XHRyZXR1cm4gdGhpcy5hZGRFdmVudChldmVudCk7XG5cdH1cblxuXG5cdGFkZEluc3RydW1lbnROYW1lKHRleHQpIHtcblx0XHR2YXIgZXZlbnQgPSBuZXcgTWV0YUV2ZW50KHtkYXRhOiBbQ29uc3RhbnRzLk1FVEFfSU5TVFJVTUVOVF9OQU1FX0lEXX0pO1xuXHRcdHZhciBzdHJpbmdCeXRlcyA9IFV0aWxzLnN0cmluZ1RvQnl0ZXModGV4dCk7XG5cdFx0ZXZlbnQuZGF0YSA9IGV2ZW50LmRhdGEuY29uY2F0KFV0aWxzLm51bWJlclRvVmFyaWFibGVMZW5ndGgoc3RyaW5nQnl0ZXMubGVuZ3RoKSk7IC8vIFNpemVcblx0XHRldmVudC5kYXRhID0gZXZlbnQuZGF0YS5jb25jYXQoc3RyaW5nQnl0ZXMpOyAvLyBUZXh0XG5cdFx0cmV0dXJuIHRoaXMuYWRkRXZlbnQoZXZlbnQpO1xuXHR9XG5cblxuXHRhZGRNYXJrZXIodGV4dCkge1xuXHRcdHZhciBldmVudCA9IG5ldyBNZXRhRXZlbnQoe2RhdGE6IFtDb25zdGFudHMuTUVUQV9NQVJLRVJfSURdfSk7XG5cdFx0dmFyIHN0cmluZ0J5dGVzID0gVXRpbHMuc3RyaW5nVG9CeXRlcyh0ZXh0KTtcblx0XHRldmVudC5kYXRhID0gZXZlbnQuZGF0YS5jb25jYXQoVXRpbHMubnVtYmVyVG9WYXJpYWJsZUxlbmd0aChzdHJpbmdCeXRlcy5sZW5ndGgpKTsgLy8gU2l6ZVxuXHRcdGV2ZW50LmRhdGEgPSBldmVudC5kYXRhLmNvbmNhdChzdHJpbmdCeXRlcyk7IC8vIFRleHRcblx0XHRyZXR1cm4gdGhpcy5hZGRFdmVudChldmVudCk7XG5cdH1cblxuXG5cdGFkZEN1ZVBvaW50KHRleHQpIHtcblx0XHR2YXIgZXZlbnQgPSBuZXcgTWV0YUV2ZW50KHtkYXRhOiBbQ29uc3RhbnRzLk1FVEFfQ1VFX1BPSU5UXX0pO1xuXHRcdHZhciBzdHJpbmdCeXRlcyA9IFV0aWxzLnN0cmluZ1RvQnl0ZXModGV4dCk7XG5cdFx0ZXZlbnQuZGF0YSA9IGV2ZW50LmRhdGEuY29uY2F0KFV0aWxzLm51bWJlclRvVmFyaWFibGVMZW5ndGgoc3RyaW5nQnl0ZXMubGVuZ3RoKSk7IC8vIFNpemVcblx0XHRldmVudC5kYXRhID0gZXZlbnQuZGF0YS5jb25jYXQoc3RyaW5nQnl0ZXMpOyAvLyBUZXh0XG5cdFx0cmV0dXJuIHRoaXMuYWRkRXZlbnQoZXZlbnQpO1xuXHR9XG5cblxuXHRhZGRMeXJpYyhseXJpYykge1xuXHRcdHZhciBldmVudCA9IG5ldyBNZXRhRXZlbnQoe2RhdGE6IFtDb25zdGFudHMuTUVUQV9MWVJJQ19JRF19KTtcblx0XHR2YXIgc3RyaW5nQnl0ZXMgPSBVdGlscy5zdHJpbmdUb0J5dGVzKGx5cmljKTtcblx0XHRldmVudC5kYXRhID0gZXZlbnQuZGF0YS5jb25jYXQoVXRpbHMubnVtYmVyVG9WYXJpYWJsZUxlbmd0aChzdHJpbmdCeXRlcy5sZW5ndGgpKTsgLy8gU2l6ZVxuXHRcdGV2ZW50LmRhdGEgPSBldmVudC5kYXRhLmNvbmNhdChzdHJpbmdCeXRlcyk7IC8vIEx5cmljXG5cdFx0cmV0dXJuIHRoaXMuYWRkRXZlbnQoZXZlbnQpO1xuXHR9XG5cblx0LyoqIENoYW5uZWwgTW9kZSBNZXNzYWdlcyAqKi9cblx0cG9seU1vZGVPbigpIHtcblx0XHR2YXIgZXZlbnQgPSBuZXcgTm90ZU9uRXZlbnQoe2RhdGE6IFsweDAwLCAweEIwLCAweDdFLCAweDAwXX0pO1xuXHRcdHRoaXMuYWRkRXZlbnQoZXZlbnQpO1xuXHRcdGNvbnNvbGUubG9nKGV2ZW50KTtcblx0fVxuXG59XG5cbmV4cG9ydHMuVHJhY2sgPSBUcmFjazsiXX0=
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
	}, {
		key: 'getPitch',
		value: function getPitch(pitch) {
			if (this.isNumeric(pitch)) {
				if (pitch >= 0 && pitch <= 127) console.error(pitch + ' is not within MIDI note range (0-127).');
				return pitch;
			}

			pitch = pitch.charAt(0).toUpperCase() + pitch.substring(1);
			return Constants.NOTES[pitch];
		}
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
	}, {
		key: 'numberFromBytes',
		value: function numberFromBytes(bytes) {
			var hex = '';
			var stringResult;

			bytes.forEach(function (byte) {
				stringResult = byte.toString(16);

				if (stringResult.length == 1) stringResult = "0" + stringResult;

				hex += stringResult;
			});

			return parseInt(hex, 16);
		}
	}, {
		key: 'numberToBytes',
		value: function numberToBytes(number, bytesNeeded) {
			bytesNeeded = bytesNeeded || 1;

			var hexString = number.toString(16);

			if (hexString.length & 1) {
				hexString = '0' + hexString;
			}

			var hexArray = hexString.match(/.{2}/g);

			hexArray = hexArray.map(function (item) {
				return parseInt(item, 16);
			});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbIlV0aWxzIiwiQ29uc3RhbnRzIiwiVkVSU0lPTiIsInN0cmluZyIsInNwbGl0IiwibWFwIiwiY2hhciIsImNoYXJDb2RlQXQiLCJuIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwiaXNGaW5pdGUiLCJwaXRjaCIsImlzTnVtZXJpYyIsImNvbnNvbGUiLCJlcnJvciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic3Vic3RyaW5nIiwiTk9URVMiLCJ0aWNrcyIsImJ1ZmZlciIsImJMaXN0IiwicHVzaCIsInMiLCJlbmNvZGVVUkkiLCJsZW5ndGgiLCJieXRlcyIsImhleCIsInN0cmluZ1Jlc3VsdCIsImZvckVhY2giLCJieXRlIiwidG9TdHJpbmciLCJwYXJzZUludCIsIm51bWJlciIsImJ5dGVzTmVlZGVkIiwiaGV4U3RyaW5nIiwiaGV4QXJyYXkiLCJtYXRjaCIsIml0ZW0iLCJ1bnNoaWZ0IiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU1BLEs7Ozs7Ozs7NEJBRVk7QUFDaEIsVUFBT0MsVUFBVUMsT0FBakI7QUFDQTs7O2dDQU9vQkMsTSxFQUFRO0FBQzVCLFVBQU9BLE9BQU9DLEtBQVAsQ0FBYSxFQUFiLEVBQWlCQyxHQUFqQixDQUFxQjtBQUFBLFdBQVFDLEtBQUtDLFVBQUwsRUFBUjtBQUFBLElBQXJCLENBQVA7QUFDQTs7OzRCQUVnQkMsQyxFQUFHO0FBQ25CLFVBQU8sQ0FBQ0MsTUFBTUMsV0FBV0YsQ0FBWCxDQUFOLENBQUQsSUFBeUJHLFNBQVNILENBQVQsQ0FBaEM7QUFDQTs7OzJCQU9tQkksSyxFQUFPO0FBQ3RCLE9BQUksS0FBS0MsU0FBTCxDQUFlRCxLQUFmLENBQUosRUFBMkI7QUFDMUIsUUFBSUEsU0FBUyxDQUFULElBQWNBLFNBQVMsR0FBM0IsRUFBZ0NFLFFBQVFDLEtBQVIsQ0FBY0gsUUFBUSx5Q0FBdEI7QUFDaEMsV0FBT0EsS0FBUDtBQUNBOztBQUdKQSxXQUFRQSxNQUFNSSxNQUFOLENBQWEsQ0FBYixFQUFnQkMsV0FBaEIsS0FBZ0NMLE1BQU1NLFNBQU4sQ0FBZ0IsQ0FBaEIsQ0FBeEM7QUFDQSxVQUFPakIsVUFBVWtCLEtBQVYsQ0FBZ0JQLEtBQWhCLENBQVA7QUFDRzs7O3lDQVl5QlEsSyxFQUFPO0FBQ2pDLE9BQUlDLFNBQVNELFFBQVEsSUFBckI7O0FBRUEsVUFBT0EsUUFBUUEsU0FBUyxDQUF4QixFQUEyQjtBQUN2QkMsZUFBVyxDQUFYO0FBQ0FBLGNBQVlELFFBQVEsSUFBVCxHQUFpQixJQUE1QjtBQUNIOztBQUVELE9BQUlFLFFBQVEsRUFBWjtBQUNBLFVBQU8sSUFBUCxFQUFhO0FBQ1RBLFVBQU1DLElBQU4sQ0FBV0YsU0FBUyxJQUFwQjs7QUFFQSxRQUFJQSxTQUFTLElBQWIsRUFBbUJBLFdBQVcsQ0FBWCxDQUFuQixLQUNLO0FBQUU7QUFBUTtBQUNsQjs7QUFFRCxVQUFPQyxLQUFQO0FBQ0g7OztrQ0FFc0JFLEMsRUFBRztBQUN6QixVQUFPQyxVQUFVRCxDQUFWLEVBQWFwQixLQUFiLENBQW1CLE9BQW5CLEVBQTRCc0IsTUFBNUIsR0FBcUMsQ0FBNUM7QUFDQTs7O2tDQU9zQkMsSyxFQUFPO0FBQzdCLE9BQUlDLE1BQU0sRUFBVjtBQUNBLE9BQUlDLFlBQUo7O0FBRUFGLFNBQU1HLE9BQU4sQ0FBYyxVQUFTQyxJQUFULEVBQWU7QUFDNUJGLG1CQUFlRSxLQUFLQyxRQUFMLENBQWMsRUFBZCxDQUFmOztBQUdBLFFBQUlILGFBQWFILE1BQWIsSUFBdUIsQ0FBM0IsRUFBOEJHLGVBQWUsTUFBTUEsWUFBckI7O0FBRTlCRCxXQUFPQyxZQUFQO0FBQ0EsSUFQRDs7QUFTQSxVQUFPSSxTQUFTTCxHQUFULEVBQWMsRUFBZCxDQUFQO0FBQ0E7OztnQ0FTb0JNLE0sRUFBUUMsVyxFQUFhO0FBQ3pDQSxpQkFBY0EsZUFBZSxDQUE3Qjs7QUFFQSxPQUFJQyxZQUFZRixPQUFPRixRQUFQLENBQWdCLEVBQWhCLENBQWhCOztBQUVBLE9BQUlJLFVBQVVWLE1BQVYsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDekJVLGdCQUFZLE1BQU1BLFNBQWxCO0FBQ0E7O0FBR0QsT0FBSUMsV0FBV0QsVUFBVUUsS0FBVixDQUFnQixPQUFoQixDQUFmOztBQUdBRCxjQUFXQSxTQUFTaEMsR0FBVCxDQUFhO0FBQUEsV0FBUTRCLFNBQVNNLElBQVQsRUFBZSxFQUFmLENBQVI7QUFBQSxJQUFiLENBQVg7O0FBR0EsT0FBSUYsU0FBU1gsTUFBVCxHQUFrQlMsV0FBdEIsRUFBbUM7QUFDbEMsV0FBT0EsY0FBY0UsU0FBU1gsTUFBdkIsR0FBZ0MsQ0FBdkMsRUFBMEM7QUFDekNXLGNBQVNHLE9BQVQsQ0FBaUIsQ0FBakI7QUFDQTtBQUNEOztBQUVELFVBQU9ILFFBQVA7QUFDQTs7Ozs7O0FBR0ZJLFFBQVF6QyxLQUFSLEdBQWdCQSxLQUFoQiIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFV0aWxzIHtcblxuXHRzdGF0aWMgdmVyc2lvbigpIHtcblx0XHRyZXR1cm4gQ29uc3RhbnRzLlZFUlNJT047XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydCBhIHN0cmluZyB0byBhbiBhcnJheSBvZiBieXRlc1xuXHQgKiBAcGFyYW0ge3N0cmluZ31cblx0ICogQHJldHVybnMge2FycmF5fVxuXHQgKi9cblx0c3RhdGljIHN0cmluZ1RvQnl0ZXMoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5zcGxpdCgnJykubWFwKGNoYXIgPT4gY2hhci5jaGFyQ29kZUF0KCkpXG5cdH1cblxuXHRzdGF0aWMgaXNOdW1lcmljKG4pIHtcblx0XHRyZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmIGlzRmluaXRlKG4pXG5cdH1cblxuXHQvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb3JyZWN0IE1JREkgbnVtYmVyIGZvciB0aGUgc3BlY2lmaWVkIHBpdGNoLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nL251bWJlcn0gJ0MjNCcgb3IgbWlkaSBub3RlIGNvZGVcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgIHN0YXRpYyBnZXRQaXRjaChwaXRjaCkge1xuICAgICBcdGlmICh0aGlzLmlzTnVtZXJpYyhwaXRjaCkpIHtcbiAgICAgXHRcdGlmIChwaXRjaCA+PSAwICYmIHBpdGNoIDw9IDEyNykgY29uc29sZS5lcnJvcihwaXRjaCArICcgaXMgbm90IHdpdGhpbiBNSURJIG5vdGUgcmFuZ2UgKDAtMTI3KS4nKTtcbiAgICAgXHRcdHJldHVybiBwaXRjaDtcbiAgICAgXHR9XG5cbiBcdFx0Ly8gQ2hhbmdlIGxldHRlciB0byB1cHBlcmNhc2VcbiBcdFx0cGl0Y2ggPSBwaXRjaC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHBpdGNoLnN1YnN0cmluZygxKTtcbiBcdFx0cmV0dXJuIENvbnN0YW50cy5OT1RFU1twaXRjaF07XG4gICAgIH1cblxuXG5cdC8qKlxuXHQgKiBUcmFuc2xhdGVzIG51bWJlciBvZiB0aWNrcyB0byBNSURJIHRpbWVzdGFtcCBmb3JtYXQsIHJldHVybmluZyBhbiBhcnJheSBvZlxuXHQgKiBoZXggc3RyaW5ncyB3aXRoIHRoZSB0aW1lIHZhbHVlcy4gTWlkaSBoYXMgYSB2ZXJ5IHBhcnRpY3VsYXIgdGltZSB0byBleHByZXNzIHRpbWUsXG5cdCAqIHRha2UgYSBnb29kIGxvb2sgYXQgdGhlIHNwZWMgYmVmb3JlIGV2ZXIgdG91Y2hpbmcgdGhpcyBmdW5jdGlvbi5cblx0ICogVGhhbmtzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9zZXJnaS9qc21pZGlcblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IE51bWJlciBvZiB0aWNrcyB0byBiZSB0cmFuc2xhdGVkXG5cdCAqIEByZXR1cm5zIHthcnJheX0gb2YgYnl0ZXMgdGhhdCBmb3JtIHRoZSBNSURJIHRpbWUgdmFsdWVcblx0ICovXG5cdHN0YXRpYyBudW1iZXJUb1ZhcmlhYmxlTGVuZ3RoKHRpY2tzKSB7XG5cdCAgICB2YXIgYnVmZmVyID0gdGlja3MgJiAweDdGO1xuXG5cdCAgICB3aGlsZSAodGlja3MgPSB0aWNrcyA+PiA3KSB7XG5cdCAgICAgICAgYnVmZmVyIDw8PSA4O1xuXHQgICAgICAgIGJ1ZmZlciB8PSAoKHRpY2tzICYgMHg3RikgfCAweDgwKTtcblx0ICAgIH1cblxuXHQgICAgdmFyIGJMaXN0ID0gW107XG5cdCAgICB3aGlsZSAodHJ1ZSkge1xuXHQgICAgICAgIGJMaXN0LnB1c2goYnVmZmVyICYgMHhmZik7XG5cblx0ICAgICAgICBpZiAoYnVmZmVyICYgMHg4MCkgYnVmZmVyID4+PSA4XG5cdCAgICAgICAgZWxzZSB7IGJyZWFrOyB9XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBiTGlzdDtcblx0fVxuXG5cdHN0YXRpYyBzdHJpbmdCeXRlQ291bnQocykge1xuXHRcdHJldHVybiBlbmNvZGVVUkkocykuc3BsaXQoLyUuLnwuLykubGVuZ3RoIC0gMVxuXHR9XG5cblx0LyoqXG5cdCAqIFV0aWxpdHkgZnVuY3Rpb24gdG8gZ2V0IGFuIGludCBmcm9tIGFuIGFycmF5IG9mIGJ5dGVzLlxuXHQgKiBAcGFyYW0ge2FycmF5fSBieXRlc1xuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIG51bWJlckZyb21CeXRlcyhieXRlcykge1xuXHRcdHZhciBoZXggPSAnJztcblx0XHR2YXIgc3RyaW5nUmVzdWx0O1xuXG5cdFx0Ynl0ZXMuZm9yRWFjaChmdW5jdGlvbihieXRlKSB7XG5cdFx0XHRzdHJpbmdSZXN1bHQgPSBieXRlLnRvU3RyaW5nKDE2KTtcblxuXHRcdFx0Ly8gZW5zdXJlIHN0cmluZyBpcyAyIGNoYXJzXG5cdFx0XHRpZiAoc3RyaW5nUmVzdWx0Lmxlbmd0aCA9PSAxKSBzdHJpbmdSZXN1bHQgPSBcIjBcIiArIHN0cmluZ1Jlc3VsdFxuXG5cdFx0XHRoZXggKz0gc3RyaW5nUmVzdWx0O1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHBhcnNlSW50KGhleCwgMTYpO1xuXHR9XG5cblxuXHQvKipcblx0ICogVGFrZXMgYSBudW1iZXIgYW5kIHNwbGl0cyBpdCB1cCBpbnRvIGFuIGFycmF5IG9mIGJ5dGVzLiAgQ2FuIGJlIHBhZGRlZCBieSBwYXNzaW5nIGEgbnVtYmVyIHRvIGJ5dGVzTmVlZGVkXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJcblx0ICogQHBhcmFtIHtudW1iZXJ9IGJ5dGVzTmVlZGVkXG5cdCAqIEByZXR1cm5zIHthcnJheX0gb2YgYnl0ZXNcblx0ICovXG5cdHN0YXRpYyBudW1iZXJUb0J5dGVzKG51bWJlciwgYnl0ZXNOZWVkZWQpIHtcblx0XHRieXRlc05lZWRlZCA9IGJ5dGVzTmVlZGVkIHx8IDE7XG5cblx0XHR2YXIgaGV4U3RyaW5nID0gbnVtYmVyLnRvU3RyaW5nKDE2KTtcblxuXHRcdGlmIChoZXhTdHJpbmcubGVuZ3RoICYgMSkgeyAvLyBNYWtlIHN1cmUgaGV4IHN0cmluZyBpcyBldmVuIG51bWJlciBvZiBjaGFyc1xuXHRcdFx0aGV4U3RyaW5nID0gJzAnICsgaGV4U3RyaW5nO1xuXHRcdH1cblxuXHRcdC8vIFNwbGl0IGhleCBzdHJpbmcgaW50byBhbiBhcnJheSBvZiB0d28gY2hhciBlbGVtZW50c1xuXHRcdHZhciBoZXhBcnJheSA9IGhleFN0cmluZy5tYXRjaCgvLnsyfS9nKTtcblxuXHRcdC8vIE5vdyBwYXJzZSB0aGVtIG91dCBhcyBpbnRlZ2Vyc1xuXHRcdGhleEFycmF5ID0gaGV4QXJyYXkubWFwKGl0ZW0gPT4gcGFyc2VJbnQoaXRlbSwgMTYpKVxuXG5cdFx0Ly8gUHJlcGVuZCBlbXB0eSBieXRlcyBpZiB3ZSBkb24ndCBoYXZlIGVub3VnaFxuXHRcdGlmIChoZXhBcnJheS5sZW5ndGggPCBieXRlc05lZWRlZCkge1xuXHRcdFx0d2hpbGUgKGJ5dGVzTmVlZGVkIC0gaGV4QXJyYXkubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRoZXhBcnJheS51bnNoaWZ0KDApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBoZXhBcnJheTtcblx0fVxufVxuXG5leHBvcnRzLlV0aWxzID0gVXRpbHM7Il19
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VexFlow = function () {
	function VexFlow() {
		_classCallCheck(this, VexFlow);
	}

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
						pitches.push(this.convertPitch(key));
					});
				} else if (tickable.noteType === 'r') {
					wait = this.convertDuration(tickable);
					return;
				}

				track.addEvent(new NoteEvent({ pitch: pitches, duration: this.convertDuration(voice.tickables[i]), wait: wait }));

				wait = 0;
			});

			return track;
		}
	}, {
		key: 'convertPitch',
		value: function convertPitch(pitch) {
			return pitch.replace('/', '');
		}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZleGZsb3cuanMiXSwibmFtZXMiOlsiVmV4RmxvdyIsInZvaWNlIiwidHJhY2siLCJUcmFjayIsIndhaXQiLCJwaXRjaGVzIiwidGlja2FibGVzIiwiZm9yRWFjaCIsInRpY2thYmxlIiwiaSIsIm5vdGVUeXBlIiwibm90ZXMiLCJrZXlzIiwia2V5IiwicHVzaCIsImNvbnZlcnRQaXRjaCIsImNvbnZlcnREdXJhdGlvbiIsImFkZEV2ZW50IiwiTm90ZUV2ZW50IiwicGl0Y2giLCJkdXJhdGlvbiIsInJlcGxhY2UiLCJub3RlIiwiaXNEb3R0ZWQiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBTUEsTztBQUVMLG9CQUFjO0FBQUE7QUFFYjs7OztpQ0FNY0MsSyxFQUFPO0FBQ3JCLE9BQUlDLFFBQVEsSUFBSUMsS0FBSixFQUFaO0FBQ0EsT0FBSUMsSUFBSjtBQUNBLE9BQUlDLFVBQVUsRUFBZDs7QUFFQUosU0FBTUssU0FBTixDQUFnQkMsT0FBaEIsQ0FBd0IsVUFBU0MsUUFBVCxFQUFtQkMsQ0FBbkIsRUFBc0I7QUFDN0NKLGNBQVUsRUFBVjs7QUFFQSxRQUFJRyxTQUFTRSxRQUFULEtBQXNCLEdBQTFCLEVBQStCO0FBQzlCQyxXQUFNRixDQUFOLEVBQVNHLElBQVQsQ0FBY0wsT0FBZCxDQUFzQixVQUFTTSxHQUFULEVBQWM7QUFFbkNSLGNBQVFTLElBQVIsQ0FBYSxLQUFLQyxZQUFMLENBQWtCRixHQUFsQixDQUFiO0FBQ0EsTUFIRDtBQUtBLEtBTkQsTUFNTyxJQUFJTCxTQUFTRSxRQUFULEtBQXNCLEdBQTFCLEVBQStCO0FBRXJDTixZQUFPLEtBQUtZLGVBQUwsQ0FBcUJSLFFBQXJCLENBQVA7QUFDQTtBQUNBOztBQUVETixVQUFNZSxRQUFOLENBQWUsSUFBSUMsU0FBSixDQUFjLEVBQUNDLE9BQU9kLE9BQVIsRUFBaUJlLFVBQVUsS0FBS0osZUFBTCxDQUFxQmYsTUFBTUssU0FBTixDQUFnQkcsQ0FBaEIsQ0FBckIsQ0FBM0IsRUFBcUVMLE1BQU1BLElBQTNFLEVBQWQsQ0FBZjs7QUFHQUEsV0FBTyxDQUFQO0FBQ0EsSUFuQkQ7O0FBcUJBLFVBQU9GLEtBQVA7QUFDQTs7OytCQU9ZaUIsSyxFQUFPO0FBQ25CLFVBQU9BLE1BQU1FLE9BQU4sQ0FBYyxHQUFkLEVBQW1CLEVBQW5CLENBQVA7QUFDQTs7O2tDQU9lQyxJLEVBQU07QUFDckIsV0FBUUEsS0FBS0YsUUFBYjtBQUNDLFNBQUssR0FBTDtBQUNDLFlBQU8sR0FBUDtBQUNELFNBQUssR0FBTDtBQUNDLFlBQU9FLEtBQUtDLFFBQUwsS0FBa0IsSUFBbEIsR0FBeUIsR0FBaEM7QUFDRCxTQUFLLEdBQUw7QUFDQyxZQUFPRCxLQUFLQyxRQUFMLEtBQWtCLElBQWxCLEdBQXlCLEdBQWhDO0FBQ0QsU0FBSyxHQUFMO0FBQ0MsWUFBT0QsS0FBS0MsUUFBTCxLQUFrQixJQUFsQixHQUF5QixHQUFoQztBQVJGOztBQVdBLFVBQU9ELEtBQUtGLFFBQVo7QUFDQTs7Ozs7O0FBR0ZJLFFBQVF4QixPQUFSLEdBQWtCQSxPQUFsQiIsImZpbGUiOiJ2ZXhmbG93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVmV4RmxvdyB7XG5cdFxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHQvLyBjb2RlLi4uXG5cdH1cblxuXHQvKipcblx0ICogU3VwcG9ydCBmb3IgY29udmVydGluZyBWZXhGbG93IHZvaWNlIGludG8gTWlkaVdyaXRlckpTIHRyYWNrXG5cdCAqIEByZXR1cm4gTWlkaVdyaXRpZXIuVHJhY2sgb2JqZWN0XG5cdCAqL1xuXHR0cmFja0Zyb21Wb2ljZSh2b2ljZSkge1xuXHRcdHZhciB0cmFjayA9IG5ldyBUcmFjaygpO1xuXHRcdHZhciB3YWl0O1xuXHRcdHZhciBwaXRjaGVzID0gW107XG5cblx0XHR2b2ljZS50aWNrYWJsZXMuZm9yRWFjaChmdW5jdGlvbih0aWNrYWJsZSwgaSkge1xuXHRcdFx0cGl0Y2hlcyA9IFtdO1xuXG5cdFx0XHRpZiAodGlja2FibGUubm90ZVR5cGUgPT09ICduJykge1xuXHRcdFx0XHRub3Rlc1tpXS5rZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG5cdFx0XHRcdFx0Ly8gYnVpbGQgYXJyYXkgb2YgcGl0Y2hlc1xuXHRcdFx0XHRcdHBpdGNoZXMucHVzaCh0aGlzLmNvbnZlcnRQaXRjaChrZXkpKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0gZWxzZSBpZiAodGlja2FibGUubm90ZVR5cGUgPT09ICdyJykge1xuXHRcdFx0XHQvLyBtb3ZlIG9uIHRvIHRoZSBuZXh0IHRpY2thYmxlIGFuZCB1c2UgdGhpcyByZXN0IGFzIGEgYHdhaXRgIHByb3BlcnR5IGZvciB0aGUgbmV4dCBldmVudFxuXHRcdFx0XHR3YWl0ID0gdGhpcy5jb252ZXJ0RHVyYXRpb24odGlja2FibGUpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRyYWNrLmFkZEV2ZW50KG5ldyBOb3RlRXZlbnQoe3BpdGNoOiBwaXRjaGVzLCBkdXJhdGlvbjogdGhpcy5jb252ZXJ0RHVyYXRpb24odm9pY2UudGlja2FibGVzW2ldKSwgd2FpdDogd2FpdH0pKTtcblx0XHRcdFxuXHRcdFx0Ly8gcmVzZXQgd2FpdFxuXHRcdFx0d2FpdCA9IDA7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdHJhY2s7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBWZXhGbG93IHBpdGNoIHN5bnRheCB0byBNaWRpV3JpdGVySlMgc3ludGF4XG5cdCAqIEBwYXJhbSBwaXRjaCBzdHJpbmdcblx0ICovXG5cdGNvbnZlcnRQaXRjaChwaXRjaCkge1xuXHRcdHJldHVybiBwaXRjaC5yZXBsYWNlKCcvJywgJycpO1xuXHR9IFxuXG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIFZleEZsb3cgZHVyYXRpb24gc3ludGF4IHRvIE1pZGlXcml0ZXJKUyBzeW50YXhcblx0ICogQHBhcmFtIG5vdGUgc3RydWN0IGZyb20gVmV4Rmxvd1xuXHQgKi9cblx0Y29udmVydER1cmF0aW9uKG5vdGUpIHtcblx0XHRzd2l0Y2ggKG5vdGUuZHVyYXRpb24pIHtcblx0XHRcdGNhc2UgJ3cnOlxuXHRcdFx0XHRyZXR1cm4gJzEnO1xuXHRcdFx0Y2FzZSAnaCc6XG5cdFx0XHRcdHJldHVybiBub3RlLmlzRG90dGVkKCkgPyAnZDInIDogJzInO1xuXHRcdFx0Y2FzZSAncSc6XG5cdFx0XHRcdHJldHVybiBub3RlLmlzRG90dGVkKCkgPyAnZDQnIDogJzQnO1xuXHRcdFx0Y2FzZSAnOCc6XG5cdFx0XHRcdHJldHVybiBub3RlLmlzRG90dGVkKCkgPyAnZDgnIDogJzgnO1xuXHRcdH1cblxuXHRcdHJldHVybiBub3RlLmR1cmF0aW9uO1xuXHR9O1xufVxuXG5leHBvcnRzLlZleEZsb3cgPSBWZXhGbG93OyJdfQ==
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Writer = function () {
	function Writer(tracks) {
		_classCallCheck(this, Writer);

		this.data = [];

		var trackType = tracks.length > 1 ? Constants.HEADER_CHUNK_FORMAT1 : Constants.HEADER_CHUNK_FORMAT0;
		var numberOfTracks = Utils.numberToBytes(tracks.length, 2);
		this.data.push(new Chunk({
			type: Constants.HEADER_CHUNK_TYPE,
			data: trackType.concat(numberOfTracks, Constants.HEADER_CHUNK_DIVISION) }));

		tracks.forEach(function (track, i) {
			track.addEvent(new MetaEvent({ data: Constants.META_END_OF_TRACK_ID }));
			this.data.push(track);
		}, this);
	}

	_createClass(Writer, [{
		key: 'buildFile',
		value: function buildFile() {
			var build = [];

			this.data.forEach(function (d) {
				return build = build.concat(d.type, d.size, d.data);
			});

			return new Uint8Array(build);
		}
	}, {
		key: 'base64',
		value: function base64() {
			if (typeof btoa === 'function') return btoa(String.fromCharCode.apply(null, this.buildFile()));
			return new Buffer(this.buildFile()).toString('base64');
		}
	}, {
		key: 'dataUri',
		value: function dataUri() {
			return 'data:audio/midi;base64,' + this.base64();
		}
	}]);

	return Writer;
}();

exports.Writer = Writer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndyaXRlci5qcyJdLCJuYW1lcyI6WyJXcml0ZXIiLCJ0cmFja3MiLCJkYXRhIiwidHJhY2tUeXBlIiwibGVuZ3RoIiwiQ29uc3RhbnRzIiwiSEVBREVSX0NIVU5LX0ZPUk1BVDEiLCJIRUFERVJfQ0hVTktfRk9STUFUMCIsIm51bWJlck9mVHJhY2tzIiwiVXRpbHMiLCJudW1iZXJUb0J5dGVzIiwicHVzaCIsIkNodW5rIiwidHlwZSIsIkhFQURFUl9DSFVOS19UWVBFIiwiY29uY2F0IiwiSEVBREVSX0NIVU5LX0RJVklTSU9OIiwiZm9yRWFjaCIsInRyYWNrIiwiaSIsImFkZEV2ZW50IiwiTWV0YUV2ZW50IiwiTUVUQV9FTkRfT0ZfVFJBQ0tfSUQiLCJidWlsZCIsImQiLCJzaXplIiwiVWludDhBcnJheSIsImJ0b2EiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJhcHBseSIsImJ1aWxkRmlsZSIsIkJ1ZmZlciIsInRvU3RyaW5nIiwiYmFzZTY0IiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU1BLE07QUFPTCxpQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNuQixPQUFLQyxJQUFMLEdBQVksRUFBWjs7QUFFQSxNQUFJQyxZQUFZRixPQUFPRyxNQUFQLEdBQWdCLENBQWhCLEdBQW9CQyxVQUFVQyxvQkFBOUIsR0FBcURELFVBQVVFLG9CQUEvRTtBQUNBLE1BQUlDLGlCQUFpQkMsTUFBTUMsYUFBTixDQUFvQlQsT0FBT0csTUFBM0IsRUFBbUMsQ0FBbkMsQ0FBckI7QUFHQSxPQUFLRixJQUFMLENBQVVTLElBQVYsQ0FBZSxJQUFJQyxLQUFKLENBQVU7QUFDbkJDLFNBQU1SLFVBQVVTLGlCQURHO0FBRW5CWixTQUFNQyxVQUFVWSxNQUFWLENBQWlCUCxjQUFqQixFQUFpQ0gsVUFBVVcscUJBQTNDLENBRmEsRUFBVixDQUFmOztBQUtBZixTQUFPZ0IsT0FBUCxDQUFlLFVBQVNDLEtBQVQsRUFBZ0JDLENBQWhCLEVBQW1CO0FBQ2pDRCxTQUFNRSxRQUFOLENBQWUsSUFBSUMsU0FBSixDQUFjLEVBQUNuQixNQUFNRyxVQUFVaUIsb0JBQWpCLEVBQWQsQ0FBZjtBQUNBLFFBQUtwQixJQUFMLENBQVVTLElBQVYsQ0FBZU8sS0FBZjtBQUNBLEdBSEQsRUFHRyxJQUhIO0FBSUE7Ozs7OEJBTVc7QUFDWCxPQUFJSyxRQUFRLEVBQVo7O0FBR0EsUUFBS3JCLElBQUwsQ0FBVWUsT0FBVixDQUFrQixVQUFDTyxDQUFEO0FBQUEsV0FBT0QsUUFBUUEsTUFBTVIsTUFBTixDQUFhUyxFQUFFWCxJQUFmLEVBQXFCVyxFQUFFQyxJQUF2QixFQUE2QkQsRUFBRXRCLElBQS9CLENBQWY7QUFBQSxJQUFsQjs7QUFFQSxVQUFPLElBQUl3QixVQUFKLENBQWVILEtBQWYsQ0FBUDtBQUNBOzs7MkJBT1E7QUFDUixPQUFJLE9BQU9JLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0MsT0FBT0EsS0FBS0MsT0FBT0MsWUFBUCxDQUFvQkMsS0FBcEIsQ0FBMEIsSUFBMUIsRUFBZ0MsS0FBS0MsU0FBTCxFQUFoQyxDQUFMLENBQVA7QUFDaEMsVUFBTyxJQUFJQyxNQUFKLENBQVcsS0FBS0QsU0FBTCxFQUFYLEVBQTZCRSxRQUE3QixDQUFzQyxRQUF0QyxDQUFQO0FBQ0E7Ozs0QkFPWTtBQUNULFVBQU8sNEJBQTRCLEtBQUtDLE1BQUwsRUFBbkM7QUFDQTs7Ozs7O0FBR0xDLFFBQVFuQyxNQUFSLEdBQWlCQSxNQUFqQiIsImZpbGUiOiJ3cml0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBXcml0ZXIge1xuXHQvL2RhdGE6IENodW5rW10gJiBUcmFja1tdO1xuXG5cdC8qKlxuXHQgKiBPYmplY3QgdGhhdCBwdXRzIHRvZ2V0aGVyIHRyYWNrcyBhbmQgcHJvdmlkZXMgbWV0aG9kcyBmb3IgZmlsZSBvdXRwdXQuXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBNaWRpV3JpdGVyLlRyYWNrXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcih0cmFja3MpIHtcblx0XHR0aGlzLmRhdGEgPSBbXTtcblxuXHRcdHZhciB0cmFja1R5cGUgPSB0cmFja3MubGVuZ3RoID4gMSA/IENvbnN0YW50cy5IRUFERVJfQ0hVTktfRk9STUFUMSA6IENvbnN0YW50cy5IRUFERVJfQ0hVTktfRk9STUFUMDtcblx0XHR2YXIgbnVtYmVyT2ZUcmFja3MgPSBVdGlscy5udW1iZXJUb0J5dGVzKHRyYWNrcy5sZW5ndGgsIDIpOyAvLyB0d28gYnl0ZXMgbG9uZ1xuXG5cdFx0Ly8gSGVhZGVyIGNodW5rXG5cdFx0dGhpcy5kYXRhLnB1c2gobmV3IENodW5rKHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBDb25zdGFudHMuSEVBREVSX0NIVU5LX1RZUEUsXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YTogdHJhY2tUeXBlLmNvbmNhdChudW1iZXJPZlRyYWNrcywgQ29uc3RhbnRzLkhFQURFUl9DSFVOS19ESVZJU0lPTil9KSk7XG5cblx0XHQvLyBUcmFjayBjaHVua3Ncblx0XHR0cmFja3MuZm9yRWFjaChmdW5jdGlvbih0cmFjaywgaSkge1xuXHRcdFx0dHJhY2suYWRkRXZlbnQobmV3IE1ldGFFdmVudCh7ZGF0YTogQ29uc3RhbnRzLk1FVEFfRU5EX09GX1RSQUNLX0lEfSkpO1xuXHRcdFx0dGhpcy5kYXRhLnB1c2godHJhY2spO1xuXHRcdH0sIHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkcyB0aGUgZmlsZSBpbnRvIGEgVWludDhBcnJheVxuXHQgKiBAcmV0dXJucyBVaW50OEFycmF5XG5cdCAqL1xuXHRidWlsZEZpbGUoKSB7XG5cdFx0dmFyIGJ1aWxkID0gW107XG5cblx0XHQvLyBEYXRhIGNvbnNpc3RzIG9mIGNodW5rcyB3aGljaCBjb25zaXN0cyBvZiBkYXRhXG5cdFx0dGhpcy5kYXRhLmZvckVhY2goKGQpID0+IGJ1aWxkID0gYnVpbGQuY29uY2F0KGQudHlwZSwgZC5zaXplLCBkLmRhdGEpKTtcblxuXHRcdHJldHVybiBuZXcgVWludDhBcnJheShidWlsZCk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0IGZpbGUgYnVmZmVyIHRvIGEgYmFzZTY0IHN0cmluZy4gIERpZmZlcmVudCBtZXRob2RzIGRlcGVuZGluZyBvbiBpZiBicm93c2VyIG9yIG5vZGUuXG5cdCAqXG5cdCAqL1xuXHRiYXNlNjQoKSB7XG5cdFx0aWYgKHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSByZXR1cm4gYnRvYShTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIHRoaXMuYnVpbGRGaWxlKCkpKTtcdFx0XG5cdFx0cmV0dXJuIG5ldyBCdWZmZXIodGhpcy5idWlsZEZpbGUoKSkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuXHR9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGF0YSBVUkkuXG4gICAgICpcbiAgICAgKi9cbiAgICBkYXRhVXJpKCkge1xuICAgIFx0cmV0dXJuICdkYXRhOmF1ZGlvL21pZGk7YmFzZTY0LCcgKyB0aGlzLmJhc2U2NCgpO1xuICAgIH1cbn1cblxuZXhwb3J0cy5Xcml0ZXIgPSBXcml0ZXI7Il19
