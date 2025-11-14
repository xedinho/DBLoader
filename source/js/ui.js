export function escapeHTML(str){
  if(!str) return '';
  return String(str).replace(/[&<>'\"]/g, tag => ({
    '&': '&amp;','<': '&lt;','>': '&gt;','\'': '&#39;','"': '&quot;'
  }[tag] || tag));
}
export function copyToClipboard(text, button){
  if(!navigator.clipboard) return;
  navigator.clipboard.writeText(text).then(()=>{
    const original = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(()=> button.textContent = original, 1500);
  }).catch(()=>{});
}
export function customAlert(msg){ alert(msg); return Promise.resolve(); }
export function customConfirm(msg){ return Promise.resolve(confirm(msg)); }
export function customPrompt(msg, def=''){ const r = prompt(msg, def); return Promise.resolve(r===null?null:String(r)); }
