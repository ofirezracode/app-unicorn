const { useLocation, NavLink, Link } = ReactRouterDOM
const { useEffect, useState } = React

export function AppHeader() {
  const location = useLocation()
  const [appView, setAppView] = useState('')

  useEffect(() => {
    if (location.pathname === '/note' || location.pathname.startsWith('/mail') || location.pathname === '/compose') {
      setAppView('app-view')
    } else {
      setAppView('')
    }
  }, [location])

  return (
    <header className={`app-header flex between ${appView}`}>
      <Link to="/">🦄</Link>
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
