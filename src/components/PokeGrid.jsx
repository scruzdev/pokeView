import { PokeCard } from "./PokeCard"


export function PokeGrid({pokemons, handleFavorite, favorites}){ //eslint-disable-line


    


    return(


            

            
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 py-10  w-full max-w-6xl rounded-xl">
                        {
                        pokemons.length > 0 ? ( //eslint-disable-line
                            pokemons.map((pokemon) => ( //eslint-disable-line
                                <div className="flex items-center justify-center" key={pokemon.id}>
                                    <PokeCard 
                                        pokemon={pokemon} 
                                        handleFavorite={handleFavorite}
                                        isFavorite={favorites.includes(pokemon.id)} //eslint-disable-line
                                     />
                                </div>
                            ))) : (
                                <div className="flex col-span-3 items-center  justify-center text-lg font-bold" > No pokemon found :( </div>
                            )
                            }

                </div>  



    )
    
}