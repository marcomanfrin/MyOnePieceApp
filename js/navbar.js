document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("userId") !== null;

  let navLinks = [
    { href: "wiki.html", label: "Wiki" },
    { href: "create-captain.html", label: "Create Captain", protected: true },
    { href: "your-crew.html", label: "Your Crew", protected: true },
    { href: "index.html", label: "Log In", id: "loginLink" },
  ];

  if (!isLoggedIn) {
    navLinks = navLinks.filter(link => !link.protected);
  } else {
    navLinks = navLinks.filter(link => link.id !== "loginLink");
  }

  const nav = document.createElement("nav");
  nav.className = "navbar";

  navLinks.forEach(link => {
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.label;
    a.className = "nav-link";

    // === Evidenziazione dinamica del link attivo ===
    const currentPage = window.location.pathname.split("/").pop(); // es: your-crew.html
    if (link.href === currentPage) {
      a.classList.add("active-link"); // aggiungi classe attiva
    }

    nav.appendChild(a);
  });

  if (isLoggedIn) {
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Log Out";
    logoutBtn.className = "logout-btn";
    logoutBtn.onclick = () => {
      localStorage.removeItem("userId");
      window.location.href = "index.html";
    };
    nav.appendChild(logoutBtn);
  }

  document.body.prepend(nav);
});
