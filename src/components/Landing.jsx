import { useState } from "react"
import { useNavigate } from "react-router-dom"


export function Landing(){


    const [animating,setAnimating] = useState(false)

    const navigate = useNavigate()

    const handleClick = () => {
        setAnimating(true)
        setTimeout(() => {

            navigate('/pokegrid')
        }, 2100)
    }

    

    return (
        <div className={`flex flex-col min-h-screen ${animating ? 'shrink' : ''}`}>
               <button
        onClick={handleClick}
        className={`absolute px-12 py-16 bg-white active:bg-gray-400 hover:bg-gray-200 text-black bottom-1/2 left-1/2
          rounded-full border-8 border-black transition-colors duration-400 transform -translate-x-1/2 translate-y-1/2 ${animating ? 'fade-out-button' : ''}`}
      >            <span className='font-bold font-mono text-xl'>START</span>
          </button>
          <section className="flex-grow border-b-8 border-black bg-red-800 rojo">
          </section>
          <section className="w-full border-t-8 border-black bg-white blanco" style={{ height: '50vh' }}>
          </section>
        </div>
      )
}