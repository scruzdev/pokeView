import { useParams } from "react-router-dom"

import { useState,useEffect } from "react"
import { fetchPokemon, fetchPokemonDescription } from "../services/pokemonApi"
import Loading from "../assets/Loading"
import { Link } from "react-router-dom"


export function Pokedex(){

    const { id } = useParams()

    const [pokemon, setPokemon] = useState({})

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function mayusFirsLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    function cleanText(text) {
        return text.replace(/[\f\r\t\v]/g, ' ')
    }

    
    useEffect(()=>{

        const loadPokemonData = async () =>{

        try {
            let pokemon = await fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`)

            const pokemonDescription = await fetchPokemonDescription(id)

            pokemon = {
                        id: pokemon.id,
                        name: mayusFirsLetter(pokemon.name),
                        types: mayusFirsLetter((pokemon.types).map((tipo)=>{ return tipo.type.name }).join(" / ")),
                        description: cleanText(pokemonDescription),
                        sprite: pokemon.sprites.front_default,
                        weight: pokemon.weight/10,
                        height: pokemon.height/10
            
                 }
            

                setPokemon(pokemon)
                console.log(pokemon)
        }catch (e) {

            setError(e)

        } finally {
            setLoading(false)
        }
 

        }


        loadPokemonData()


    },[id])

    if (loading) return <div className=" flex min-h-screen justify-center items-center"><Loading/></div>
    if (error) return <div className=" flex min-h-screen justify-center text-2xl font-bold items-center">Error: {error.message}</div>
    if (!pokemon) return <div className=" flex min-h-screen justify-center items-center">No Pokémon found</div>


    return(
        <>
        

            <div className=" flex min-h-screen flex-col gap-3 justify-center items-center bg-cover bg-center" style={{ backgroundImage: "url('/images/pokemon-wallpaper.png')" }}>
            
                <article className=" w-96 h-100 gap-1 mt-3 flex flex-col text-white bg-gradient-to-r from-red-500 via-red-600
                 to-red-700 shadow-lg shadow-red-800/80  rounded-lg px-5 pb-3.5 ">
                    <div className="flex gap-3 pl-3 pt-2">
                        <div className="size-2 bg-green-600"></div>
                        <div className="size-2 bg-yellow-600"></div>
                        <div className="size-2 bg-red-700"></div>
                    </div>  
                    <div className="bg-red-800 h-7/10 rounded-md flex items-center">
                        <img src={pokemon.sprite} className="size-44" alt="" />
                        <div className="bg-slate-300 h-full flex flex-col justify-center center pl-3 rounded-md bg-opacity-50 flex-1">
                            <div>
                                <span className="font-semibold text-black">Number in Pokédex:</span>
                                <p>{pokemon.id}</p>
                            </div>
                            <div>
                            <span className="font-semibold text-black">Name:</span>
                                <p> {pokemon.name}</p>
                            </div>
                            <div>
                            <span className="font-semibold text-black">Type:</span>
                                <p>{pokemon.types}</p>
                            </div>
                            <div>
                            <span className="font-semibold text-black">Weight:</span>
                                <p>{pokemon.weight} kg</p>
                            </div>
                            <div>
                            <span className="font-semibold text-black">Height:</span>
                                <p>{pokemon.height} m</p>
                            </div>




                        </div>
                    </div>
                    <div className="bg-slate-300 bg-opacity-40 flex-1 pt-2 pl-3 rounded-lg overflow-auto">
                        <p>{pokemon.description}</p>
                     </div>
                </article>
                <Link to={'/pokegrid'}>
                    <button type="button" className="text-white bg-opacity-20  bg-gradient-to-r from-red-500 via-red-600 to-red-700   hover:bg-gradient-to-br  focus:outline-none  
                        shadow-black-500/50 shadow-lg  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Back to grid
                    </button>
                </Link>
             
            </div>


        </>
    )
}