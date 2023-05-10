const { NavLink, Link } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header flex between">
      <Link to="/">Sprint 3</Link>
      <nav className="clean-list flex align-center">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/">About</NavLink>
        </li>
        <li>
          <NavLink to="/">Mail</NavLink>
        </li>
        <li>
          <NavLink to="/">Note</NavLink>
        </li>
      </nav>
    </header>
  )
}
