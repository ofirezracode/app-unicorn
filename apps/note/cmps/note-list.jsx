import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes, onDeleteNote, onEditNote, onPinNote, onDuplicateNote }) {
  return (
    <section className="note-list">
      <ul className="clean-list">
        {notes.map((note) => {
          return (
            <li key={note.id}>
              <NotePreview
                onDuplicateNote={onDuplicateNote}
                onPinNote={onPinNote}
                onEditNote={onEditNote}
                onDeleteNote={onDeleteNote}
                note={note}
              ></NotePreview>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
