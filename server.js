// Dependencies
const express = require('express');
const path = require('path');
const { nanoid } = require('nanoid')
const fileSystem = require("fs");
const util = require("util");
const writeFile = util.promisify(fileSystem.writeFile);
const db = require('./db.json');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))
// app.use('/assets', express.static('public/assets'))

// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => res.json(db));

// Receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    newNote.id = nanoid();
    db.push(newNote);
    res.json(newNote);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));