import { mailService } from "../services/mail.service.js"

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

        mailService.get(mailId)
            .then(setMail)
            .catch()
    }
    function onBack(){
        navigate('/mail')
    }
    console.log(mail, mailId)
    if (!mail) return <h1>loading mail </h1>
    return (
        <section >
          
            <h2>{mail.title}</h2>
            <h4> From: {mail.from}</h4>
            <h1>Sent at: {mail.timeSent}</h1>
            <h3>{mail.content}</h3>
            <button onClick={onBack}>back</button>

        </section>
    )
}