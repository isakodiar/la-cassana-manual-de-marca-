/* La Cassana — normas técnicas con PNGs independientes y visor de escalas.
 * No se importan tipografías ni se hacen capturas del PDF. */
(() => {
  'use strict';

  // Las retículas de protección y las dos matrices geométricas comparten visor.
  const modal = document.getElementById('restriction-lightbox');
  if (modal) {
    const image = modal.querySelector('.restriction-lightbox-image img');
    const title = modal.querySelector('#restriction-lightbox-title');
    const original = modal.querySelector('#restriction-lightbox-original');
    const footer = modal.querySelector('.restriction-lightbox-foot span');
    document.querySelectorAll('[data-restriction-view]').forEach(button => {
      button.addEventListener('click', () => {
        const thumb = button.querySelector('img');
        if (!thumb) return;
        const src = thumb.getAttribute('src');
        const geometry = button.classList.contains('geometry-preview');
        image.src = src;
        image.alt = thumb.alt;
        title.textContent = button.dataset.assetTitle || ('LA CASSANA / ' + (button.closest('.restriction-item')?.querySelector('figcaption span')?.textContent || 'ÁREA DE RESTRICCIÓN'));
        original.href = src;
        footer.textContent = geometry ? 'IDENTIDAD VISUAL / MATRIZ GEOMÉTRICA' : 'IDENTIDAD VISUAL / ÁREA DE PROTECCIÓN';
        modal.classList.toggle('geometry-lightbox', geometry);
        modal.showModal();
      });
    });
    modal.querySelector('.restriction-lightbox-close')?.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.close();
    });
  }

  // Un único juego de tres PNG se utiliza en 12 y 3 cm, como indicó el propietario.
  // No se inventan archivos ni se representan composiciones de 8/5 cm como oficiales.
  const sizeImages = [
    'logo%2012%20cm%20y%203%20cm.png',
    'logo%2012%20cm%20y%203%20cm_1.png',
    'logo%2012%20cm%20y%203%20cm_2.png'
  ];
  const descriptions = {
    '12': 'Logotipo denominativo · 3 versiones disponibles',
    '8': 'Composición con nombre en arco · archivo pendiente',
    '5': 'Composición reducida con nombre en arco · archivo pendiente',
    '3': 'Isotipo independiente · 3 versiones disponibles'
  };
  const stage = document.getElementById('size-logo-stage');
  const image = document.getElementById('size-logo-image');
  const pending = document.getElementById('size-logo-pending');
  const variants = document.getElementById('size-variants');
  const download = document.getElementById('size-logo-download');
  const sizeName = document.getElementById('size-reference-label');
  const description = document.getElementById('size-reference-description');
  const sizeButtons = [...document.querySelectorAll('[data-size-select]')];
  const variantButtons = [...document.querySelectorAll('[data-size-variant]')];
  if (!stage || !image || !pending || !variants || !download || !sizeName || !description) return;

  let currentSize = '12';
  let currentVariant = 0;
  const render = () => {
    const available = currentSize === '12' || currentSize === '3';
    stage.dataset.size = currentSize;
    sizeName.textContent = currentSize + ' cm';
    description.textContent = descriptions[currentSize] || '';
    sizeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.sizeSelect === currentSize)));
    variantButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.sizeVariant) === currentVariant)));
    variants.hidden = !available;
    pending.hidden = available;
    image.hidden = !available;
    download.hidden = !available;
    if (available) {
      const file = sizeImages[currentVariant];
      image.src = file;
      image.alt = 'La Cassana: versión ' + (currentVariant + 1) + ' para la referencia de ' + currentSize + ' cm';
      download.href = file;
      download.setAttribute('download', decodeURIComponent(file));
    }
  };
  sizeButtons.forEach(button => button.addEventListener('click', () => {
    currentSize = button.dataset.sizeSelect;
    render();
  }));
  variantButtons.forEach(button => button.addEventListener('click', () => {
    currentVariant = Number(button.dataset.sizeVariant);
    render();
  }));
  image.addEventListener('error', () => {
    image.hidden = true;
    pending.hidden = false;
    pending.querySelector('strong').textContent = 'NO SE PUDO CARGAR ESTE ARCHIVO.';
    pending.querySelector('span').textContent = 'Revisa el PNG en el repositorio y vuelve a intentar.';
    download.hidden = true;
  });
  render();
})();
