const { useState } = React

export function NoteTxt({ note, isEditable, onEditNote, onFinishedEdit }) {
  const [editedTxt, setEditedTxt] = useState(note.info.txt)

  function onSubmit(e) {
    e.preventDefault()
    note.info.txt = editedTxt
    onEditNote(note)
    onFinishedEdit()
  }

  return (
    <section className="note-txt">
      {isEditable || <p>{note.info.txt}</p>}
      {!isEditable || (
        <form onSubmit={onSubmit}>
          <input onChange={(e) => setEditedTxt(e.target.value)} value={editedTxt} />
        </form>
      )}
    </section>
  )
}
