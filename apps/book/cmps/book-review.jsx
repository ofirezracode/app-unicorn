export function BookReview({ review, onDeleteReview }) {
  console.log('review', review)
  return (
    <article className="book-review">
      <p className="full-name">{review.fullName} said:</p>
      <p className="text">{review.text}</p>
      <p className="read-at">Read at: {review.readAt}</p>
      <p className="rating">{review.rating}/5 Rating</p>
      <button onClick={() => onDeleteReview(review.id)}>Delete</button>
    </article>
  )
}
