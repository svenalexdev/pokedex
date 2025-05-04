import { getFavPokemon } from "../modules/storage";
import { displayFavPokemon } from "../modules/ui";

document.addEventListener("DOMContentLoaded", () => {
    // Had to relocate line 6 into this function - initially it was before / outside of it
    const currentFavorites = getFavPokemon();
    displayFavPokemon(currentFavorites);
});
