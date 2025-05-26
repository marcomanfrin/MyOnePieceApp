document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const user = document.getElementById("user").value;
  const pw = document.getElementById("pw").value;
  if (user === "luffy" && pw === "gomu") {
    localStorage.setItem("loggedIn", true);
    window.location.href = "create-captain.html";
  } else {
    alert("Invalid credentials!");
  }
});