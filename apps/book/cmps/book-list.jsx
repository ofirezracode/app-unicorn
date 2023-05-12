import { BookPreview } from './book-preview.jsx'

export function BookList({ books, onRemoveBook }) {
  return (
    <ul className="book-list clean-list">
      {books.map((book) => (
        <li className="book-item" key={book.id}>
          <BookPreview book={book} onRemoveBook={onRemoveBook} />
        </li>
      ))}
    </ul>
  )
}
