import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes, onDeleteNote, onEditNote, onPinNote }) {
  return (
    <section className="note-list">
      <ul className="clean-list">
        {notes.map((note) => {
          return (
            <li key={note.id}>
              <NotePreview onPinNote={onPinNote} onEditNote={onEditNote} onDeleteNote={onDeleteNote} note={note}></NotePreview>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
