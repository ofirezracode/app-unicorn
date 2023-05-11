import {mailService} from "../services/mail.service.js"

const { Link, useNavigate } = ReactRouterDOM
const {useState}=React

export function MailCompose() {
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()
function onSend(ev){
   ev.preventDefault();

   const { target } = ev;
    const recipient = target.recipient.value;
    const title = target.title.value;
    const content = target.content.value;
    console.log(newMail)
    const updatedMail = { 
      ...newMail,
      to: recipient,
      title,
      content,
    //   timeSent,
    };


    mailService.save(updatedMail)
    .then(()=>navigate('/mail'))
  
    
}
    return (
        <form onSubmit={onSend}>
            <label htmlFor="recipient">Send to:</label>
            <input type="text" id="recipient" name="recipient" />

            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" />

            <label htmlFor="content">Message:</label>
            <input type="text" id="content" name="content" />

            <button type="submit">Send</button>
        </form>
    )
}