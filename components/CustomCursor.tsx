import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailerRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on devices with a mouse/trackpad
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursor = cursorRef.current;
    const trailer = trailerRef.current;
    
    if (!cursor || !trailer) return;

    let mouseX = 0;
    let mouseY = 0;
    let trailerX = 0;
    let trailerY = 0;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Inner dot follows immediately
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for interactive elements
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';
        
      isHoveringRef.current = isClickable;
    };

    const animate = () => {
      // Lerp (Linear Interpolation) for smooth trailing
      const dx = mouseX - trailerX;
      const dy = mouseY - trailerY;
      
      trailerX += dx * 0.15;
      trailerY += dy * 0.15;
      
      const scale = isHoveringRef.current ? 2.5 : 1;
      
      if (trailer) {
          trailer.style.transform = `translate3d(${trailerX}px, ${trailerY}px, 0) scale(${scale})`;
          
          // Visual changes on hover
          if (isHoveringRef.current) {
              trailer.style.backgroundColor = 'rgba(242, 201, 76, 0.1)';
              trailer.style.borderColor = 'rgba(242, 201, 76, 0.5)';
              trailer.style.borderWidth = '1px';
          } else {
              trailer.style.backgroundColor = 'transparent';
              trailer.style.borderColor = '#F2C94C';
              trailer.style.borderWidth = '1px';
          }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  // Don't render anything if not visible yet (prevents dot at 0,0)
  // Also only render for fine pointer devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return null;

  return (
    <>
      {/* Inner Dot */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#F2C94C] rounded-full pointer-events-none z-[100] mix-blend-difference will-change-transform"
        style={{ 
            marginTop: '-4px', 
            marginLeft: '-4px',
            opacity: isVisible ? 1 : 0 
        }}
      />
      {/* Outer Ring */}
      <div 
        ref={trailerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[#F2C94C] rounded-full pointer-events-none z-[100] will-change-transform transition-colors duration-200"
        style={{ 
            marginTop: '-20px', 
            marginLeft: '-20px',
            opacity: isVisible ? 1 : 0
        }}
      />
    </>
  );
};