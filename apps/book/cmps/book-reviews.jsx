import { BookReview } from './book-review.jsx'

export function BookReviews({ reviews, onDeleteReview }) {
  if (!reviews) return ''
  return (
    <ul className="book-reviews clean-list">
      {reviews.map((review) => (
        <li key={review.id}>
          <BookReview onDeleteReview={onDeleteReview} review={review} />
        </li>
      ))}
    </ul>
  )
}
