&#9836; MidiWriterJS
===============
[![Build Status](https://travis-ci.org/grimmdude/MidiWriterJS.svg?branch=master)](https://travis-ci.org/grimmdude/MidiWriterJS)

MidiWriterJS is a JavaScript library providing an API for generating expressive multi-track MIDI files.  It's still young and in active development.

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

### `NoteEvent` Options
The `NoteEvent` supports a some options that will help you write more effiently.

#### pitch
An array of notes to be triggered.  Format is `C#4`.

#### duration
How long the note should sound.  Possible values are:
* ``1`` whole
* ``2`` half
* ``d2`` dotted half
* ``4`` quarter
* ``d4`` dotted quarter 
* ``8`` eighth note
* ``8t`` eighth triplet
* ``d8`` dotted eighth
* ``16`` sixteenth

#### wait
How long to wait before sounding note; this is basically a rest.  Values are the the same as for `duration`.
#### sequencial 
If `true` the notes will be played in sequence at the specified duration.  If `false` the notes will be played simultaneously for the specified duration. (*default `false`*)
#### velocity
Value 1-100 of how loud the note should sound. (*default `50`*)
#### repeat
How many times this event should be repeated. (*default `1`*)
### Hot Cross Buns
Here's an example of how everyone's favorite song "Hot Cross Buns" could be written.
```javascript
var notes;
notes = new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4', sequential: true});
track.addEvent(notes);

notes = new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'});
track.addEvent(notes);

notes = new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4', sequential: true});
track.addEvent(notes);

notes = new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'});
track.addEvent(notes);

notes = new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8', sequential: true});
track.addEvent(notes);

notes = new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4', sequential: true});
track.addEvent(notes);

notes = new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'});
track.addEvent(notes);

var write = new MidiWriter.Writer(track);
console.log('data:audio/midi;base64,' + write.base64());
```