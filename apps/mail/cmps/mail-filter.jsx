const { useState, useEffect } = React
export function MailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }
    const { txt, minSpeed } = filterByToEdit
    return (
        <section> <h2>Filter Mails</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange} name="searchBy" id="searchBy" type="text" placeholder="search for:" />
                <select value={minSpeed} onChange={handleChange}  name="isRead" id="isRead">
                    <option value="">    </option>
                    <option value= "true" >Raed</option>
                    <option value= "false" >Unread</option>
                </select>
                {/* <label htmlFor="minSpeed">search by</label>
                <input value={minSpeed} onChange={handleChange} type="number" name="minSpeed" id="minSpeed" placeholder="By Min Speed" /> */}

                <button>Filter Mails</button>
            </form>
        </section>
    )
}