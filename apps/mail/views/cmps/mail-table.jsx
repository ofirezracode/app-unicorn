const { useState, useEffect } = React
const { Link, useNavigate } = ReactRouterDOM


import { mailService } from "../../services/mail.service.js"
import { MailPreview } from "../cmps/mail-preview.jsx"

export function MailTable({mails}) {

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
        <ul >
            {mails.map(mail => (
                <li key={mail.id} onClick={() => onHandelClick(mail.id)} >
                    <MailPreview mail={mail} />
                    {!mail.isRead && '🔵'}
                    {mail.isRead && '⚪'}
                </li>
            ))}
        </ul>
    )
}