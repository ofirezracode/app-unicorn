const { useState } = React

import { NoteImg } from './dynamic-previews/note-img.jsx'
import { NoteTodos } from './dynamic-previews/note-todos.jsx'
import { NoteTxt } from './dynamic-previews/note-txt.jsx'
import { NoteVideo } from './dynamic-previews/note-video.jsx'

export function NotePreview({ note, onDeleteNote }) {
  const [cmpType, setCmpType] = useState(note.type)
  const [isPinned, setIsPinned] = useState(note.isPinned)

  const [noteStyle, setNoteStyle] = useState(
    note.style
      ? { ...note.style }
      : {
          backgroundColor: '#ff6000',
        }
  )

  function onSetNoteStyle(newStyle) {
    setNoteStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
  }

  return (
    <article className="note-preview" style={noteStyle}>
      <DynamicCmp note={note} />
      <ul className="clean-list">
        <button className={`pin ${isPinned ? 'pinned' : ''}`}>Pin</button>
        <button>Color</button>
        <button>Mail</button>
        <button>Edit</button>
        <button onClick={() => onDeleteNote(note)}>Delete</button>
      </ul>
    </article>
  )
}

function DynamicCmp({ note }) {
  console.log('note.type', note.type)
  switch (note.type) {
    case 'txt':
      return <NoteTxt note={note} />
    case 'todos':
      return <NoteTodos note={note} />
    case 'img':
      return <NoteImg note={note} />
    case 'video':
      return <NoteVideo note={note} />
  }
}
