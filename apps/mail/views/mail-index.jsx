import { MailTable } from './cmps/mail-table.jsx'
import { mailService } from '../services/mail.service.js'
import { MailPreview } from '../cmps/mail-preview.jsx'
import {MailFilter} from '../cmps/mail-filter.jsx'

const { useState, useEffect } = React
const { Link, useNavigate, useSearchParams } = ReactRouterDOM
const [searchParams, setSearchParams] = useSearchParams()
const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter(searchParams))

export function MailIndex() {
    const [mails, setMails] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        loadMails()
        setSearchParams (filterBy)

}, [filterBy])

    function loadMails() {
        mailService.query()
            .then(mails => {
                setMails(mails)
            })
    }

    function countUnread() {
        if (!mails || mails.length === 0) return

        let count = 0
        for (let i = 0; i < mails.length; i++) {
            console.log()
            if (!mails[i].isRead) count++
        }
        return count
    }
    function onCompose() {
        navigate(`/mail/compose`)
    }
    function onDeleteMail(mailId) {
      
        mailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)

        })
    }
    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    return (
        <section className="mail-index">
            <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <button className="compose" onClick={onCompose}> compose</button>
            <h5>unread mails:{countUnread()}</h5>
            mail app

            <MailTable mails={mails} onDeleteMail={onDeleteMail} />
        </section>
    )
}

