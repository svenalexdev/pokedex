// Storage for journal
import { mockPokemon } from "./network";

const getFavPokemon = () => {
    const saved = JSON.parse(localStorage.getItem("favorites"));
    // console.log(saved);
    return saved && saved.length ? saved : mockPokemon;
};

export { getFavPokemon };
