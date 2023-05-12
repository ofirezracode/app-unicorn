import { MailTable } from './cmps/mail-table.jsx'
import { mailService } from '../services/mail.service.js'
// import { MailPreview } from '../cmps/mail-preview.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailSort } from '../cmps/mail-sort.jsx'
import { MailFolder } from '../cmps/mail-folder.jsx'

const { useState, useEffect } = React
const { Link, useNavigate, useSearchParams } = ReactRouterDOM

export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter(searchParams))
    const [mails, setMails] = useState([])
    const [sort, setSort] = useState(null)
    const [folder, setFolder] = useState('inbox')
    const navigate = useNavigate()
    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
    }, [filterBy, sort, folder])

    function loadMails() {
        console.log(folder)
        mailService.query(filterBy).then((mails) => {

            mails = mails.filter(mail => mail.criteria === folder)
            if (sort === 'title') mails.sort((a, b) => a.title > b.title ? -1 : 1)
            if (sort === 'time') mails.sort((a, b) => a.timeSent > b.timeSent ? -1 : 1)
            // mails.sort((a,b,)=> a.sort>b.sort? -1:1)
            setMails(mails)
        })
    }


    function onCompose() {
        navigate(`/mail/compose`)
    }
    function onDeleteMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                const updatedMails = mails.filter((mail) => mail.id !== mailId)
                setMails(updatedMails)
            })
    }
    function onSetFilter(filterBy) {
        setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }))
    }
    function onSetFolder(folder) {
        setFolder(folder)
    }

    function onSetSort({ target }) {
        const newSort = target.value
        setSort(newSort)
        loadMails()
    }
    function onToggelStar(mailId) {
        mailService.star(mailId)
        // .then(console.log)
            // .then(loadMails)
    }

return (
    <section className="mail-index">
        <MailFolder onSetFolder={onSetFolder} />
        <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <MailSort onSetSort={onSetSort} />
        <button className="compose" onClick={onCompose}>
            {' '}
            compose
        </button>
        <h5>unread mails:{mailService.countUnread(mails)}</h5>
        mail app
        <MailTable mails={mails} onDeleteMail={onDeleteMail} onToggelStar={onToggelStar} />
    </section>
)
}
