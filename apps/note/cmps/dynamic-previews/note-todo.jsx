const { useState, useEffect } = React

export function NoteTodo({ todo, index, onTodoChange }) {
  const [editableTodo, setEditableTodo] = useState(todo)
  // const [editedTxt, setEditedTxt] = useState(note.info.txt)
  const [isEditable, setIsEditable] = useState(false)
  const [isDoneClass, setIsDoneClass] = useState(todo.doneAt ? 'done' : '')

  useEffect(() => {
    setIsDoneClass(editableTodo.doneAt ? 'done' : '')
  }, [editableTodo])

  function onSubmit(e) {
    e.preventDefault()

    setIsEditable(false)
    onTodoChange(editableTodo, index)
  }

  function onCompleteCheck() {
    let newDoneAt
    if (editableTodo.doneAt) {
      newDoneAt = null
    } else {
      newDoneAt = Date.now()
    }
    setEditableTodo((prev) => ({ ...prev, doneAt: newDoneAt }))
    onTodoChange(editableTodo, index)
  }

  function onToggleEditable() {
    setIsEditable((prevIsEditable) => !prevIsEditable)
  }

  function editTodo(e) {
    setEditableTodo((prevTodo) => ({ ...prevTodo, txt: e.target.value }))
  }

  return (
    <React.Fragment>
      {isEditable || <p className={isDoneClass}>{editableTodo.txt}</p>}
      {!isEditable || (
        <form onSubmit={onSubmit}>
          <input onChange={(e) => editTodo(e)} value={editableTodo.txt} />
        </form>
      )}

      <div className="todo-buttons flex">
        <button onClick={onCompleteCheck} className={isDoneClass}>
          <i className="fa-regular fa-square"></i>
          <i className="fa-regular fa-square-check"></i>
        </button>
        <button onClick={onToggleEditable}>
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
        <button>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </React.Fragment>
  )
}
