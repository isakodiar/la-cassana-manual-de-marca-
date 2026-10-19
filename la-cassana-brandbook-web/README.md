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
- Escalas 12/8/5/3 cm: 8 y 5 ofrecen tres composiciones PNG compartidas; 12 muestra el logotipo largo y 3 el isotipo, utilizando las variantes de color existentes.
- Sistema tipográfico en disposición editorial, con espacio de muestra «Aa.» (Georgia provisional, **no** ThanatosVF)
- Colores oficiales: HEX visible; RGB calculado a partir del HEX y Pantone del manual visibles al hover/foco; clic copia HEX
- Aplicaciones, recursos gráficos y descarga del PDF original

## Recursos gráficos para tamaños
Los tres archivos específicos de **8 y 5 cm**, confirmados en GitHub:
- `logo 8 cm y 5 cm.png`
- `version 2 logo 8 cm y 5 cm.png`
- `version 3 logo 8 cm y 5 cm.png`

La segunda versión había sido renombrada sin extensión; se corrigió su nombre sin modificar los datos del archivo.

Estos recursos se reutilizan en ambos tamaños, ya que el manual muestra la misma composición con nombre en arco en las referencias de 8 y 5 cm. Para **12 cm** se emplean las versiones blanca, negra y terracota del logotipo largo existente; para **3 cm** el isotipo blanco y negro del proyecto. La pantalla **no** representa medidas físicas reales: todas las escalas son visualizaciones de referencia. El selector muestra únicamente las variantes que cuentan con archivos en el repositorio.

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
- Validar las tres composiciones PNG compartidas para 8 y 5 cm en sus aplicaciones finales.
- Confirmar que las variantes de color de 12 y 3 cm se usan conforme a las reglas oficiales de contraste.
- Sustituir muestras provisionales tipográficas por exportaciones autorizadas.
- Confirmar licencia y fidelidad de todos los recursos descargables.
