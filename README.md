MidiWriterJS
===============
[![Build Status](https://travis-ci.org/grimmdude/MidiWriterJS.svg?branch=master)](https://travis-ci.org/grimmdude/MidiWriterJS)

MidiWriterJS is a JavaScript library providing an API for generating expressive multi-track MIDI files.  It's still very young and is in active development.

Documentation
------------
```javascript
// Start with a new track
var track = new MidiWriter.Track();

// Define an instrument (optional):
track.addEvent(new MidiWriter.ProgramChangeEvent({instrument : 1}));

// Add some notes:
var note = new MidiWriter.NoteEvent({pitch:['C4', 'D4', 'E4'], duration: '4'});
track.addEvent.(note);


// Pass that track into an instance of `MidiWriter.Writer` and use it's methods to build the file.
var write = new MidiWriter.Writer([track]);
console.log('data:audio/midi;base64,' + write.base64());
```
#### Hot Cross Buns
Here's an example of how everyone's favorite song "Hot Cross Buns" could be written.
```javascript
var notes;
notes = new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'});
track.addEvent(notes);

notes = new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'});
track.addEvent(notes);

notes = new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'});
track.addEvent(notes);

notes = new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'});
track.addEvent(notes);

notes = new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8'});
track.addEvent(notes);

notes = new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'});
track.addEvent(notes);

notes = new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'});
track.addEvent(notes);

var write = new MidiWriter.Writer(track);
console.log('data:audio/midi;base64,' + write.base64());
```