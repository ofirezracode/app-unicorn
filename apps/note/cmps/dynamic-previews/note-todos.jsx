const { useState } = React

import { NoteTodo } from './note-todo.jsx'
import { NoteHeader } from './note-header.jsx'

export function NoteTodos({ note, onEditNote }) {
  const [todos, setTodos] = useState(note.info.todos)

  function onTodoChange(newTodo, todoIndex) {
    const editedTodos = todos.slice()
    editedTodos[todoIndex] = newTodo
    note.info.todos = editedTodos
    onEditNote(note)
  }

  function onNewHeader(newHeader) {
    note.info.title = newHeader
    onEditNote(note)
  }

  return (
    <section className="note-todos">
      <NoteHeader header={note.info.title} onNewHeader={onNewHeader} />
      <ul className="clean-list">
        {note.info.todos.map((todo, i) => {
          return (
            <li key={i}>
              <NoteTodo onTodoChange={onTodoChange} todo={todo} index={i}></NoteTodo>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
