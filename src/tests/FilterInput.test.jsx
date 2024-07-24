import { describe, expect, it, vi } from "vitest";
import { FilterInput } from "../components/FilterInput";
import { fireEvent, render, screen } from "@testing-library/react";






describe('FilterInput component testing', ()=>{

    const mockFn = vi.fn()

    const mockHandleFilterByFav = vi.fn()

    it('Debe renderizar FilterInput component',()=>{

        render(
            <FilterInput  value={""} onChange={mockFn} handleFilterByFav={mockHandleFilterByFav} isFilteredByFav={""}    />
        )      

        expect(screen.getByRole('textbox')).toBeInTheDocument()

        expect(screen.getByPlaceholderText('Search a pokémon...')).toBeInTheDocument()

        expect(screen.getByRole('button')).toBeInTheDocument()


    })

    it('Debe renderizar FilterInput component con el valor del input', async ()=>{

      render(
          <FilterInput  value={"Pikachu"} onChange={mockFn} handleFilterByFav={mockHandleFilterByFav} isFilteredByFav={""}    />
      )  
      
      const input = await screen.findByRole('textbox')

      expect(input.value).toBe('Pikachu')


   })


    it('Debe actualizar el valor del campo de entrada y llamar a onChange', ()=> {

        
        render(
        <FilterInput 
            value="" 
            onChange={mockFn} 
            handleFilterByFav={mockHandleFilterByFav} 
            isFilteredByFav={false} 
        />
        );

        const input = screen.getByPlaceholderText('Search a pokémon...')
        fireEvent.change(input, { target: { value: 'Pikachu' } })

        expect(mockFn).toHaveBeenCalled()

    })


    it('Debe llamar a handleFilterByFav cuando se hace clic en el botón', () => {

        render(
          <FilterInput 
            value="" 
            onChange={mockFn} 
            handleFilterByFav={mockHandleFilterByFav} 
            isFilteredByFav={false} 
          />
        )

        const button = screen.getByRole('button')

        fireEvent.click(button)

        expect(mockHandleFilterByFav).toHaveBeenCalled()



    })


      it('Debe cambiar el estilo del botón basado en el estado de isFilteredByFav',()=>{


        render(
            <FilterInput 
              value="" 
              onChange={mockFn} 
              handleFilterByFav={mockHandleFilterByFav} 
              isFilteredByFav={false} 
            />
        )


        const button = screen.getByRole('button')

        expect(button).toBeInTheDocument()
        
        expect(button).toHaveClass('z-30 rounded-full p-2 cursor-pointer hover:bg-white hover:bg-opacity-20')

        render(
            <FilterInput 
              value="" 
              onChange={mockFn} 
              handleFilterByFav={mockHandleFilterByFav} 
              isFilteredByFav={true} 
            />
        )

        
        expect(button).toHaveClass('hover:bg-white hover:bg-opacity-20 z-30 rounded-full p-2 cursor-pointer')


      })

})