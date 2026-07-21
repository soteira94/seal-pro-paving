# Seal Pro Paving — Sitio web (instrucciones)

Sitio estático bilingüe (ES/EN) listo para subir a **ColombiaHosting**.

## 1. Cómo subirlo a ColombiaHosting
1. Entra a **cPanel** → **Administrador de archivos** (File Manager).
2. Abre la carpeta **`public_html`**.
3. Sube **todo el contenido de esta carpeta** (`sealpropaving_web`) dentro de `public_html`
   — NO subas la carpeta contenedora, sino sus archivos: `index.html`, `servicios.html`,
   `nosotros.html`, `contacto.html`, `gracias.html`, las carpetas `assets/` y `php/`, y
   los archivos `.htaccess`, `robots.txt`, `sitemap.xml`.
   (Puedes comprimir todo en un `.zip`, subirlo y usar "Extraer" en cPanel.)
4. Verifica que `index.html` quede directamente en `public_html/index.html`.
5. Abre tu dominio en el navegador. Listo.

> Alternativa: por **FTP** (FileZilla) con los datos que te da ColombiaHosting,
> arrastra el contenido a `public_html`.

## 2. Antes de subir — REVISAR
- **Correo del formulario:** ya configurado en `info@sealpaving.com` (confirmado por ti),
  en `php/enviar.php` (línea `$DESTINO`). Ese es el correo que recibirá las cotizaciones.
  Debe existir como cuenta real de correo (créala en cPanel si aún no existe).
- El formulario usa `mail()` de PHP (soportado por ColombiaHosting). Si no llegan correos,
  revisa la carpeta de SPAM y/o que la cuenta `info@sealpaving.com` esté creada.
- **TU LOGO REAL:** ✅ ya está instalado. Se descargó tu logo transparente desde tu Drive,
  se optimizó a tamaño web (600×327, 45 KB) y está en `assets/img/logo.png`. Se muestra
  en el encabezado y en el footer. Si quieres cambiarlo, reemplaza ese mismo archivo.

## 3. Datos que puedes personalizar fácilmente
| Qué | Dónde |
|-----|-------|
| Teléfono / WhatsApp (302) 634-0923 | Buscar `13026340923` y `634-0923` en los `.html` |
| Todos los textos ES/EN | `assets/js/translations.js` |
| Colores de marca | `assets/css/styles.css` (variables `--brand`, etc. al inicio) |
| Correo destino del formulario | `php/enviar.php` (`$DESTINO`) |
| Testimonios (son de ejemplo) | `assets/js/translations.js`, claves `tst.1.*` … `tst.3.*` |
| Zonas / ciudades servidas | `index.html`, sección "Zonas que Servimos" |
| Redes sociales (Facebook/Instagram) | Enlaces `href="#"` en el footer de cada página |

## 4. Fotos del sitio
El sitio ya trae **8 fotos reales de pavimentación** (hero, 6 servicios y sección "por qué"),
descargadas de **Pexels** (licencia de uso comercial libre, sin atribución) vía Apify.
Archivos en `assets/img/`: `hero.jpg`, `svc-paving.jpg`, `svc-repair.jpg`, `svc-maint.jpg`,
`svc-striping.jpg`, `svc-crack.jpg`, `svc-emergency.jpg`, `why.jpg`.
- **Recomendado:** para máxima conversión, reemplázalas por **fotos reales de tus propios
  proyectos** (mismos nombres de archivo). Así muestras tu trabajo real y generas más confianza.
- Los testimonios siguen siendo de ejemplo — cámbialos por reseñas reales en
  `assets/js/translations.js` (claves `tst.1.*` … `tst.3.*`).

## 5. SSL / HTTPS
El dominio actual tiene el certificado SSL vencido. Activa/renueva el **SSL gratis (Let's Encrypt)**
desde cPanel. Cuando esté activo, descomenta el bloque "Forzar HTTPS" en `.htaccess`.

## Estructura
```
index.html · servicios.html · nosotros.html · contacto.html · gracias.html
assets/css/styles.css · assets/js/translations.js · assets/js/app.js
assets/img/ (logo.svg, logo-white.svg, favicon.svg)
php/enviar.php
.htaccess · robots.txt · sitemap.xml
```
