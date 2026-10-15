# Prompt para continuar este sitio en Codex

Trabaja en este repositorio: es un manual de marca interactivo para **La Cassana**, una marca de salsas caseras de Aguascalientes. El sitio ya tiene un MVP funcional en HTML, CSS y JS, más imágenes optimizadas en `/assets` y el PDF original. **No reemplaces el proyecto por una plantilla ni cambies la identidad visual de la marca**.

## Objetivo
Perfeccionar la experiencia hasta tener una web editorial premium inspirada en diseño brutalista/suizo: retícula estructurada, titulares dramáticos, contrastes negro/crema/terracota, composición asimétrica y microanimaciones elegantes. Debe parecer un brand book digital curado por un estudio de diseño, no un ecommerce de salsa.

## Paleta oficial
- #FFFFFF Blanco
- #7B1616 Vino
- #D37832 Terracota
- #F3CB82 Crema
- Negro editorial #211E1D y papel #F6F3ED son tonos de interfaz auxiliares, no deben presentarse como colores oficiales.

## Tipografías
Manual original: ThanatosVF (principal), Candara (secundaria). Los archivos web de esas fuentes todavía no están integrados. No las inventes, ni descargues versiones sin licencia: usa los fallbacks hasta que el propietario facilite los archivos y permisos.

## Interacciones obligatorias
1. Header fijo y menú móvil que naveguen a todas las secciones.
2. Scroll reveal y animaciones de imagen mínimas, sin marear ni ralentizar.
3. Módulo de logotipo con 3 vistas, fondos intercambiables y descargas solo de las variantes existentes.
4. Muestrario de color copiando HEX, con confirmación visible.
5. Especímenes tipográficos editables.
6. Layout responsive (375, 768, 1440px), keyboard navigation y `prefers-reduced-motion`.
7. PDF completo descargable.

## Restricciones
- Contenido y nombres deben basarse en el manual PDF; no inventar historia, productos, certificaciones o recomendaciones legales.
- No modificar los colores oficiales.
- No sustituir fotografías del ZIP por imágenes genéricas.
- Evitar dependencias pesadas solo para pequeños efectos.
- Probar la web antes de declarar completada la tarea.
- Si agregas nuevas páginas, conserva URLs navegables y accesibles.

## Prioridades siguientes
1. Auditar visualmente desktop/móvil con capturas de pantalla, resolver cualquier desbordamiento/solapamiento.
2. Reemplazar logotipos rasterizados por SVG oficiales una vez exportados desde el original.
3. Agregar visor fullscreen accesible para aplicaciones y documentación de uso correcto/incorrecto del logotipo, si el manual da reglas suficientes.
4. Optimizar imágenes y Core Web Vitals sin sacrificar la dirección de arte.

Entrega cambios pequeños, con explicación y pruebas. Empieza examinando `index.html`, `styles.css`, `script.js` y `README.md`.
