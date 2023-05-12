const { useLocation, NavLink, Link } = ReactRouterDOM
const { useEffect, useState } = React

export function AppHeader() {
  // const location = useLocation()
  // const [appView, setAppView] = useState('')

  // useEffect(() => {
  //   if (location.pathname === '/note' || location.pathname.startsWith('/mail') || location.pathname === '/compose') {
  //     setAppView('app-view')
  //   } else {
  //     setAppView('')
  //   }
  // }, [location])

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
          <i class="fa-solid fa-book"></i>
          </NavLink>
        </li>
      </nav>
    </header>
  )
}
