
export async function fetchPokemonEndpoint () {

    try {

        const response  = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0')

        if (!response.ok) {
            throw new Error(`Error de red: ${response.statusText}`)
        }

        const data =  await response.json()

        return data

        
    } catch (error) {
        console.error('Ha ocurrido un error: ', error)
        return null
    }



}

export async function fetchPokemon(url) {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error de red: ${response.statusText}`)
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error( error)
        return null; 
    }
}

export async function fetchPokemonDescription(id){

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)

        if (!response.ok) {
            throw new Error(`Error de red: ${response.statusText}`)
        }

        const data = await response.json()

        const englishEntry = data.flavor_text_entries.find(entry => entry.language.name === 'en')

        return englishEntry ? englishEntry.flavor_text : 'No description available.'

    } catch (error) {
        console.error('Ha ocurrido un error: ', error)
        return null
    }


}
