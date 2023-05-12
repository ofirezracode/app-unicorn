import { googleBookService } from '../services/google-book.service.js'

import { BookAddRow } from '../cmps/book-add-row.jsx'

const { useState, useEffect } = React

export function BookAdd() {
  const [searchTerm, setSearchTerm] = useState('')
  const [books, setBooks] = useState([])
  const [message, setMessage] = useState('')

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => console.log('books', books), [books])

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchTerm) {
        setMessage('')
        searchBooks()
      }
    }, 1000)
    return () => {
      console.log('clear timeout')
      clearTimeout(debounce)
    }
  }, [searchTerm])

  function searchBooks() {
    googleBookService.query(searchTerm).then((res) => {
      setBooks(res.data.items)
      if (res.data.items.length === 0) {
        setMessage("Could'nt find any books by that name")
      }
    })
  }

  return (
    <section className="book-add view">
      <h2>Google Books Search</h2>
      <form>
        <input type="text" value={searchTerm} onChange={handleSearch} />
      </form>
      <ul className="book-add-list clean-list">
        {books.length > 0 &&
          books.map((book) => {
            return <BookAddRow key={book.id} book={book} />
          })}
      </ul>
      <p className="message">{message}</p>
    </section>
  )
}
