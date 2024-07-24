import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchPokemon, fetchPokemonDescription } from '../services/pokemonApi';
import { Pokedex } from "../components/Pokedex";

import { render, screen,  } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";



vi.mock('../services/pokemonApi', () => ({
    fetchPokemon: vi.fn(),
    fetchPokemonDescription: vi.fn()
  }))


describe('Pokedex component testing', ()=>{

    beforeEach(()=>{

        vi.clearAllMocks()

    })

    it('Debe mostrar un mensaje de carga mientras se obtienen los datos', ()=>{

          
        render(
        <MemoryRouter initialEntries={['/pokedex/3']}>
            <Routes>
                <Route path="/pokedex/:id" element={<Pokedex />} />
            </Routes>

          </MemoryRouter>
        )
        
        expect(screen.getByText('Loading...')).toBeInTheDocument()


    })

    it('Debe mostrar un mensaje de error si ocurre un problema al cargar los datos ', async ()=>{
        fetchPokemon.mockRejectedValue(new Error('Failed to fetch'))
        fetchPokemonDescription.mockRejectedValue(new Error('Failed to fetch'))
          
        render(
        <MemoryRouter initialEntries={['/pokedex/3']}>
            <Routes>
                <Route path="/pokedex/:id" element={<Pokedex />} />
            </Routes>
          </MemoryRouter>
        )
        
        expect(await screen.findByText('Error: Failed to fetch')).toBeInTheDocument()


    })

    



})