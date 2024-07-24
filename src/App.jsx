
import './App.css'
import { Landing } from './components/Landing';
import { Pokedex } from './components/Pokedex';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PokeList from './components/PokeList';
import { FavoritesProvider } from './context/favContex';

function App() {


  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' Component={Landing} />
          <Route path='/pokegrid' Component={PokeList} />
          <Route path='/pokedex/:id' Component={Pokedex} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App;