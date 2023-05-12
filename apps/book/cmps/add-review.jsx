const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function AddReview() {
  const [review, setReview] = useState({
    fullName: '',
    text: '',
    rating: 5,
    readAt: '2023-01-01',
  })

  const navigate = useNavigate()
  const params = useParams()

  function onSaveReview(ev) {
    ev.preventDefault()
    console.log('review', review)

    if (!review.fullName.trim() || !review.text.trim()) {
      showErrorMsg('Please fill all fields')
      return
    }

    bookService.addReview(params.bookId, review).then(() => {
      showSuccessMsg(`Review saved!`)
      setTimeout(() => navigate(`/books/${params.bookId}`), 1500)
      // navigate(`/books/${params.bookId}`)
    })
  }

  function handleChange({ target }) {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    setReview((prevState) => ({ ...prevState, [field]: value }))
  }

  if (!params.bookId) {
    navigate('/books')
  }

  return (
    <section className="add-review view">
      <h2>Write your review</h2>

      <form className="flex column" onSubmit={onSaveReview}>
        <label htmlFor="fullName">Full name:</label>
        <input onChange={handleChange} value={review.fullName} type="text" name="fullName" id="fullName" />

        <label htmlFor="text">Review:</label>
        <textarea className="review" onChange={handleChange} value={review.text} type="textarea" name="text" id="text" rows="4" cols="50" />

        <label htmlFor="rating">Rating:</label>
        <input onChange={handleChange} value={review.rating} type="number" name="rating" id="rating" min="1" max="5" />

        <label htmlFor="readAt">Read At:</label>
        <input onChange={handleChange} value={review.readAt} type="date" name="readAt" id="readAt" />

        <button>Add review</button>
      </form>
    </section>
  )
}
