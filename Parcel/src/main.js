// Not yet refactored

const apiURL = "https://pokeapi.co/api/v2/pokemon";
const searchForm = document.getElementById("search-bar");
const searchInput = searchForm.querySelector("input");
const mainSection = document.querySelector("main");

async function fetchPokemon(pokemonNameOrId) {
    try {
        const res = await fetch(`${apiURL}/${pokemonNameOrId.toLowerCase()}`);
        if (!res.ok) {
            throw new Error("Pokemon not found");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        alert("Pokemon not found. Try another name or ID.");
        return null;
    }
}

function saveToFavorites(pokemon) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyAdded = favorites.some((p) => p.id === pokemon.id);
    if (alreadyAdded) {
        alert(`${pokemon.name} is already in favorites.`);
        return;
    }

    const newFavorite = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        stats: pokemon.stats.map((stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
        })),
    };

    favorites.push(newFavorite);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${pokemon.name} added to favorites!`);
}

function createPokemonCard(pokemon) {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl p-4 shadow-md max-w-sm mx-auto";

    card.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="mx-auto mb-2">
      <h2 class="text-xl font-bold text-center capitalize">${pokemon.name}</h2>
      <ul class="text-sm mt-2">
        <li><strong>HP:</strong> ${pokemon.stats[0].base_stat}</li>
        <li><strong>Attack:</strong> ${pokemon.stats[1].base_stat}</li>
        <li><strong>Defense:</strong> ${pokemon.stats[2].base_stat}</li>
      </ul>
      <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">
        Add to Favorites
      </button>
    `;

    const button = card.querySelector("button");
    button.addEventListener("click", () => {
        saveToFavorites(pokemon);
    });

    return card;
}

function showPokemon(pokemon) {
    mainSection.innerHTML = "";
    const card = createPokemonCard(pokemon);
    mainSection.appendChild(card);
}

async function loadInitialPokemon() {
    try {
        const res = await fetch(`${apiURL}?limit=20`);
        const data = await res.json();

        const grid = document.createElement("div");
        grid.className =
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4";
        mainSection.appendChild(grid);

        for (const entry of data.results) {
            const pokemonData = await fetchPokemon(entry.name);
            if (pokemonData) {
                const card = createPokemonCard(pokemonData);
                grid.appendChild(card);
            }
        }
    } catch (error) {
        console.error("Error loading initial Pokémon:", error);
    }
}

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const pokemonNameOrId = searchInput.value.trim();
    if (pokemonNameOrId === "") return;

    const pokemon = await fetchPokemon(pokemonNameOrId);
    if (pokemon) {
        showPokemon(pokemon);
    }
    console.log("Form submitted!");
});

loadInitialPokemon();
