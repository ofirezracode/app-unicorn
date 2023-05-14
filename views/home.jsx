const { Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="home view">
      <div>
        <h1>🦄 Unicorp</h1>
        <section className="links-to-apps flex center">
          <Link to="/mail">
            <i className="fa-solid fa-envelope"></i>
          </Link>
          <Link to="/note">
            <i className="fa-solid fa-note-sticky"></i>
          </Link>
          <Link to="/books">
            <i className="fa-solid fa-book"></i>
          </Link>
        </section>
      </div>
    </section>
  )
}
