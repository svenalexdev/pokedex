// Storage for journal
import { mockPokemon } from "./network";

// Unclear: why is it still working if we change e.g. "favorites" to ""
const favPokemonKey = "favorites";

const getFavPokemon = () => {
    const saved = JSON.parse(localStorage.getItem(favPokemonKey));
    // console.log(saved);
    return saved && saved.length ? saved : mockPokemon;
};

export { getFavPokemon };
