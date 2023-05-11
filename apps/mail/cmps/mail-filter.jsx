export function MailFilter({ filterBy, onSetFilter }) {
    
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }
    return (
        <section> <h2>Filter Mails</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange} name="txt" id="txt" type="text" placeholder="search for:" />
                <select>
                    <option value="">    </option>     <option value="true">Raed</option>
                    <option value="false">Unread</option>
                </select>
                <label htmlFor="minSpeed">Min Speed:</label>
                <input value={minSpeed} onChange={handleChange} type="number" name="minSpeed" id="minSpeed" placeholder="By Min Speed" />

                <button>Filter Cars</button>
            </form>
        </section>
    )
}