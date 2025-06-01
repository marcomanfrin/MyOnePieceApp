document.addEventListener("click", async e => {
  if (e.target.classList.contains("add-to-crew")) {
    console.log("Aggiungi alla ciurma cliccato");
    const charId = e.target.dataset.id;

    // Trova l’oggetto personaggio corrispondente
    const res = await fetch(`${API_BASE}/characters/en`);
    const data = await res.json();
    const character = data.find(c => c.id == charId);

    if (!character) {
      alert("Personaggio non trovato.");
      return; 
    }

    aggiungiAllaCiurma(character);
  }
});

async function aggiungiAllaCiurma(member) {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Devi essere loggato per aggiungere membri alla ciurma.");
    return;
  }

  try {
    // Recupera la ciurma attuale dell’utente
    const res = await fetch(`http://localhost:3001/users/${userId}`);
    const user = await res.json();
    const currentCrew = user.crew || [];

    // Controlla duplicati
    const giaPresente = currentCrew.some(m => m.id === member.id);
    if (giaPresente) {
      alert(`${member.name} è già nella tua ciurma.`);
      return;
    }

    // Aggiungi alla ciurma
    const nuovoMembro = member.id
    currentCrew.push(nuovoMembro);

    // Salva nel JSON Server
    const updateRes = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ crew: currentCrew })
    });

    if (updateRes.ok) {
      alert(`${member.name} è stato aggiunto alla ciurma!`);
    } else {
      alert("Errore durante il salvataggio nel server.");
    }

  } catch (err) {
    console.error("Errore:", err);
    alert("Errore di rete.");
  }
}

