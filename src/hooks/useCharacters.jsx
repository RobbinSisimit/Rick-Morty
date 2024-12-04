import { useState } from "react"

export const useCharacters = () => {
    const [name, setName] = useState('')
    const [characters, setCharacters] = useState([])
    const [speciesFilter, setSpeciesFilter] = useState('')
    const [speciesList, setSpeciesList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [info, setInfo] = useState({})

    const fetchCharacters = (page = 1) => {
        let url = `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`

        if (speciesFilter) {
            url += `&species=${speciesFilter}`
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setCharacters(data.results || [])
                const uniqueSpecies = [...new Set(data.results.map(character => character.species))]
                setSpeciesList(uniqueSpecies)
                setInfo(data.info)
                setCurrentPage(page)
            })
            .catch(() => alert('Error data'))
    }

    return {
        characters, 
        speciesList, 
        setName, 
        setSpeciesFilter, 
        fetchCharacters, 
        currentPage, 
        info,
    }
}


