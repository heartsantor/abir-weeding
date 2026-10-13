import React, { useMemo } from 'react';

export default function PetalAnimation({ count = 18 }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${(i * 5.5 + Math.random() * 5) % 96}%`,
      animationDuration: `${7 + (i % 6) * 1.5}s`,
      animationDelay: `${(i * 0.4) % 6}s`,
      size: 10 + (i % 4) * 4,
      opacity: 0.5 + (i % 3) * 0.18,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
