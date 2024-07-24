import { fireEvent, render , screen} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Paginator } from "../components/Paginator";
import '@testing-library/jest-dom'




describe('Paginator Component testing',()=>{

    it('Renderiza Paginator ',()=>{

        const mockFnNextPage = vi.fn()
        const mockFnPrevPage = vi.fn()

        render(
            <Paginator
                currentEntries={[1,30]}
                totalEntries={90}
                handleNextPage={mockFnNextPage}
                handlePrevPage={mockFnPrevPage}
             />
        )

        expect(screen.getByText('Prev')).toBeInTheDocument()
        expect(screen.getByText('Sig')).toBeInTheDocument()



        



    })

    it('Debe mostrar el rango correcto de entradas ',  () => {

        const mockFnNextPage = vi.fn()
        const mockFnPrevPage = vi.fn()
    
        render(
            <Paginator 
                currentEntries={[1, 30]} 
                totalEntries={90} 
                handlePrevPage={mockFnPrevPage} 
                handleNextPage={mockFnNextPage} 
            />
        )
    
        const startIndex = screen.getByText((content, element) =>
            element.classList.contains('font-semibold') && element.textContent === '1'
        )
    
        const endIndex = screen.getByText((content, element) =>
            element.classList.contains('font-semibold') && element.textContent === '30'
        )
    
        const totalEntries = screen.getByText((content, element) =>
            element.classList.contains('font-semibold') && element.textContent === '90'
        )
    
        expect(startIndex).toBeInTheDocument()
        expect(endIndex).toBeInTheDocument()
        expect(totalEntries).toBeInTheDocument()

    
    })

    it('Debe llamarse a las funciones mediante los buttons', ()=>{

        const mockFnNextPage = vi.fn()
        const mockFnPrevPage = vi.fn()

        render(
            <Paginator 
                currentEntries={[1, 30]} 
                totalEntries={90} 
                handlePrevPage={mockFnPrevPage} 
                handleNextPage={mockFnNextPage} 
            />
        )

        const prevButton = screen.getAllByRole('button')[0];
    
        fireEvent.click(prevButton)
    
        expect(mockFnPrevPage).toHaveBeenCalled()

            
        const buttonNext = screen.getAllByRole('button')[1];
    
        fireEvent.click(buttonNext)
    
        expect(mockFnNextPage).toHaveBeenCalled()



    })


})