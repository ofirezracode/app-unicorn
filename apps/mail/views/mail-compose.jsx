import { mailService } from '../services/mail.service.js'

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

  const inputRef = useRef()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (params.mailId) loadMail()
    setNewMail(() => ({ ...mailService.getEmptyMail() }))
  }, [])

  function loadMail() {
    mailService.get(params.mailId).then(setNewMail)
  }

  function onSend(ev) {
    ev.preventDefault()

    const { target } = ev
    const recipient = target.recipient.value
    const title = target.title.value
    const content = target.content.value
    console.log(newMail)
    const updatedMail = {
      ...newMail,
      to: recipient,
      title,
      content,
      //   timeSent,
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

  return (
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
      <button type="submit">
        Send <i className="fa-solid fa-paper-plane"></i>
      </button>
    </form>
  )
}
