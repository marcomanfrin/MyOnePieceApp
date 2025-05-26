document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  let navLinks = [
    { href: "wiki.html", label: "Wiki" },
    { href: "create-captain.html", label: "Create Captain" },
    { href: "your-crew.html", label: "Your Crew" },
    { href: "index.html", label: "Log In", id: "loginLink" },
  ];

  // Rimuovi il link di login se già loggato
  if (isLoggedIn) {
    navLinks = navLinks.filter(link => link.id !== "loginLink");
  }

  const nav = document.createElement("nav");
  nav.style.backgroundColor = "#2c1e0f";
  nav.style.padding = "1rem";
  nav.style.display = "flex";
  nav.style.justifyContent = "center";
  nav.style.gap = "1rem";

  navLinks.forEach(link => {
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.label;
    a.style.color = "#f4c430";
    a.style.textDecoration = "none";
    a.style.fontWeight = "bold";
    a.onmouseenter = () => a.style.color = "#fff8e1";
    a.onmouseleave = () => a.style.color = "#f4c430";
    nav.appendChild(a);
  });

  if (isLoggedIn) {
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Log Out";
    logoutBtn.style.marginLeft = "1rem";
    logoutBtn.style.padding = "0.5rem 1rem";
    logoutBtn.style.backgroundColor = "#f4c430";
    logoutBtn.style.border = "none";
    logoutBtn.style.borderRadius = "5px";
    logoutBtn.style.cursor = "pointer";
    logoutBtn.onclick = () => {
      localStorage.removeItem("loggedIn");
      window.location.href = "index.html";
    };
    nav.appendChild(logoutBtn);
  }

  document.body.prepend(nav);
});