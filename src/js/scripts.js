



let pokemonRepository = (function () {
 
    let pokemonList = [];
    
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    let pokemonListElement = $('.pokemon-list');
    
    // adding the fetched pokemon
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    
    // returning the list of pokemon
    function getAll(){
    return pokemonList;
    }

    // creates a button for the individual pokemon from pokemon list
    function addListItem(pokemon) {
        
        let listItem = $('<li class="list-group-item"></li>');
        let button = $(
          '<button class="pokemon-button btn btn-warning" data-target="#pokemon-modal" data-toggle="modal">' +
            pokemon.name +
            '</button>'
        );
        // add button to list item and add item(pokemon) to the pokemon list elements in index.html
        listItem.append(button);
        pokemonListElement.append(listItem);
        // listens to clicks on pokemon button to show more details
        button.on('click', function () {
          showDetails(pokemon);
        });
      }
    
    
    // fetch list of pokemon from pokemon api
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
    
    
   
    

    
    
    
    //  loads items' details from pokemon url
    function loadDetails (pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
           pokemon.imageUrl = details.sprites.front_default;
           pokemon.height = details.height;
           pokemon.types = details.types.map((type) => type.type.name).join(',');
        }).catch(function (e) {
            console.error(e);
        });
    }
    

    function showDetails(pokemon){
        pokemonRepository.loadDetails(pokemon).then(function(){
            console.log(pokemon);
            showModal(pokemon);
        });
    }
    


//    showing the modal 
    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
    
        modalBody.empty();
        modalTitle.text(pokemon.name);
    
        let height = $('<p>' + 'Height: ' + pokemon.height + '</p>');
        let image = $('<img class="pokemon-img" src="' + pokemon.imageUrl + '" />');
        let types = $('<p>' + 'Types: ' + pokemon.types + '</p>');
        
        // appends the above elements to the modal body
        modalBody.append(image);
        modalBody.append(height);
        modalBody.append(types);
        
      }
    

    return{
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
        
    };
    
    
    
    })();
    
    
    
    pokemonRepository.loadList().then(function ()
    {
        pokemonRepository.getAll().forEach(function(pokemon){
            pokemonRepository.addListItem(pokemon);
        });
    
    });
    
    
    


