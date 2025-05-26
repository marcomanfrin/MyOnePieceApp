document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  let navLinks = [
    { href: "wiki.html", label: "Wiki" },
    { href: "create-captain.html", label: "Create Captain" },
    { href: "your-crew.html", label: "Your Crew" },
    { href: "index.html", label: "Log In", id: "loginLink" },
  ];

  if (isLoggedIn) {
    navLinks = navLinks.filter(link => link.id !== "loginLink");
  }

  const nav = document.createElement("nav");
  nav.className = "navbar";

  navLinks.forEach(link => {
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.label;
    a.className = "nav-link";
    nav.appendChild(a);
  });

  if (isLoggedIn) {
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Log Out";
    logoutBtn.className = "logout-btn";
    logoutBtn.onclick = () => {
      localStorage.removeItem("loggedIn");
      window.location.href = "index.html";
    };
    nav.appendChild(logoutBtn);
  }

  document.body.prepend(nav);
});