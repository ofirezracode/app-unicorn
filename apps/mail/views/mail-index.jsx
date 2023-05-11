import { MailTable } from './cmps/mail-table.jsx'
import { mailService } from '../services/mail.service.js'
// import { MailPreview } from '../cmps/mail-preview.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import {MailSort} from '../cmps/mail-sort.jsx'

const { useState, useEffect } = React
const { Link, useNavigate, useSearchParams } = ReactRouterDOM

export function MailIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter(searchParams))
  const [mails, setMails] = useState([])
  const [sort,setSort]= useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    loadMails()
    setSearchParams(filterBy)
  }, [filterBy,sort])

  function loadMails() {
console.log(filterBy)
    mailService.query(filterBy).then((mails) => {
     if   (sort==='title')mails.sort((a,b)=> a.title>b.title? -1:1)
     if   (sort==='time')mails.sort((a,b)=> a.timeSent> b.timeSent? -1:1)
        // mails.sort((a,b,)=> a.sort>b.sort? -1:1)
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
      const updatedMails = mails.filter((mail) => mail.id !== mailId)
      setMails(updatedMails)
    })
  }
  function onSetFilter(filterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }))
  }

function onSetSort({target}){
      const newSort=target.value
      console.log(sort,newSort)
      setSort(newSort)
    loadMails()
    // const field = target.name
    // const value = target.type === 'number' ? (+target.value || '') : target.value
    // setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
}
  return (
    <section className="mail-index">
      <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <MailSort onSetSort={onSetSort}/>
      <button className="compose" onClick={onCompose}>
        {' '}
        compose
      </button>
      <h5>unread mails:{countUnread()}</h5>
      mail app
      <MailTable mails={mails} onDeleteMail={onDeleteMail} />
    </section>
  )
}
