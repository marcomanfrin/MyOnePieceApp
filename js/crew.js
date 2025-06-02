const API_BASE = "https://api.api-onepiece.com/v2";
let captain;
let boatId;
let crewIds = [];
let userId;

document.addEventListener("DOMContentLoaded", async () => {
  userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Utente non autenticato");
    window.location.href = "login.html";
    return;
  }

  const res = await fetch(`http://localhost:3001/users?id=${userId}`);
  const [user] = await res.json();

  captain = user.captain;
  boatId = user.boatId;
  crewIds = user.crew || [];

  let totalBounty = 0;

  // === CAPITANO ===
  totalBounty += parseInt(captain.bounty || 0);
  document.getElementById("captain").innerHTML = `
    <h2>Captain: ${captain.name}</h2>
    <p>Fruit: ${captain.fruit || 'None'}</p>
    <p>Bounty: ${captain.bounty}</p>`;

  // === NAVE ===
  if (boatId) {
    const ship = await fetchShipById(boatId);
    document.getElementById("ship").innerHTML = `
      <h2>Ship: ${ship.name}</h2>`;
  }

  // === MEMBRI DELLA CIURMA ===
  const crewBox = document.getElementById("crew");
  crewBox.innerHTML = "";

  for (const id of crewIds) {
    const member = await fetchCharacterById(id);
    let bounty = parseInt((member.bounty || "0").replace(/\./g, ""), 10);
    totalBounty += (bounty || 0);

    const div = document.createElement("div");
    div.className = "crew-member";
    div.dataset.memberId = id;
    div.innerHTML = `
      <h3>${member.name}</h3>
      <p>Role: ${member.job || 'Unknown'}</p>
      <p>Bounty: ${member.bounty}</p>
      <button class="remove-btn" data-id="${id}">Rimuovi</button>`;
    crewBox.appendChild(div);
  }

  // === BOUNTY TOTALE ===
  document.getElementById("totalBounty").textContent = `Total Bounty: ${totalBounty}`;

  // === EVENT LISTENER per rimozione ===
  crewBox.addEventListener("click", async (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const idToRemove = parseInt(e.target.dataset.id);
      crewIds = crewIds.filter(id => id !== idToRemove);

      // PATCH per aggiornare l'utente su JSON Server
      await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crew: crewIds })
      });

      // Rimuovi dal DOM
      const memberDiv = e.target.closest(".crew-member");
      if (memberDiv) memberDiv.remove();

      // Ricalcola il bounty totale (opzionale)
      // location.reload(); // non serve più
    }
  });
});

async function fetchCharacterById(id) {
  const res = await fetch(`${API_BASE}/characters/en/${id}`);
  if (!res.ok) throw new Error("Character not found");
  return await res.json();
}

async function fetchShipById(id) {
  const res = await fetch(`${API_BASE}/boats/en/${id}`);
  if (!res.ok) throw new Error("Ship not found");
  return await res.json();
}
