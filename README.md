# agendaturisticaloja.com — Descubre Loja

Portal turístico multipágina de los 16 cantones de la provincia de Loja.
Next.js (App Router) · React 19 · TypeScript · Tailwind CSS 4.

## Arrancar

```bash
npm install
cp .env.example .env.local     # y completa NEXT_PUBLIC_WHATSAPP con el número de GuIAloja
npm run dev                    # http://localhost:3000
npm run build && npm start     # producción
```

`NEXT_PUBLIC_WHATSAPP` va en formato internacional sin "+" (ej. `593999999999`).
Mientras esté vacío, los botones abren WhatsApp con el mensaje listo para elegir contacto.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Portada: hero, buscador, cantones, hospedaje, guías, auxilio, negocios |
| `/cantones`, `/cantones/[slug]` | Los 16 cantones y su ficha |
| `/hospedaje`, `/hospedaje/[slug]` | Catálogo filtrable y ficha con WhatsApp |
| `/atractivos` | Atractivos por categoría |
| `/auxilio-en-ruta` | Directorio de emergencia con ubicación (Haversine) |
| `/descubre-loja`, `/descubre-loja/[slug]` | Blog / guías SEO (8 guías iniciales) |
| `/para-negocios` | Membresías ($350, $650, Top 5 $4.500) |
| `/municipios` | Convenio GAD ($4.900/año) y Municipio Fundador (Loja) |
| `/contacto` | Formulario que abre WhatsApp |
| `/sitemap.xml`, `/robots.txt` | SEO automático |

## Dónde editar

- Contenido: `lib/data/*.ts` (cantones, hospedaje, atractivos, servicios, guías).
- Marca y colores: `app/globals.css` (bloque `@theme`). Fuentes en `app/layout.tsx`.
- Número de WhatsApp y enlaces del ecosistema: `lib/site.ts`.
- Fotos: agrega `imagen: "/img/archivo.webp"` en el dato (los degradados son placeholders).
  Para Bunny CDN, agrega el hostname en `next.config.ts`.

## Asesor IA

No está incluido. En `app/layout.tsx` hay un comentario donde se monta el botón flotante y el panel de chat.

## Pendiente cuando conectes backend

Los datos son de demostración. El esquema previsto (`cantones`, `aliados_hospedaje`, `atractivos_cantonales`, `servicios_ruta`) coincide con los tipos de `types/index.ts`, así que el cambio a Prisma/MariaDB solo reemplaza las funciones de `lib/data`.
