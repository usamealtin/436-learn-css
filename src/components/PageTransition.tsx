import React, { useRef, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start invisible, then trigger fade-in
    setVisible(false);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [children]);

  return (
    <div
      ref={containerRef}
      className={`page-transition ${visible ? 'page-enter-active' : 'page-enter-from'}`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
