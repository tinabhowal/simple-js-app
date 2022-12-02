



let pokemonRepository = (function () {
 
    let pokemonList = [];
    
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    

    
    // adding the fetched pokemon
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    
    // returning the list of pokemon
    function getAll(){
    return pokemonList;
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
        pokemonRepository.loadDetails(pokemon).then(function(){
            console.log(pokemon);
            showModal(pokemon);
        });
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
    
    


    // showing the modal container
    function showModal(pokemon) {
    let modalContainer =  document.querySelector('.modal-container');
    
    
    modalContainer.innerHTML = "";
    
    let modal = document.createElement("div");
    modal.classList.add("modal");
    
    let nameElement = document.createElement("h1");
    nameElement.innerText = pokemon.name;
    
    let imageElement = document.createElement("img");
    imageElement.src = pokemon.imageUrl;
    imageElement.classList.add("logo-image");
    
    let heightElement = document.createElement("p");
    heightElement.innerText = pokemon.height;
    
    let typesElement = document.createElement("p");
    typesElement.innerText = pokemon.types;
    
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", function(){
        hideModal()
    });
    
    
    modal.appendChild(nameElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(typesElement);
    modal.appendChild(closeButtonElement);
    
    modalContainer.appendChild(modal);
    
    modalContainer.classList.add("is-visible");
    
    }

    

      function hideModal() {
        modalContainer.classList.remove('is-visible');
      };

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
      });

    //   modalContainer.addEventListener('click', (e) => {
    //     // Since this is also triggered when clicking INSIDE the modal container,
    //     // We only want to close if the user clicks directly on the overlay
    //     let target = e.target;
    //     if (target === modalContainer) {
    //       hideModal();
    //     }
    //   })

    
     

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
    
    
    



