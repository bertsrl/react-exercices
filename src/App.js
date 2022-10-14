import React from 'react'
import { useState, useEffect } from 'react'
import phonenumbersService from './services/phonenumbers'

const App = () => {
    const [persons, setPersons] = useState([]) 
    const [searchInput, setSearch] = useState('')
    const [personsToShow, setPersonsToShow] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    
    useEffect(() => {
      phonenumbersService
        .getAll()
        .then(initialNumbers => {
          console.log('promise fulfilled')
          setPersons(initialNumbers)
          setPersonsToShow(initialNumbers)
        })
    }, [])

    const [values, setValues] = useState([
        {
            name: '',
            number: ''
        }
    ]);
  
    const handleSearch = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)

        if (searchInput.length > 0) {
            setPersonsToShow(persons.filter((person) => {
            return person.name.match(searchInput);
        }))}
    }

    const handleInput = (event) => {
        const value = event.target.value;
        setValues({
            ...values,
            [event.target.name]: value,
         });
         setNewName(values.name)
         setNewNumber(values.number)
      };

    const deletePerson = (id) =>  {
      phonenumbersService
        .deleteThis(id)
        .then(response => {
          setPersons(persons.map(person => person.id !== id ? person : null))
          setPersonsToShow(personsToShow.map(person => person.id !== id ? person : null))
        }) // PROBLEMA LA STERGEREA UNEI PERSOANE DIN OBIECTUL RESURSA
    }

    const addPerson = (event) => {
        event.preventDefault()
        if (newNumber.length != 0 && newName.length != 0) {
            console.log(typeof(newNumber))
            if(!persons.some(person => person.name === newName) || !persons.some(person => person.nubmer === newNumber)){
                const personObject = {
                    name: newName,
                    number: newNumber
                }
                phonenumbersService
                  .create(personObject)
                  .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setPersonsToShow(personsToShow.concat(returnedPerson))
                    setValues([
                        {
                            name: '',
                            number: ''
                        }
                    ])
                  })
            }
            else alert('Username or phone number already in the list') 
        }
        else alert('Please fill all the required fields')
       
       
    }

    return (
      <div>
        <h2>Phonebook</h2>
        <div> Search: <input name='search' value={searchInput} onChange={handleSearch} /> </div>
        <form onSubmit={addPerson}>
          <div>
            name: <input name="name" value={values.name} onChange={handleInput}/>
            number: <input name="number" value={values.number} onChange={handleInput} />
            <button type="submit" onClick={() => setValues({name: '', number:''})}>add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <ul>
            {personsToShow.map( (person, i) => 
            <div>
              <li key={i}> {person.name} {person.number} 
                <button onClick={() => {
                  window.confirm('Are you sure that you want to delete this one?') 
                  deletePerson(person.id)}
                }>delete</button>
              </li>
            </div>
            )}
        </ul>
      </div>
    )
  }

export default App 