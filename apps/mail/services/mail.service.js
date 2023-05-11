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
}

function query(filterBy = {}) {

  return asyncStorageService.query(MAIL_KEY)
    .then(mails => {
     
      if (filterBy.searchBy) {
        const regExp = new RegExp(filterBy.searchBy, 'i')
        mails = mails.filter(mail => regExp.test(mail.content || mail.title))
        
      }
      if (filterBy.isRead){
        console.log(filterBy.isRead)
        let bool=("true"===filterBy.isRead)?true:false
        mails=mails.filter(mail=> mail.isRead==bool)

      }
      return mails
    } )
}

function get(mailId) {
  return asyncStorageService.get(MAIL_KEY, mailId)
}

function setReadMail(mailId) {
  asyncStorageService.query(MAIL_KEY)
    // let  mail=get(mailId)
    .then((mails) => {
      let mailIdx = mails.findIndex(mail => mail.id === mailId)
      mails[mailIdx].isRead = true
      storageService.saveToStorage(MAIL_KEY, mails)
    })
  let mails = storageService.loadFromStorage(MAIL_KEY)
  // console.log(mail)
}
function getEmptyMail() {
  return { id: '', title: '', from: '', content: '', timeSent: new Date, isRead: true, criteria:'sent' }
}
function save(mail) {
  return asyncStorageService.post(MAIL_KEY, mail)
}

function remove(mailId) {
  return asyncStorageService.remove(MAIL_KEY, mailId)
}

function getDefaultFilter(searchParams = { get: () => { } }) {
  
  return {
    searchBy: searchParams.get('searchBy') || '',
    isRead: searchParams.get('isRead') || ''
  }
}

function _createMails() {
  let mails = storageService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = [
      {
        id: '1a',
        title: "Meeting Invitation",
        from: "John Smith",
        content: "Please join us for a meeting at 2 PM on Thursday.",
        timeSent: "2023-05-10T12:30:00Z",
        isRead: false,
        criteria: 'inbox'
      },
      {
        id: '2b',
        title: "New Job Offer",
        from: "HR Department",
        content: "We are pleased to offer you the position of Senior Software Engineer.",
        timeSent: "2023-05-09T09:45:00Z",
        isRead: false,
        criteria: 'inbox'
      },
      {
        id: 'fsdg',
        title: "Vacation Request",
        from: "Jane Doe",
        content: "I would like to request vacation time from June 1st to June 15th.",
        timeSent: "2023-05-08T14:20:00Z",
        isRead: false,
        criteria: 'inbox'
      },
      {
        id: 'awsr',
        title: "Product Launch",
        from: "Marketing Department",
        content: "We are excited to announce the launch of our new product line.",
        timeSent: "2023-05-07T10:15:00Z",
        isRead: false,
        criteria: 'inbox'
      },
      {
        id: 'hjfr',
        title: "Reminder: Project Deadline",
        from: "Project Manager",
        content: "This is a reminder that the project is due on Friday.",
        timeSent: "2023-05-06T16:50:00Z",
        isRead: false,
        criteria: 'inbox'
      },
      {
        id: 'aewwe',
        title: "Welcome Aboard!",
        from: "HR Department",
        content: "We are pleased to welcome you to our team.",
        timeSent: "2023-05-05T11:30:00Z",
        isRead: false,
        criteria: 'inbox'
      },
      {
        id: 'ouiy',
        title: "Password Reset",
        from: "IT Department",
        content: "You have requested a password reset. Please follow the link to reset your password.",
        timeSent: "2023-05-04T13:20:00Z",
        isRead: false,
        criteria: 'inbox'
      },
      {
        id: 'vbfs',
        title: "Feedback Request",
        from: "Customer Service",
        content: "We would appreciate your feedback on our service.",
        timeSent: "2023-05-03T09:00:00Z",
        isRead: false,
        criteria: 'inbox'
      },
      {
        id: 'yrtyu',
        title: "Travel Itinerary",
        from: "Travel Agent",
        content: "Please find attached your travel itinerary for your upcoming trip.",
        timeSent: "2023-05-02T12:10:00Z",
        isRead: false,
        criteria: 'inbox'
      },
      {
        id: 'acaz',
        title: "Job Application Confirmation",
        from: "HR Department",
        content: "Thank you for submitting your job application.",
        timeSent: "2023-05-01T15:45:00Z",
        isRead: false,
        criteria: 'inbox'
      }
    ];
    storageService.saveToStorage(MAIL_KEY, mails)
  }
}