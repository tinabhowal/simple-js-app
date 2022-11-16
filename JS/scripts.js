// alert("Hello World!");

// let favoriteFood = "Paneer";
// document.write(favoriteFood);

let pokemonList=[
    {name:"Caterpie", height:7, type: ["grass","water"] }, 
    {name:"Weedle", height:5, type: ["sweet","salty"] }, 
    {name:"Pidgeotto", height:6, type: ["grass","air"] } 
]

for (let i = 0;
    i < pokemonList.length; i++) {
    if(pokemonList[i].height >= 7) {
        document.write(pokemonList[i].name + " (height:  " + pokemonList[i].height + " m) - Wow, that is a big pokemon!" + "<br>")
    }
    else if (pokemonList[i].height >= 6 && pokemonList[i].height < 7){
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + " m) - That is a medium pokemon." + "<br>")
    }
    else {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + " m) - That is a small pokemon." + "<br>")
    }
}