const API_URL = "http://localhost:3001/users";

document.getElementById("registerForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const uname = document.getElementById("username").value.trim();
  const psw = document.getElementById("password").value;
  const message = document.getElementById("formMessage");

  message.textContent = "";
  message.style.color = "red";

  if (!uname || !psw || psw.length < 6) {
    message.textContent = "Compila tutti i campi correttamente. (Min. 6 caratteri per la password)";
    return;
  }

  try {
    // Verifica se l'username esiste già
    const res = await fetch(`${API_URL}?uname=${encodeURIComponent(uname)}`);
    const existingUsers = await res.json();

    if (existingUsers.length > 0) {
      message.textContent = "⚠️ Username già esistente.";
      return;
    }

    // Crea nuovo utente
    const newUser = {
      uname,
      psw,
      captain: null,
      boatId: null,
      crew: []
    };

    const postRes = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    if (!postRes.ok) throw new Error("Errore nella registrazione.");

    message.style.color = "green";
    message.textContent = "✅ Registrazione avvenuta con successo! Verrai reindirizzato al login...";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);

  } catch (error) {
    console.error("Errore durante la registrazione:", error);
    message.textContent = "❌ Errore durante la registrazione. Riprova.";
  }
});
