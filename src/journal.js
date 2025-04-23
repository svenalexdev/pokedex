// Retrieve and display the list of favorite Pokemon from localStorage.
// Each Pokemon should be rendered with an image, name, and relevant stats.
// Include a button to add personal notes to each Pokemon. Save these notes to the corresponding object in localStorage.

// const favPokemonList = document.getElementById("pokemon-cards");

// let favPokemons = JSON.parse(localStorage.getItem("favPokemons")) || [];
// console.log(favPokemons);

// if (!favPokemonList) => {
//     alert("No Pokémons faved yet!");
// }

// Ideas:
// maybe create a list on the left to show and select a favPokemon, then submit button ("Show card") in middle, to have card in big displayed on the right
// alternatively, just show all favorite pokemons in smaller cards in grid layout
// localStorage.getItem("key") -> align with Kostas for localStorage/key naming
// displayFavPokemons function

// Card style = bg-grey/white-X00, image, name, stats, personal note field + save button
// Save these notes in localStorage (setItem, e.g. localStorage.setItem("notes", "object")?)

// 1. Declare variables
// 2. Create functions for localStorage (retrieve with getItem, save with setItem)
// 3. Create DOM for buidling card

const favPokemonKey = "favorites";

// There is not yet a connection with the Pokemon API, that is why we do not write it like this:
// const getFavPokemon = () => JSON.parse(localStorage.getItem(favPokemonKey)) || [];
// console.log(getFavPokemon);
// But like this, including "mock Pokemon":

const mockPokemon = [
    {
        name: "Pikachu",
        id: 25,
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        stats: { hp: 35, attack: 55, defense: 40, speed: 90 },
    },
    {
        name: "Bulbasaur",
        id: 1,
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        stats: { hp: 45, attack: 49, defense: 49, speed: 45 },
    },
    {
        name: "Charmander",
        id: 4,
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
        stats: { hp: 39, attack: 52, defense: 43, speed: 65 },
    },
];

const getFavPokemon = () => {
    const saved = JSON.parse(localStorage.getItem(favPokemonKey));
    console.log(saved);
    return saved && saved.length ? saved : mockPokemon;
};

// const displayFavPokemon = () => {
//     const favPokemon = getFavPokemon();
//     const ul = document.getElementById("favorite-pokemon");

//     //Remove existing list entries
//     while (ul.firstChild) {
//         ul.removeChild(ul.firstChild);
//     }

//Add new entries
//     favPokemon.forEach((pokemon) => {
//         const li = document.createElement("li");
//         li.textContent = pokemon.name;
//         li.classList.add(
//             "p-1",
//             "mb-2",
//             "text-center",
//             "hover:font-semibold",
//             "hover:text-lg",
//             "cursor-pointer",
//             "w-max",
//             "mx-auto"
//         );
//         ul.appendChild(li);
//     });
// };

const currentFavorites = getFavPokemon();

const displayFavPokemon = () => {
    const favPokemon = currentFavorites;
    const card = document.getElementById("pokemon-card");

    //Remove existing list entries
    while (card.firstChild) {
        card.removeChild(card.firstChild);
    }

    //Add new entries
    favPokemon.forEach((pokemon) => {
        const item = document.createElement("div");
        item.classList.add(
            "mt-10",
            "bg-blue-200",
            "border",
            "rounded",
            "mx-auto",
            "w-70",
            "p-5"
        );

        const img = document.createElement("img");
        img.src = pokemon.image;
        img.alt = pokemon.name;
        img.classList.add(
            "flex",
            "align-center",
            "text-center",
            "justify-center",
            "w-40",
            "h-40",
            "block",
            "mx-auto"
        );

        const name = document.createElement("h3");
        name.textContent = `NAME: ${pokemon.name}`;
        name.classList.add("font-bold");

        const stats = document.createElement("div");
        stats.classList.add("mt-5");
        for (const [key, value] of Object.entries(pokemon.stats)) {
            const stat = document.createElement("p");
            stat.textContent = `${key.toUpperCase()}: ${value}`;

            stats.appendChild(stat);
        }

        const notes = document.createElement("textarea");
        notes.placeholder = "Enter personal note...";
        notes.classList.add(
            "mt-5",
            "border",
            "border-gray-400",
            "bg-white",
            "w-60",
            "h-20"
        );

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save!";
        saveButton.classList.add(
            "bg-blue-600",
            "text-white",
            "hover:bg-blue-500",
            "py-1",
            "px-2",
            "rounded",
            "cursor-pointer"
        );

        // Create link between save button and respective text field. But: only last note saved is displayed in console
        saveButton.addEventListener("click", () => {
            const userNote = notes.value;
            pokemon.note = userNote;
            localStorage.setItem(
                favPokemonKey,
                JSON.stringify(currentFavorites)
            );
            notes.value = "";
            alert("Note sucessfully saved!");
        });

        item.appendChild(img);
        item.appendChild(name);
        item.appendChild(stats);
        item.appendChild(notes);
        item.appendChild(saveButton);

        card.appendChild(item);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    displayFavPokemon();
});

// const addFavPokemons = (pokemon) => {
//     const FavPokemons = getFavPokemons();
//     favPokemons.push(pokemon);
//     localStorage.setItem(favPokemonsKey, JSON.stringify(favPokemons));
// };
