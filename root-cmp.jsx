const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AppHeader } from './cmps/app-header.jsx'
import { UserMsg } from './cmps/user-msg.jsx'
import { Home } from './views/home.jsx'
import { About } from './views/about.jsx'

import { MailIndex } from './apps/mail/views/mail-index.jsx'
import { MailContent } from './apps/mail/views/mail-content.jsx'
import { MailCompose } from './apps/mail/views/mail-compose.jsx'

import { BookIndex } from './apps/book/views/book-index.jsx'
import { BookDetails } from './apps/book/views/book-details.jsx'
import { BookEdit } from './apps/book/views/book-edit.jsx'
import { BookAdd } from './apps/book/views/book-add.jsx'
import { BookMsg } from './apps/book/cmps/user-msg.jsx'
import { AddReview } from './apps/book/cmps/add-review.jsx'

import { NoteIndex } from './apps/note/views/note-index.jsx'

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mail" element={<MailIndex />} />
            <Route path="mail/:mailId" element={<MailContent />} />
            <Route path="/mail/compose" element={<MailCompose />} />
            <Route path="mail/compose/:noteId" element={<MailCompose />} />
            <Route path="mail/compose/:mailId" element={<MailCompose />} />

            <Route path="/note" element={<NoteIndex />} />
            <Route path="/note/:mailId" element={<NoteIndex />} />
            <Route path="/books" element={<BookIndex />}></Route>
            <Route path="/books/:bookId" element={<BookDetails />}></Route>
            <Route path="/books/edit/:bookId" element={<BookEdit />}></Route>
            <Route path="/books/edit" element={<BookEdit />}></Route>
            <Route path="/books/review/:bookId" element={<AddReview />}></Route>
            <Route path="/book-add" element={<BookAdd />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <UserMsg />
      </section>
    </Router>
  )
}
