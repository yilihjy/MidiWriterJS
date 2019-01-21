var MidiWriter = require('..');

var track = new MidiWriter.Track();

track.addEvent([
			new MidiWriter.NoteEvent({
				pitch: 'E4',
				duration: '4',
				startTick: 644
			}),
			//new MidiWriter.NoteEvent({pitch: 'E4', duration: '4', startTick: 54}),
	]
);

var write = new MidiWriter.Writer([track]);
//console.log(track);
console.log(write.dataUri());
module.exports = write.dataUri();