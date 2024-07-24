import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PokeGrid } from "../components/PokeGrid";
import { MemoryRouter } from "react-router-dom";


describe('PokeGrid component testing', ()=>{

    const mockPokemons = [
        { id: 1, name: 'Bulbasaur', sprite: 'https://example.com/sprite1.png' },
        { id: 2, name: 'Ivysaur', sprite: 'https://example.com/sprite2.png' },
    ]
    const mockHandleFavs = vi.fn()
    const mockFavorites = [1]


    it('Debe renderizar correctamente los componentes PokeCard cuando hay Pokémon', () => {
        render(
            <MemoryRouter>
                <PokeGrid pokemons={mockPokemons} handleFavorite={mockHandleFavs} favorites={mockFavorites} />
            </MemoryRouter>

          
        )
        
        expect(screen.getAllByRole('article')).toHaveLength(mockPokemons.length)
        expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
        expect(screen.getByText('Ivysaur')).toBeInTheDocument()
      })


      it('Debe mostrar un mensaje cuando no hay Pokémon', () => {
        render(
          <PokeGrid pokemons={[]} handleFavorite={mockHandleFavs} favorites={mockFavorites} />
        )
    
        expect(screen.getByText('No pokemon found :(')).toBeInTheDocument();
      })


      it('Debe pasar correctamente el prop handleFavorite a cada PokeCard', () => {
        render(
            <MemoryRouter>
                <PokeGrid pokemons={mockPokemons} handleFavorite={mockHandleFavs} favorites={mockFavorites} />
            </MemoryRouter>
          
        )
    

        fireEvent.click(screen.getAllByRole('button')[1])


        expect(mockHandleFavs).toHaveBeenCalledWith(mockPokemons[1])
        
      })



})