import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import {  describe, expect, it, vi } from "vitest";
import { Landing } from "../components/Landing";


vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})


describe('Landing component testing', ()=>{

        it('Debe renderizar Landing component',()=>{

            render(
                <BrowserRouter>
                    <Landing/>
                </BrowserRouter>
            )
            
            expect(screen.getByText('START')).toBeInTheDocument()
    
    
        })

        it('Debe navegar a /pokegrid después de la animación lanzada por el button', async () => {
          const mockNavigate = vi.fn()
      

          vi.mocked(useNavigate).mockReturnValue(mockNavigate)
      
          render(
            <BrowserRouter>
              <Landing />
            </BrowserRouter>
          )
      
          const button = screen.getByRole('button', { name: 'START' })

          fireEvent.click(button)
      

          await waitFor(() => {
            expect(button).toHaveClass('fade-out-button')
          }, { timeout: 2500 })
      

          await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/pokegrid')
          }, {timeout:2500})
        })

})