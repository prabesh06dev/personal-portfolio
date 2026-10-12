// Small, dependency-free interactions for the portfolio.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Reveal sections as they enter the viewport, with a fallback for older browsers.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Keep the footer year current.
const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Avoid showing a broken email action until the real address is configured.
const emailLink = document.querySelector("#email-link");
const emailReminder = document.querySelector("#email-reminder");
if (emailLink && emailLink.href.includes("YOUR_EMAIL@example.com")) {
  emailLink.addEventListener("click", (event) => {
    event.preventDefault();
    if (emailReminder) {
      emailReminder.textContent = "Edit index.html and replace YOUR_EMAIL@example.com with your real email address, then publish again.";
      emailReminder.classList.add("reminder-active");
    }
  });
}
