export function MailPreview({ mail, onHandleClick, onToggleStar, onDeleteMail }) {
  return (
    <React.Fragment>
      <button onClick={() => onToggleStar(mail.id)}>
        {!mail.isStarred && <i className="fa-regular fa-star"></i>}
        {mail.isStarred && <i className="fa-solid fa-star"></i>}
      </button>
      <ul onClick={() => onHandleClick(mail.id)} className="mail-preview clean-list">
        <li className="mail-preview-title">{mail.title}</li>
        <li className="mail-preview-content">{mail.content}</li>
        <li className="mail-preview-time">{mail.timeSent}</li>
      </ul>
      <button onClick={() => onDeleteMail(mail.id)}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </React.Fragment>
  )
}
