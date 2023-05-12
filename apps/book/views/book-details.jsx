import { bookService } from '../services/book.service.js'
import { BookReviews } from '../cmps/book-reviews.jsx'

const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

export function BookDetails() {
  const [book, setBook] = useState(null)
  const [adjBooksIds, setAdjBooksIds] = useState({ nextBookId: '', prevBookId: '' })
  const { bookId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
    loadAdjBooksIds()
  }, [bookId])

  function loadBook() {
    bookService
      .get(bookId)
      .then((book) => {
        console.log('book in load book', book)
        setBook(book)
      })
      .catch((err) => {
        console.log('Had issued in book details:', err)
        navigate('/books')
      })
  }

  let tags = []
  let priceClass = ''
  if (book) {
    const typeOfReading = bookService.getTypeOfReading(book.pageCount)
    if (typeOfReading) {
      tags.push(
        <span key="typeOfReading" className="tag">
          {typeOfReading}
        </span>
      )
    }
    const publishedDateCondition = bookService.getPublishedDateCondition(book.publishedDate)
    if (publishedDateCondition) {
      tags.push(
        <span key="publishedDateCondition" className="tag">
          {publishedDateCondition}
        </span>
      )
    }

    if (book.listPrice.amount > 150) {
      priceClass = 'high'
    } else if (book.listPrice.amount < 20) {
      priceClass = 'low'
    }
  }

  function loadAdjBooksIds() {
    bookService.loadAdjBooksIds(bookId).then(setAdjBooksIds)
  }

  function onDeleteReview(reviewId) {
    bookService.deleteReview(book.id, reviewId).then(() => {
      const reviews = book.reviews.filter((review) => review.id !== reviewId)
      setBook({ ...book, reviews })
      showSuccessMsg(`Review Deleted`)
    })
  }

  function onBack() {
    navigate('/books')
  }

  if (!book) return <div>Loading...</div>

  return (
    <section className="book-details view">
      <section className="book-details-buttons">
        <button className="back" onClick={onBack}>
          Back
        </button>
        <Link className="prev-book" to={`/books/${adjBooksIds.prevBookId}`}>
          Previous Book
        </Link>
        <Link className="next-book" to={`/books/${adjBooksIds.nextBookId}`}>
          Next Book
        </Link>
      </section>
      <article className="book-details-container">
        <img src={book.thumbnail} alt="" />
        <div className="book-details-info">
          <div className="book-title-container flex justify-between">
            <h2>{book.title}</h2>
            <p className={`book-price ${priceClass} flex align-center`}>{bookService.getPrice(book)}</p>
          </div>
          <p>{book.subtitle}</p>
          <p>{book.authors}</p>
          <p>{book.description}</p>
          <p>Published at {book.publishedDate}</p>
          <p>Page count: {book.pageCount}</p>
          <p>Language: {bookService.getLanguage(book)}</p>
          <ul className="book-details-tags clean-list">{tags}</ul>
          <Link className="review-button" to={`/books/review/${book.id}`}>
            Add a review
          </Link>
        </div>
      </article>
      <BookReviews onDeleteReview={onDeleteReview} reviews={book.reviews} />
    </section>
  )
}
