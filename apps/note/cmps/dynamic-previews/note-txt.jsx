const { useState } = React

import { NoteHeader } from './note-header.jsx'

export function NoteTxt({ note, isEditable, onEditNote, onFinishedEdit }) {
  const [editedTxt, setEditedTxt] = useState(note.info.txt)

  function onSubmit(e) {
    e.preventDefault()
    note.info.txt = editedTxt
    onEditNote(note)
    onFinishedEdit()
  }

  function onNewHeader(newHeader) {
    note.info.title = newHeader
    onEditNote(note)
  }

  return (
    <section className="note-txt">
      <NoteHeader header={note.info.title} onNewHeader={onNewHeader} />
      <div className="note-content">
        {isEditable || <p>{note.info.txt}</p>}
        {!isEditable || (
          <form onSubmit={onSubmit}>
            <input onChange={(e) => setEditedTxt(e.target.value)} value={editedTxt} />
          </form>
        )}
      </div>
    </section>
  )
}
