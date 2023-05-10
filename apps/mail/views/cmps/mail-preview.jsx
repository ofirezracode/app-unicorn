export function MailPreview({ mail }) {

    return (
        <section>
            <td>{mail.title}</td>
            <td>{mail.content}</td>
            <td>{mail.timeSent}</td>
        </section>
    )
}