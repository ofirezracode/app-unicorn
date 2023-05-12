import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  // useEffect(() => {
  //   onSetFilter(filterByToEdit)
  // }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  const { title, author, maxPrice } = filterByToEdit
  return (
    <section className="book-filter">
      <h2>Filters</h2>

      <form className="flex column" onSubmit={onSubmitFilter}>
        <label htmlFor="title">Title</label>
        <input value={title} onChange={handleChange} name="title" id="title" type="text" placeholder="Title" />
        <label htmlFor="author">Author</label>
        <input value={author} onChange={handleChange} type="text" name="author" id="author" placeholder="Author" />
        <label htmlFor="maxPrice"> Max Price: ({maxPrice})</label>
        <input onChange={handleChange} type="range" name="maxPrice" id="maxPrice" min="0" max="200" className="max-price-slider" />
        <button>Filter</button>
      </form>
    </section>
  )
}
