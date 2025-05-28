const API_BASE = "https://api.api-onepiece.com/v2";

document.addEventListener("DOMContentLoaded", async () => {
  const captain = localStorage.getItem("captain");
  console.log("Captain:", captain);
  const captainData = JSON.parse(captain);
  const shipId = localStorage.getItem("shipId");
  const crewIds = JSON.parse(localStorage.getItem("crewMemberIds")) || [];

  let totalBounty = 0;

  // === CAPITANO ===
    totalBounty += parseInt(captain.bounty || 0);
    document.getElementById("captain").innerHTML = `
      <h2>Captain: ${captainData.name}</h2>
      <img src="${captainData.image}" width="150" />
      <p>Fruit: ${captainData.fruit || 'None'}</p>
      <p>Bounty: ${captainData.bounty}</p>`;

  // === NAVE ===
  if (shipId) {
    const ship = await fetchShipById(shipId);
    //console.log("Ship:", ship);

    document.getElementById("ship").innerHTML = `
      <h2>Ship: ${ship.name}</h2>
      <img src="${ship.image}" width="200" />`;
  }

  // === MEMBRI DELLA CIURMA ===
  const crewBox = document.getElementById("crew");

  for (const id of crewIds) {
    //console.log("Crew Member ID:", id);
    const member = await fetchCharacterById(id);
    totalBounty += parseInt(member.bounty || 0);

    const div = document.createElement("div");
    div.className = "crew-member";
    div.innerHTML = `
      <h3>${member.name}</h3>
      <img src="${member.image}" width="100" />
      <p>Role: ${member.job || 'Unknown'}</p>
      <p>Bounty: ${member.bounty}</p>`;
    crewBox.appendChild(div);
  }

  // === BOUNTY TOTALE ===
  document.getElementById("totalBounty").textContent = totalBounty;
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