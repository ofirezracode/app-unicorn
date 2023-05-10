const { useState } = React
const { Link } = ReactRouterDOM

import { NoteImg } from './dynamic-previews/note-img.jsx'
import { NoteTodos } from './dynamic-previews/note-todos.jsx'
import { NoteTxt } from './dynamic-previews/note-txt.jsx'
import { NoteVideo } from './dynamic-previews/note-video.jsx'

export function NotePreview({ note, onDeleteNote, onEditNote, onPinNote, onDuplicateNote }) {
  const [isEditable, setIsEditable] = useState(false)

  const [noteStyle, setNoteStyle] = useState(
    note.style
      ? { ...note.style }
      : {
          backgroundColor: '#ff6000',
        }
  )

  function onSetNoteColor(e) {
    const newColor = e.target.value
    const style = { backgroundColor: newColor }
    onSetNoteStyle(style)
  }

  function onSetNoteStyle(newStyle) {
    setNoteStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
  }

  function onToggleEditable() {
    setIsEditable((prevIsEditable) => !prevIsEditable)
  }

  return (
    <article className="note-preview" style={noteStyle}>
      <DynamicCmp onFinishedEdit={onToggleEditable} onEditNote={onEditNote} isEditable={isEditable} note={note} />
      <ul className="clean-list">
        <button onClick={() => onPinNote(note)} className={`pin ${note.isPinned ? 'pinned' : ''}`}>
          Pin
        </button>
        <label>
          Color
          <input onChange={(e) => onSetNoteColor(e)} type="color" />
        </label>
        <Link to={`/mail?noteId=${note.id}`}>Mail</Link>
        <button onClick={() => onDuplicateNote(note)}>Duplicate</button>
        <button onClick={onToggleEditable}>Edit</button>
        <button onClick={() => onDeleteNote(note.id)}>Delete</button>
        <p>{note.isPinned ? 'true' : 'false'}</p>
      </ul>
    </article>
  )
}

function DynamicCmp({ note, isEditable, onEditNote, onFinishedEdit }) {
  switch (note.type) {
    case 'txt':
      return <NoteTxt onEditNote={onEditNote} onFinishedEdit={onFinishedEdit} isEditable={isEditable} note={note} />
    case 'todos':
      return <NoteTodos onFinishedEdit={onFinishedEdit} isEditable={isEditable} note={note} />
    case 'img':
      return <NoteImg onFinishedEdit={onFinishedEdit} isEditable={isEditable} note={note} />
    case 'video':
      return <NoteVideo onFinishedEdit={onFinishedEdit} isEditable={isEditable} note={note} />
  }
}
