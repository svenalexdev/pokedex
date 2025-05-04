// UI for journal

const favPokemonKey = "favorites";

// Passed "currentFavorites" as parameter to make the code work
const displayFavPokemon = (currentFavorites) => {
    const favPokemon = currentFavorites;
    const card = document.getElementById("pokemon-card");

    //Remove existing list entries
    while (card.firstChild) {
        card.removeChild(card.firstChild);
    }

    // Add new entries
    // Changed to "currentFavorites" to make the code work
    currentFavorites.forEach((pokemon) => {
        // Adapting stats to array (of objects) format (my format: objects with key-value pairs)
        pokemon.stats = Array.isArray(pokemon.stats)
            ? Object.fromEntries(pokemon.stats.map((s) => [s.name, s.value]))
            : pokemon.stats;

        const item = document.createElement("div");
        item.classList.add(
            "mt-10",
            "bg-white",
            "shadow-md",
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
        name.textContent = `Name: ${
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
        }`;
        name.classList.add("font-bold");

        const stats = document.createElement("div");
        stats.classList.add("mt-5");
        for (const [key, value] of Object.entries(pokemon.stats)) {
            const stat = document.createElement("p");
            stat.textContent = `${
                key.charAt(0).toUpperCase() + key.slice(1)
            }: ${value}`;

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
                JSON.stringify(favPokemon)
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

export {displayFavPokemon};