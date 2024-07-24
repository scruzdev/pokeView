import { useState,useEffect, useContext } from "react"
import { Paginator } from "./Paginator"
import { FilterInput } from "./FilterInput"
import { fetchPokemonEndpoint, fetchPokemon } from "../services/pokemonApi"
import { PokeGrid } from "./PokeGrid"
import { useDebounce } from "../hooks/useDebounce"
import { FavoritesContext } from "../context/favContex"
import Loading from "../assets/Loading"





export default function PokeList(){

    const [pokemonEndpoints, setPokemonEndpoints ] = useState([])
    const [pokemons, setPokemons] = useState([])

    const [searchTerm, setSearchTerm] = useState('')

    const [totalEntries, setTotalEntries] = useState([])


    const { favorites, handleFavorites } = useContext(FavoritesContext)


    const [isFilteredByFav, setFilterByFav] = useState(false)
   
    const [loading, setLoading] = useState(true) //eslint-disable-line
    const [error, setError] = useState(false)//eslint-disable-line

    const [currentEntries, setCurrentEntries] = useState([1,30])
    const pokemonsPerPage = 30


    const debouncedSearchTerm = useDebounce(searchTerm,400)

    const handleFilterByFav = () => setFilterByFav((prevFilter)=> {
        setFilterByFav(!prevFilter)
        setCurrentEntries([1,30])
    } )
    
    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value)

        setCurrentEntries([1,30])

    }

    const nextPage = () => {
        setCurrentEntries((prevEntries) => {
            const totalPokemon = totalEntries
    
            if (prevEntries[1] >= totalPokemon) {
                return prevEntries
            } else if (prevEntries[1] + pokemonsPerPage > totalPokemon) {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                return [prevEntries[0] + pokemonsPerPage, totalPokemon]
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                return [prevEntries[0] + pokemonsPerPage, prevEntries[1] + pokemonsPerPage]
            }
        }) 
    }

    const prevPage = () => {
        setCurrentEntries((prevEntries) => {
            if (prevEntries[0] === 1) {
                return prevEntries
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                return [prevEntries[0] - pokemonsPerPage, prevEntries[0] - 1]
            }
        })
    }

    useEffect(() => {
        const loadEndpoints = async () => {
            try {           
                const data = await fetchPokemonEndpoint()

                setPokemonEndpoints(data.results || [])

            } catch (error) {
                setError(error)
            }

        }

        loadEndpoints()

  
    }, [])



    useEffect(()=>{

        const  loadPokemons = async () => {

            try {

                const startIndex = currentEntries[0] - 1
                const endIndex = currentEntries[1]

                let filteredPokemons = pokemonEndpoints

                if (isFilteredByFav) {
                    filteredPokemons = pokemonEndpoints.filter((_, index) => favorites.includes(index + 1))
                }
    
                filteredPokemons = filteredPokemons.filter(pokemon =>
                    pokemon.name.toLowerCase().includes(debouncedSearchTerm ? debouncedSearchTerm.toLowerCase() : '')
                )

                const splicedPokemons = filteredPokemons.slice(startIndex, endIndex)
                const pokemonData = await Promise.all(
            
                    splicedPokemons.map( async (result)=>{

                        const pokemon = await fetchPokemon(result.url)  
                        return {
                            id: pokemon.id,
                            name: pokemon.name,
                            sprite: pokemon.sprites.front_default
                        }
    
                }))
                
                setPokemons(pokemonData)
                setTotalEntries(filteredPokemons.length)

                setLoading(false)
                
            } catch (error) {

                setError(error)

                
            } finally {
                setLoading(false)
            }

        } 
        
        loadPokemons()
     

    },[pokemonEndpoints, currentEntries, debouncedSearchTerm, favorites,isFilteredByFav])

    if (error) return <div className="w-full min-h-screen bg-gradient-to-r from-emerald-700 to-blue-700 flex flex-col justify-center items-center text-3xl ">Error: {error.message}</div>

    return(
        <> 
            {loading ? (
                <Loading/> 
            ): (
                <div className="w-full min-h-screen bg-gradient-to-r from-emerald-700 to-blue-700 flex flex-col ">
                <FilterInput 
                    value={searchTerm}  
                    onChange={handleSearchTerm} 
                    handleFilterByFav={handleFilterByFav} 
                    isFilteredByFav={isFilteredByFav}
                />
                <section className="w-full   flex justify-center py-10">
                    <PokeGrid pokemons={pokemons} handleFavorite={handleFavorites} favorites={favorites}  />
                </section>
                <Paginator handleNextPage={nextPage} handlePrevPage={prevPage}
                 currentEntries={currentEntries} totalEntries={totalEntries}/>
            </div>
            )}       
            
        
        </>
    )
    
}