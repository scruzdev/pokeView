import { createContext, useState, useEffect } from 'react'


const FavoritesContext = createContext();


const FavoritesProvider = ({ children }) => { //eslint-disable-line
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(storedFavorites)
  }, [])
  

  const handleFavorites = (pokemon) => {

    const { id } = pokemon

    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter(fav => fav !== id)
        : [...prevFavorites, id]
      

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      return updatedFavorites;
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, handleFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}
export { FavoritesContext, FavoritesProvider }
