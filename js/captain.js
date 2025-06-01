document.addEventListener("DOMContentLoaded", async () => {
  const f = await loadFruits(); // ✅ attendi il caricamento
  const fruitSelect = document.getElementById("fruit");

  f.forEach(fruit => {
    const option = document.createElement("option");
    option.value = fruit;
    option.textContent = fruit;
    fruitSelect.appendChild(option);
  });

  const input = document.getElementById("photo");
  const preview = document.getElementById("preview");

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => preview.src = e.target.result;
      reader.readAsDataURL(file);
    }
  });

  document.getElementById("captainForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const bounty = parseInt(document.getElementById("bounty").value);
    const fruit = document.getElementById("fruit").value;
    const photo = document.getElementById("preview").src;

    // VALIDAZIONE
    if (!name || name.length < 2) {
      alert("Il nome deve contenere almeno 2 caratteri.");
      return;
    }

    if (isNaN(bounty) || bounty <= 0) {
      alert("La taglia deve essere un numero positivo.");
      return;
    }

    if (!fruit || fruit === "") {
      alert("Seleziona un frutto.");
      return;
    }

    const captain = { name, bounty, fruit, photo };

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Utente non loggato");
      return;
    }

    // PATCH dell’utente con il nuovo capitano
    const res = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ captain })
    });

    if (res.ok) {
      window.location.href = "your-crew.html";
    } else {
      alert("Errore nel salvataggio del capitano.");
    }
  });
});
