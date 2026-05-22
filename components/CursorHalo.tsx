// components/CursorHalo.tsx — Tier 1, upgrade 02
// A 90px accent halo that follows the cursor, plus a 36px ring on the dot itself.
// Mount once at the root of <Layout>; it sets pointer-events: none and z-1.
//
// Example:
//   <Layout>
//     <CursorHalo />
//     {children}
//   </Layout>
//
// Auto-disabled on touch devices.

'use client';

import { useEffect, useRef, useState } from 'react';

export function CursorHalo() {
  const haloRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Touch / small-screen → bail
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;
    setEnabled(true);

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (haloRef.current) haloRef.current.style.transform = `translate(${cx - 60}px, ${cy - 60}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${tx - 18}px, ${ty - 18}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={haloRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[1] h-[120px] w-[120px] rounded-full bg-accent/[0.18] dark:bg-accent/30 blur-[8px] will-change-transform"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[2] h-9 w-9 rounded-full border border-accent/40 dark:border-accent/60 will-change-transform"
      />
    </>
  );
}
