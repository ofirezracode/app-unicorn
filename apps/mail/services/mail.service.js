// mail service
import {asyncStorageService} from '../../../services/async-storage.service.js'
import {storageService} from '../../../services/storage.service.js'

const MAIL_KEY='mailDB'
_createMails()
export const mailService = {
query,
}

function query (){
return asyncStorageService.query(MAIL_KEY)
.then(mails=>{
    return mails
})
}


function _createMails(){

 const   mails=[
    {
      "title": "Important Meeting Reminder",
      "content": "Dear all,\n\nThis is a friendly reminder about our upcoming meeting on Wednesday at 2 PM in the conference room. Please make sure to come prepared with any necessary materials.\n\nBest,\nJohn",
      "timeSent": "2022-01-03T14:00:00Z"
    },
    {
      "title": "New Product Launch",
      "content": "Hello,\n\nI wanted to let you know that our new product line will be launching next week. Please take a look at the attached press release for more information.\n\nBest,\nJane",
      "timeSent": "2022-01-05T10:30:00Z"
    },
    {
      "title": "Holiday Schedule",
      "content": "Dear employees,\n\nI hope you all had a wonderful holiday season. Please note that our office will be closed on Monday, January 3rd in observance of New Year's Day.\n\nBest,\nEmily",
      "timeSent": "2022-01-01T08:00:00Z"
    },
    {
      "title": "Urgent Request",
      "content": "Hi,\n\nI need your assistance with a time-sensitive matter. Please see the attached document for more information and let me know how you can help.\n\nThanks,\nMark",
      "timeSent": "2022-01-07T16:45:00Z"
    },
    {
      "title": "Monthly Report",
      "content": "Hello,\n\nPlease find attached the monthly report for December. Let me know if you have any questions or concerns.\n\nBest,\nSarah",
      "timeSent": "2022-01-02T09:00:00Z"
    },
    {
      "title": "Office Move",
      "content": "Dear all,\n\nI wanted to inform you that our office will be moving to a new location next month. Please see the attached memo for more information.\n\nBest,\nMike",
      "timeSent": "2022-01-06T11:15:00Z"
    },
    {
      "title": "Congratulations!",
      "content": "Hi,\n\nI just wanted to congratulate you on a job well done. Your hard work and dedication have not gone unnoticed.\n\nBest,\nJulie",
      "timeSent": "2022-01-08T13:00:00Z"
    },
    {
      "title": "Training Opportunity",
      "content": "Hello,\n\nI wanted to bring to your attention a training opportunity that I think would be beneficial for our team. Please see the attached flyer for more information.\n\nBest,\nTom",
      "timeSent": "2022-01-04T14:30:00Z"
    },
    {
      "title": "Reminder: Employee Evaluations",
      "content": "Dear employees,\n\nI wanted to remind you that employee evaluations are due by the end of the week. Please make sure to submit them to HR as soon as possible.\n\nBest,\nLinda",
      "timeSent": "2022-01-09T10:00:00Z"
    }]
    storageService.saveToStorage(MAIL_KEY,mails)
}