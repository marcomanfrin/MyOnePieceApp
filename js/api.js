
const API_BASE = "https://api.api-onepiece.com/v2";

async function loadCharacters() {
  try {
    const res = await fetch(`${API_BASE}/characters/en`);
    const data = await res.json();

    const charBox = document.getElementById("characters");

    data.forEach(c => {
      const el = document.createElement("div");
      el.className = "carousel-item character";
      //<img src="${c.image}" alt="no img" width="100"><br>
      el.innerHTML = `
        <strong>${c.name}</strong><br>
        <small>${c.job}</small><br>
        <small>bounty: ${c.bounty}</small><br>
        <button class="btn btn-primary" onclick="location.href='detailPages/char.html'">Details</button>
      `;
      charBox.appendChild(el);
    });
  } catch (err) {
    console.error("Errore nel caricamento dei personaggi:", err);
  }
}
async function loadDevilFruits(){
  try {
    const res = await fetch(`${API_BASE}/fruits/en`);
    const data = await res.json();

    const charBox = document.getElementById("fruits");

    data.forEach(c => {
      const el = document.createElement("div");
      el.className = "carousel-item fruits";
      el.innerHTML = `
        <img src="${c.image}" alt="no img" width="100"><br>
        <strong>${c.name}</strong><br>
        <small>${c.roman_name}</small>
        <button class="btn btn-primary" onclick="location.href='detailPages/fruit.html'">Details</button>
      `;
      charBox.appendChild(el);
    });
  } catch (err) {
    console.error("Errore nel caricamento dei frutti:", err);
  }
}
async function loadFruits(){
  try {
    const res = await fetch(`${API_BASE}/fruits/en`);
    const data = await res.json();
    return data.map(f => f.name).filter(Boolean);
  } catch (err) {
    console.error("Errore nel caricamento dei frutti:", err);
    return [];
  }
}
async function loadShips(){
  try {
    const res = await fetch(`${API_BASE}/boats/en`);
    const data = await res.json();

    const charBox = document.getElementById("ships");

    data.forEach(c => {
      const el = document.createElement("div");
      el.className = "carousel-item";
      el.innerHTML = `
        <img src="${c.image}" alt="no img" width="100"><br>
        <strong>${c.name}</strong><br>
        <small>${c.crew.name}</small>
      `;
      charBox.appendChild(el);
    });
  } catch (err) {
    console.error("Errore nel caricamento delle navi:", err);
  }
}
async function loadSwords(){
  try {
    const res = await fetch(`${API_BASE}/swords/en`);
    const data = await res.json();

    const charBox = document.getElementById("swords");

    data.forEach(c => {
      const el = document.createElement("div");
      el.className = "carousel-item";
      el.innerHTML = `
        <img src="${c.image}" alt="no img" width="100"><br>
        <strong>${c.name}</strong><br>
        <small>${c.roman_name}</small><br>
        <small>${c.type} - ${c.category}</small>
      `;
      charBox.appendChild(el);
    });
  } catch (err) {
    console.error("Errore nel caricamento delle spade:", err);
  }
}
async function loadCrews(){
  try {
    const res = await fetch(`${API_BASE}/crews/en`);
    const data = await res.json();

    const charBox = document.getElementById("crews");

    data.forEach(c => {
      const el = document.createElement("div");
      el.className = "carousel-item";
      el.innerHTML = `
        <img src="${c.image}" alt="no img" width="100"><br>
        <strong>${c.name}</strong><br>
        <small>${c.roman_name}</small><br>
        <small>${c.total_prime}</small>
      `;
      charBox.appendChild(el);
    });
  } catch (err) {
    console.error("Errore nel caricamento delle ciurme:", err);
  }
}




document.addEventListener("DOMContentLoaded", async function () {
  await loadCharacters();
  await loadDevilFruits();
  await loadShips();
  await loadSwords();
  await loadCrews();
})

