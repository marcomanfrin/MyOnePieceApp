document.addEventListener("DOMContentLoaded", () => {
  loadFruits();
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

  document.getElementById("captainForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const bounty = parseInt(document.getElementById("bounty").value);
    const fruit = document.getElementById("fruit").value;
    const photo = document.getElementById("preview").src;
    const captain = { name, bounty, fruit, photo };
    localStorage.setItem("captain", JSON.stringify(captain));
    window.location.href = "your-crew.html";
  });
});