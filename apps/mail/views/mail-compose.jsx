import { mailService } from "../services/mail.service.js"
import { noteService } from "../../note/services/note.service.js"

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
        if (params.noteId) loadNote()
        setNewMail(() => ({ ...mailService.getEmptyMail() }))

    }, [])

    function loadNote() {
        noteService.get(params.noteId)
            .then(note => {
                console.log(note)
                const newMail = {
                    title: note.info.title,
                    content: getcontent(note)
                }
                setNewMail(newMail)
            })

    }
    function getcontent(note) {
        let content = ''
        switch (note.type) {
            case 'txt':
                content = note.info.txt
                break
            case 'img':
                content ='Check out this photo I found online\n '+ note.info.url
                break
            case 'video':
                content ='Check out this cool video!\n '+ `https://www.youtube.com/watch?v=${note.info.videoId}`
                break
            case 'todos':
                content ='Todos: '+ note.info.todos.map(todo => todo.txt).join(', ')
                break
        }
        return content
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