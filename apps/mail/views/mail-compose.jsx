import { mailService } from "../services/mail.service.js"

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailCompose() {

    const [newMail, setNewMail] = useState(mailService.getEmptyMail())
    const inputRef = useRef()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        console.log(params);
        if (params.mailId) loadMail()
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
    function handelChange({target}){
        const field = target.name
        const value=target.type
        
        setNewMail(prevMail=> (
            // console.log(prevMail)
            {...prevMail,[field]:value}
            ))
    }
    const {recipient,title,content}=newMail
    console.log(recipient,title,content)
    return (
        <form onSubmit={onSend}>
            <label htmlFor="recipient">Send to:</label>
            <input onChange={handelChange} value={recipient} type="text" id="recipient" name="recipient" />

            <label htmlFor="title">Title:</label>
            <input onChange={handelChange} value={title} type="text" id="title" name="title" />

            <label htmlFor="content">Message:</label>
            <input onChange={handelChange} value={content} type="text" id="content" name="content" />

            <button type="submit">Send</button>
        </form>
    )
}