export function MailPreview({ mail, onHandleClick }) {
  return (
    <ul onClick={() => onHandleClick(mail.id)} className="mail-preview clean-list">
      <li className="mail-title">{mail.title}</li>
      <li className="mail-content">{mail.content}</li>
      <li className="mail-time">{mail.timeSent}</li>
    </ul>
  )
}
