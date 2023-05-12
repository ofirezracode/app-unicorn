import { BookFilter } from '../cmps/book-filter.jsx'
import { BookList } from '../cmps/book-list.jsx'
import { BookDetails } from './book-details.jsx'
import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useEffect, useState } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy).then((books) => setBooks(books))
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }))
  }

  function onRemoveBook(bookId) {
    bookService.remove(bookId).then(() => {
      const updatedBooks = books.filter((book) => book.id !== bookId)
      setBooks(updatedBooks)
      showSuccessMsg(`Book (${bookId}) removed!`)
    })
  }

  return (
    <section className="book-index view">
      <React.Fragment>
        <Link className="add-book" to="/books/edit">
          Add Book
        </Link>
        <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <BookList books={books} onRemoveBook={onRemoveBook} />
      </React.Fragment>
    </section>
  )
}
