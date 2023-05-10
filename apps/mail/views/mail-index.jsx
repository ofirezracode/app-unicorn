import { MailTable } from "./cmps/mail-table.jsx"
import { mailService } from "../../services/mail.service.js"
import { MailPreview } from "../cmps/mail-preview.jsx"

const { useState, useEffect } = React
const { Link, useNavigate } = ReactRouterDOM

export function MailIndex() {
    const [mails, setMails] = useState([])
    const navigate = useNavigate()
    useEffect(() => (
        loadMails()
      
    ), [])

    function loadMails() {
        mailService.query()
            .then(mails => {
                setMails(mails)
            })
    }

    function countUnread() {
        if (!mails||mails.length===0) return
       
        let count = 0
        for (let i = 0; i < mails.length; i++) {
            console.log()
            if (!mails[i].isRead) count++
        }
        return count
    }
    function onCompose(){
        navigate(`/mail/compose`)
    }

    return (
        <section className="mail-index">
            <button className="compose" onClick={onCompose}> compose</button>
            <h5>unread mails:{countUnread()}</h5>
            mail app

            <MailTable mails={mails} />
        </section>
    )
}

