const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
  const navigate = useNavigate()
  const params = useParams()
  console.log('params:', params)

  useEffect(() => {
    if (params.bookId) loadBook()
  }, [])

  function loadBook() {
    bookService
      .get(params.bookId)
      .then(setBookToEdit)
      .catch((err) => {
        console.log('Had issued in book edit:', err)
        navigate('/book')
        showErrorMsg('Book not found!')
      })
  }

  function handleChange({ target }) {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    if (field === 'amount') {
      const price = bookToEdit.listPrice
      price.amount = value
      setBookToEdit((prevBook) => ({ ...prevBook, listPrice }))
    } else {
      setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    bookService.save(bookToEdit).then(() => {
      showSuccessMsg(`Book saved!`)
      navigate('/books')
    })
  }

  const { title, listPrice } = bookToEdit
  const { amount } = listPrice

  return (
    <section className="book-edit view">
      <h2>{bookToEdit.id ? 'Edit' : 'Add'} Book</h2>

      <form className="flex column" onSubmit={onSaveBook}>
        <label htmlFor="title">Title:</label>
        <input onChange={handleChange} value={title} type="text" name="title" id="title" />

        <label htmlFor="price">Price:</label>
        <input onChange={handleChange} value={amount} type="number" name="amount" id="price" />

        <button>{bookToEdit.id ? 'Save' : 'Add'}</button>
      </form>
    </section>
  )
}
