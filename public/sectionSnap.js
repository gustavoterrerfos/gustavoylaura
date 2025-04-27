// Scroll snap sutil a la sección más visible
// Se importa dinámicamente en pages/index.js

function getMostVisibleSection(sections) {
  let maxVisible = 0;
  let mostVisible = null;
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
    const percentVisible = visibleHeight / Math.min(window.innerHeight, rect.height);
    // Solo considerar si al menos el 60% es visible
    if (percentVisible > 0.6 && visibleHeight > maxVisible) {
      maxVisible = visibleHeight;
      mostVisible = section;
    }
  }
  return mostVisible;
}

function isCenterInSection(section) {
  const rect = section.getBoundingClientRect();
  const center = window.innerHeight / 2;
  return rect.top < center && rect.bottom > center;
}

function snapToSection() {
  if (window.scrollY < 50) return; // No snap en la cabecera
  if (window.innerWidth > 1200) return; // Solo móvil/tablet/portátil
  const sections = Array.from(document.querySelectorAll('main section'));
  const mostVisible = getMostVisibleSection(sections);
  if (!mostVisible) return;
  const rect = mostVisible.getBoundingClientRect();
  const center = window.innerHeight / 2;
  // Solo snap si el centro está cerca (±160px) o dentro de la sección
  if (rect.top - center > 160 || rect.bottom - center < -160) return;
  if (isCenterInSection(mostVisible)) return; // Ya está centrada
  // Snap solo si no estamos ya cerca
  mostVisible.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(snapToSection, 600);
}, { passive: true });

export default null; // solo para evitar error si se importa como módulo
