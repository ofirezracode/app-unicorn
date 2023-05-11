const { useState } = React

import { NoteHeader } from './note-header.jsx'

export function NoteImg({ note, isEditable, onEditNote, onFinishedEdit }) {
  const [URL, setURL] = useState(note.info.url)
  const [editedURL, setEditedURL] = useState(note.info.url)

  function onSubmit(e) {
    e.preventDefault()
    note.info.url = editedURL
    onEditNote(note)
    setURL(editedURL)
    onFinishedEdit()
  }

  function onNewHeader(newHeader) {
    note.info.title = newHeader
    onEditNote(note)
  }

  const isEditableClass = isEditable ? 'editable' : ''
  return (
    <section className="note-img">
      <NoteHeader header={note.info.title} onNewHeader={onNewHeader} />
      <div className={`note-content ${isEditableClass}`}>
        <img src={URL} alt="image"></img>
        {!isEditable || (
          <form onSubmit={onSubmit}>
            <input onChange={(e) => setEditedURL(e.target.value)} value={editedURL} />
          </form>
        )}
      </div>
    </section>
  )
}
