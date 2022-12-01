let pokemonRepository = (function () {
 
let pokemonList = [];

let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// adding the fetch pokemon
function add(pokemon) {
    pokemonList.push(pokemon);
}

// returning the list of pokemon
function getAll(){
return pokemonList;
}


// fetch pokemon lis of pokemon
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


// creates a button for the individual pokemon from pokemon list
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

function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
        console.log(pokemon);
        showModal(pokemon);
    });
}


// loaddetails loads items' details from pokemon url
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


// showing the modal container
function showModal(pokemon) {
let modalContainer =  document.querySelector('.modal-container');


modalContainer.innerHTML = "";

let modal = document.createElement("div");
modal.classList.add("modal");

let nameElement = document.createElement("h5");
nameElement.innertext = pokemon.name;

let imageElement = document.querySelector(".modal-img");
imageElement.attributes('src', pokemon.imageUrl);

let heightElement = document.createElement("p");
heightElement.innerText = pokemon.height;

let typesElement = document.createElement("p");
typesElement.innerText = pokemon.types;

let closeButtonElement = document.createElement("button");
closeButtonElement.classList.add('modal-close');
closeButtonElement.innerText = 'Close';


modal.appendChild(nameElement);
modal.appendChild(imageElement);
modal.appendChild(heightElement);
modal.appendChild(typesElement);

modalContainer.appendChild(modal);

modalContainer.classList.add('is-visible');

};

return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
    
};



})();

// pokemonRepository.add({name:"Pikachu", height:7, type:["grass" , "water"]})

pokemonRepository.loadList().then(function ()
{
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });

});









