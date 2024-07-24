import { fireEvent, render , screen, waitFor} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {  expect, it, vi } from "vitest";
import { FavoritesContext } from "../context/favContex";
import PokeList from "../components/PokeList";


const mockFavorites = [1, 2]
const mockHandleFavorites = vi.fn()



    it('Debe renderizar correctamente los componentes hijos', async () => {

        vi.mock('../services/pokemonApi', () => ({
            fetchPokemonEndpoint: vi.fn(() => Promise.resolve({ results: [{ url: 'https://pokeapi.co/api/v2/pokemon/1/', name: 'Bulbasaur' }] })),
            fetchPokemon: vi.fn(() => Promise.resolve({ id: 1, name: 'Bulbasaur', sprites: { front_default: 'sprite_url' } }))
          }))
        })


        render(
          <MemoryRouter>
            <FavoritesContext.Provider value={{ favorites: mockFavorites, handleFavorites: mockHandleFavorites }}>
              <PokeList />
            </FavoritesContext.Provider>
          </MemoryRouter>
        )
    
        
    
        await waitFor(()=>{
            
        expect(screen.getByPlaceholderText('Search a pokémon...')).toBeInTheDocument()
    
        const gridDiv = document.querySelector('.grid')
    
        expect(gridDiv).toHaveClass('grid-cols-1')
    
        expect(screen.getByRole('button', { name: /Sig/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Prev/i })).toBeInTheDocument()
    
        })


            
    it('Debe filtrar Pokémon según el término de búsqueda', async () => {
        render(
        <MemoryRouter>
            <FavoritesContext.Provider value={{ favorites: mockFavorites, handleFavorites: mockHandleFavorites }}>
            <PokeList />
            </FavoritesContext.Provider>
        </MemoryRouter>
        )
        
        await waitFor(()=>{

            fireEvent.change(screen.getByPlaceholderText('Search a pokémon...'), { target: { value: 'Bulbasaur' } });
        

            expect(screen.getByText('Bulbasaur')).toBeInTheDocument()

        })

    })

    it('Debe llamar a nextPage y prevPage cuando se hace click en los botones de paginacion', async ()=>{

        render(
            <MemoryRouter>
                <FavoritesContext.Provider value={{ favorites: mockFavorites, handleFavorites: mockHandleFavorites }}>
                <PokeList />
                </FavoritesContext.Provider>
            </MemoryRouter>
            )

        await waitFor(()=>{

            fireEvent.click(screen.getByRole('button', { name: /Sig/i }))
            fireEvent.click(screen.getByRole('button', { name: /Prev/i }))


        })

    })
