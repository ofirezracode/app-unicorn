import { TextLine } from '../../cmps/text-line.jsx'

export function MailPreview({ mail, onHandleClick, onToggleStar, onDeleteMail }) {
  return (
    <React.Fragment>
      <button onClick={() => onToggleStar(mail.id)}>
        {!mail.isStarred && <i className="fa-regular fa-star"></i>}
        {mail.isStarred && <i className="fa-solid fa-star"></i>}
      </button>
      <ul onClick={() => onHandleClick(mail.id)} className="mail-preview clean-list">
        <li className="mail-preview-title">
          {' '}
          <TextLine text={mail.title} length={30} />
        </li>
        <li className="mail-preview-content">
          <TextLine text={mail.content} length={90} />
        </li>
        <li className="mail-preview-time">{mail.timeSent}</li>
      </ul>
      <button onClick={() => onDeleteMail(mail.id)}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </React.Fragment>
  )
}
