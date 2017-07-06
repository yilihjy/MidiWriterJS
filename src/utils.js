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

		bytes.forEach(function(byte) {
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
}

export {Utils};
