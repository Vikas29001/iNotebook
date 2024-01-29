require('../dataBase');
const express = require('express');
const { body, validationResult } = require('express-validator')
const router = express.Router();
const UserNotes = require('../models/Notes')
const getUserDetails = require('../middleware/getuserdetails')


router.post('/addUserNotes', [
    body('title', 'enter valid title').isLength({ min: 5 }),
    body('description', 'enter valid description').isLength({ min: 4 })

], getUserDetails, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body

    try {

        const note = new UserNotes({ title, description, tag, user: req.user.id })
        const saveNote = await note.save();
        res.json(saveNote)

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }
})



router.get('/fetchAllnotes', getUserDetails, async (req, res) => {

    try {
        const userNotes = await UserNotes.find({ user: req.user.id })

        res.send(userNotes)
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }
})

router.put('/UpdateNote/:id', getUserDetails, async (req, res) => {

    const { title, description, tag } = req.body
    const newNote = {}
    // console.log(req.params.id)
    try {
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag }

        let checkUser = await UserNotes.findById(req.params.id)

        if (!checkUser) { res.send("Not Found This User") }

        if (checkUser.user.toString() !== req.user.id) {res.send("Not Allowed") }

        checkUser = await UserNotes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ checkUser })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }
})


router.delete('/deleteNote/:id', getUserDetails, async (req, res) => {

    const { title, description, tag } = req.body

    try {
   

        let checkUser = await UserNotes.findById(req.params.id)

        if (!checkUser) { res.send("Not Found This User") }

        if (checkUser.user.toString() !== req.user.id) {res.send("Not Allowed") }

        checkUser = await UserNotes.findByIdAndDelete(req.params.id)
        res.json({ "success":"note has been deleted",checkUser })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }
})

module.exports = router;