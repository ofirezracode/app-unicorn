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
    const message = target.message.value;

    const updatedMail = {
      ...newMail,
      to: recipient,
      title: title,
      content: message,
    //   timeSent
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

            <label htmlFor="message">Message:</label>
            <input type="text" id="message" name="message" />

            <button type="submit">Send</button>
        </form>
    )
}