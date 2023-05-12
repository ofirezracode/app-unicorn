const { useState, useEffect } = React
export function MailFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }
  const { txt, minSpeed } = filterByToEdit
  return (
    <section className="mail-filter flex">
      <form className="flex align-center" onSubmit={onSubmitFilter}>
        <div className="input-container flex align-center">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            className="mail-filter-input"
            value={txt}
            onChange={handleChange}
            name="searchBy"
            id="searchBy"
            type="text"
            placeholder="Search..."
          />
        </div>
        <select value={minSpeed} onChange={handleChange} name="isRead" id="isRead">
          <option value="">All</option>
          <option value="true">Read</option>
          <option value="false">Unread</option>
        </select>
        {/* <label htmlFor="minSpeed">search by</label>
                <input value={minSpeed} onChange={handleChange} type="number" name="minSpeed" id="minSpeed" placeholder="By Min Speed" /> */}

        {/* <button>Filter Mails</button> */}
      </form>
    </section>
  )
}
