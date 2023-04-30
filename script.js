const form = document.querySelector('form');
form.addEventListener('submit', cercaPokemon)

function cercaPokemon(event) {
    event.preventDefault();
    let input = document.querySelector('input').value;
    input = input.toLowerCase();
    if (input === '') {
        return;
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`;
    const response = fetch(url).then(Success,Fail);
}

function Success(response) {
    if (response.ok) {
    return response.json();
    }
    else {
        PokemonNonTrovato();
    }
}

function Fail(error) {
    console.log(error);
    pokemonNonTrovato();
}

function MostraPokemon(data) {
    const text = document.querySelector('#poke-form h1');
    text.innerHTML = "Cerca un Pokemon per il competitivo :";
    text.color = "black";
    console.log(data.stats);
    for (attribute in data.stats) {
        document.querySelector('[data-stats="'+data.stats[attribute].stat.name+'"]').innerHTML = "<b>" + data.stats[attribute].stat.name + "</b> : " + data.stats[attribute].base_stat;
    }
    document.querySelector('[data-stats="height"]').innerHTML = "<b>height</b> : " + data.height;
    document.querySelector('[data-stats="weight"]').innerHTML = "<b>weight</b> : " + data.weight;
    document.querySelector('#poke-info img').src = data.sprites.front_default;
    document.querySelector('#poke-info').classList.remove('hidden');
}

function PokemonNonTrovato(){
    document.querySelector('#poke-info').classList.add('hidden');
    const text = document.querySelector('#poke-form h1');
    text.innerHTML = "ATTENZIONE POKEMON NON TROVATO, ASSICURARSI DI INSERIRE IL NOME CORRETTO:";
    text.color = "red";
}