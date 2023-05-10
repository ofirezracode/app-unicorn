import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes, onDeleteNote, onEditNote }) {
  return (
    <section className="note-list">
      <ul className="clean-list">
        {notes.map((note) => {
          return (
            <li key={note.id}>
              <NotePreview onEditNote={onEditNote} onDeleteNote={onDeleteNote} note={note}></NotePreview>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
