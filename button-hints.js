const touchQuery=window.matchMedia('(pointer: coarse)');
let holdTimer=0,dismissTimer=0,activeButton=null,tooltip=null,holdShown=false,suppressClick=false,suppressedButton=null,startPoint=null;
function hintText(button){
  const title=(button.getAttribute('title')||'').trim();
  const label=(button.getAttribute('aria-label')||'').trim();
  if(title)return title;
  if(label)return label;
  return (button.innerText||button.textContent||'').trim();
}
function ensureTooltip(){
  if(tooltip)return tooltip;
  tooltip=document.createElement('div');tooltip.className='button-hint';tooltip.setAttribute('role','tooltip');tooltip.hidden=true;document.body.append(tooltip);return tooltip;
}
function showHint(button,text){
  const tip=ensureTooltip();tip.textContent=text;tip.hidden=false;tip.classList.add('is-visible');
  const rect=button.getBoundingClientRect();const box=tip.getBoundingClientRect();const pad=8;
  const left=Math.max(pad,Math.min(rect.left+rect.width/2-box.width/2,innerWidth-box.width-pad));
  let top=rect.top-box.height-9;if(top<pad)top=Math.min(innerHeight-box.height-pad,rect.bottom+9);
  tip.style.left=left+'px';tip.style.top=Math.max(pad,top)+'px';
  activeButton=button;holdShown=true;
}
function hideHint(){if(!tooltip)return;tooltip.classList.remove('is-visible');tooltip.hidden=true;activeButton=null;holdShown=false;}
function clearHold(){if(holdTimer){clearTimeout(holdTimer);holdTimer=0;}}
document.addEventListener('pointerdown',event=>{
  if(event.pointerType!=='touch')return;
  const button=event.target instanceof Element?event.target.closest('button'):null;
  const text=button&&hintText(button);if(!text)return;
  clearHold();clearTimeout(dismissTimer);hideHint();activeButton=button;startPoint={x:event.clientX,y:event.clientY};holdShown=false;
  holdTimer=setTimeout(()=>{holdTimer=0;showHint(button,text);suppressClick=true;suppressedButton=button;},480);
},{capture:true,passive:true});
document.addEventListener('pointermove',event=>{
  if(!holdTimer||event.pointerType!=='touch'||!startPoint)return;
  if(Math.abs(event.clientX-startPoint.x)+Math.abs(event.clientY-startPoint.y)>14)clearHold();
},{capture:true,passive:true});
document.addEventListener('pointerup',event=>{
  if(event.pointerType!=='touch')return;clearHold();startPoint=null;
  if(holdShown){dismissTimer=setTimeout(hideHint,1800);setTimeout(()=>{suppressClick=false;suppressedButton=null;},650);}
},{capture:true,passive:true});
document.addEventListener('pointercancel',()=>{clearHold();startPoint=null;if(holdShown)hideHint();},{capture:true,passive:true});
document.addEventListener('contextmenu',event=>{const button=event.target instanceof Element?event.target.closest('button'):null;if(button&&holdShown&&button===activeButton)event.preventDefault();},{capture:true});
document.addEventListener('click',event=>{
  const button=event.target instanceof Element?event.target.closest('button'):null;if(!suppressClick||!button||button!==suppressedButton)return;
  event.preventDefault();event.stopImmediatePropagation();suppressClick=false;suppressedButton=null;clearTimeout(dismissTimer);hideHint();
},{capture:true});
document.addEventListener('scroll',()=>{if(holdShown)hideHint();},{capture:true,passive:true});
if(!touchQuery.matches)document.documentElement.classList.add('no-touch-hints');
