import {Constants} from './constants';
import {MetaEvent} from './meta-event';
import {NoteOnEvent} from './note-on-event';
import {Utils} from './utils';

/**
 * Holds all data for a track.
 * @param {object} fields {type: number, data: array, size: array, events: array}
 * @return {Track}
 */
class Track {
	constructor() {
		this.type = Constants.TRACK_CHUNK_TYPE;
		this.data = [];
		this.size = [];
		this.events = [];
		this.tickDuration = 0; // Each time an event is added this will increase
	}

	/**
	 * Adds any event type to the track.
	 * @param {(NoteEvent|MetaEvent|ProgramChangeEvent)} event - Event object.
	 * @param {function} mapFunction - Callback which can be used to apply specific properties to all events. 
	 * @return {Track}
	 */
	addEvent(event, mapFunction) {
		if (Array.isArray(event)) {
			event.forEach((e, i) => {
				// Handle map function if provided
				if (typeof mapFunction === 'function' && e.type === 'note') {
					var properties = mapFunction(i, e);

					if (typeof properties === 'object') {
						for (var j in properties) {
							switch(j) {
								case 'duration':
									e.duration = properties[j];
									break;
								case 'sequential':
									e.sequential = properties[j];
									break;
								case 'velocity':
									e.velocity = Utils.convertVelocity(properties[j]);
									break;
							}
						}		

						// Gotta rebuild that data
						//e.buildData();
					}
				}

				this.events.push(e);
			});

		} else {
			this.events.push(event);
		}

		return this;
	}

	/**
	 * Builds int array of all events.
	 * @return {Track}
	 */
	buildData() {
		this.events.forEach((event, i) => {
			//console.log(event);
			// Build event & add to total tick duration
			if (event.type === 'note') {
				// Pass previous event to buildData
				event.buildData();

				event.events.forEach((e) => {
					//console.log(e.buildData().data)
					this.data = this.data.concat(e.buildData().data);
				});

				this.tickDuration += event.restDuration + event.tickDuration;
				//this.data = this.data.concat(event.data);

			} else {
				this.data = this.data.concat(event.data);
			}

			
		});
		//console.log(this.data);
		this.size = Utils.numberToBytes(this.data.length, 4); // 4 bytes long
		//console.log('tick duration:' + this.tickDuration);
	}

	/**
	 * Sets tempo of the MIDI file.
	 * @param {number} bpm - Tempo in beats per minute.
	 * @return {Track}
	 */
	setTempo(bpm) {
		var event = new MetaEvent({data: [Constants.META_TEMPO_ID]});
		event.data.push(0x03); // Size
		var tempo = Math.round(60000000 / bpm);
		event.data = event.data.concat(Utils.numberToBytes(tempo, 3)); // Tempo, 3 bytes
		return this.addEvent(event);
	}

	/**
	 * Sets time signature.
	 * @param {number} numerator - Top number of the time signature.
	 * @param {number} denominator - Bottom number of the time signature.
	 * @param {number} midiclockspertick - Defaults to 24.
	 * @param {number} notespermidiclock - Defaults to 8.
	 * @return {Track}
	 */
	setTimeSignature(numerator, denominator, midiclockspertick, notespermidiclock) {
		midiclockspertick = midiclockspertick || 24;
		notespermidiclock = notespermidiclock || 8;
		
		var event = new MetaEvent({data: [Constants.META_TIME_SIGNATURE_ID]});
		event.data.push(0x04); // Size
		event.data = event.data.concat(Utils.numberToBytes(numerator, 1)); // Numerator, 1 bytes
		
		var _denominator = Math.log2(denominator);	// Denominator is expressed as pow of 2
		event.data = event.data.concat(Utils.numberToBytes(_denominator, 1)); // Denominator, 1 bytes
		event.data = event.data.concat(Utils.numberToBytes(midiclockspertick, 1)); // MIDI Clocks per tick, 1 bytes
		event.data = event.data.concat(Utils.numberToBytes(notespermidiclock, 1)); // Number of 1/32 notes per MIDI clocks, 1 bytes
		return this.addEvent(event);
	}

	/**
	 * Sets key signature.
	 * @param {*} sf - 
	 * @param {*} mi -
	 * @return {Track}
	 */
	setKeySignature(sf, mi) {
		var event = new MetaEvent({data: [Constants.META_KEY_SIGNATURE_ID]});
		event.data.push(0x02); // Size

		var mode = mi || 0;
		sf = sf || 0;

		//	Function called with string notation
		if (typeof mi === 'undefined') {
			var fifths = [
				['Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'],
				['ab', 'eb', 'bb', 'f', 'c', 'g', 'd', 'a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#']
			];
			var _sflen = sf.length;
			var note = sf || 'C';

			if (sf[0] === sf[0].toLowerCase()) mode = 1

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

	/**
	 * Adds text to MIDI file.
	 * @param {string} text - Text to add.
	 * @return {Track}
	 */
	addText(text) {
		var event = new MetaEvent({data: [Constants.META_TEXT_ID]});
		var stringBytes = Utils.stringToBytes(text);
		event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		return this.addEvent(event);
	}

	/**
	 * Adds copyright to MIDI file.
	 * @param {string} text - Text of copyright line.
	 * @return {Track}
	 */
	addCopyright(text) {
		var event = new MetaEvent({data: [Constants.META_COPYRIGHT_ID]});
		var stringBytes = Utils.stringToBytes(text);
		event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		return this.addEvent(event);
	}

	/**
	 * Adds Sequence/Track Name.
	 * @param {string} text - Text of track name.
	 * @return {Track}
	 */
	addTrackName(text) {
		var event = new MetaEvent({data: [Constants.META_TRACK_NAME_ID]});
		var stringBytes = Utils.stringToBytes(text);
		event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		return this.addEvent(event);
	}

	/**
	 * Sets instrument name of track.
	 * @param {string} text - Name of instrument.
	 * @return {Track}
	 */
	addInstrumentName(text) {
		var event = new MetaEvent({data: [Constants.META_INSTRUMENT_NAME_ID]});
		var stringBytes = Utils.stringToBytes(text);
		event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		return this.addEvent(event);
	}

	/**
	 * Adds marker to MIDI file.
	 * @param {string} text - Marker text.
	 * @return {Track}
	 */
	addMarker(text) {
		var event = new MetaEvent({data: [Constants.META_MARKER_ID]});
		var stringBytes = Utils.stringToBytes(text);
		event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		return this.addEvent(event);
	}

	/**
	 * Adds cue point to MIDI file.
	 * @param {string} text - Text of cue point.
	 * @return {Track}
	 */
	addCuePoint(text) {
		var event = new MetaEvent({data: [Constants.META_CUE_POINT]});
		var stringBytes = Utils.stringToBytes(text);
		event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Text
		return this.addEvent(event);
	}

	/**
	 * Adds lyric to MIDI file.
	 * @param {string} lyric - Lyric text to add.
	 * @return {Track}
	 */
	addLyric(lyric) {
		var event = new MetaEvent({data: [Constants.META_LYRIC_ID]});
		var stringBytes = Utils.stringToBytes(lyric);
		event.data = event.data.concat(Utils.numberToVariableLength(stringBytes.length)); // Size
		event.data = event.data.concat(stringBytes); // Lyric
		return this.addEvent(event);
	}

	/**
	 * Channel mode messages
	 * @return {Track}
	 */
	polyModeOn() {
		var event = new NoteOnEvent({data: [0x00, 0xB0, 0x7E, 0x00]});
		return this.addEvent(event);
	}

}

export {Track};
