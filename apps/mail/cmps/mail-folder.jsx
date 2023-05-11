export function MailFolder({onSetFolder}){

    return(
        <section>
        <button onClick={()=>onSetFolder('inbox')}>inbox</button>
        <button onClick={()=>onSetFolder('sent')}>sent</button>
        </section>
    )
}