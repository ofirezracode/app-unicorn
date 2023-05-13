import { mailService } from '../services/mail.service.js'

const { useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM
const { useEffect, useState } = React

export function MailContent() {
  const navigate = useNavigate()
  const { mailId } = useParams()
  const [mail, setMail] = useState(null)
  useEffect(() => {
    loadMail()
  }, [])
  function loadMail() {
    mailService.get(mailId).then(setMail).catch()
  }
  function onBack() {
    navigate('/mail')
  }
  function onReply() {
    navigate(`/mail/compose/?book=${mail.id}`)
  }

  if (!mail) return <p className="mail-content">loading mail </p>
  return (
    <section className="mail-content">
      <button className="back flex align-center" onClick={onBack}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <h2>{mail.title}</h2>
      <h3> From: {mail.from}</h3>
      <p>Sent at: {mail.timeSent}</p>
      <p>{mail.content}</p>
      <div className="mail-content-buttons flex align-center">
        <Link className="flex align-center" to={`/note/${mail.id}`}>
          <i className="fa-solid fa-note-sticky"></i>
        </Link>
        <button className="flex align-center" onClick={onReply}>
          <i className="fa-solid fa-reply"></i>
        </button>
      </div>
    </section>
  )
}
