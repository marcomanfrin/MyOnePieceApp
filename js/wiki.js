import { loadCharacters, loadDevilFruits, loadShips, loadSwords, loadCrews } from "./api.js";

document.addEventListener("DOMContentLoaded", async function () {
  await loadCharacters();
  await loadDevilFruits();
  await loadShips();
  await loadSwords();
  await loadCrews();
})
