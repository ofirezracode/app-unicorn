const { Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'

export function BookPreview({ book, onRemoveBook }) {
  return (
    <article className="book-preview">
      <img src={book.thumbnail} alt="" />
      <div className="book-preview-content flex column">
        <div className="book-preview-info">
          <h2>{book.title}</h2>
          <p className="book-price">{bookService.getPrice(book)}</p>
        </div>
        <p className="book-authors">{book.authors}</p>
        <section className="buttons flex">
          <button onClick={() => onRemoveBook(book.id)}>Remove</button>
          <button>
            <Link to={`/books/${book.id}`}>Select</Link>
          </button>
          <button>
            <Link to={`/books/edit/${book.id}`}>Edit</Link>
          </button>
        </section>
      </div>
    </article>
  )
}
