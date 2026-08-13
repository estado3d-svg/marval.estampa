# Marval Estampa 🌟

Página web de **Marval Estampa**: merchandising y estampado personalizado — remeras, textiles y calcos para consumidores finales y revendedores.

## Repositorio

- GitHub: https://github.com/estado3d-svg/marval.estampa
- Sitio (GitHub Pages): https://estado3d-svg.github.io/marval.estampa/
- Local: `D:\ia\proyectos\pagina daniela`

## Estado actual (última sesión)

- Sitio estático HTML/CSS/JS puro (sin build, sin dependencias).
- Secciones: Hero, Tienda (9 productos con filtros), Revendedores, Cómo personalizar, Contacto.
- WhatsApp: **+54 9 11 2724-5396** (configurado en `js/main.js` y en todos los links de `index.html`).
- Modo claro/oscuro con toggle (guarda en `localStorage`, script inline en `<head>` para evitar parpadeo).
- Efectos: barra de progreso de scroll, spotlight que sigue al cursor, brillo radial en tarjetas, shine en botones, menú móvil fullscreen.
- Logo: `logo.png` (1536x1024) a 120px en nav y footer, con `object-fit: contain` (entra completo) y anillo de gradiente giratorio.
- Formulario de contacto → arma mensaje y abre WhatsApp, resetea el form.

## Estructura

```
index.html          # Página completa (estructura semántica, todo en español)
css/styles.css      # Variables, modo oscuro, responsive, efectos
js/main.js          # Tema, progreso scroll, spotlight, filtros, menú móvil, formulario WhatsApp
logo.png            # Logo 1536x1024 (usado a 120px)
estampa.jpg         # Foto de estampadora sublimadora (sin uso actual)
favicon.svg         # Favicon con la "M"
README.md           # Este archivo
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
   - Los deploys corren con éxito pero el cliente no veía los archivos: el problema era `FTP_DIR`, no el workflow.

## Contexto / decisiones de la sesión

- El cliente pidió sacar la estampadora de fondo (se probó versión SVG animada y versión con `estampa.jpg` como parallax que se "cerraba" al scrollear). Ambas fueron **revertidas**; queda la página limpia.
- La sección Tienda se eliminó por un momento y luego se **restauró completa** (filtros + 9 cards) desde el commit `45428fd` — hoy está activa.
- Precios de la tienda son **placeholder** (ej: $14.900) — el cliente debe confirmarlos antes de publicar como definitivos.
- Git config local usa identidad `Estado3D Deploy <deploy@estado3d.com.ar>` (copiada del proyecto estado3d).

## Pendientes

- Confirmar precios y productos reales de la tienda + fotos propias (hoy son emojis/gradientes).
- Decidir dominio definitivo y verificar carpeta FTP correcta (riesgo de sobrescribir estado3d).
- Actualizar redes sociales en Contacto (hoy son placeholders `#`).
- El email del contacto usa `hola@marvalestampa.com` (placeholder).
- GH CLI (`gh`) no está instalado — los secrets y settings se manejan por web.

## Notas de diseño

- Paleta: violeta `#7c3aed`, fucsia `#e8399c`, lima `#c8f542`, fondo crudo `#faf7f2`.
- Fuentes: Space Grotesk (display) + Inter (body) desde Google Fonts.
- Respeta `prefers-reduced-motion` (desactiva animaciones).
- Modo oscuro automático si el sistema lo pide, salvo que el usuario elija manualmente.
