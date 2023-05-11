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
          backgroundColor: '#ffe6c7',
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
    <article className="note note-preview flex column" style={noteStyle}>
      <DynamicCmp onFinishedEdit={onToggleEditable} onEditNote={onEditNote} isEditable={isEditable} note={note} />
      <ul className="note-preview-buttons clean-list flex center">
        <button onClick={() => onPinNote(note)} className={`pin ${note.isPinned ? 'pinned' : ''}`}>
          <i class="fa-solid fa-thumbtack"></i>
        </button>
        <label className="flex center">
          <i class="fa-solid fa-fill"></i>
          <input onChange={(e) => onSetNoteColor(e)} type="color" />
        </label>
        <Link to={`/mail?noteId=${note.id}`}>
          <i class="fa-solid fa-envelope"></i>
        </Link>
        <button onClick={() => onDuplicateNote(note)}>
          <i class="fa-solid fa-clone"></i>
        </button>
        <button onClick={onToggleEditable}>
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button onClick={() => onDeleteNote(note.id)}>
          <i class="fa-solid fa-trash"></i>
        </button>
      </ul>
    </article>
  )
}

function DynamicCmp({ note, isEditable, onEditNote, onFinishedEdit }) {
  switch (note.type) {
    case 'txt':
      return <NoteTxt onEditNote={onEditNote} onFinishedEdit={onFinishedEdit} isEditable={isEditable} note={note} />
    case 'todos':
      return <NoteTodos onEditNote={onEditNote} note={note} />
    case 'img':
      return <NoteImg onEditNote={onEditNote} onFinishedEdit={onFinishedEdit} isEditable={isEditable} note={note} />
    case 'video':
      return <NoteVideo onEditNote={onEditNote} onFinishedEdit={onFinishedEdit} isEditable={isEditable} note={note} />
  }
}
