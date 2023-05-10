import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useEffect, useState } = React

export function MailContent() {
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
    console.log(mail, mailId)
    if (!mail) return <h1>loading mail </h1>
    return (
        <section >
            <h1>baba</h1>
            <h1>{mail.content}</h1>

        </section>
    )
}