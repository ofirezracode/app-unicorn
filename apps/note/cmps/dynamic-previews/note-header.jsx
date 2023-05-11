const { useState } = React

export function NoteHeader({ header, onNewHeader }) {
  const [isHeaderEditable, setIsHeaderEditable] = useState(false)
  const [editableHeader, setEditableHeader] = useState(header)

  function onHeaderEdit(e) {
    e.preventDefault()

    setIsHeaderEditable(false)
    onNewHeader(editableHeader)
  }

  return (
    <header className="note-header">
      {isHeaderEditable || <h3>{editableHeader}</h3>}
      {!isHeaderEditable || (
        <form onSubmit={onHeaderEdit}>
          <input onChange={(e) => setEditableHeader(e.target.value)} value={editableHeader} />
        </form>
      )}
      <button onClick={() => setIsHeaderEditable(true)}>edit</button>
    </header>
  )
}
