&#9836; MidiWriterJS
===============
[![npm version](https://badge.fury.io/js/midi-writer-js.svg)](https://badge.fury.io/js/midi-writer-js)
[![Build Status](https://travis-ci.org/grimmdude/MidiWriterJS.svg?branch=master)](https://travis-ci.org/grimmdude/MidiWriterJS)

MidiWriterJS is a JavaScript library providing an API for generating expressive multi-track MIDI files.  

Note that the `master` branch is in active development so if you're looking for a tried and true stable version please use the latest release.

Install
------------
```sh
npm install midi-writer-js
```
Getting Started
------------
```javascript
var MidiWriter = require('midi-writer-js');

// Start with a new track
var track = new MidiWriter.Track();

// Define an instrument (optional):
track.addEvent(new MidiWriter.ProgramChangeEvent({instrument : 1}));

// Add some notes:
var note = new MidiWriter.NoteEvent({pitch:['C4', 'D4', 'E4'], duration: '4'});
track.addEvent(note);

// Generate a data URI
var write = new MidiWriter.Writer([track]);
console.log(write.dataUri());
```
Documentation
------------
### `MidiWriter.Track()`

- `addEvent({event}, mapFunction)`
- `setTempo(tempo)`
- `addText(text)`
- `addCopyright(text)`
- `addInstrumentName(text)`
- `addMarker(text)`
- `addCuePoint(text)`
- `addLyric(text)`
- `setTimeSignature(numerator, denominator)`

### `MidiWriter.NoteEvent({options})`

The `NoteEvent` supports these options:

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><b>pitch</b></td>
			<td>array</td>
			<td>An array of notes to be triggered.  Can be a string or valid MIDI note code.  Format for string is <code>C#4</code>.  Pro tip: You can use the output from <a href="https://github.com/danigb/tonal" target="_blank">tonal</a> functions to build scales, chords, intervals, etc. in this parameter.</td>
		</tr>
		<tr>
			<td><b>duration</b></td>
			<td>string</td>
			<td>
				How long the note should sound.
				<ul>
					<li>1  : whole</li>
					<li>2  : half</li>
					<li>d2 : dotted half</li>
					<li>4  : quarter</li>
					<li>d4 : dotted quarter</li>
					<li>8  : eighth</li>
					<li>8t : eighth triplet</li>
					<li>d8 : dotted eighth</li>
					<li>16 : sixteenth</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td><b>wait</b></td>
			<td>string</td>
			<td>How long to wait before sounding note (rest).  Takes same values as <b>duration</b>.</td>
		</tr>
		<tr>
			<td><b>sequential</b></td>
			<td>boolean</td>
			<td>If true then array of notes will be played sequentially as opposed to simulatanously.  Default: <code>false</code></td>
		</tr>
		<tr>
			<td><b>velocity</b></td>
			<td>number</td>
			<td>How loud the note should sound, values 1-100.  Default: <code>50</code></td>
		</tr>
		<tr>
			<td><b>repeat</b></td>
			<td>number</td>
			<td>How many times this event should be repeated. Default: <code>1</code></td>
		</tr>
		<tr>
			<td><b>channel</b></td>
			<td>number</td>
			<td>MIDI channel to use. Default: <code>1</code></td>
		</tr>
	</tbody>
</table>


### `MidiWriter.Writer([tracks])`
The `Writer` object provides a few ways to output the file:
- `buildFile()` *Uint8Array*
- `base64()` *string*
- `dataUri()` *string*

### Hot Cross Buns
Here's an example of how everyone's favorite song "Hot Cross Buns" could be written.  Note use of the mapping function passed as the second argument of `addEvent()`.  This can be used to apply specific properties to all events.  With some 
street smarts you could also use it for programmatic crescendos and other property 'animation'.
```javascript
var MidiWriter = require('midi-writer-js');

var track = new MidiWriter.Track();

track.addEvent([
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

var write = new MidiWriter.Writer([track]);
console.log(write.dataUri());
```

### VexFlow Integration
MidiWriterJS can export MIDI from VexFlow voices, though this feature is still experimental.  Current usage is to use `MidiWriter.VexFlow.trackFromVoice(voice)` to create a MidiWriterJS `Track` object:
```javascript

// ...VexFlow code defining notes
var voice = create_4_4_voice().addTickables(notes);

var track = MidiWriter.VexFlow.trackFromVoice(voice);
var writer = new MidiWriter.Writer([track]);
console.log(writer.dataUri());
```