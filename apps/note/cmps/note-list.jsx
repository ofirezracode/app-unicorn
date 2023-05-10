import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes }) {
  return (
    <section className="note-list">
      <ul className="clean-list">
        {notes.map((note) => {
          return (
            <li key={note.id}>
              <NotePreview note={note}></NotePreview>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
