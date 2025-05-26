document.addEventListener("DOMContentLoaded", () => {
  const capData = JSON.parse(localStorage.getItem("captain"));
  if (capData) {
    document.getElementById("captain").innerHTML = `
      <h2>Captain: ${capData.name}</h2>
      <img src="${capData.photo}" width="150" />
      <p>Fruit: ${capData.fruit}</p>
      <p>Bounty: ${capData.bounty}</p>`;
  }
  // Aggiungi qui fetch e mostra membri e navi
});
