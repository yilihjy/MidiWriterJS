var tracks = [];
tracks[0] = new MidiWriter.Track();
tracks[0].addEvent(new MidiWriter.ProgramChangeEvent({instrument : 1}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['B5'], duration: 'd2', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['C6'], duration: '4', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['B5'], duration: 'd2', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['C6'], duration: '4', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['B5'], duration: 'd2', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['C6'], duration: '4', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['B5'], duration: 'd2', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['Bb5'], duration: '4', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['A5'], duration: 'd2', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['B5'], duration: '4', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['A5'], duration: 'd2', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['B5'], duration: '4', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['A5'], duration: 'd2', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['B5'], duration: 'd8', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['A5'], duration: '16', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['A5'], duration: 'd2', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['Ab5'], duration: '2', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['A5', 'B5', 'D6', 'C6', 'E5', 'A5'], duration: '8', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['Gb5'], duration: 'd2', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['A5'], duration: '4', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['Gb5'], duration: 'd2', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['A5'], duration: '4', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['G5', 'Gb5', 'C4', 'B4', 'Eb5', 'Gb5', 'D5', 'C5'], duration: '8', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['B5'], duration: 'd2', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['C6'], duration: '4', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['B5'], duration: 'd2', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['C6'], duration: '4', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['B5'], duration: 'd2', velocity:100}));
tracks[0].addEvent(new MidiWriter.NoteEvent({pitch: ['C6'], duration: '4', velocity:100}));


tracks[1] = new MidiWriter.Track();
tracks[1].addEvent(new MidiWriter.ProgramChangeEvent({instrument : 1}));
tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E4', 'E4', 'E4', 'E4', 'E4', 'E4', 'E4', 'E4'], duration: '8'}));
tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E4', 'E4', 'E4', 'E4', 'Eb4', 'Eb4', 'Eb4', 'Eb4'], duration: '8'}));
tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['Eb4', 'Eb4', 'Eb4', 'Eb4', 'D4', 'D4', 'D4', 'D4'], duration: '8'}));
tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['D4', 'D4', 'D4', 'D4', 'D4', 'D4', 'Db4', 'Db4'], duration: '8'}));
tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'C4', 'C4', 'C4', 'C4'], duration: '8'}));
tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'C4', 'C4', 'C4', 'C4'], duration: '8'}));
tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'C4', 'C4', 'C4', 'C4'], duration: '8'}));
tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'B4', 'B4', 'B4', 'B4'], duration: '8'}));
tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['B4', 'B4', 'A4', 'A4', 'A4', 'A4', 'A4', 'A4'], duration: '8'}));
tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A4', 'A4', 'A4', 'A4', 'A4', 'A4', 'A4', 'A4'], duration: '8'}));
tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A4', 'A4', 'A4', 'A4', 'A4', 'A4', 'A4', 'A4'], duration: '8'}));
tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['A4'], duration: '4'}));
tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E4', 'E4', 'E4', 'E4', 'E4', 'E4', 'E4', 'E4'], duration: '8', wait: 'd2'}));
tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['E4', 'E4', 'E4', 'E4', 'Eb4', 'Eb4', 'Eb4', 'Eb4'], duration: '8'}));
tracks[1].addEvent(new MidiWriter.NoteEvent({pitch: ['Eb4', 'Eb4', 'D4', 'D4', 'D4', 'D4', 'D4', 'D4'], duration: '8'}));



