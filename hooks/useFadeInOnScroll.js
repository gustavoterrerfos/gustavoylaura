import { useEffect, useRef } from 'react';

export default function useFadeInOnScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('visible');
        } else {
          node.classList.remove('visible');
        }
      },
      {
        threshold: 0.15
      }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
