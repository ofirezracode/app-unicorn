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
// console.log(mailService.countUnread(mails))
  return (
    <ul className="mail-table clean-list flex column">
      {mails.map((mail) => (
        <li className={`mail-item ${mail.isRead ? 'read-mail' : ''} flex`} key={mail.id}>
          
          <MailPreview mail={mail} onDeleteMail={onDeleteMail} onHandleClick={onHandleClick} onToggleStar={onToggleStar} />
          
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
