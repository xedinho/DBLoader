import { escapeHTML, copyToClipboard } from './ui.js';
export function renderGallery(data, containerElement, tabType, startIndex=0){
  if(!containerElement) return;
  containerElement.innerHTML = '';
  if(!data || data.length===0){ containerElement.innerHTML = '<p style="text-align:center;color:#888;">No items to display. Drop a file!</p>'; return; }
  const frag = document.createDocumentFragment();
  data.forEach(item=>{
    const card = document.createElement('div'); card.className='card';
    const safeImg = escapeHTML(item.img || 'https://via.placeholder.com/250x250?text=No+Image');
    const safeName = escapeHTML(item.name || '');
    card.innerHTML = `<img src="${safeImg}" alt="${safeName}" loading="lazy" /><div class="card-body"><h3>${safeName}</h3></div>`;
    frag.appendChild(card);
  });
  containerElement.appendChild(frag);
}
