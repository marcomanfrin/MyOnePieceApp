const API_BASE = "https://api.api-onepiece.com/v2";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("fruit-detail").textContent = "No fruit ID provided.";
    return;
  }

  try {
    const fruit = await fetchFruitById(id);
    renderFruitDetail(fruit);
  } catch (err) {
    console.error(err);
    document.getElementById("fruit-detail").textContent = "Error loading fruit data.";
  }
});

async function fetchFruitById(id) {
  const res = await fetch(`${API_BASE}/fruits/en/${id}`);
  if (!res.ok) throw new Error("Fruit not found");
  return await res.json();
}

function renderFruitDetail(fruit) {
  const container = document.getElementById("fruit-detail");

  const html = `
    <h1>${fruit.name}</h1>
    <p><strong>Type:</strong> ${fruit.type}</p>
    <p><strong>Description:</strong> ${fruit.description || "No description available."}</p>
  `;

  container.innerHTML = html;
}
