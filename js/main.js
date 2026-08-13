// ============ Marval Estampa - Scripts ============

const WA_NUMBER = "5491127245396";

// Tema claro / oscuro
const themeToggle = document.getElementById("themeToggle");
const applyTheme = (t) => {
  document.documentElement.dataset.theme = t;
  localStorage.setItem("marval-theme", t);
  themeToggle.setAttribute(
    "aria-label",
    t === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
  );
};
themeToggle.setAttribute(
  "aria-label",
  document.documentElement.dataset.theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
);
themeToggle.addEventListener("click", () =>
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark")
);

// Barra de progreso de scroll
const progress = document.getElementById("progress");
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

// Spotlight que sigue al cursor (solo desktop)
const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
if (fine.matches) {
  let tx = 50, ty = 50, raf = null;
  window.addEventListener("pointermove", (e) => {
    tx = (e.clientX / window.innerWidth) * 100;
    ty = (e.clientY / window.innerHeight) * 100;
    if (!raf) {
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mx", tx + "%");
        document.documentElement.style.setProperty("--my", ty + "%");
        raf = null;
      });
    }
  });
}

// Nav: sombra al hacer scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("nav--scrolled", window.scrollY > 30);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Menú móvil
const navToggle = document.getElementById("navToggle");
const menu = document.getElementById("menu");

navToggle.addEventListener("click", () => {
  const open = menu.classList.toggle("nav__menu--open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});

menu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menu.classList.remove("nav__menu--open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// Animación de aparición al hacer scroll
const revealEls = document.querySelectorAll(".section__head, .feature, .step, .resellers__cta, .contact__inner");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

// Formulario -> WhatsApp
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const msg =
    `Hola Marval Estampa! Soy ${data.get("nombre")}.\n` +
    `Mi teléfono: ${data.get("telefono")}\n\n` +
    `${data.get("mensaje")}`;

  window.open(
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
    "_blank",
    "noopener"
  );
  form.reset();
});