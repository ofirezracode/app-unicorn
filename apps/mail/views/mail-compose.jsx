import { mailService } from '../services/mail.service.js'
import { noteService } from '../../note/services/note.service.js'

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailCompose() {
  const [newMail, setNewMail] = useState({
    id: '',
    title: '',
    from: '',
    content: '',
  })
  // const [recipient, setRecipient] = use(newMail.recipient)
  // const [title, setTitle] = use(newMail.title)
  // const [content, setContent] = use(newMail.content)
//  const [replyMail, setReplyMail] = useState(mailService.get('searchParams'))
  const inputRef = useRef()
  const navigate = useNavigate()
  const params = useParams() 
  useEffect(() => {
    if (params.noteId) loadNote()
    setNewMail(() => ({ ...mailService.getEmptyMail() }))
  }, [])

  function loadNote() {
    noteService.get(params.noteId).then((note) => {
      const newMail = {
        title: note.info.title,
        content: getContent(note),
      }
      console.log(newMail)
      setNewMail(newMail)
    })
  }

  function getContent(note) {
    let content = ''
    switch (note.type) {
      case 'txt':
        content = note.info.txt
        break
      case 'img':
        content = 'Check out this photo I found online\n ' + note.info.url
        break
      case 'video':
        content = 'Check out this cool video!\n ' + `https://www.youtube.com/watch?v=${note.info.videoId}`
        break
      case 'todos':
        content = 'Todos: ' + note.info.todos.map((todo) => todo.txt).join(', ')
        break
    }
    return content 
  }

  function onSend(ev) {
    ev.preventDefault()

    const { target } = ev
    const recipient = target.recipient.value
    const title = target.title.value
    const content = target.content.value
    const updatedMail = {
      ...newMail,
      to: recipient,
      title,
      content,
    }
    mailService.save(updatedMail).then(() => navigate('/mail'))
  }

  function handleChange({ target }) {
    const field = target.name
    const value = target.value
    console.log(field)
    console.log(value)

    setNewMail((prevMail) =>
      // console.log(prevMail)
      ({ ...prevMail, [field]: value })
    )
  }
  function onBack() {
    navigate('/mail')
  }
  return (
    <React.Fragment>
      <form className="mail-compose flex column" onSubmit={onSend}>
        <div className="input-container flex align-center">
          <label className="flex center" htmlFor="recipient">
            <i class="fa-solid fa-envelope"></i>
          </label>
          <input onChange={handleChange} value={newMail.recipient} type="text" id="recipient" name="recipient" placeholder="Recipient..." />
        </div>
        <div className="input-container flex align-center">
          <label className="flex center" htmlFor="title">
            <i class="fa-solid fa-heading"></i>
          </label>
          <input onChange={handleChange} value={newMail.title} type="text" id="title" name="title" placeholder="Title..." />
        </div>
        <div className="input-container flex align-center">
          <textarea onChange={handleChange} value={newMail.content} type="text" id="content" name="content" placeholder="Hello!" />
        </div>
        <div className="mail-compose-buttons">
          <button className="back-btn flex center" onClick={onBack}>
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button className="submit-btn" type="submit">
            Send <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </React.Fragment>
  )
}
