import { mailService } from '../services/mail.service.js'
export function MailFolder({ onSetFolder, folder, isCollapsed, mails }) {
  return (
    <section className={`mail-folder flex column ${isCollapsed ? 'collapsed' : ''}`}>
      <button className={`${folder} inbox-folder-button flex align-center`} onClick={() => onSetFolder('inbox')}>
        <i className="fa-solid fa-inbox"></i>
        <p className={`${isCollapsed ? 'collapsed' : ''}`}>Inbox { }</p>
        {mailService.countMailType(mails, 'isRead')}
      </button>
      <button className={`${folder} sent-folder-button flex align-center`} onClick={() => onSetFolder('sent')}>
        <i className="fa-solid fa-paper-plane"></i>
        <p className={`${isCollapsed ? 'collapsed' : ''}`}>Sent</p>
        {mailService.countMailType(mails, 'criteria')}
      </button>
      <button className={`${folder} starred-folder-button flex align-center`} onClick={() => onSetFolder('starred')}>
        <i className="fa-solid fa-star"></i>
        <p className={`${isCollapsed ? 'collapsed' : ''}`}>Starred </p>
        {mailService.countMailType(mails, 'isStarred')}
      </button>
    </section>
  )
}
