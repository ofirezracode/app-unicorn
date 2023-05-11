const { useState, useEffect, useRef } = React

import { noteService } from '../../services/note.service.js'

export function NewNote({ onAddNote }) {
  const [inputValue, setInputValue] = useState('')
  const [noteType, setNoteType] = useState({})

  const txtRef = useRef()
  const imgRef = useRef()
  const videoRef = useRef()
  const todosRef = useRef()

  const noteTypes = [
    { type: 'txt', ref: txtRef, placeholder: "What's on your mind..." },
    { type: 'img', ref: imgRef, placeholder: 'Enter image URL...' },
    { type: 'video', ref: videoRef, placeholder: 'Enter video URL...' },
    { type: 'todos', ref: todosRef, placeholder: 'Enter comma seperated list...' },
  ]

  useEffect(() => {
    setNoteType(noteTypes[0])
  }, [])

  if (!noteType) return <section className="new-note"></section>

  function handleInputChange(event) {
    setInputValue(event.target.value)
  }

  function onNoteTypeClick(index) {
    setNoteType(noteTypes[index])
    noteTypes.forEach((noteType) => noteType.ref.current.classList.remove('type-active'))
    noteTypes[index].ref.current.classList.add('type-active')
  }

  function onSubmit(e) {
    e.preventDefault()
    console.log('onsubmit')
    const note = {
      createdAt: Date.now(),
      type: noteType.type,
      isPinned: false,
    }
    if (noteType.type === 'txt') {
      note.info = {
        title: 'New text',
        txt: inputValue,
      }
    } else if (note.type === 'img') {
      note.info = {
        title: 'New image',
        url: inputValue,
      }
    } else if (noteType.type === 'todos') {
      const todos = inputValue.split(',').map((todo) => ({ txt: todo, doneAt: null }))
      note.info = {
        title: 'New todo list',
        todos,
      }
    } else if (noteType.type === 'video') {
      const videoId = noteService.extractVideoIdFromURL(inputValue)
      note.info = {
        title: 'New video',
        videoId,
      }
    }
    setInputValue('')
    onAddNote(note)
  }

  let placeholderText = noteType.placeholder

  return (
    <form onSubmit={onSubmit} className="new-note new-note-layout">
      <input className="new-note-input" placeholder={placeholderText} onChange={handleInputChange} value={inputValue} />
      <span
        className="new-note-icon type-active"
        ref={txtRef}
        onClick={() => {
          onNoteTypeClick(0)
        }}
      >
        <i className="fa-regular fa-comment"></i>
        <i className="fa-solid fa-comment"></i>
      </span>
      <span
        className="new-note-icon"
        ref={imgRef}
        onClick={() => {
          onNoteTypeClick(1)
        }}
      >
        <i className="fa-regular fa-image"></i>
        <i className="fa-solid fa-image"></i>
      </span>
      <span
        className="new-note-icon"
        ref={videoRef}
        onClick={() => {
          onNoteTypeClick(2)
        }}
      >
        <i className="fa-regular fa-file-video"></i>
        <i className="fa-solid fa-file-video"></i>
      </span>
      <span
        className="new-note-icon"
        ref={todosRef}
        onClick={() => {
          onNoteTypeClick(3)
        }}
      >
        <i className="fa-regular fa-rectangle-list"></i>
        <i className="fa-solid fa-rectangle-list"></i>
      </span>
    </form>
  )
}
