document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const user = document.getElementById("user").value;
  const pw = document.getElementById("pw").value;
  login(user, pw);
});

async function login(username, password) {
  if (!username || !password) {
    alert("Compila tutti i campi");
    return;
  }
  
  const res = await fetch(`http://localhost:3001/users?uname=${username}&psw=${password}`);
  const users = await res.json();
  
  if (users.length > 0) {
    const user = users[0];
    localStorage.setItem("userId", user.id);
    // puoi salvare anche altre info se vuoi
    window.location.href = "your-crew.html";
  } else {
    alert("Credenziali errate!");
  }
}
