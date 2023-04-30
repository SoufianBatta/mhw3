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
    response.json().then(MostraPokemon);
    }
    else {
        ElementoNonTrovato();
    }
}

function Fail(error) {
    console.log(error);
    ElementoNonTrovato();
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
    getAccessToken();
}

function ElementoNonTrovato(){
    document.querySelector('#poke-info').classList.add('hidden');
    document.querySelector('#poke-sound').classList.add('hidden');
    const text = document.querySelector('#poke-form h1');
    text.innerHTML = "ATTENZIONE POKEMON NON TROVATO, ASSICURARSI DI INSERIRE IL NOME CORRETTO:";
    text.color = "red";
}

const client_id = 'b66d62c1c31a4887a20ae8088b2ddf84';
const client_secret = '654f70c7298e406085f472612538f75f'

function getAccessToken() {
    const url = 'https://accounts.spotify.com/api/token';
    const response = fetch(url, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic '+ btoa(client_id + ':' + client_secret)
        }
    }).then(GotResponse, GotError).then(SaveToken);
}

function GotResponse(response) {
    return response.json();
}

function GotError(error) {
    console.log(error);
}

function SaveToken(token) {
    console.log(token);
    const q = document.querySelector('input').value;
    const url = `https://api.spotify.com/v1/search?q=${q}&type=album&limit=1`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+ token.access_token
        }
    }).then(GotResponse,GotError).then(MostraAlbum);
}

function MostraAlbum(data) {
    console.log(data);
    const text = document.querySelector('#poke-sound h1');
    text.innerHTML = "Abbiamo Trovato Questo Album Con Il Nome Di Questo Pokemon:";
    text.color = "black";
    const album = data.albums.items[0];
    console.log(album);
    for (attribute in album) {
        const elemnt = document.querySelector('[data-sound="'+attribute+'"]');
        if (elemnt !== null){
            elemnt.innerHTML = "<b>" + attribute + "</b> : " + album[attribute];
        }
    }
    document.querySelector('[data-sound=spotify]').href = album.external_urls.spotify;
    document.querySelector('#poke-sound img').src =album.images[0].url;
    document.querySelector('#poke-sound').classList.remove('hidden');
}