class Writer {
	//data: Chunk[] & Track[];

	/**
	 * Object that puts together tracks and provides methods for file output.
	 * @param {object} MidiWriter.Track
	 */
	constructor(tracks) {
		this.data = [];

		var trackType = tracks.length > 1 ? Constants.HEADER_CHUNK_FORMAT1 : Constants.HEADER_CHUNK_FORMAT0;
		var numberOfTracks = Utils.numberToBytes(tracks.length, 2); // two bytes long

		// Header chunk
		this.data.push(new Chunk({
								type: Constants.HEADER_CHUNK_TYPE,
								data: trackType.concat(numberOfTracks, Constants.HEADER_CHUNK_DIVISION)}));

		// Track chunks
		tracks.forEach(function(track, i) {
			track.addEvent(new MetaEvent({data: Constants.META_END_OF_TRACK_ID}));
			this.data.push(track);
		}, this);
	}

	/**
	 * Builds the file into a Uint8Array
	 * @returns Uint8Array
	 */
	buildFile() {
		var build = [];

		// Data consists of chunks which consists of data
		this.data.forEach((d) => build = build.concat(d.type, d.size, d.data));

		return new Uint8Array(build);
	}


	/**
	 * Convert file buffer to a base64 string.  Different methods depending on if browser or node.
	 *
	 */
	base64() {
		if (typeof btoa === 'function') return btoa(String.fromCharCode.apply(null, this.buildFile()));		
		return new Buffer(this.buildFile()).toString('base64');
	}


    /**
     * Get the data URI.
     *
     */
    dataUri() {
    	return 'data:audio/midi;base64,' + this.base64();
    }
}

exports.Writer = Writer;