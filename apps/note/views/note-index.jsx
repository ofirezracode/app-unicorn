import { noteService } from '../services/note.service.js'

import { NoteList } from '../cmps/note-list.jsx'
import { NewNote } from '../cmps/new-note.jsx'

const { useState, useEffect } = React

export function NoteIndex() {
  const [notes, setNotes] = useState([])
  // const [selectedNote, setSelectedNote] = useState(null)
  const [filterBy, setFilterBy] = useState({})

  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function loadNotes() {
    noteService.query(filterBy).then((notes) => setNotes(notes))
  }

  function onAddNote(note) {
    noteService.save(note).then(() => loadNotes())
  }

  function onDeleteNote(noteId) {
    noteService.remove(noteId).then(() => loadNotes())
  }

  return (
    <section className="note-index view">
      <NewNote onAddNote={onAddNote}></NewNote>
      <NoteList onDeleteNote={onDeleteNote} notes={notes}></NoteList>
    </section>
  )
}
