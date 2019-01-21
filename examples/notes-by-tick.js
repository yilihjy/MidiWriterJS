var MidiWriter = require('..');

var track = new MidiWriter.Track();

track.addEvent([
			new MidiWriter.NoteEvent({
				pitch: 'E4',
				duration: '1',
				startTick: 30
			}),
			new MidiWriter.NoteEvent({
				pitch: 'C4',
				duration: '4',
				startTick: 20
			}),
	]
);

var write = new MidiWriter.Writer([track]);
//console.log(track);
console.log(write.dataUri());
module.exports = write.dataUri();