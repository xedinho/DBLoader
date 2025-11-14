import * as UI from './ui.js';
import { renderGallery } from './gallery.js';
import { prepareExport, handleImportFile } from './importExport.js';
const dropZone = document.getElementById('dropZone');
const searchBar = document.getElementById('searchBar');
const toggleDark = document.getElementById('toggleDark');
const tabsContainer = document.getElementById('tabsContainer');
const addTabButton = document.getElementById('addTabButton');
let currentTab='avatars';
const tabData = { avatars: [], clothes: [], customAvatars: [], cacheyLoader: [] };
document.addEventListener('DOMContentLoaded', ()=>{
  // basic attach
  document.querySelectorAll('.tabs button').forEach(btn=> btn.addEventListener('click', (e)=>{ const id = btn.dataset.tabId || (btn.textContent||'').toLowerCase(); currentTab = id; document.querySelectorAll('.tabs button').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderGallery(tabData[id]||[], document.getElementById(id), id); }));
  document.getElementById('addTabButton')?.addEventListener('click', async ()=>{ const name = await UI.customPrompt('New tab name'); if(!name) return; const id = name.toLowerCase().replace(/[^a-z0-9]/g,''); tabData[id]=[]; const b = document.createElement('button'); b.textContent = name; b.setAttribute('data-tab-id', id); b.addEventListener('click', ()=> { currentTab=id; renderGallery(tabData[id], document.getElementById(id), id); }); document.getElementById('tabsContainer').insertBefore(b, document.getElementById('addTabButton')); const grid = document.createElement('div'); grid.className='grid'; grid.id=id; document.body.appendChild(grid); });
  document.getElementById('exportButton')?.addEventListener('click', ()=> prepareExport(tabData, currentTab, document.documentElement));
  document.getElementById('importButton')?.addEventListener('click', ()=> document.getElementById('importInput').click());
  document.getElementById('importInput')?.addEventListener('change', async (e)=>{ const f = e.target.files[0]; if(!f) return; await handleImportFile(f, tabData, ()=>{}, document.documentElement, ()=>{}, ()=>{}, renderGallery); e.target.value=''; });
  dropZone?.addEventListener('dragover', e=> { e.preventDefault(); dropZone.classList.add('dragover'); });
  dropZone?.addEventListener('drop', async e=>{ e.preventDefault(); dropZone.classList.remove('dragover'); const f = e.dataTransfer.files[0]; if(!f) return; try{ const txt = await f.text(); if(currentTab==='customAvatars'){ const lines = txt.split('\n').filter(l=>l.trim()); const arr = lines.map(l=>{ const p=l.split(','); return { id: p[0]?.trim(), name: p[1]?.trim(), author: p[2]?.trim(), thumbnail: p[3]?.trim() }; }); tabData[currentTab]=arr; } else { const parsed = JSON.parse(txt); tabData[currentTab]=parsed; } renderGallery(tabData[currentTab], document.getElementById(currentTab), currentTab); }catch(err){ await UI.customAlert('Error: '+(err.message||err)); } });
  toggleDark?.addEventListener('click', ()=> document.body.classList.toggle('dark'));
});
