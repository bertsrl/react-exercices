import React from 'react'

const Country = (countries) => {
    console.log("This is an array: ", countries) 
    let countriess = countries.countries 
    

    if(countriess.length > 0 && countriess.length != 1) {
        return countriess.map( (country, index) => 
            <li key={index}> 
                {country.name.common} 
                <button onClick={() => {
                    let copy = countries[index]
                    countriess = []
                    countriess[0] = copy // NU MERGE RAHATUL ASTA (ADICA SA FAC ARRAY-ul countriess de 1 singur element, cred ca e expected din moment onChange-ul ala e prioritar si perpetuu pe pagina, cum rezolv?)
                }}>show</button>
            </li> 
        )
    }
    else if(countriess.length === 1) {
        return countriess.map( (country, index) => 
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <br/>
            <ul>
                Languages:
                {
                    Object.keys(country.languages).map(function(key) {
                        return <li key={key}>{ country.languages[key] }</li>
                    })
                }
            </ul>
            <br/>
            <img src={country.flags.png}></img>
        </div>
        )
    }
    // else if(buttonPressed[0] === 1) {
    //     setFoundCountries(countriess.filter((country, index) => { return index.match(buttonPressed[1]); }))
    //     console.log('countries', countriesFound)
    // }
    else return <li> No countries found </li>
}

export default Country