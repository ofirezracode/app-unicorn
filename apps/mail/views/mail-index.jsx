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
    const [isCollapsed, setIsCollapsed] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
    }, [filterBy, sort, folder])

    function loadMails() {
        console.log(folder)
        mailService.query(filterBy).then((mails) => {
            if (folder==='starred') mails=mails.filter((mail)=>mail.isStarred)
          else  mails = mails.filter((mail) => mail.criteria === folder)
            if (sort === 'title') mails.sort((a, b) => (a.title > b.title ? -1 : 1))
            if (sort === 'time') mails.sort((a, b) => (a.timeSent > b.timeSent ? -1 : 1))
            // mails.sort((a,b,)=> a.sort>b.sort? -1:1)
            setMails(mails)
        })
    }

    function onCompose() {
        navigate(`/mail/compose`)
    }
    function onDeleteMail(mailId) {
        mailService.remove(mailId).then(() => {
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

    function onToggleStar(mailId) {
        mailService.star(mailId)
        .then(loadMails)
    }

    return (
        <section className={`mail-index mail-index-layout ${isCollapsed ? 'collapsed' : ''}`}>
            <MailFolder onSetFolder={onSetFolder} folder={folder} isCollapsed={isCollapsed} mails={mails} />
            <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <MailSort onSetSort={onSetSort} />
            <div className="mail-index-buttons">
                <button className="flex align-center justify-center compose" onClick={onCompose}>
                    <i className="fa-solid fa-pencil"></i>
                    <p className={`${isCollapsed ? 'collapsed' : ''}`}>Compose</p>
                </button>
                <button onClick={() => setIsCollapsed((prev) => !prev)} className="flex align-center collapse">
                    <p className={`${isCollapsed ? 'collapsed' : ''}`}>Collapse</p>
                    <i className={`fa-solid fa-angles-right ${isCollapsed ? '' : 'hidden'}`}></i>
                    <i className={`fa-solid fa-angles-left ${isCollapsed ? 'hidden' : ''}`}></i>
                </button>
            </div>
            <MailTable mails={mails} onDeleteMail={onDeleteMail} onToggleStar={onToggleStar} />
        </section>
    )
}
