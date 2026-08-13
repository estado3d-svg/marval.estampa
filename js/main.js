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

// Barra de progreso de scroll + estampadora de fondo
const progress = document.getElementById("progress");
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
  progress.style.transform = `scaleX(${p})`;
  document.documentElement.style.setProperty("--pg", p);
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

  // Brillo suave que sigue al cursor dentro de cada tarjeta
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
    });
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

// Filtros de tienda
const chips = document.querySelectorAll(".chip[data-filter]");
const cards = document.querySelectorAll(".card[data-cat]");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("chip--active"));
    chip.classList.add("chip--active");

    const filter = chip.dataset.filter;
    let delay = 0;
    cards.forEach((card) => {
      const show = filter === "todos" || card.dataset.cat === filter;
      card.style.display = show ? "" : "none";
      if (show) {
        card.style.animation = "none";
        void card.offsetWidth;
        card.style.animation = `cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s both`;
        delay += 0.06;
      }
    });
  });
});

// Animación de aparición al hacer scroll
const revealEls = document.querySelectorAll(".section__head, .card, .feature, .step, .resellers__cta, .contact__inner");

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