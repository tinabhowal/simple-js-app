let pokemonRepository = (function () {
 
let pokemonList =     
[
    {name:"Caterpie", height:7, type: ["grass","water"] }, 
    {name:"Weedle", height:5, type: ["sweet","salty"] }, 
    {name:"Pidgeotto", height:6, type: ["grass","air"] }

];

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

function showDetails(pokemon){
    console.log(pokemon.name);
}



return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails:showDetails
};



})();

pokemonRepository.add({name:"Pikachu", height:7, type:["grass" , "water"]})

pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
});










