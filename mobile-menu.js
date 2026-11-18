const header = document.querySelector('.topline');
const toggle = document.getElementById('mobile-menu-toggle');
const menu = document.getElementById('header-menu');
const mobile = window.matchMedia('(max-width: 620px)');

function setMenuOpen(open) {
  if (!header || !toggle) return;
  header.classList.toggle('mobile-menu-open', open && mobile.matches);
  toggle.setAttribute('aria-expanded', String(open && mobile.matches));
  toggle.setAttribute('aria-label', open ? 'Close header menu' : 'Open header menu');
  toggle.textContent = open ? '×' : '＋';
}

toggle?.addEventListener('click', () => {
  setMenuOpen(!header.classList.contains('mobile-menu-open'));
});

document.addEventListener('click', (event) => {
  if (!header?.classList.contains('mobile-menu-open')) return;
  if (!menu?.contains(event.target) && !toggle?.contains(event.target)) setMenuOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuOpen(false);
});

menu?.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  // Keep the mobile toolbar open while the prayer picker is being opened;
  // otherwise its nested prayer list is hidden before a prayer can be chosen.
  if (button.id === 'open-prayers' || button.id === 'translation-toggle') return;
  setTimeout(() => setMenuOpen(false), 80);
});

mobile.addEventListener('change', (event) => {
  if (!event.matches) setMenuOpen(false);
});
