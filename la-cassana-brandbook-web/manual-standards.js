/* Original PDF illustrations: no font files are copied or redistributed. */
(() => {
  'use strict';
  const sources = document.querySelectorAll('canvas[data-manual-page]');
  if (!sources.length) return;
  const PDF_URL = 'manual-la-cassana.pdf';
  const PDFJS = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs';
  let docPromise;
  const pagePromises = new Map();
  const crops = {
    full: [0,0,1,1],
    'matrix-left': [.105,.205,.365,.59], 'matrix-right': [.522,.205,.365,.59],
    'sizes-12': [.545,.11,.43,.205], 'sizes-8': [.545,.31,.43,.225],
    'sizes-5': [.545,.515,.43,.21], 'sizes-3': [.545,.715,.43,.215],
    'type-primary': [.345,.22,.314,.37], 'type-secondary': [.624,.22,.352,.37]
  };
  const clamp = (n,min,max) => Math.min(max,Math.max(min,n));
  function loadPDF(){
    if(!docPromise) docPromise = import(PDFJS).then(pdf => {
      pdf.GlobalWorkerOptions.workerSrc = PDFJS.replace('pdf.min.mjs','pdf.worker.min.mjs');
      return pdf.getDocument({url:PDF_URL}).promise;
    });
    return docPromise;
  }
  async function getPage(number){
    if(!pagePromises.has(number)) pagePromises.set(number, loadPDF().then(doc=>doc.getPage(number)));
    return pagePromises.get(number);
  }
  async function render(canvas, highRes=false){
    const requestedCrop = canvas.dataset.crop || 'full';
    const pageNumber = Number(canvas.dataset.manualPage);
    const crop = crops[requestedCrop] || crops.full;
    const page = await getPage(pageNumber);
    const width = page.view[2]-page.view[0], height=page.view[3]-page.view[1];
    const displayWidth = highRes ? clamp(window.innerWidth-80,320,1400) : clamp(canvas.parentElement.clientWidth,200,1400);
    const density = clamp(window.devicePixelRatio || 1,1,2);
    const scale = clamp(displayWidth*density/(width*crop[2]),.8,2.5);
    const viewport=page.getViewport({scale});
    const buffer=document.createElement('canvas');
    buffer.width=Math.ceil(viewport.width); buffer.height=Math.ceil(viewport.height);
    await page.render({canvasContext:buffer.getContext('2d'),viewport}).promise;
    // Ignore stale render results when the user changes the selected scale quickly.
    if(canvas.dataset.crop!==requestedCrop || Number(canvas.dataset.manualPage)!==pageNumber) return;
    const sx=Math.round(crop[0]*buffer.width), sy=Math.round(crop[1]*buffer.height);
    const sw=Math.min(buffer.width-sx,Math.round(crop[2]*buffer.width));
    const sh=Math.min(buffer.height-sy,Math.round(crop[3]*buffer.height));
    canvas.width=sw; canvas.height=sh;
    canvas.getContext('2d').drawImage(buffer,sx,sy,sw,sh,0,0,sw,sh);
    canvas.parentElement?.classList.add('loaded');
  }
  function onRenderError(canvas){
    const message=canvas.closest('.technical-canvas-shell')?.querySelector('.pdf-loading');
    if(message){
      message.classList.add('is-error');
      message.innerHTML = 'Vista previa no disponible. <a href="'+PDF_URL+'#page='+canvas.dataset.manualPage+'" target="_blank" rel="noopener">Abrir lámina original ↗</a>';
    }
  }
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      render(entry.target).catch(()=>onRenderError(entry.target));
    });
  },{rootMargin:'220px'}) : null;
  sources.forEach(canvas=>{
    if(canvas.closest('[hidden]')) return;
    if(observer) observer.observe(canvas);
    else render(canvas).catch(()=>onRenderError(canvas));
  });
  document.querySelectorAll('[data-matrix-view]').forEach(button=>button.addEventListener('click',()=>{
    const view=button.dataset.matrixView;
    document.querySelectorAll('[data-matrix-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.querySelectorAll('.matrix-pane').forEach(pane=>{
      const selected=pane.dataset.matrixPane===view;
      pane.hidden=!selected;
      if(selected){
        const canvas=pane.querySelector('canvas');
        if(canvas && !canvas.width) render(canvas).catch(()=>onRenderError(canvas));
      }
    });
  }));
  const sizeCanvas=document.getElementById('size-reference-canvas');
  const sizeName=document.getElementById('size-reference-label');
  const sizeComposition=document.getElementById('size-reference-description');
  const labels={
    '12':['12 cm','Logotipo denominativo'],
    '8':['8 cm','Composición con nombre en arco'],
    '5':['5 cm','Composición con nombre en arco reducida'],
    '3':['3 cm','Isotipo independiente']
  };
  document.querySelectorAll('[data-size-select]').forEach(btn=>btn.addEventListener('click',()=>{
    const key=btn.dataset.sizeSelect;
    document.querySelectorAll('[data-size-select]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
    sizeName.textContent=labels[key][0];sizeComposition.textContent=labels[key][1];
    sizeCanvas.dataset.crop='sizes-'+key;
    sizeCanvas.parentElement.classList.remove('loaded');
    render(sizeCanvas).catch(()=>onRenderError(sizeCanvas));
  }));
  const dialog=document.getElementById('manual-zoom-dialog');
  document.querySelectorAll('[data-manual-zoom]').forEach(button=>button.addEventListener('click',async()=>{
    const canvas=dialog.querySelector('canvas');
    canvas.dataset.manualPage=button.dataset.manualZoom;
    canvas.dataset.crop=button.dataset.zoomCrop || 'full';
    dialog.querySelector('[data-dialog-title]').textContent=button.dataset.zoomTitle||'Lámina oficial de La Cassana';
    canvas.width=0;dialog.showModal();
    try{await render(canvas,true);}
    catch(_){dialog.close();window.open(PDF_URL+'#page='+button.dataset.manualZoom,'_blank','noopener');}
  }));
  dialog.querySelector('.manual-zoom-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
})();

/* Dedicated lightbox for actual PNG brand assets. Independent from PDF.js. */
(() => {
  'use strict';
  const dialog=document.getElementById('restriction-lightbox');
  if(!dialog) return;
  const fullImage=dialog.querySelector('.restriction-lightbox-image img');
  const title=dialog.querySelector('#restriction-lightbox-title');
  const original=dialog.querySelector('#restriction-lightbox-original');
  const close=dialog.querySelector('.restriction-lightbox-close');
  document.querySelectorAll('[data-restriction-view]').forEach(button=>{
    button.addEventListener('click',()=>{
      const thumbnail=button.querySelector('img');
      if(!thumbnail) return;
      const source=thumbnail.getAttribute('src');
      const caption=button.closest('.restriction-item')?.querySelector('figcaption span')?.textContent || 'ÁREA DE RESTRICCIÓN';
      fullImage.src=source;
      fullImage.alt=thumbnail.alt;
      title.textContent='LA CASSANA / '+caption;
      original.href=source;
      dialog.showModal();
    });
  });
  close?.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{
    if(event.target===dialog)dialog.close();
  });
})();
