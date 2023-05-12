export function MailFolder({ onSetFolder }) {
  return (
    <section className="mail-folder">
      <button onClick={() => onSetFolder('inbox')}>inbox</button>
      <button onClick={() => onSetFolder('sent')}>sent</button>
    </section>
  )
}
