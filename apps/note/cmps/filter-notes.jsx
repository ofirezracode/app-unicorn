const { useState, useRef, useEffect } = React

export function FilterNotes({ onFilter }) {
  const [filters, setFilters] = useState({ search: '', types: ['txt', 'img', 'video', 'todos'] })

  const txtRef = useRef()
  const imgRef = useRef()
  const videoRef = useRef()
  const todosRef = useRef()

  const noteTypes = [
    { type: 'txt', ref: txtRef },
    { type: 'img', ref: imgRef },
    { type: 'video', ref: videoRef },
    { type: 'todos', ref: todosRef },
  ]

  useEffect(() => {
    const debounce = setTimeout(() => {
      console.log('debounce finish')
      onFilter(filters)
    }, 500)
    return () => {
      clearTimeout(debounce)
    }
  }, [filters])

  function onSearch(event) {
    setFilters((prev) => ({ ...prev, search: event.target.value }))
  }

  function onType(index) {
    noteTypes[index].ref.current.classList.toggle('type-active')

    setFilters((prev) => {
      const newTypes = noteTypes.reduce((acc, type, i) => {
        if (type.ref.current.classList.contains('type-active')) acc.push(type.type)
        return acc
      }, [])
      return { ...prev, types: newTypes }
    })
  }

  function onSubmit() {
    onFilter(filters)
  }

  return (
    <form onSubmit={onSubmit} className="filter-notes filter-notes-layout">
      <div className="input-container flex align-center">
        <input className="filter-notes-input" onChange={onSearch} value={filters.search} placeholder="Search..." />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="filter-buttons flex">
        <span
          className="filter-notes-icon type-active"
          ref={txtRef}
          onClick={() => {
            onType(0)
          }}
        >
          <i className="fa-regular fa-comment"></i>
          <i className="fa-solid fa-comment"></i>
        </span>
        <span
          className="filter-notes-icon type-active"
          ref={imgRef}
          onClick={() => {
            onType(1)
          }}
        >
          <i className="fa-regular fa-image"></i>
          <i className="fa-solid fa-image"></i>
        </span>
        <span
          className="filter-notes-icon type-active"
          ref={videoRef}
          onClick={() => {
            onType(2)
          }}
        >
          <i className="fa-regular fa-file-video"></i>
          <i className="fa-solid fa-file-video"></i>
        </span>
        <span
          className="filter-notes-icon type-active"
          ref={todosRef}
          onClick={() => {
            onType(3)
          }}
        >
          <i className="fa-regular fa-rectangle-list"></i>
          <i className="fa-solid fa-rectangle-list"></i>
        </span>
      </div>
    </form>
  )
}
