export function MailFolder({ onSetFolder, folder, isCollapsed }) {
  return (
    <section className={`mail-folder flex column ${isCollapsed ? 'collapsed' : ''}`}>
      <button className={`${folder} inbox-folder-button flex align-center`} onClick={() => onSetFolder('inbox')}>
        <i className="fa-solid fa-inbox"></i>
        <p className={`${isCollapsed ? 'collapsed' : ''}`}>Inbox {}</p>
      </button>
      <button className={`${folder} sent-folder-button flex align-center`} onClick={() => onSetFolder('sent')}>
        <i className="fa-solid fa-paper-plane"></i>
        <p className={`${isCollapsed ? 'collapsed' : ''}`}>Sent</p>
      </button>
      <button className={`${folder} starred-folder-button flex align-center`} onClick={() => onSetFolder('starred')}>
        <i className="fa-solid fa-paper-plane"></i>
        <p className={`${isCollapsed ? 'collapsed' : ''}`}>Starred</p>
      </button>
    </section>
  )
}
