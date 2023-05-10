
const { useState, useEffect } = React
import { mailService } from "../../services/mail.service.js"
import {MailPreview} from "../cmps/mail-preview.jsx"
export function MailTable() {
    const [mails, setMails] = useState([])
    useEffect(()=>(
        mailService.query()
        .then(mails => {
            setMails(mails)
        }) 
    ),[])
     
    console.log(mails)
    return (
        <table>
            {mails.map(mail=>(
               <tr> <MailPreview mail={mail}/></tr>
            ))}
        </table>
    )
}