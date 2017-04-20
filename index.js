var MidiWriter = require('./build/index');
var track = new MidiWriter.Track();
track.addEvent(new MidiWriter.NoteEvent({pitch: ['C4'], duration: '4'}));

var write = new MidiWriter.Writer([track]);
console.log(write.buildFile());
//write.stdout();