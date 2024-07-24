import { Link } from 'react-router-dom'
// eslint-disable-next-line
export function PokeCard({pokemon, handleFavorite, isFavorite}){

    const { id, name, sprite } = pokemon   // eslint-disable-line

    function mayusFirsLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    


    return(
        
        <>
            <article  className="relative flex-col items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 ">
                
                {
                    isFavorite ? (
                        
                        <button className="absolute flex justify-center hover:bg-white hover:bg-opacity-20  items-center size-9 rounded-full z-30 top-3 left-2"  
                            onClick={()=>handleFavorite(pokemon)}> 
                                   <svg className="size-7   text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                        </button>
                        
                    ) : (
                                        
                        <button className="absolute flex justify-center hover:bg-white hover:bg-opacity-20  items-center size-9 rounded-full z-30 top-3 left-2 " 
                        onClick={()=>handleFavorite(pokemon)}> 
                                    <svg className="size-7   text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                    </button>
                    )

                }

                <div className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    <Link to={`/pokedex/${id}`}>
                        <img className=" size-44 " src={sprite} alt="" />
                    </Link>
                    <footer className='flex flex-col rounded-lg bg-slate-200'>
                        <span className='items-start text-black flex pt-1 ml-2'>{`# ${id}`}</span>
                        <span className='flex justify-center pb-2 text-base text-black '>{mayusFirsLetter(name)}</span>
                    </footer>
                </div>
            </article> 

        
        </>
    )


}