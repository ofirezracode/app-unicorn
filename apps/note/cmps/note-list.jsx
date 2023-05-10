import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes, onDeleteNote }) {
  return (
    <section className="note-list">
      <ul className="clean-list">
        {notes.map((note) => {
          return (
            <li key={note.id}>
              <NotePreview onDeleteNote={onDeleteNote} note={note}></NotePreview>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
