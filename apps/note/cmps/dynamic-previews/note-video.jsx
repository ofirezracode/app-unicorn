const { useState } = React

import { noteService } from '../../services/note.service.js'

import { NoteHeader } from './note-header.jsx'

export function NoteVideo({ note, isEditable, onEditNote, onFinishedEdit }) {
  const [videoId, setVideoId] = useState(note.info.videoId)
  const [editedVideoId, setEditedVideoId] = useState(note.info.videoId)

  function onSubmit(e) {
    e.preventDefault()
    note.info.videoId = editedVideoId
    onEditNote(note)
    setVideoId(editedVideoId)
    onFinishedEdit()
  }

  function onChange(e) {
    setEditedVideoId(noteService.extractVideoIdFromURL(e.target.value))
  }

  function onNewHeader(newHeader) {
    note.info.title = newHeader
    onEditNote(note)
  }

  return (
    <section className="note-video">
      <NoteHeader header={note.info.title} onNewHeader={onNewHeader} />
      <div className="note-content">
        <iframe width="288" height="162" src={`https://www.youtube.com/embed/${videoId}`}></iframe>
        {!isEditable || (
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={editedVideoId} />
          </form>
        )}
      </div>
    </section>
  )
}
