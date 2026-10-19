# La Cassana® — Manual de marca interactivo

Sitio editorial estático en español con HTML, CSS y JavaScript nativo. No requiere instalación ni compilación.

## Publicación
La carpeta pública es `la-cassana-brandbook-web/`; la raíz del repositorio incluye `netlify.toml` con `publish = "la-cassana-brandbook-web"`. Al publicar con Netlify conectado a GitHub, mantener como carpeta de publicación la que indica ese archivo.

Para desarrollo local, inicia un servidor HTTP desde esta carpeta, por ejemplo:
```bash
python3 -m http.server 8000
```

## Contenido
- Portada editorial y esencia de la marca (misión, visión y valores)
- Explorador de logotipo con selección de composición y fondo
- Normas: tres áreas de restricción PNG y dos composiciones geométricas PNG ampliables
- Escalas 12/8/5/3 cm; 12 y 3 ofrecen 3 variantes PNG compartidas con selector A/B/C
- Sistema tipográfico en disposición editorial, con espacio de muestra «Aa.» (Georgia provisional, **no** ThanatosVF)
- Colores oficiales: HEX visible; RGB calculado a partir del HEX y Pantone del manual visibles al hover/foco; clic copia HEX
- Aplicaciones, recursos gráficos y descarga del PDF original

## Recursos gráficos para tamaños
Los tres archivos nuevos de la raíz:
- `logo 12 cm y 3 cm.png`
- `logo 12 cm y 3 cm_1.png`
- `logo 12 cm y 3 cm_2.png`

Se reutilizan para 12 y 3 cm según la instrucción del propietario. No se cambian ni reescalan los archivos de origen. La pantalla **no** muestra las medidas físicas reales. Para 8 y 5 cm el manual describe las composiciones con nombre en arco, pero aún se esperan PNG independientes autorizados; el selector muestra un aviso en vez de inventar una composición o usar capturas del PDF.

## Muestra tipográfica pendiente
La tipografía oficial primaria es **ThanatosVF** y la secundaria es **Candara**, tal como señala la página 16 del manual. No se alojan archivos font. La previsualización grande de `Aa.` usa un sustituto temporal **visualmente no fiel** para que el propietario valide primero escala y composición.

Pendiente: exportar de Adobe el display tipográfico «Aa.» en PNG transparente de **2400 x 1200 px**, centrado y con margen suficiente para ascendentes/descendentes. Al recibir `thanatos-display.png`, sustituir la muestra de Georgia por la imagen real conservando todo el bloque editorial y sin importar fuente no licenciada. Verificar también el uso de Candara.

## Color oficial (manual, pág. 17)
- `#FFFFFF` · Pantone White
- `#7B1616` · Pantone 490 C
- `#D37832` · Pantone 7572 C
- `#F3CB82` · Pantone 7401 C

RGB se deriva matemáticamente del HEX. No se publica ningún CMYK como conversión autorizada porque el PDF no lo suministra.

## Tareas de control antes de entregar
- Comprobar en navegador real versiones móvil/tableta/escritorio y descarga de cada PNG.
- Validar que los tres PNG compartidos representan efectivamente las variantes que se aprobarán para 12 y 3 cm.
- Incorporar composiciones oficiales en PNG/SVG para escalas 8 y 5 cm.
- Sustituir muestras provisionales tipográficas por exportaciones autorizadas.
- Confirmar licencia y fidelidad de todos los recursos descargables.