tracks[2] = new MidiWriter.Track();
tracks[2].addEvent(new MidiWriter.ProgramChangeEvent({instrument : 1}));
tracks[2].addEvent(new MidiWriter.NoteEvent({pitch: ['B3', 'B3', 'B3', 'B3', 'B3', 'B3', 'B3', 'B3'], duration: '8'}));
tracks[2].addEvent(new MidiWriter.NoteEvent({pitch: ['A3', 'A3', 'A3', 'A3', 'A3', 'A3', 'A3', 'A3'], duration: '8'}));
tracks[2].addEvent(new MidiWriter.NoteEvent({pitch: ['A3', 'A3', 'A3', 'A3', 'A3', 'A3', 'Ab3', 'Ab3'], duration: '8'}));
tracks[2].addEvent(new MidiWriter.NoteEvent({pitch: ['Ab3', 'Ab3', 'Ab3', 'Ab3', 'G3', 'G3', 'G3', 'G3'], duration: '8'}));
tracks[2].addEvent(new MidiWriter.NoteEvent({pitch: ['G3', 'G3', 'G3', 'G3', 'Gb3', 'Gb3', 'Gb3', 'Gb3'], duration: '8'}));
tracks[2].addEvent(new MidiWriter.NoteEvent({pitch: ['Gb3', 'Gb3', 'Gb3', 'Gb3', 'Gb3', 'Gb3', 'Gb3', 'Gb3'], duration: '8'}));
tracks[2].addEvent(new MidiWriter.NoteEvent({pitch: ['Gb3', 'Gb3', 'Gb3', 'Gb3', 'Gb3', 'Gb3', 'Gb3', 'Gb3'], duration: '8'}));
tracks[2].addEvent(new MidiWriter.NoteEvent({pitch: ['F3', 'F3', 'F3', 'F3', 'F3', 'F3', 'F3', 'F3'], duration: '8'}));
tracks[2].addEvent(new MidiWriter.NoteEvent({pitch: ['E3', 'E3', 'E3', 'E3', 'E3', 'E3', 'E3', 'E3'], duration: '8'}));
tracks[2].addEvent(new MidiWriter.NoteEvent({pitch: ['E3', 'E3', 'Eb3', 'Eb3', 'E3', 'E3', 'E3', 'E3'], duration: '8'}));
tracks[2].addEvent(new MidiWriter.NoteEvent({pitch: ['Eb3', 'Eb3', 'Eb3', 'Eb3', 'E3', 'E3', 'E3', 'E3'], duration: '8'}));
tracks[2].addEvent(new MidiWriter.NoteEvent({pitch: ['Eb4'], duration: '4'}));
tracks[2].addEvent(new MidiWriter.NoteEvent({pitch: ['B3', 'B3', 'B3', 'B3', 'B3', 'B3', 'B3', 'B3'], duration: '8', wait: 'd2'}));
tracks[2].addEvent(new MidiWriter.NoteEvent({pitch: ['A3', 'A3', 'A3', 'A3', 'A3', 'A3', 'A3', 'A3'], duration: '8'}));
tracks[2].addEvent(new MidiWriter.NoteEvent({pitch: ['Ab3', 'Ab3', 'Ab3', 'Ab3', 'Ab3', 'Ab3', 'Ab3', 'Ab3'], duration: '8'}));



tracks[3] = new MidiWriter.Track();
tracks[3].addEvent(new MidiWriter.ProgramChangeEvent({instrument : 1}));
tracks[3].addEvent(new MidiWriter.NoteEvent({pitch: ['G3', 'G3', 'G3', 'G3', 'G3', 'G3', 'G3', 'G3'], duration: '8'}));
tracks[3].addEvent(new MidiWriter.NoteEvent({pitch: ['Gb3', 'Gb3', 'Gb3', 'Gb3', 'Gb3', 'Gb3', 'Gb3', 'Gb3'], duration: '8'}));
tracks[3].addEvent(new MidiWriter.NoteEvent({pitch: ['F3', 'F3', 'F3', 'F3', 'F3', 'F3', 'F3', 'F3'], duration: '8'}));
tracks[3].addEvent(new MidiWriter.NoteEvent({pitch: ['E3', 'E3', 'E3', 'E3', 'E3', 'E3', 'E3', 'E3'], duration: '8'}));
tracks[3].addEvent(new MidiWriter.NoteEvent({pitch: ['E3', 'E3', 'E3', 'E3', 'E3', 'E3', 'E3', 'E3'], duration: '8'}));
tracks[3].addEvent(new MidiWriter.NoteEvent({pitch: ['E3', 'E3', 'E3', 'E3', 'Eb3', 'Eb3', 'Eb3', 'Eb3'], duration: '8'}));
tracks[3].addEvent(new MidiWriter.NoteEvent({pitch: ['D3', 'D3', 'D3', 'D3', 'D3', 'D3', 'D3', 'D3'], duration: '8'}));
tracks[3].addEvent(new MidiWriter.NoteEvent({pitch: ['D3', 'D3', 'D3', 'D3', 'D3', 'D3', 'D3', 'D3'], duration: '8'}));
tracks[3].addEvent(new MidiWriter.NoteEvent({pitch: ['C3', 'C3', 'C3', 'C3', 'C3', 'C3', 'C3', 'C3'], duration: '8'}));
tracks[3].addEvent(new MidiWriter.NoteEvent({pitch: ['B3', 'B3', 'B3', 'B3', 'C3', 'C3', 'C3', 'C3'], duration: '8'}));
tracks[3].addEvent(new MidiWriter.NoteEvent({pitch: ['B3', 'B3', 'B3', 'B3', 'C3', 'C3', 'C3', 'C3'], duration: '8'}));
tracks[3].addEvent(new MidiWriter.NoteEvent({pitch: ['B4'], duration: '4'}));
tracks[3].addEvent(new MidiWriter.NoteEvent({pitch: ['G3', 'G3', 'G3', 'G3', 'G3', 'G3', 'G3', 'G3'], duration: '8', wait: 'd2'}));
tracks[3].addEvent(new MidiWriter.NoteEvent({pitch: ['Gb3', 'Gb3', 'Gb3', 'Gb3', 'F3', 'F3', 'F3', 'F3'], duration: '8'}));
tracks[3].addEvent(new MidiWriter.NoteEvent({pitch: ['F3', 'F3', 'F3', 'F3', 'E3', 'E3', 'E3', 'E3'], duration: '8'}));



var write = new MidiWriter.Writer(tracks);
console.log('data:audio/midi;base64,' + write.base64());