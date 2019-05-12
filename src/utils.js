import {Constants} from './constants';
import {toMidi} from 'tonal-midi';

/**
 * Static utility functions used throughout the library.
 */
class Utils {

	/**
	 * Gets MidiWriterJS version number.
	 * @return {string}
	 */
	static version() {
		return Constants.VERSION;
	}

	/**
	 * Convert a string to an array of bytes
	 * @param {string} string
	 * @return {array}
	 */
	static stringToBytes(string) {
		return string.split('').map(char => char.charCodeAt())
	}

	/**
	 * Checks if argument is a valid number.
	 * @param {*} n - Value to check
	 * @return {boolean}
	 */
	static isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n)
	}

	/**
     * Returns the correct MIDI number for the specified pitch.
     * Uses Tonal Midi - https://github.com/danigb/tonal/tree/master/packages/midi
     * @param {(string|number)} pitch - 'C#4' or midi note code
     * @return {number}
     */
     static getPitch(pitch) {
     	return toMidi(pitch);
     }

	/**
	 * Translates number of ticks to MIDI timestamp format, returning an array of
	 * hex strings with the time values. Midi has a very particular time to express time,
	 * take a good look at the spec before ever touching this function.
	 * Thanks to https://github.com/sergi/jsmidi
	 *
	 * @param {number} ticks - Number of ticks to be translated
	 * @return {array} - Bytes that form the MIDI time value
	 */
	static numberToVariableLength(ticks) {
	    var buffer = ticks & 0x7F;

	    while (ticks = ticks >> 7) {
	        buffer <<= 8;
	        buffer |= ((ticks & 0x7F) | 0x80);
	    }

	    var bList = [];
	    while (true) {
	        bList.push(buffer & 0xff);

	        if (buffer & 0x80) buffer >>= 8
	        else { break; }
	    }

	    return bList;
	}

	/**
	 * Counts number of bytes in string
	 * @param {string} s
	 * @return {array}
	 */
	static stringByteCount(s) {
		return encodeURI(s).split(/%..|./).length - 1
	}

	/**
	 * Get an int from an array of bytes.
	 * @param {array} bytes
	 * @return {number}
	 */
	static numberFromBytes(bytes) {
		var hex = '';
		var stringResult;

		bytes.forEach((byte) => {
			stringResult = byte.toString(16);

			// ensure string is 2 chars
			if (stringResult.length == 1) stringResult = "0" + stringResult

			hex += stringResult;
		});

		return parseInt(hex, 16);
	}

	/**
	 * Takes a number and splits it up into an array of bytes.  Can be padded by passing a number to bytesNeeded
	 * @param {number} number
	 * @param {number} bytesNeeded
	 * @return {array} - Array of bytes
	 */
	static numberToBytes(number, bytesNeeded) {
		bytesNeeded = bytesNeeded || 1;

		var hexString = number.toString(16);

		if (hexString.length & 1) { // Make sure hex string is even number of chars
			hexString = '0' + hexString;
		}

		// Split hex string into an array of two char elements
		var hexArray = hexString.match(/.{2}/g);

		// Now parse them out as integers
		hexArray = hexArray.map(item => parseInt(item, 16))

		// Prepend empty bytes if we don't have enough
		if (hexArray.length < bytesNeeded) {
			while (bytesNeeded - hexArray.length > 0) {
				hexArray.unshift(0);
			}
		}

		return hexArray;
	}

	/**	
	 * Converts value to array if needed.
	 * @param {string} value
	 * @return {array}
	 */
	static toArray(value) {
		if (Array.isArray(value)) return value;
		return [value];
	}

	/**
	 * Converts velocity to value 0-127
	 * @param {number} velocity - Velocity value 1-100
	 * @return {number}
	 */
	static convertVelocity(velocity) {
		// Max passed value limited to 100
		velocity = velocity > 100 ? 100 : velocity;
		return Math.round(velocity / 100 * 127);
	};

	/**
	 * Gets the total number of ticks of a specified duration.
	 * Note: type=='note' defaults to quarter note, type==='rest' defaults to 0
	 * @param {(string|array)} duration
	 * @return {number}
	 */
	static getTickDuration(duration) {
		if (Array.isArray(duration)) {
			// Recursively execute this method for each item in the array and return the sum of tick durations.
			return duration.map((value) => {
				return Utils.getTickDuration(value);
			}).reduce((a, b) => {
				return a + b;
			}, 0);
		}

		duration = duration.toString();

		if (duration.toLowerCase().charAt(0) === 't') {
			// If duration starts with 't' then the number that follows is an explicit tick count
			return parseInt(duration.substring(1));
		}

		// Need to apply duration here.  Quarter note == Constants.HEADER_CHUNK_DIVISION
		// Rounding only applies to triplets, which the remainder is handled below
		var quarterTicks = Utils.numberFromBytes(Constants.HEADER_CHUNK_DIVISION);
		return Math.round(quarterTicks * Utils.getDurationMultiplier(duration));
	}

	/**
	 * Gets what to multiple ticks/quarter note by to get the specified duration.
	 * Note: type=='note' defaults to quarter note, type==='rest' defaults to 0
	 * @param {string} duration
	 * @return {number}
	 */
	static getDurationMultiplier(duration) {
		// Need to apply duration here.  Quarter note == Constants.HEADER_CHUNK_DIVISION
		switch (duration) {
			case '0':
				return 0;
			case '1':
				return 4;
			case '2':
				return 2;
			case 'd2': // Dotted half
				return 3;
			case 'dd2': // Double dotted half
				return 3.5;
			case '4':
				return 1;
			case '4t':
				return 0.666;
			case 'd4': // Dotted quarter
				return 1.5;
			case 'dd4': // Double dotted quarter
				return 1.75;
			case '8':
				return 0.5;
			case '8t':
				// For 8th triplets, let's divide a quarter by 3, round to the nearest int, and substract the remainder to the last one.
				return 0.33;
			case 'd8': // Dotted eighth
				return 0.75;
			case 'dd8': // Double dotted eighth
				return 0.875;
			case '16':
				return 0.25;
			case '16t':
				return 0.166;
			case '32':
				return 0.125;
			case '64':
				return 0.0625;
			default:
				// Notes default to a quarter, rests default to 0
				//return type === 'note' ? 1 : 0;
		}

		throw duration + ' is not a valid duration.';
	};
}

export {Utils};
