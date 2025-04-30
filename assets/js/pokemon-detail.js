const detailSection = document.getElementById('pokemonDetail')

// Função para pegar o ID da URL
function getPokemonIdFromUrl() {
    const params = new URLSearchParams(window.location.search)
    return params.get('id')
}

function convertStats(stats) {
    return stats.map(stat => `
        <li>
            <span>${stat.stat.name.toUpperCase()}</span>
            <span>${stat.base_stat}</span>
        </li>
    `).join('')
}

function loadPokemonDetail(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(pokemon => {
            const types = pokemon.types.map(t => t.type.name)
            const mainType = types[0]

            detailSection.classList.add(mainType)
            detailSection.innerHTML = `
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                <ol class="types">
                    ${types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <ul class="stats">
                    ${convertStats(pokemon.stats)}
                </ul>
            `
        })
}

const id = getPokemonIdFromUrl()
if (id) {
    loadPokemonDetail(id)
}
