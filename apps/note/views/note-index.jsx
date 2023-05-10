import { noteService } from '../services/note.service.js'

import { NoteList } from '../cmps/note-list.jsx'
import { NewNote } from '../cmps/new-note.jsx'

import { showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React

export function NoteIndex() {
  const [notes, setNotes] = useState([])
  // const [selectedNote, setSelectedNote] = useState(null)
  const [filterBy, setFilterBy] = useState({})

  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function loadNotes() {
    return noteService.query(filterBy).then((notes) => setNotes(notes))
  }

  function onAddNote(note) {
    noteService
      .save(note)
      .then(() => loadNotes())
      .then(() => showSuccessMsg('Note Added'))
  }

  function onDeleteNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => loadNotes())
      .then(() => showSuccessMsg('Note Deleted'))
  }

  function onEditNote(note) {
    noteService
      .save(note)
      .then(() => loadNotes())
      .then(() => showSuccessMsg('Note Saved'))
  }

  function onPinNote(note) {
    noteService
      .pinNote(note)
      .then(() => loadNotes())
      .then(() => showSuccessMsg('Note Pin'))
  }

  function onDuplicateNote(note) {
    note.id = false
    note.isPinned = false
    noteService
      .save(note)
      .then(() => loadNotes())
      .then(() => showSuccessMsg('Note Duplicated'))
  }

  return (
    <section className="note-index view">
      <NewNote onAddNote={onAddNote}></NewNote>
      <NoteList
        onDuplicateNote={onDuplicateNote}
        onPinNote={onPinNote}
        onEditNote={onEditNote}
        onDeleteNote={onDeleteNote}
        notes={notes}
      ></NoteList>
    </section>
  )
}
