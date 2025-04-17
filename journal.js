// Retrieve and display the list of favorite Pokemon from localStorage.
// Each Pokemon should be rendered with an image, name, and relevant stats.
// Include a button to add personal notes to each Pokemon. Save these notes to the corresponding object in localStorage.

const favPokemonList = document.getElementById("favPokemonList");

let favPokemons = JSON.parse(localStorage.getItem("favPokemons")) || [];
console.log(favPokemons);

if (!favPokemonList) => {
    alert("No Pokémons faved yet!");
}

// maybe create a list on the left to show and select a favPokemon, then submit button ("Show card") in middle, to have card in big displayed on the right
// alternatively, just show all favorite pokemons in smaller cards in grid layout
// localStorage.getItem("key") -> align with Kostas for localStorage/key naming
// displayFavPokemons function

// Card style = bg-grey/white-X00, image, name, stats, personal note field + save button
// Save these notes in localStorage (setItem, e.g. localStorage.setItem("notes", "object")?)
