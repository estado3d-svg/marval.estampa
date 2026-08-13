# Marval Estampa 🌟

Página web de **Marval Estampa**: merchandising y estampado personalizado — remeras, textiles y calcos para consumidores finales y revendedores.

## Repositorio

- GitHub: https://github.com/estado3d-svg/marval.estampa
- Sitio (GitHub Pages): https://estado3d-svg.github.io/marval.estampa/

## Estado actual (última sesión)

- Sitio estático HTML/CSS/JS puro (sin build, sin dependencias).
- Secciones: Hero, Tienda (9 productos con filtros), Revendedores, Cómo personalizar, Contacto.
- WhatsApp: **+54 9 11 2724-5396** (configurado en `js/main.js` y en todos los links de `index.html`).
- Modo claro/oscuro con toggle (guarda en `localStorage`).
- Efectos: barra de progreso de scroll, spotlight que sigue al cursor, brillo radial en tarjetas, shine en botones.
- Logo: `logo.png` (1536x1024) a 120px en nav y footer con anillo de gradiente animado.
- Imagen `estampa.jpg` (máquina sublimadora real) disponible en la carpeta pero **no está en uso** (se probó como fondo con parallax y el cliente pidió sacarla).

## Estructura

```
index.html          # Página completa (estructura semántica, todo en español)
css/styles.css      # Variables, modo oscuro, responsive, efectos
js/main.js          # Tema, progreso scroll, spotlight, menú móvil, formulario WhatsApp
logo.png            # Logo 1536x1024 (usado a 120px)
estampa.jpg         # Foto de estampadora (sin uso actual)
favicon.svg         # Favicon con la "M"
.github/workflows/deploy.yml  # Deploy automático por FTP en cada push a main
```

## Cómo correr localmente

```powershell
cd "D:\ia\proyectos\pagina daniela"
python -m http.server 8080
# abrir http://localhost:8080
```

## Deploy

Dos canales de publicación:

1. **GitHub Pages** (gratis): activado en Settings → Pages, fuente `main / (root)`.
2. **FTP por GitHub Actions**: en cada push a `main` corre `deploy.yml` usando los secrets del repo:
   - `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`, `FTP_DIR`
   - ⚠️ Los secrets fueron copiados del repo `estado3d` (hosting compartido). Si `FTP_DIR` apunta a la carpeta del sitio de estado3d, **sobreescribe ese sitio**. Verificar antes de usar.

## Contexto / pendientes

- El cliente siempre quiere avisar antes de modificar precios o productos reales.
- Pendientes típicos:
  - Re-arma de sección Tienda con productos reales y fotos propias.
  - Decidir dominio definitivo y verificar carpeta FTP correcta.
  - Actualizar redes sociales en Contacto (hoy son placeholders).
  - El formulario envía por WhatsApp y resetea el form.
- Git config local usa identidad `Estado3D Deploy <deploy@estado3d.com.ar>` (copiada del proyecto estado3d).

## Notas de diseño

- Paleta: violeta `#7c3aed`, fucsia `#e8399c`, lima `#c8f542`, fondo crudo `#faf7f2`.
- Fuentes: Space Grotesk (display) + Inter (body) desde Google Fonts.
- Respeta `prefers-reduced-motion` (desactiva animaciones).
- Modo oscuro automático si el sistema lo pide, salvo que el usuario elija manualmente.