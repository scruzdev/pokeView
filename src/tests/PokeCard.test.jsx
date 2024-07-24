import {  describe, expect, it, vi } from "vitest";
import { PokeCard } from "../components/PokeCard";
import {  render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";



describe('PokeCard component testing', ()=>{



    it('Debe renderizar el componente PokeCard correctamente',()=>{

        const mockPokemon = {
            id: 1,
            name: 'Bulbasaur',
            sprite: 'https://example.com/sprite.png'
          }

          const mockHandleFavorite = vi.fn()
          render(
            <MemoryRouter>
                            <div className="flex items-center justify-center" key={mockPokemon.id}>
                <PokeCard pokemon={mockPokemon} handleFavorite={mockHandleFavorite} isFavorite={false} />
            </div>
            </MemoryRouter>

            
          )

          
          expect(screen.getByText('# 1')).toBeInTheDocument()
          expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
          expect(screen.getByAltText('')).toHaveAttribute('src', 'https://example.com/sprite.png')


    })

    it('Debe renderizar el Link alrededor del img', () => {
        const mockPokemon = {
          id: 1,
          name: 'Bulbasaur',
          sprite: 'https://example.com/sprite.png'
        }
      
        render(
          <MemoryRouter>
            <PokeCard pokemon={mockPokemon} handleFavorite={() => {}} isFavorite={false} />
          </MemoryRouter>
        )
      

        expect(screen.getByRole('link')).toHaveAttribute('href', '/pokedex/1')
        expect(screen.getByAltText('')).toHaveAttribute('src', 'https://example.com/sprite.png')
      })


      it('Debe redirigir al enlace correcto del pokemon', () => {
        const mockPokemon = { id: 1, name: 'Bulbasaur', sprite: 'https://example.com/sprite.png' }
      
        render(
          <MemoryRouter>
            <PokeCard pokemon={mockPokemon} handleFavorite={() => {}} isFavorite={false} />
          </MemoryRouter>
        )
      
        const pokemonLink = screen.getByRole('link')
        expect(pokemonLink).toBeInTheDocument()
        expect(pokemonLink.closest('a')).toHaveAttribute('href', '/pokedex/1')

      })

      it('Debe mostrar el ícono de favorito correctamente según el estado', () => {
        const mockPokemon = { id: 1, name: 'Bulbasaur', sprite: 'https://example.com/sprite.png' }
      
        render(
          <MemoryRouter>
            <PokeCard pokemon={mockPokemon} handleFavorite={() => {}} isFavorite={true} />
          </MemoryRouter>
        )
        const svgElement = screen.getByRole('button').querySelector('svg')
        expect(svgElement).toHaveClass('size-7   text-yellow-300')

      })

      it('Debe mostrar el ícono de favorito correctamente según el estado false', () => {
        const mockPokemon = { id: 1, name: 'Bulbasaur', sprite: 'https://example.com/sprite.png' }
      
        render(
          <MemoryRouter>
            <PokeCard pokemon={mockPokemon} handleFavorite={() => {}} isFavorite={false} />
          </MemoryRouter>
        )
        const svgElement = screen.getByRole('button').querySelector('svg')
        expect(svgElement).toHaveClass('size-7   text-white')

      })



})