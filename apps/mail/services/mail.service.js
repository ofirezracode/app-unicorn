// mail service
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
_createMails()
export const mailService = {
  query,
  get,
  setReadMail,
  getEmptyMail,
  save,
  remove,
  getDefaultFilter,
  countMailType,
  star
}

function query(filterBy = {}) {
  return asyncStorageService.query(MAIL_KEY).then((mails) => {
    if (filterBy.searchBy) {
      const regExp = new RegExp(filterBy.searchBy, 'i')
      mails = mails.filter((mail) => regExp.test(mail.content || mail.title))
    }
    if (filterBy.isRead) {
      console.log(filterBy.isRead)
      let bool = 'true' === filterBy.isRead ? true : false
      mails = mails.filter((mail) => mail.isRead == bool)
    }
    return mails
  })
}

function get(mailId) {
  return asyncStorageService.get(MAIL_KEY, mailId)
}

function setReadMail(mailId) {
  asyncStorageService
    .query(MAIL_KEY)
    // let  mail=get(mailId)
    .then((mails) => {
      let mailIdx = mails.findIndex((mail) => mail.id === mailId)
      mails[mailIdx].isRead = true
      storageService.saveToStorage(MAIL_KEY, mails)
    })
  let mails = storageService.loadFromStorage(MAIL_KEY)
  // console.log(mail)
}
Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1
  return len > 0 ? new Array(len).join(chr || '0') + this : this
}
function getEmptyMail() {
  let d = new Date(),
    dformat =
      [d.getHours().padLeft(), d.getMinutes().padLeft(), d.getSeconds().padLeft()].join(':') +
      ' ' +
      [(d.getMonth() + 1).padLeft(), d.getDate().padLeft(), d.getFullYear()].join('/')
  return {
    id: '',
    title: '',
    from: '',
    to:'',
    content: '',
    timeSent: dformat,
    isRead: true,
    criteria: 'sent',
    isStarred: false,
  }
}
function save(mail) {
  if (mail.id) {
    return asyncStorageService.put(MAIL_KEY, mail)
  } else {
    return asyncStorageService.post(MAIL_KEY, mail)
  }
}

function remove(mailId) {
  return asyncStorageService.remove(MAIL_KEY, mailId)
}

function getDefaultFilter(searchParams = { get: () => {} }) {
  return {
    searchBy: searchParams.get('searchBy') || '',
    isRead: searchParams.get('isRead') || '',
  }
}
function countMailType(mails, prop) {
  mails=storageService.loadFromStorage(MAIL_KEY)
  if (!mails || mails.length === 0) return
  let count=0
  switch(prop){
    case 'criteria':
       count =mails.reduce((acc,mail)=> acc+= mail[prop]==='sent'?1:0,0)
      break
  case 'isRead':
    count = mails.reduce((acc, mail) => acc += !mail[prop], 0)
    break
  // const count = mails.reduce((acc, mail) => acc += !mail.isRead, 0)
  default:
   count = mails.reduce((acc, mail) => acc += mail[prop], 0)
}
  return count
}
function star(mailId) {
  return get(mailId).then((mail) => {
    mail.isStarred = !mail.isStarred
    return save(mail)
  })
}

function _createMails() {
  let mails = storageService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = [
      {
        id: '1a',
        title: 'Meeting Invitation',
        to:'user@mail.com',
        from: 'John Smith',
        content: 'Please join us for a meeting at 2 PM on Thursday.',
        timeSent: '12:30:00 2023/05/10',
        isRead: false,
        criteria: 'inbox',
        isStarred: false,
      },
      {
        id: '2b',
        title: 'New Job Offer',
        to:'user@mail.com',
        from: 'HR Department',
        content: 'We are pleased to offer you the position of Senior Software Engineer.',
        timeSent: '09:45:00 2023/05/09',
        isRead: false,
        criteria: 'inbox',
        isStarred: false,
      },
      {
        id: 'fsdg',
        title: 'Vacation Request',
        to:'user@mail.com',
        from: 'Jane Doe',
        content: 'I would like to request vacation time from June 1st to June 15th.',
        timeSent: '14:20:00 2023/05/08',
        isRead: false,
        criteria: 'inbox',
        isStarred: false,
      },
      {
        id: 'awsr',
        title: 'Product Launch',
        to:'user@mail.com',
        from: 'Marketing Department',
        content: 'We are excited to announce the launch of our new product line.',
        timeSent: '10:15:00 2023/05/07',
        isRead: false,
        criteria: 'inbox',
        isStarred: false,
      },
      {
        id: 'hjfr',
        title: 'Reminder: Project Deadline',
        to:'user@mail.com',
        from: 'Project Manager',
        content: 'This is a reminder that the project is due on Friday.',
        timeSent: '16:50:00 2023/05/06',
        isRead: false,
        criteria: 'inbox',
        isStarred: false,
      },
      {
        id: 'aewwe',
        title: 'Welcome Aboard!',
        to:'user@mail.com',
        from: 'HR Department',
        content: 'We are pleased to welcome you to our team.',
        timeSent: '11:30:00 2023/05/05',
        isRead: false,
        criteria: 'inbox',
        isStarred: false,
      },
      {
        id: 'ouiy',
        title: 'Password Reset',
        to:'user@mail.com',
        from: 'IT Department',
        content: 'You have requested a password reset. Please follow the link to reset your password.',
        timeSent: '13:20:00 2023/05/04',
        isRead: false,
        criteria: 'inbox',
        isStarred: false,
      },
      {
        id: 'vbfs',
        title: 'Feedback Request',
        to:'user@mail.com',
        from: 'Customer Service',
        content: 'We would appreciate your feedback on our service.',
        timeSent: '09:00:00 2023/05/03',
        isRead: false,
        criteria: 'inbox',
        isStarred: false,
      },
      {
        id: 'yrtyu',
        title: 'Travel Itinerary',
        to:'user@mail.com',
        from: 'Travel Agent',
        content: 'Please find attached your travel itinerary for your upcoming trip.',
        timeSent: '12:10:00 2023/05/02',
        isRead: false,
        criteria: 'inbox',
        isStarred: false,
      },
      {
        id: 'acaz',
        title: 'Job Application Confirmation',
        to:'user@mail.com',
        from: 'HR Department',
        content: 'Thank you for submitting your job application.',
        timeSent: '15:45:00 2023/05/01',
        isRead: false,
        criteria: 'inbox',
        isStarred: false,
      },
    ]
    storageService.saveToStorage(MAIL_KEY, mails)
  }
}
