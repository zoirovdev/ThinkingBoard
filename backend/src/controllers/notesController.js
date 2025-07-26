const Note = require("../models/Note.js")


async function getAllNotes(req, res){
  try {
    const notes = await Note.find().sort({ createdAt: -1 })
    res.status(200).json(notes)
  } catch (error) {
    console.error("Error in getAllNotes controller", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

async function getNoteById(req, res){
  try {
    const note = await Note.findById(req.params.id)
    if(!note) return res.status(404).json({ message: "Not found!" })

    res.status(200).json(note)
  } catch (error) {
    console.error("Error in getNoteById controller", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

async function createNote(req, res){
  try {
    const { title, content } = req.body
    const note = new Note({ title, content })

    const savedNote = await note.save()
    res.status(201).json(savedNote)
  } catch (error) {
    console.error("Error in createNote controller", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

async function updateNote(req, res){
  try {
    const { title, content } = req.body
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })

    if(!updatedNote) return res.status(404).json({ message: "Not found!" })

    res.status(200).json(updatedNote)
  } catch (error) {
    console.error("Error in updateNote controller", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

async function deleteNote(req, res){
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    
    if(!deletedNote) return res.status(404).json({ message: "Not found!" })

    res.json({ message: "Note deleted succesfully!" })
  } catch (error) {
    console.error("Error in deleteNote controller", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}


module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById
}
