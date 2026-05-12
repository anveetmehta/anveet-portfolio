export function GrainOverlay() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[9998] h-full w-full opacity-[0.032] dark:opacity-[0.045]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <filter id="grain-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.72"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  );
}
