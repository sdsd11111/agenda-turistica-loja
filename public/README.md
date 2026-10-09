# Agenda Turística Loja — paquete de marca web

Logo propuesto a partir del contenido y la paleta visible de agendaturisticaloja.com. El símbolo combina un pin de ubicación, montañas andinas, sol, ruta y hoja.

## Colores
- Verde principal: `#2C5E43`
- Verde oscuro del sitio: `#17201B`
- Texto secundario: `#47554E`
- Amarillo sol: `#E7AE3D`
- Fondo cálido: `#FAFAF8`

## Archivos principales
- `logo-horizontal.svg`: logo horizontal escalable para cabecera.
- `logo-horizontal-1600x500.png`: PNG maestro transparente.
- Variantes horizontales: 1200×375, 800×250, 600×188, 400×125, 320×100, 240×75 y 200×63.
- `brandmark.svg` / `brandmark-1024.png`: símbolo independiente.
- `favicon.svg`, `favicon.ico`, PNG de 16/32/48/64 px.
- `apple-touch-icon.png` (180 px), `android-chrome-192x192.png` y `android-chrome-512x512.png`.
- `site.webmanifest`: manifiesto PWA de ejemplo.

## Integración sugerida en el `<head>`
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#2C5E43">
```
Copie los archivos a la carpeta pública raíz del sitio (por ejemplo, `public/`). El SVG del logo lleva el símbolo incrustado para ser un archivo autocontenido; su texto es SVG seleccionable.
