const API_BASE = "https://api.api-onepiece.com/v2";

let allCharacters = [];
let allFruits = [];
let allShips = [];
let allSwords = [];
let allCrews = [];


document.addEventListener("DOMContentLoaded", async function () {
  try {
    //showSpinner();

    await fetchCharacters();
    console.log("Caricamento personaggi completato:", allCharacters.length);
    renderCharacters(allCharacters);

    await fetchDevilFruits();
    console.log("Caricamento frutti completato:", allCharacters.length);
    renderDevilFruits(allFruits);

    await fetchShips();
    console.log("Caricamento navi completato:", allCharacters.length);
    renderShips(allShips);

    await fetchSwords();
    console.log("Caricamento spade completato:", allCharacters.length);
    renderSwords(allSwords);

    await fetchCrews();
    console.log("Caricamento ciurme completato:", allCharacters.length);
    renderCrews(allCrews);
    
  } catch (err) {
    console.error("Errore durante il caricamento dei dati:", err);
  } finally {
    //hideSpinner();
  }
});



// ========== FETCH DATI ========== //
async function fetchCharacters() {
  const res = await fetch(`${API_BASE}/characters/en`);
  allCharacters = await res.json();
}
async function fetchDevilFruits() {
  const res = await fetch(`${API_BASE}/fruits/en`);
  allFruits = await res.json();
}
async function fetchShips() {
  const res = await fetch(`${API_BASE}/boats/en`);
  allShips = await res.json();
}
async function fetchSwords() {
  const res = await fetch(`${API_BASE}/swords/en`);
  allSwords = await res.json();
}
async function fetchCrews() {
  const res = await fetch(`${API_BASE}/crews/en`);
  allCrews = await res.json();
}

// ========== RENDER CARD ========== //
function renderCharacters(data) {
  const charBox = document.getElementById("characters");

  data.forEach(c => {
    const el = document.createElement("div");
    el.className = "carousel-item character";
    el.innerHTML = `
      <strong>${c.name}</strong><br>
      <small>bounty: ${c.bounty}</small><br>
      <button class="btn btn-primary" onclick="location.href='detailPages/char.html?id=' + ${c.id}">Details</button>
      <button class="add-to-crew" data-id="${c.id}">Aggiungi alla ciurma</button>
    `;
    charBox.appendChild(el);
  });
}

function renderDevilFruits(data) {
  const charBox = document.getElementById("fruits");

  data.forEach(c => {
    const el = document.createElement("div");
    el.className = "carousel-item fruits";
    el.innerHTML = `
      <strong>${c.name}</strong><br>
      <small>${c.roman_name}</small>
      <button class="btn btn-primary" onclick="location.href='detailPages/fruit.html?id=' + ${c.id}">Details</button>
    `;
    charBox.appendChild(el);
  });
}

function renderShips(data) {
  const charBox = document.getElementById("ships");

  data.forEach(c => {
    const el = document.createElement("div");
    el.className = "carousel-item";
    el.innerHTML = `
      <strong>${c.name}</strong><br>
      <button class="select-ship" data-id="${c.id}">Choose boat</button>
      `;
    charBox.appendChild(el);
  });
}

function renderSwords(data) {
  const charBox = document.getElementById("swords");

  data.forEach(c => {
    const el = document.createElement("div");
    el.className = "carousel-item";
    el.innerHTML = `
      <strong>${c.name}</strong><br>
      <small>${c.roman_name}</small><br>
      <small>${c.type} - ${c.category}</small>
    `;
    charBox.appendChild(el);
  });
}

function renderCrews(data) {
  const charBox = document.getElementById("crews");

  data.forEach(c => {
    const el = document.createElement("div");
    el.className = "carousel-item";
    el.innerHTML = `
      <strong>${c.name}</strong><br>
      <small>${c.roman_name}</small><br>
      <small>${c.total_prime}</small>
    `;
    charBox.appendChild(el);
  });
}

// ========== SPINNER ========== //
function showSpinner() {
  document.getElementById("loadingSpinner").style.display = "block";
}
function hideSpinner() {
  document.getElementById("loadingSpinner").style.display = "none";
}
