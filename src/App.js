import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [countriesFound, setFoundCountries] = useState([])

    const handleChange = (event) => {
      setNewNote(event.target.value)

      if (newNote.length > 0) {
        setFoundCountries(notes.filter((note) => { return note.name.common.match(newNote); }))
        console.log('countries', countriesFound)
      }}

    useEffect(() => {
      console.log('effect')
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          console.log('promise fulfilled')
          setNotes(response.data)
          console.log(response.data)
        })
    }, [])
    
    console.log('render', notes.length, 'notes')
    console.log('HERE THEY ARE:', countriesFound)
    
    return (
      <div>
        <div>find countries 
          <input name="country" value={newNote} onChange={handleChange} />
        </div>
          <Country countries={countriesFound} />
      </div>
    )
  }

export default App 