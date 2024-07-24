import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it, vi } from "vitest";
import { FavoritesContext } from "../context/favContex";
import PokeList from "../components/PokeList";


const mockFavorites = [1, 2]
const mockHandleFavorites = vi.fn()





it('Debe mostrar mensaje de error cuando la solicitud falla', async () => {

    vi.mock('../services/pokemonApi', () => ({
        fetchPokemonEndpoint: vi.fn(() => Promise.reject(new Error('Network Error'))),
        fetchPokemon: vi.fn(() => Promise.reject(new Error('Network Error')))
      }))

    
render(
    <MemoryRouter>
    <FavoritesContext.Provider value={{ favorites: mockFavorites, handleFavorites: mockHandleFavorites }}>
        <PokeList />
    </FavoritesContext.Provider>
    </MemoryRouter>
);


expect(await screen.findByText('Error: Network Error')).toBeInTheDocument();
})

