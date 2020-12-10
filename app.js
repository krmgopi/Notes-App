//install and load yargs
const yargs = require("yargs");

// load notes.js file
const notes = require("./notes.js");

// create a add command
yargs.command({
  command: "add",
  describe: "Adding a new note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    // console.log("Title: " + argv.title + " " + "Body: " + argv.body);
    notes.addNote(argv.title, argv.body);
  },
});

// create a remove command
yargs.command({
  command: "remove",
  describe: "Removing a note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    // console.log("removing a note");
    // console.log(argv.title);
    notes.removeNote(argv.title);
  },
});

// create a read command
yargs.command({
  command: "read",
  describe: "Reading a note",
  builder: {
    title: {
      describe: "note title to read",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    // console.log("reading a note");
    notes.readNote(argv.title);
  },
});

// create a list command
yargs.command({
  command: "list",
  describe: "Listing all note",
  handler(argv) {
    // console.log("listing all notes");
    notes.listNotes();
  },
});

yargs.parse();
