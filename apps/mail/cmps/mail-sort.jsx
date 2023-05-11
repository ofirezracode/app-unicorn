export function MailSort({ onSetSort }) {

    function handleChange({ target }) {

    }
    return (
        <section>
            <label htmlFor="sort">Sort by: </label>
            <form id="sort" onChange={onSetSort}>

                <label htmlFor="none">none</label>
                <input type="radio" value="" id="none" name="sort"></input>

                <label htmlFor="title">Title</label>
                <input type="radio" value="title" id="title" name="sort"></input>
                
                <label htmlFor="time">Time sent</label>
                <input type="radio" value="time" id="time" name="sort"></input>



            </form>
            {/* <select id="sort" onChange={onSetSort}>
            <option value=''>None</option>
            <option value="title">Title</option>
            <option value="time"> Time sent</option>
        </select> */}
        </section>
    )
}