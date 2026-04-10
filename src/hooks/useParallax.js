import { useEffect, useRef, useCallback } from 'react';

/**
 * Lightweight parallax hook with smooth interpolation.
 * Returns [ref, style] — attach ref to the container element
 * and spread style onto the element that should move.
 *
 * @param {number} speed     – multiplier (0.05 = subtle, 0.12 = noticeable)
 * @param {string} direction – 'up' | 'down'
 */
export function useParallax(speed = 0.04, direction = 'up') {
  const ref = useRef(null);
  const target = useRef(0);
  const current = useRef(0);
  const rafId = useRef(null);

  // Cinematic on desktop, controlled on mobile.
  const ease = 0.065;
  const desktopMaxShift = 52;
  const mobileMaxShift = 26;

  const animate = useCallback(() => {
    // Smoothly interpolate towards target
    current.current += (target.current - current.current) * ease;

    const el = ref.current;
    if (el) {
      el.style.transform = `translate3d(0, ${current.current.toFixed(1)}px, 0)`;
    }

    // Keep running while there's meaningful difference
    if (Math.abs(target.current - current.current) > 0.1) {
      rafId.current = requestAnimationFrame(animate);
    } else {
      rafId.current = null;
    }
  }, [ease]);

  const scheduleAnimate = useCallback(() => {
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const isMobile = window.innerWidth <= 900;
      const maxShift = isMobile ? mobileMaxShift : desktopMaxShift;
      const speedMultiplier = isMobile ? 0.5 : 0.75;
      const progress = 1 - (rect.top + rect.height) / (windowH + rect.height);
      const raw = (progress - 0.5) * speed * speedMultiplier * windowH * (direction === 'up' ? -1 : 1);
      target.current = Math.max(-maxShift, Math.min(maxShift, raw));
      scheduleAnimate();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [speed, direction, desktopMaxShift, mobileMaxShift, scheduleAnimate]);

  // Static style object — actual transform is applied via ref
  const style = { willChange: 'transform' };

  return [ref, style];
}
