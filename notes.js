const fs = require("fs");

// load chalk
const chalk = require("chalk");

// create a note
const addNote = (title, body) => {
  const notes = loadNotes(); //this is an array

  // check for duplicate notes
  // method-1 - to find all duplicate values using filter()
  // const duplicateNotes = notes.filter((note) => note.title === title);

  // method-2 - stop if a duplicate is detected, using find()
  const duplicateNote = notes.find((note) => note.title === title);
  console.log(duplicateNote);

  // if method-1 is used slightly change the if condition
  // if (duplicateNotes.length === 0) {
  // for method-2 - use this
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New Note Added!"));
  } else {
    console.log(
      chalk.red.inverse("Title already exists, please choose another")
    );
  }
};

// to save notes
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// load notes from notes.json
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// remove a note
const removeNote = (title) => {
  const notes = loadNotes();

  // only keep the notes which are not matching the passed title
  const notesToKeep = notes.filter((note) => note.title !== title); //this returns true each time if title not matches

  //condition for checking if the title is removed or not
  if (notes.length != notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed successfully!"));

    // now we have a new array to be saved
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("Note does not exist!"));
  }
};

// listing notes
const listNotes = () => {
  console.log(chalk.green.inverse("Your Notes..."));
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(chalk.yellow.inverse("Title: " + note.title));
    console.log(chalk.white.inverse("Body: " + note.body));
    console.log("**************************************");
  });
};

// read a note
const readNote = (title) => {
  // load notes
  const notes = loadNotes();

  // find the note which matches the given title
  const reqNote = notes.find((note) => note.title === title);

  if (reqNote) {
    console.log(chalk.yellow.inverse(reqNote.title));
    console.log(chalk.white.inverse(reqNote.body));
  } else {
    console.log(chalk.red.inverse("Title Not Fond!"));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
