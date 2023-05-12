import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { booksData } from './_books.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
  addReview,
  getPrice,
  getLanguage,
  getTypeOfReading,
  getPublishedDateCondition,
  deleteReview,
  loadAdjBooksIds,
  addGoogleBook,
}

function query(filterBy = {}) {
  console.log('filterBy service:', filterBy)
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, 'i')
      books = books.filter((book) => regExp.test(book.title))
    }

    if (filterBy.author) {
      books = books.filter((book) => {
        let isFound = false
        const regExp = new RegExp(filterBy.author, 'i')
        book.authors.forEach((author) => {
          if (regExp.test(author)) {
            isFound = true
          }
        })
        return isFound
      })
    }

    if (filterBy.maxPrice) {
      books = books.filter((book) => book.listPrice.amount <= filterBy.maxPrice)
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
  // return axios.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function loadAdjBooksIds(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    let bookIdx = books.findIndex((book) => book.id === bookId)
    const nextBookIndex = bookIdx === books.length - 1 ? 0 : bookIdx + 1
    const prevBookIndex = bookIdx === 0 ? books.length - 1 : bookIdx - 1
    return { nextBookId: books[nextBookIndex].id, prevBookId: books[prevBookIndex].id }
  })
}

function getEmptyBook() {
  return {
    id: '',
    title: '',
    listPrice: {
      amount: 0,
      currencyCode: '',
      isOnSale: false,
    },
  }
}

function getDefaultFilter() {
  return { title: '', author: '', maxPrice: 200 }
}

function addReview(bookId, review) {
  return get(bookId).then((book) => {
    review.id = utilService.makeId()
    book.reviews ? book.reviews.unshift(review) : (book.reviews = [review])
    save(book)
  })
}

function deleteReview(bookId, reviewId) {
  return get(bookId).then((book) => {
    book.reviews = book.reviews.filter((review) => review.id !== reviewId)
    save(book)
  })
}

function getPrice(book) {
  if (book.listPrice.currencyCode === 'EUR') {
    return `€${book.listPrice.amount}`
  } else if (book.listPrice.currencyCode === 'USD') {
    return `$${book.listPrice.amount}`
  } else if (book.listPrice.currencyCode === 'ILS') {
    return `₪${book.listPrice.amount}`
  }
}

function getLanguage(book) {
  if (book.language === 'en') {
    return 'English'
  } else if (book.language === 'sp') {
    return 'Spanish'
  } else if (book.language === 'he') {
    return 'Hebrew'
  }
}

function getTypeOfReading(pageCount) {
  if (pageCount > 500) {
    return 'Serious Reading'
  } else if (pageCount > 200) {
    return 'Decent Reading'
  } else if (pageCount < 100) {
    return 'Light Reading'
  }
  return ''
}

function getPublishedDateCondition(publishedDate) {
  if (new Date().getFullYear() - publishedDate > 10) {
    return 'Vintage'
  } else if (new Date().getFullYear() - publishedDate < 1) {
    return 'New'
  }
  return ''
}

function addGoogleBook(googleBook) {
  return storageService.get(BOOK_KEY, googleBook.id).then((dbBook) => {
    console.log('dbBook', dbBook)
    if (dbBook) {
      console.log('dbbook error')
      throw new Error(`Book already exists`)
    }

    console.log('googleBook', googleBook)
    const book = {
      id: googleBook.id,
      listPrice: {
        amount: utilService.getRandomIntInclusive(1, 199),
        isOnSale: false,
      },
    }

    if (googleBook.volumeInfo) {
      book.title = googleBook.volumeInfo.title ? googleBook.volumeInfo.title : ''
      book.subtitle = googleBook.volumeInfo.subtitle ? googleBook.volumeInfo.subtitle : ''
      book.authors = googleBook.volumeInfo.authors ? googleBook.volumeInfo.authors : ''
      book.publishedDate = googleBook.volumeInfo.publishedDate ? googleBook.volumeInfo.publishedDate : ''
      book.description = googleBook.volumeInfo.description ? googleBook.volumeInfo.description : ''
      book.pageCount = googleBook.volumeInfo.pageCount ? googleBook.volumeInfo.pageCount : ''
      book.categories = googleBook.volumeInfo.categories ? googleBook.volumeInfo.categories : ''
      book.language = googleBook.volumeInfo.language ? googleBook.volumeInfo.language : ''
      if (googleBook.volumeInfo.imageLinks) {
        book.thumbnail = googleBook.volumeInfo.imageLinks.thumbnail ? googleBook.volumeInfo.imageLinks.thumbnail : ''
      }
    }

    if (googleBook.accessInfo) {
      book.listPrice.currencyCode = googleBook.accessInfo.country === 'IL' ? 'ILS' : 'USD'
    }

    console.log('book', book)

    return storageService.post(BOOK_KEY, book)
  })
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = []
    booksData.forEach((book) => books.push(_cloneBook(book)))
    utilService.saveToStorage(BOOK_KEY, books)
  }
}

// function _createBook(vendor, maxSpeed = 250) {
//   const book = getEmptyBook(vendor, maxSpeed)
//   book.id = utilService.makeId()
//   return book
// }

function _cloneBook(bookToClone) {
  return { ...bookToClone }
}
