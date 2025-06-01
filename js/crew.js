const API_BASE = "https://api.api-onepiece.com/v2";

document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Utente non autenticato");
    window.location.href = "login.html";
    return;
  }

  const res = await fetch(`http://localhost:3001/users?id=${userId}`);
  const [user] = await res.json();

  const captain = user.captain;
  const boatId = user.boatId;
  const crewIds = user.crewMembers || [];

  let totalBounty = 0;

  // === CAPITANO ===
  totalBounty += parseInt(captain.bounty || 0);
  document.getElementById("captain").innerHTML = `
    <h2>Captain: ${captain.name}</h2>
    <img src="${captain.image || 'img/default-captain.png'}" width="150" />
    <p>Fruit: ${captain.fruit || 'None'}</p>
    <p>Bounty: ${captain.bounty}</p>`;

  // === NAVE ===
  if (boatId) {
    const ship = await fetchShipById(boatId);
    document.getElementById("ship").innerHTML = `
      <h2>Ship: ${ship.name}</h2>
      <img src="${ship.image || 'img/default-ship.png'}" width="200" />`;
  }

  // === MEMBRI DELLA CIURMA ===
  const crewBox = document.getElementById("crew");

  for (const id of crewIds) {
    const member = await fetchCharacterById(id);
    let bounty = parseInt((member.bounty || "0").replace(/\./g, ""), 10);
    totalBounty += (bounty || 0);
    console.log("Total Bounty: " + totalBounty);
    const div = document.createElement("div");
    div.className = "crew-member";
    div.innerHTML = `
      <h3>${member.name}</h3>
      <img src="${member.image || 'img/default-crew.png'}" width="100" />
      <p>Role: ${member.job || 'Unknown'}</p>
      <p>Bounty: ${member.bounty}</p>`;
    crewBox.appendChild(div);
  }

  // === BOUNTY TOTALE ===
  document.getElementById("totalBounty").textContent = `Total Bounty: ${totalBounty}`;
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
