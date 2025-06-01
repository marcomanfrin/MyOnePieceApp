const API_BASE = "https://api.api-onepiece.com/v2";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Detail page loaded");
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) {
    document.getElementById("detail").textContent = "No character ID provided.";
    return;
  }

  try {
    console.log(`Fetching character with ID: ${id}`);
    const character = await fetchCharacterById(id);
    console.log(character);
    console.log(`Rendering character: ${character.name}`);
    renderCharacter(character);

    if (character.fruit && character.fruit.id) {
      const fruit = await fetchFruitById(character.fruit.id);
      renderFruit(fruit);
    }
  } catch (err) {
    document.getElementById("detail").textContent = "Error loading data.";
    console.error(err);
  }
});

async function fetchCharacterById(id) {
  const res = await fetch(`${API_BASE}/characters/en/${id}`);
  if (!res.ok) throw new Error("Character not found");
  return await res.json();
}

async function fetchFruitById(id) {
  const res = await fetch(`${API_BASE}/fruits/en/${id}`);
  if (!res.ok) throw new Error("Fruit not found");
  return await res.json();
}

function renderCharacter(char) {
  const container = document.getElementById("detail");
  const html = `
    <h1>${char.name}</h1>
    <p><strong>Job:</strong> ${char.job || "Unknown"}</p>
    <p><strong>Bounty:</strong> ${char.bounty || "N/A"}</p>
    <p><strong>Size:</strong> ${char.size || "Unknown"}</p>
    <p><strong>Age:</strong> ${char.age || "Unknown"}</p>
    <p><strong>Status:</strong> ${char.ststus || "Unknown"}</p>
    <hr />
  `;
  container.innerHTML = html;
}

function renderFruit(fruit) {
  const container = document.getElementById("detail");
  const html = `
    <h2>Devil Fruit: ${fruit.name}</h2>
    <img src="${fruit.image || 'img/default-fruit.png'}" alt="${fruit.name}" width="150" />
    <p><strong>Type:</strong> ${fruit.type}</p>
    <p><strong>Effect:</strong> ${fruit.description || "No description available."}</p>
  `;
  container.innerHTML += html;
}
