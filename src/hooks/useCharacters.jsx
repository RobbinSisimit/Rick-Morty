import { useState } from "react"


export const useCharacters = () => {
    const [name, setName] = useState('')
    const [characters, setCharacters] = useState([])
    const [speciesFilter, setSpeciesFilter] = useState('')
    const [speciesList, setSpeciesList] = useState([])


    const fetch2 = () => {
        let url = `https://rickandmortyapi.com/api/character/?name=${name}`

        if (speciesFilter) {
            url += `&species=${speciesFilter}`
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setCharacters(data.results || [])
                const uniqueSpecies = [...new Set(data.results.map(character => character.species))]
                setSpeciesList(uniqueSpecies)
            })
            .catch(() => alert('Error  data'))
    }

    return {
        characters, 
        speciesList, 
        setName, 
        setSpeciesFilter, 
        fetch2
    }
}

