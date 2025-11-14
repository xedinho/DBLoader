import { customAlert, customConfirm } from './ui.js';
export function prepareExport(tabData, currentTab, root){
  const allTabInfo = {};
  Object.keys(tabData).forEach(tabId => { allTabInfo[tabId] = tabData[tabId]; });
  const dataToSave = { tabs: allTabInfo, themeHue: root.style.getPropertyValue('--base-hue')||'260', isDark: document.body.classList.contains('dark'), currentTab };
  const blob = new Blob([JSON.stringify(dataToSave,null,2)],{type:'application/json'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download='db_loader_backup.json'; document.body.appendChild(a); a.click(); a.remove();
}
export async function handleImportFile(file, tabData, createNewTab, root, renderUnloadButtons, switchTab, renderGallery){
  try{
    const text = await file.text(); const imported = JSON.parse(text);
    if(!imported.tabs) throw new Error('Invalid file');
    Object.keys(imported.tabs).forEach(k=> tabData[k]=imported.tabs[k]);
    if(imported.themeHue) root.style.setProperty('--base-hue', imported.themeHue);
    if(imported.isDark!=null) document.body.classList.toggle('dark', imported.isDark);
    await customAlert('Imported');
  }catch(e){ await customAlert('Import error: '+ e.message); }
}
