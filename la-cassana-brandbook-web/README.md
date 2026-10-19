# La Cassana® — Manual de marca interactivo

Sitio web editorial basado en el manual original de La Cassana (24 páginas). Versión inicial para revisar y seguir mejorando con Codex.

## Cómo usar

Sin dependencias ni compilación. Abre `index.html` para explorarlo o sirve la carpeta con un servidor local:

```bash
python3 -m http.server 8000
```

Después abre `http://localhost:8000`.

## Publicar en GitHub Pages

1. Sube **todo el contenido de esta carpeta a la raíz** de tu repositorio (no la carpeta exterior en sí).
2. En GitHub: **Settings → Pages → Build and deployment**. Elige **Deploy from a branch**, rama `main`, carpeta `/(root)`.
3. Espera la publicación y abre el enlace que GitHub Pages indique. No se necesita un pipeline ni un servicio externo.
4. Si prefieres dominio propio, se puede configurar después.

## Secciones incluidas

- Inicio / Portada editorial
- Esencia, historia, misión, visión y valores
- Logotipo interactivo y variantes de contraste
- Tipografía con campos editables
- Paleta cromática con copia de valores HEX
- Patrón y recursos del sistema
- Aplicaciones reales y descarga del manual PDF

## Recursos y fidelidad de marca

- Los códigos oficiales extraídos del manual son: `#FFFFFF`, `#7B1616`, `#D37832`, `#F3CB82` (PDF página 17).
- Tipografía primaria indicada: **ThanatosVF**; el ZIP recibido no contiene su archivo. El sitio usa **Georgia** como sustituto temporal. Para fidelidad agrega *legalmente* un archivo web `assets/fonts/ThanatosVF.woff2` si tienes los derechos adecuados.
- Tipografía secundaria: **Candara**. Los TTF incluidos en el ZIP original no se redistribuyen aquí. Para usarla en producción, confirma su licencia web y agrega `assets/fonts/Candara.woff2`; la alternativa provisional es Arial.
- Se prepararon PNG transparentes del isotipo y del logotipo a partir del PDF original para navegación y demostraciones; para producción final se recomienda exportar versiones vectoriales SVG desde el archivo IDML/INDD original y revisar su precisión.
- La combinación isotipo + logotipo es un ejercicio de visualización en la web; **no debe tratarse como variante oficial descargable** sin validar composiciones y área de respeto frente al manual.
- Las fotografías y mockups se optimizaron a WebP para mejorar la carga. Los originales permanecen en el ZIP proporcionado por el propietario de la marca.
- El sitio incluye el PDF de 24 páginas como descarga.

## Por mejorar con Codex

- Reemplazar los PNG provisionales del logotipo por SVG finales.
- Integrar ThanatosVF y Candara con licencias adecuadas.
- Validar márgenes del isotipo y tamaños mínimos, y permitir exportar variantes oficiales (no composiciones automáticas).
- Mejorar las vistas en móvil tras probar dispositivos reales y añadir un modo de ampliación de imágenes si es útil.
- Añadir pruebas automatizadas de accesibilidad y rendimiento.

## Tecnología

HTML semántico + CSS + JavaScript nativo, sin frameworks. Animaciones `IntersectionObserver`, selección de variantes, previsualización de fondos, navegación con indicador activo, barra de progreso y descarga del PDF. Respeta `prefers-reduced-motion`.


## Normas técnicas interactivas (versión 02)

Se añadieron tres subsecciones en **Logotipo → Normas**:
- **Área de restricción:** lámina 12, con las tres retículas originales y opción de ampliar.
- **Matriz geométrica:** lámina 13, selector entre el trazado y el símbolo con sus guías.
- **Tamaños recomendados:** lámina 15, selector 12 / 8 / 5 / 3 cm y tabla de consulta.

En **Tipografía**, el muestrario ahora utiliza fragmentos gráficos exactos de la página 16 del PDF de marca. No se distribuyen archivos de Thanatos ni de Candara y no hay editor de fuentes simulado.

**Dependencia de visualización:** `manual-standards.js` importa dinámicamente PDF.js (versión fija 4.10.38 desde jsDelivr) cuando el usuario llega a las láminas. La ilustración procede del archivo PDF alojado en este proyecto; no existe una reconstrucción aproximada de retículas o matrices. Para fallos de conexión o bloqueo del CDN, cada figura incluye enlaces al PDF original. El resto de la página sigue funcionando sin PDF.js.

**Conservación de fidelidad:** las previsualizaciones de escala no representan centímetros físicos en la pantalla. Las medidas solo tienen sentido en aplicaciones físicas validadas sobre la reproducción real.


### Actualización: áreas de restricción con recursos independientes

La sección **Normas → Área de restricción** muestra ahora los tres PNG originales añadidos a la raíz de esta carpeta (las rutas tienen espacios y una de ellas lleva tilde):

- `AREA DE RESTRICCIÓN 1.png`
- `AREA DE RESTRICCION 2.png`
- `AREA DE RESTRICCION 3.png`

Se presentan en tarjetas independientes sobre fondo neutro, con ampliación mediante un diálogo accesible. **Esta sección ya no renderiza el PDF.** La matriz geométrica, los tamaños y las muestras tipográficas siguen utilizando el PDF mientras se valida la nueva presentación de imágenes.
