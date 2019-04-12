const fs = require('fs');
const chalk = require('chalk');


// adding a note

const addNote = (title, body) => {
    const notes = loadNotes();

    // filter notes  

    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added'));
    } else {
        console.log(chalk.red.inverse('Note title taken.'));
    }  
}

// save notes

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}


// load all notes

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    } 
}

// removing a note

const removeNote = (title) => {
    const notes = loadNotes();

    // filtering notes with title

    const notesToKeep = notes.filter(note => note.title != title)

    // givind output to user

    if (notesToKeep.length === notes.length) {
        console.log(chalk.bgRed('Note doesn\'t exist!'));
        
    } else {
        console.log(chalk.bgGreen(`Removing ${title}`));
    }

    saveNotes(notesToKeep);
}

// read a note

const readNote = (title) => {
    const notes = loadNotes();

    const noteToRead = notes.find(note => note.title === title);

    if (!noteToRead) {
        console.log(chalk.red.inverse('No note found'));
    } else {
        console.log(chalk.green.inverse(`Note is: ${noteToRead.title} : ${noteToRead.body}`))
    }
    
}

// printing all notes to console

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.green.inverse('Your notes:   '));

    notes.forEach(note => {
        console.log(`Note title: ${note.title} and note body: ${note.body}`);
    });
}

// exporting functions for use

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}