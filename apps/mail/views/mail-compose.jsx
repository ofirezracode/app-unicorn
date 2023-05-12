import { mailService } from "../services/mail.service.js"

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailCompose() {

    const [newMail, setNewMail] = useState({
        id: '',
        title: '',
        from: '',
        content: ''
    })
    // const [recipient, setRecipient] = use(newMail.recipient)
    // const [title, setTitle] = use(newMail.title)
    // const [content, setContent] = use(newMail.content)

    const inputRef = useRef()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.mailId) loadMail()
        setNewMail(() => ({ ...mailService.getEmptyMail() }))
    }, [])

    function loadMail() {
        mailService.get(params.mailId)
            .then(setNewMail)
    }

    function onSend(ev) {
        ev.preventDefault()

        const { target } = ev
        const recipient = target.recipient.value
        const title = target.title.value
        const content = target.content.value
        console.log(newMail)
        const updatedMail = {
            ...newMail,
            to: recipient,
            title,
            content,
            //   timeSent,
        }
        mailService.save(updatedMail)
            .then(() => navigate('/mail'))
    }
    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        console.log(field);
        console.log(value);

        setNewMail(prevMail => (
            // console.log(prevMail)
            { ...prevMail, [field]: value }
        ))
    }

    return (
        <form onSubmit={onSend}>
            <label htmlFor="recipient">Send to:</label>
            <input onChange={handleChange} value={newMail.recipient} type="text" id="recipient" name="recipient" />

            <label htmlFor="title">Title:</label>
            <input onChange={handleChange} value={newMail.title} type="text" id="title" name="title" />

            <label htmlFor="content">Message:</label>
            <input onChange={handleChange} value={newMail.content} type="text" id="content" name="content" />

            <button type="submit">Send</button>
        </form>
    )
}