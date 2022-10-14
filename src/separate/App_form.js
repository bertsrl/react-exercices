import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(' ') 
  const [showAll, setShowAll] = useState(false)

  const handleNoteChange = (event) => { // We haven't use the preventDefault() because there is no default action that occurs on an input change, unlike on a form submission.
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5, //With the help of the Math.random() function, our note has a 50% chance of being marked as important.
      id: notes.length + 1,
    }
  
    setNotes(notes.concat(noteObject))
    console.log(notes)
    setNewNote('')
  }

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)

  console.log(notesToShow)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App 