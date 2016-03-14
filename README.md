MidiWriterJS
===============

MidiWriterJS is a JavaScript library providing an API for generating MIDI files.  It's still very young and is in active development.

```javascript
var track = new MidiWriter.Track();
var noteOn = new MidiWriter.NoteOnEvent({data: [MidiWriter.constants.NOTE_ON_STATUS, 0x3C, 0x40]});
var noteOff = new MidiWriter.NoteOffEvent({data: [MidiWriter.constants.NOTE_OFF_STATUS, 0x3C, 0x40]});

track.addEvent(noteOn);
track.addEvent(noteOff);

var write = new MidiWriter.Writer(track);
console.log('data:audio/midi;base64,' + write.base64());
```