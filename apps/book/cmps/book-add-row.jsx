import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function BookAddRow({ book }) {
  let authors = ''
  if (book.volumeInfo.authors) {
    authors = book.volumeInfo.authors.join(', ')
  }

  function onAddBook() {
    bookService
      .addGoogleBook(book)
      .then(() => showSuccessMsg('Book added to collection'))
      .catch(() => {
        showErrorMsg('Book already exists')
      })
  }
  return (
    <li className="book-add-row">
      <p>{book.volumeInfo.title}</p>
      <p>Author(s): {authors}</p>
      <button onClick={onAddBook} className="add-book-button">
        +
      </button>
    </li>
  )
}
