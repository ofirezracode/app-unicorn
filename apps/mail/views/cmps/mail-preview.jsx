export function MailPreview({ mail, onHandleClick, onToggleStar, onDeleteMail }) {
  return (
    <React.Fragment>
      <button onClick={() => onToggleStar(mail.id)}>
        {!mail.isStarred && <i className="fa-regular fa-star"></i>}
        {mail.isStarred && <i className="fa-solid fa-star"></i>}
      </button>
      <ul onClick={() => onHandleClick(mail.id)} className="mail-preview clean-list">
        <li className="mail-title">{mail.title}</li>
        
        <li className="mail-content">{ mail.content.length>50?mail.content.substring(0,50)+'...':mail.content }</li>
        <li className="mail-time">{mail.timeSent}</li>
      </ul>
        <button onClick={() => onDeleteMail(mail.id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
    </React.Fragment>
  )
}
