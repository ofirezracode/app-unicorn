const { useState, useEffect } = React
const { Link, useNavigate } = ReactRouterDOM

import { mailService } from '../../services/mail.service.js'
import { MailPreview } from '../cmps/mail-preview.jsx'

export function MailTable({ mails, onDeleteMail, onToggleStar }) {
  // const [mails, setMails] = useState([])
  const navigate = useNavigate()
  // useEffect(() => (
  //     loadMails()
  // ), [])

  // function loadMails() {
  //     mailService.query()
  //         .then(mails => {
  //             setMails(mails)
  //         })
  // }

  function onHandleClick(id) {
    mailService.setReadMail(id)
    // ReadMail(id)
    navigate(`/mail/${id}`)
  }

  // function ReadMail(id){

  // }
  console.log(mailService.countUnread(mails))
  return (
    <ul className="mail-table clean-list flex column">
      {mails.map((mail) => (
        <li className={`mail-item ${mail.isRead ? 'read-mail' : ''} flex`} key={mail.id}>
          <div onClick={() => onToggleStar(mail.id)}>
            {!mail.isStarred && <i className="fa-regular fa-star"></i>}
            {mail.isStarred && <i className="fa-solid fa-star"></i>}
          </div>
          <MailPreview mail={mail} onHandleClick={onHandleClick} />
          <div>
            <button onClick={() => onDeleteMail(mail.id)}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
{
  /* </li>
 <li>
      {!mail.isMarked && '⬜'}
 {mail.isMarked && '✔'}
 </li>

 <li key={mail.id}  onClick={() => onHandleClick(mail.id)}  >  
     <MailPreview mail={mail} />
     </li>

     <li> {!mail.isRead && '🔵'}
     {mail.isRead && '⚪'}
     </li>

    <li>
     <button onClick={()=>console.log('hey')}>🗑</button>
     </li> */
}
