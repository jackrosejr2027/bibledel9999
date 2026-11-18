const gallery=document.querySelector('#book-art-grid');
const gallerySection=document.querySelector('#book-art-gallery');
const galleryToggle=document.querySelector('#toggle-book-art-gallery');
const imageDialog=document.querySelector('#gallery-lightbox');
const enlargedImage=document.querySelector('#gallery-lightbox-image');
if(gallery&&gallerySection&&galleryToggle&&imageDialog&&enlargedImage){
  const images=[
    {src:'uploads/j1.jpg',thumb:'img/gallery/legacy-thumbs/01.webp',alt:'Traditional portrait of Jesus'},
    {src:'uploads/j2.jpg',thumb:'img/gallery/legacy-thumbs/02.webp',alt:'Byzantine-style icon of Christ'},
    {src:'uploads/j3.webp',thumb:'img/gallery/legacy-thumbs/03.webp',alt:'Icon of Mary and the child Jesus'},
    {src:'uploads/j4.webp',thumb:'img/gallery/legacy-thumbs/04.webp',alt:'The Last Supper'},
    {src:'uploads/j5.webp',thumb:'img/gallery/legacy-thumbs/05.webp',alt:'Christ blessing'},
    {src:'uploads/j6.webp',thumb:'img/gallery/legacy-thumbs/06.webp',alt:'Biblical scene of heavenly figures'},
    {src:'uploads/j9.jpg',thumb:'img/gallery/legacy-thumbs/07.webp',alt:'Traditional portrait of Jesus'},
    {src:'uploads/j10.webp',thumb:'img/gallery/legacy-thumbs/08.webp',alt:'Jesus among a crowd in an ancient city'},
    {src:'uploads/j11.webp',thumb:'img/gallery/legacy-thumbs/09.webp',alt:'Jesus teaching a gathered crowd'},
    {src:'uploads/j12.jfif',thumb:'img/gallery/legacy-thumbs/10.webp',alt:'Jesus praying in the garden'},
    {src:'uploads/j13.jpeg',thumb:'img/gallery/legacy-thumbs/11.webp',alt:'Portrait of Jesus'},
    {src:'uploads/j14.jpg',thumb:'img/gallery/legacy-thumbs/12.webp',alt:'Sacred Heart portrait of Jesus'},
    ...Array.from({length:24},(_,index)=>{const src='img/gallery/painting-'+String(index+1).padStart(2,'0')+'.jpg';return {src,alt:'Classical biblical artwork'};})
  ];
  let previousBatch=[];
  let randomDeck=[];
  let galleryVisible=false;
  let galleryReady=false;
  let rotationTimer=0;
  function randomIndex(max){
    if(!globalThis.crypto?.getRandomValues)return Math.floor(Math.random()*max);
    const limit=0x100000000-(0x100000000%max);let value;
    do{const sample=new Uint32Array(1);globalThis.crypto.getRandomValues(sample);value=sample[0];}while(value>=limit);
    return value%max;
  }
  function shuffled(items){
    const result=[...items];
    for(let i=result.length-1;i>0;i--){const j=randomIndex(i+1);[result[i],result[j]]=[result[j],result[i]];}
    return result;
  }
  function appendBatch(batch){
    const fragment=document.createDocumentFragment();
    for(const item of batch){
      const button=document.createElement('button');button.type='button';button.className='art-thumb';button.setAttribute('aria-label','View larger: '+item.alt);button.dataset.fullSrc=item.src;button.dataset.alt=item.alt;
      const image=document.createElement('img');image.src=item.thumb||item.src;image.alt=item.alt;image.loading='lazy';image.decoding='async';button.append(image);fragment.append(button);
    }
    gallery.append(fragment);
    previousBatch=batch.map(item=>item.src);
  }
  function appendRandomBatch(pool){
    if(randomDeck.length<24){
      const lastBatch=new Set(previousBatch);
      randomDeck.push(...shuffled(pool.filter(item=>!lastBatch.has(item.src))),...shuffled(pool.filter(item=>lastBatch.has(item.src))));
    }
    appendBatch(randomDeck.splice(0,24));
  }
  function startRotation(){
    if(rotationTimer||!galleryVisible||!galleryReady)return;
    rotationTimer=window.setInterval(()=>{if(galleryVisible)appendRandomBatch(images);},45_000);
  }
  function setGalleryVisible(visible){
    galleryVisible=visible;gallerySection.hidden=!visible;
    galleryToggle.setAttribute('aria-expanded',String(visible));
    galleryToggle.setAttribute('aria-label',visible?'Hide images at the bottom of the page':'Show images at the bottom of the page');
    const label=galleryToggle.querySelector('.gallery-visibility-label');if(label)label.textContent=visible?'Hide images':'Show images';
    if(visible){if(galleryReady&&!gallery.children.length)appendRandomBatch(images);startRotation();}
    else if(rotationTimer){window.clearInterval(rotationTimer);rotationTimer=0;}
  }
  galleryToggle.addEventListener('click',()=>setGalleryVisible(!galleryVisible));

  gallery.addEventListener('click',event=>{
    const button=event.target.closest('.art-thumb');if(!button)return;
    enlargedImage.src=button.dataset.fullSrc;enlargedImage.alt=button.dataset.alt;
    window.dispatchEvent(new CustomEvent('stillwaters:select-side-art',{detail:{src:button.dataset.fullSrc}}));
    if(!imageDialog.open)imageDialog.showModal();
    imageDialog.querySelector('.gallery-lightbox-close')?.focus({preventScroll:true});
  });
  imageDialog.querySelector('.gallery-lightbox-close')?.addEventListener('click',()=>imageDialog.close());
  imageDialog.addEventListener('click',event=>{if(event.target===imageDialog)imageDialog.close();});
  imageDialog.addEventListener('close',()=>{enlargedImage.removeAttribute('src');});

  async function startGallery(){
    try{
      const response=await fetch('./gallery-artwork.json');
      if(response.ok){const extra=await response.json();if(Array.isArray(extra))images.push(...extra);}
    }catch{}
    galleryReady=true;
    if(galleryVisible){if(!gallery.children.length)appendRandomBatch(images);startRotation();}
  }
  void startGallery();
}
