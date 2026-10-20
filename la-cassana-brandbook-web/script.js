(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 35px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));
  } else revealElements.forEach(el => el.classList.add('visible'));

  const navLinks = [...document.querySelectorAll('.desktop-nav a, .mobile-nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const progress = document.getElementById('reading-progress');
  let ticking = false;
  function updateProgress() {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.width = `${Math.min(100, Math.max(0, (window.scrollY / max) * 100))}%`;
    const cutoff = window.scrollY + (window.innerWidth <= 760 ? 165 : 110);
    let active = 'inicio';
    for (const section of sections) if (section.offsetTop <= cutoff) active = section.id;
    navLinks.forEach(link => {
      const match = link.getAttribute('href') === `#${active}`;
      link.classList.toggle('active', match);
      if (match) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; } }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  const stage = document.getElementById('logo-stage');
  const logoInner = document.getElementById('logo-inner');
  const download = document.getElementById('logo-download');
  let selectedLogo = 'symbol';
  let selectedAppearance = 'dark';
  const logoLabels = { symbol: 'Isotipo de La Cassana', wordmark: 'Logotipo de La Cassana', combined: 'Isotipo y logotipo de La Cassana' };
  function renderLogo() {
    const light = selectedAppearance === 'light';
    const color = light ? 'black' : 'white';
    const root = 'assets/logo-';
    if (selectedLogo === 'combined') {
      logoInner.innerHTML = `<img class="combined-symbol" src="${root}symbol-${color}.png" alt=""><img class="combined-wordmark" src="${root}wordmark-${color}.png" alt="${logoLabels.combined}">`;
    } else {
      logoInner.innerHTML = `<img class="${selectedLogo === 'wordmark' ? 'wordmark' : ''}" src="${root}${selectedLogo}-${color}.png" alt="${logoLabels[selectedLogo]}">`;
    }
    // The combined preview is a composition, not a downloadable original asset.
    if (selectedLogo === 'combined') {
      download.textContent = 'VER MANUAL DE VARIANTES ↗';
      download.href = 'manual-la-cassana.pdf#page=14';
      download.removeAttribute('download');
      download.target = '_blank';
      download.rel = 'noopener';
    } else {
      download.innerHTML = 'DESCARGAR PNG <span>↗</span>';
      download.href = `${root}${selectedLogo}-${color}.png`;
      download.setAttribute('download', `la-cassana-${selectedLogo}-${color}.png`);
      download.removeAttribute('target');
      download.removeAttribute('rel');
    }
  }
  document.querySelectorAll('[data-logo]').forEach(btn => btn.addEventListener('click', () => {
    selectedLogo = btn.dataset.logo;
    document.querySelectorAll('[data-logo]').forEach(b => {
      const active = b === btn;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    renderLogo();
  }));
  document.querySelectorAll('button[data-appearance]').forEach(btn => btn.addEventListener('click', () => {
    selectedAppearance = btn.dataset.appearance;
    stage.dataset.appearance = selectedAppearance;
    document.querySelectorAll('button[data-appearance]').forEach(b => {
      const active = b === btn;
      b.classList.toggle('is-selected', active);
      b.setAttribute('aria-pressed', String(active));
    });
    renderLogo();
  }));

  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('visible');
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2300);
  }
  document.querySelectorAll('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    const value = btn.dataset.copy;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('No Clipboard API');
      await navigator.clipboard.writeText(value);
      showToast(`${value} COPIADO AL PORTAPAPELES`);
    } catch (_) {
      const input = document.createElement('textarea');
      input.value = value;
      input.style.position = 'fixed'; input.style.opacity = '0';
      document.body.appendChild(input); input.focus(); input.select();
      const success = document.execCommand('copy');
      input.remove();
      showToast(success ? `${value} COPIADO AL PORTAPAPELES` : `COLOR: ${value}`);
    }
  }));
})();

/* Selección de material del hero, manteniendo foto como respaldo. */
(() => {
  'use strict';
  const video=document.getElementById('hero-video');
  const controls=[...document.querySelectorAll('[data-hero-media]')];
  if(!video || controls.length!==3) return;
  const sources={one:'gemini_generated_video_06d93236.mp4',two:'gemini_generated_video_e246c37c.mp4'};
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let desired='photo',generation=0;
  function activate(key){controls.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.heroMedia===key)));}
  function photo(){
    generation++;desired='photo';video.pause();video.classList.remove('is-playing');
    video.removeAttribute('src');video.load();activate('photo');
  }
  async function play(key){
    if(!sources[key]) return;
    let current=++generation;desired=key;activate(key);
    video.classList.remove('is-playing');video.pause();video.muted=true;
    video.src=sources[key];video.load();
    try {await video.play();if(current!==generation || desired!==key)return;video.classList.add('is-playing');}
    catch(e){if(current===generation && desired===key)photo();}
  }
  controls.forEach(button=>button.addEventListener('click',()=>{
    const choice=button.dataset.heroMedia;
    if(choice==='photo') photo(); else play(choice);
  }));
  video.addEventListener('playing',()=>{if(desired!=='photo')video.classList.add('is-playing')});
  video.addEventListener('error',()=>{if(desired!=='photo')photo()});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)video.pause();
    else if(desired!=='photo'&&!reduced)video.play().catch(photo);
  });
  if(!reduced)play('one');
})();
