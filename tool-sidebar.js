const sidebar=document.querySelector('#tool-sidebar');
const toggle=document.querySelector('#tool-sidebar-toggle');
const closeButton=document.querySelector('#tool-sidebar-close');
const panel=document.querySelector('.tool-sidebar-panel');

function setSidebarOpen(open){
  if(!sidebar||!toggle)return;
  sidebar.hidden=!open;
  document.body.classList.toggle('tool-sidebar-open',open);
  toggle.setAttribute('aria-expanded',String(open));
  toggle.setAttribute('aria-label',open?'Close tools sidebar':'Open tools sidebar');
  if(open)closeButton?.focus();
  else toggle.focus();
}

toggle?.addEventListener('click',()=>setSidebarOpen(sidebar.hidden));
closeButton?.addEventListener('click',()=>setSidebarOpen(false));
sidebar?.addEventListener('click',event=>{
  if(event.target.matches('[data-close-tool-sidebar]')){setSidebarOpen(false);return;}
  const prayerChoice=event.target.closest('#prayer-menu button[role="menuitem"]');
  if(prayerChoice&&!prayerChoice.classList.contains('prayer-menu-return')){
    setSidebarOpen(false);
    requestAnimationFrame(()=>document.querySelector('.reading')?.scrollIntoView({behavior:'smooth',block:'start'}));
  }
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&sidebar&&!sidebar.hidden)setSidebarOpen(false);
  if(event.key==='Tab'&&sidebar&&!sidebar.hidden&&panel){
    const focusable=[...panel.querySelectorAll('button:not(:disabled),a[href],input:not([disabled]):not([type="hidden"]),select:not(:disabled)')].filter(node=>!node.closest('[hidden]'));
    if(!focusable.length)return;
    const first=focusable[0],last=focusable[focusable.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
});
