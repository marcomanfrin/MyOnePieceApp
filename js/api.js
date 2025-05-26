
async function loadCharacters() {
  try {
    const res = await fetch("https://api.api-onepiece.com/v2/characters/en");
    const data = await res.json();

    const charBox = document.getElementById("characters");

    data.forEach(c => {
      const el = document.createElement("div");
      el.className = "carousel-item character";
      el.innerHTML = `
        <img src="${c.image}" alt="no img" width="100"><br>
        <strong>${c.name}</strong><br>
        <small>${c.job}</small><br>
        <small>bounty: ${c.bounty}</small><br>
      `;
      charBox.appendChild(el);
    });
  } catch (err) {
    console.error("Errore nel caricamento dei personaggi:", err);
  }
}

async function loadDevilFruits(){
  try {
    const res = await fetch("https://api.api-onepiece.com/v2/fruits/en");
    const data = await res.json();

    const charBox = document.getElementById("fruits");

    data.forEach(c => {
      const el = document.createElement("div");
      el.className = "carousel-item";
      el.innerHTML = `
        <img src="${c.image}" alt="no img" width="100"><br>
        <strong>${c.name}</strong><br>
        <small>${c.roman_name}</small>
      `;
      charBox.appendChild(el);
    });
  } catch (err) {
    console.error("Errore nel caricamento dei frutti:", err);
  }
}

async function loadFruits(){
  try {
    const res = await fetch("https://api.api-onepiece.com/v2/fruits/en");
    const data = await res.json();
    return data.map(f => f.name).filter(Boolean);
  } catch (err) {
    console.error("Errore nel caricamento dei frutti:", err);
    return [];
  }
}

async function loadShips(){
  try {
    const res = await fetch("https://api.api-onepiece.com/v2/boats/en");
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
    const res = await fetch("https://api.api-onepiece.com/v2/swords/en");
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
    const res = await fetch("https://api.api-onepiece.com/v2/crews/en");
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