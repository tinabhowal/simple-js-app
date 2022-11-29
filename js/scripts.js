let pokemonRepository = (function () {
 
let pokemonList =     
[
    // {name:"Caterpie", height:7, type: ["grass","water"] }, 
    // {name:"Weedle", height:5, type: ["sweet","salty"] }, 
    // {name:"Pidgeotto", height:6, type: ["grass","air"] }

];

let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function add(pokemon) {
    pokemonList.push(pokemon);
}

function getAll(){
return pokemonList;
}

function addListItem(pokemon){
    let pokemonUl = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonUl.appendChild(listPokemon);
    button.addEventListener("click", function () {
        showDetails(pokemon);
      });
}



function loadList(){
    return fetch(apiUrl).then(function (response){
        return response.json();
    }).then(function (json) {
        json.results.forEach(function (item){
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
        });
    }).catch(function(e){
        console.error(e);
    })
}


function loadDetails (item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response){
        return response.json();
    }).then(function(details){
       item.imageUrl = details.sprites.front_default;
       item.height = details.height;
       item.types = details.types;
    }).catch(function (e) {
        console.error(e);
    });
}


function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
        console.log(pokemon);
    });
}


return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails:showDetails
};



})();

// pokemonRepository.add({name:"Pikachu", height:7, type:["grass" , "water"]})

pokemonRepository.loadList().then(function ()
{
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });

});












