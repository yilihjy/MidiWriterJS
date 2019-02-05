var MidiWriter = require('..');

var track1 = new MidiWriter.Track();

track1.addEvent([
			new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
			new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
			new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
			new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
			new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8'}),
			new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
			new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'})
	], function(event, index) {
    return {sequential:true};
  }
);

var track2 = new MidiWriter.Track();

track2.addEvent([
			new MidiWriter.NoteEvent({pitch: ['G4'], duration: '1'})
	]
);

track1.mergeTrack(track2);

var write = new MidiWriter.Writer([track1]);
//console.log(track);
//console.log(write.base64())
console.log(write.dataUri());

module.exports = write.dataUri();