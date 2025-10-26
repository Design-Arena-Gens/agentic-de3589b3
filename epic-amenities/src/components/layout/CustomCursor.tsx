'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      setEnabled(false);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onPointerMove = (event: PointerEvent) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.18,
        ease: 'power3.out'
      });
    };

    const onPointerDown = () => cursor.classList.add('active');
    const onPointerUp = () => cursor.classList.remove('active');
    const onWindowLeave = () => cursor.classList.add('hidden');
    const onWindowEnter = () => cursor.classList.remove('hidden');

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('mouseleave', onWindowLeave);
    window.addEventListener('mouseenter', onWindowEnter);

    const interactiveNodes = document.querySelectorAll<HTMLElement>('a, button, [data-cursor="interactive"]');
    interactiveNodes.forEach((node) => {
      node.addEventListener('mouseenter', onPointerDown);
      node.addEventListener('mouseleave', onPointerUp);
    });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('mouseleave', onWindowLeave);
      window.removeEventListener('mouseenter', onWindowEnter);
      interactiveNodes.forEach((node) => {
        node.removeEventListener('mouseenter', onPointerDown);
        node.removeEventListener('mouseleave', onPointerUp);
      });
    };
  }, []);

  if (!enabled) return null;

  return <div ref={cursorRef} className="custom-cursor hidden" aria-hidden="true" />;
}
