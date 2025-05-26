async function loadFruits() {
  const res = await fetch("https://onepieceapi.dev/api/v1/devil-fruits");
  const data = await res.json();
  const select = document.getElementById("fruit");
  data.forEach(fruit => {
    const opt = document.createElement("option");
    opt.value = fruit.name;
    opt.textContent = fruit.name;
    select.appendChild(opt);
  });
}