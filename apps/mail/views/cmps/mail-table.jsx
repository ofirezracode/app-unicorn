const { useState, useEffect } = React
const { Link, useNavigate } = ReactRouterDOM

import { mailService } from '../../services/mail.service.js'
import { MailPreview } from '../cmps/mail-preview.jsx'

export function MailTable({ mails, onDeleteMail,onToggelStar }) {

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

  function onHandelClick(id) {
    mailService.setReadMail(id)
    // ReadMail(id)
    navigate(`/mail/${id}`)
  }

  // function ReadMail(id){

  // }

  return (
    <ul className="mail-table">
      {mails.map((mail) => (
        <li key={mail.id}>
                    <div onClick={()=>onToggelStar(mail.id)}>
                        {!mail.isStared && <i class="fa-regular fa-star"></i>}
                        {mail.isStared && <i class="fa-solid fa-star"></i>}
                    </div>
          <div>
            {!mail.isMarked && '⬜'}
            {mail.isMarked && '✔'}
          </div>
          <div onClick={() => onHandelClick(mail.id)}>
            <MailPreview mail={mail} />
          </div>
          <div>
            {!mail.isRead && '🔵'}
            {mail.isRead && '⚪'}
          </div>
          <div>
            <button onClick={() => onDeleteMail(mail.id)}>🗑</button>
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

 <li key={mail.id}  onClick={() => onHandelClick(mail.id)}  >  
     <MailPreview mail={mail} />
     </li>

     <li> {!mail.isRead && '🔵'}
     {mail.isRead && '⚪'}
     </li>

    <li>
     <button onClick={()=>console.log('hey')}>🗑</button>
     </li> */
}
