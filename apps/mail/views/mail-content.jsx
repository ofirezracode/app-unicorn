import { mailService } from '../services/mail.service.js'

const { useParams, useNavigate, Link } = ReactRouterDOM
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
 function  onReply(){
  navigate(`/mail/compose/${mail.id}`)
 }
 
  if (!mail) return <p className="mail-content">loading mail </p>
  return (
    <section className="mail-content">
      <button onClick={onReply} >
        reply <i class="fa-solid fa-reply"></i>
        </button>
      <h2>{mail.title}</h2>
      <h3> From: {mail.from}</h3>
      <p>Sent at: {mail.timeSent}</p>
      <p>{mail.content}</p>
      <button className="flex align-center" onClick={onBack}>
        <i class="fa-solid fa-chevron-left"></i>
        <p>Back</p>
      </button>
      
      <Link to={`/note/${mail.id}`}>
          save as note
        </Link>
    </section>
  )
}
