'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: no-preference) and (pointer: fine)');
    let lenis: Lenis | undefined;
    let frame = 0;

    const raf = (time: number) => {
      if (!lenis) return;
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    const update = () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = undefined;

      if (!preference.matches) return;

      lenis = new Lenis({
        duration: 0.25,
        lerp: 0,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        syncTouch: false,
      });
      frame = requestAnimationFrame(raf);
    };

    update();
    preference.addEventListener('change', update);

    return () => {
      preference.removeEventListener('change', update);
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null; 
}
