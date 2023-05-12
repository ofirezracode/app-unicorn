const { NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header flex justify-between">
      <a>Miss books</a>
      <nav className="clean-list flex align-center">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/books">Books</NavLink>
        </li>
        <li>
          <NavLink to="/book-add">Add Books</NavLink>
        </li>
        <li>
          <NavLink to="/about">About Us</NavLink>
        </li>
      </nav>
    </header>
  )
}
