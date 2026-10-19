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

  // Tamaños originales del manual: 12 cm (logotipo largo); 8 y 5 cm
  // (composición con nombre en arco); 3 cm (isotipo independiente).
  // Los PNG de 8/5 son tres variantes compartidas entre ambas referencias.
  // Para 12 y 3 se reutilizan los recursos gráficos existentes del proyecto.
  const sharedArcVersions = [
    { src: 'logo%208%20cm%20y%205%20cm.png', label: 'VERSIÓN A', background: 'dark' },
    { src: 'version%202%20logo%208%20cm%20y%205%20cm.png', label: 'VERSIÓN B', background: 'dark' },
    { src: 'version%203%20logo%208%20cm%20y%205%20cm.png', label: 'VERSIÓN C', background: 'dark' }
  ];
  const sizeCatalog = {
    '12': {
      description: 'Logotipo denominativo · versiones de color disponibles',
      versions: [
        { src: 'LA%20CASSANA%20LOGO%20%20largo%20blanco.png', label: 'BLANCO', background: 'dark' },
        { src: 'LA%20CASSANA%20LOGO%20%20largo%20negro.png', label: 'NEGRO', background: 'light' },
        { src: 'LA%20CASSANA%20LOGO%20%20largo%20NARANJA.png', label: 'TERRACOTA', background: 'dark' }
      ]
    },
    '8': {
      description: 'Isotipo con nombre en arco · tres composiciones',
      versions: sharedArcVersions
    },
    '5': {
      description: 'Isotipo con nombre en arco reducido · tres composiciones',
      versions: sharedArcVersions
    },
    '3': {
      description: 'Isotipo independiente · versiones de contraste',
      versions: [
        { src: 'assets/logo-symbol-white.png', label: 'BLANCO', background: 'dark' },
        { src: 'assets/logo-symbol-black.png', label: 'NEGRO', background: 'light' }
      ]
    }
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

  function render() {
    const info = sizeCatalog[currentSize];
    if (!info) return;
    const version = info.versions[currentVariant] || info.versions[0];
    currentVariant = info.versions.indexOf(version);

    stage.dataset.size = currentSize;
    stage.classList.toggle('is-light', version.background === 'light');
    sizeName.textContent = currentSize + ' cm';
    description.textContent = info.description;
    sizeButtons.forEach(button =>
      button.setAttribute('aria-pressed', String(button.dataset.sizeSelect === currentSize))
    );
    variantButtons.forEach((button, index) => {
      const isAvailable = index < info.versions.length;
      button.hidden = !isAvailable;
      button.disabled = !isAvailable;
      button.textContent = isAvailable
        ? String(index + 1).padStart(2, '0') + ' / ' + info.versions[index].label
        : '';
      button.setAttribute('aria-pressed', String(isAvailable && index === currentVariant));
    });

    pending.hidden = true;
    image.hidden = false;
    download.hidden = false;
    image.src = version.src;
    image.alt = 'La Cassana · ' + info.description + ' · ' + version.label
      + ' (referencia ' + currentSize + ' cm, no a escala real)';
    download.href = version.src;
    download.setAttribute('download', decodeURIComponent(version.src.split('/').pop()));
  }

  sizeButtons.forEach(button => button.addEventListener('click', () => {
    currentSize = button.dataset.sizeSelect;
    currentVariant = 0;
    render();
  }));
  variantButtons.forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.sizeVariant);
    if (Number.isInteger(index) && index < sizeCatalog[currentSize].versions.length) {
      currentVariant = index;
      render();
    }
  }));
  image.addEventListener('error', () => {
    image.hidden = true;
    pending.hidden = false;
    pending.querySelector('strong').textContent = 'NO SE PUDO CARGAR EL RECURSO.';
    pending.querySelector('span').textContent = 'Comprueba que el PNG correspondiente existe en el repositorio.';
    download.hidden = true;
  });
  render();
})();
