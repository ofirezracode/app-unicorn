const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AppHeader } from './cmps/app-header.jsx'
import { UserMsg } from './cmps/user-msg.jsx'
import { Home } from './views/home.jsx'
import { About } from './views/about.jsx'

import { MailIndex } from './apps/mail/views/mail-index.jsx'
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
            <Route path="/note" element={<NoteIndex />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <UserMsg />
      </section>
    </Router>
  )
}
