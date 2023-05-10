const { NavLink, Link } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header flex between">
      <Link to="/">Uniapp 🦄</Link>
      <nav className="clean-list flex align-center">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/mail">Mail</NavLink>
        </li>
        <li>
          <NavLink to="/note">Note</NavLink>
        </li>
      </nav>
    </header>
  )
}
