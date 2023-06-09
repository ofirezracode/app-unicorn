import { noteService } from '../services/note.service.js'
import { mailService } from '../../mail/services/mail.service.js'

import { NoteList } from '../cmps/note-list.jsx'
import { NewNote } from '../cmps/new-note.jsx'
import { FilterNotes } from '../cmps/filter-notes.jsx'

import { showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function NoteIndex() {
  const [notes, setNotes] = useState([])
  const [filterBy, setFilterBy] = useState({})
  const params = useParams()
  const navigate = useNavigate()
  // const history = useHistory()

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      console.log('params', params)
      mailService.get(params.mailId).then((mail) => {
        const note = {
          createdAt: Date.now(),
          type: 'txt',
          isPinned: false,
          info: {
            title: 'New text',
            txt: mail.content,
          },
        }
        // history.push('/note')
        // console.log('passed history')
        navigate('/note')
        onAddNote(note)
      })
    }
  }, [])

  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function loadNotes() {
    return noteService.query(filterBy).then((notes) => setNotes(notes))
  }

  function onAddNote(note) {
    noteService
      .save(note)
      .then(loadNotes)
      .then(() => showSuccessMsg('Note Added'))
  }

  function onDeleteNote(noteId) {
    noteService
      .remove(noteId)
      .then(loadNotes)
      .then(() => showSuccessMsg('Note Deleted'))
  }

  function onEditNote(note) {
    console.log('onEditNote')
    noteService
      .save(note)
      .then(loadNotes)
      .then(() => showSuccessMsg('Note Saved'))
  }

  function onPinNote(note) {
    noteService
      .pinNote(note)
      .then(loadNotes)
      .then(() => showSuccessMsg('Note Pin'))
  }

  function onDuplicateNote(note) {
    note.id = false
    note.isPinned = false
    noteService
      .save(note)
      .then(loadNotes)
      .then(() => showSuccessMsg('Note Duplicated'))
  }

  function onFilter(filters) {
    noteService.query(filterBy).then(() => {
      setFilterBy({ ...filters })
      loadNotes
    })
  }

  return (
    <section className="note-index view flex column align-center">
      <FilterNotes onFilter={onFilter} />
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
