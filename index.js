var MidiWriter = require('./build/index');
var tracks = [];
tracks[0] = new MidiWriter.Track();
tracks[0]
	.setTempo(164)
	.addEvent([new MidiWriter.NoteEvent({pitch: ['C4'], duration: '4'}),
		new MidiWriter.NoteEvent({pitch: ['C4'], duration: '4'}),
		new MidiWriter.NoteEvent({pitch: ['C4'], duration: '4'}),
		new MidiWriter.NoteEvent({pitch: ['C4'], duration: '4'})]);

var write = new MidiWriter.Writer(tracks);
//console.log(write.dataUri());
write.stdout();