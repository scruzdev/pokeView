

export function Paginator ({ currentEntries, totalEntries, handlePrevPage, handleNextPage  }) { //eslint-disable-line

    const startIndex = currentEntries[0]
    const endIndex = totalEntries < 30 ? totalEntries : currentEntries[1]


    return(
        <>
        
        <section className="w-full h-28 flex justify-center items-center">
                <div className="flex flex-col items-center">
                <div className="text-xl text-gray-700 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex}</span> to <span className="font-semibold text-gray-900 dark:text-white">{endIndex}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalEntries}</span> Entries
                </div>
                <div className="inline-flex mt-2 xs:mt-0">
                    <button className="flex items-center justify-center px-3 h-10 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900
                     dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                     onClick={handlePrevPage}>
                        <svg className="w-4 h-4 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        <span className="text-lg"> Prev</span>
                    </button>
                    <button className="flex items-center justify-center px-3 h-10 text-sm font-medium text-white
                     bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800
                      dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={handleNextPage}>
                    <span className="text-lg px-1"> Sig</span>
                        <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                    </button>
                </div>
                </div>
                </section>
        
        
        
        
        
        
        </>



    )








}