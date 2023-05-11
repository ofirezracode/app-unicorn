const { useState } = React

export function NoteHeader({ header, onNewHeader }) {
  const [isHeaderEditable, setIsHeaderEditable] = useState(false)
  const [editableHeader, setEditableHeader] = useState(header)

  function onHeaderEdit(e) {
    e.preventDefault()

    setIsHeaderEditable(false)
    onNewHeader(editableHeader)
  }

  const iconClass = isHeaderEditable ? 'type-active' : ''
  return (
    <header className="note-header flex align-center between">
      {isHeaderEditable || <h3>{editableHeader}</h3>}
      {!isHeaderEditable || (
        <form onSubmit={onHeaderEdit}>
          <input onChange={(e) => setEditableHeader(e.target.value)} value={editableHeader} />
        </form>
      )}
      <button className={iconClass} onClick={() => setIsHeaderEditable((prev) => !prev)}>
        <i className="fa-regular fa-pen-to-square"></i>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
    </header>
  )
}
