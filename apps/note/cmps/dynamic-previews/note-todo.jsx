const { useState } = React

export function NoteTodo({ todo, index, onTodoChange }) {
  const [editableTodo, setEditableTodo] = useState(todo)
  // const [editedTxt, setEditedTxt] = useState(note.info.txt)
  const [isEditable, setIsEditable] = useState(false)

  function onSubmit(e) {
    e.preventDefault()

    setIsEditable(false)
    onTodoChange(editableTodo, index)
  }

  function editTodo(e) {
    setEditableTodo((prevTodo) => {
      return { ...prevTodo, txt: e.target.value }
    })
  }

  console.log('editableTodo', editableTodo)

  return (
    <React.Fragment>
      {isEditable || <p>{editableTodo.txt}</p>}
      {!isEditable || (
        <form onSubmit={onSubmit}>
          <input onChange={(e) => editTodo(e)} value={editableTodo.txt} />
        </form>
      )}
      <button onClick={() => setIsEditable(true)}>edit</button>
      <button>delete</button>
    </React.Fragment>
  )
}
