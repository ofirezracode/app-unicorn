const { useState } = React

export function MailSort({ onSetSort }) {
  function handleChange({ target }) {}
  const [checkedClass, setCheckedClass] = useState('none')

  function onChange(e) {
    // if(noneRef.current.checked) noneRef.current.classList.add('checked')
    console.log('e.target', e.target)
    setCheckedClass(e.target.id)
    onSetSort(e)
  }

  return (
    <section className="mail-sort flex align-center">
      <p>Sort</p>
      <form className="flex" onChange={(e) => onChange(e)}>
        <label className={`flex align-center between label-none ${checkedClass}`} htmlFor="none">
          None
          <input type="radio" value="" id="none" name="sort"></input>
        </label>

        <label className={`flex align-center between label-title ${checkedClass}`} htmlFor="title">
          Title
          <i class="fa-solid fa-chevron-down"></i>
          <input type="radio" value="title" id="title" name="sort"></input>
        </label>

        <label className={`flex align-center between label-time ${checkedClass}`} htmlFor="time">
          Time
          <i class="fa-solid fa-chevron-down"></i>
          <input type="radio" value="time" id="time" name="sort"></input>
        </label>
      </form>
    </section>
  )
}
