export function MailPreview({ mail }) {

    return (
        <ul>
            <li>{mail.title}</li>
            <li>{mail.content}</li>
            <li>{mail.timeSent}</li>
        </ul>
    )
}