const { NavLink, Link } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header flex between">
      <Link to="/">🦄 Unicorp</Link>
      <nav className="clean-list flex align-center">
        <li>
          <NavLink to="/">
            <i className="fa-solid fa-house"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">
            <i className="fa-solid fa-circle-info"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/mail">
            <i className="fa-solid fa-envelope"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/note">
            <i className="fa-solid fa-note-sticky"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/books">
            <i className="fa-solid fa-book"></i>
          </NavLink>
        </li>
      </nav>
    </header>
  )
}
