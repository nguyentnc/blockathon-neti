'use client';

import { useEffect } from 'react';

const ConfigHeightScreen = () => {
  const customViewport = () => {
    const viewHeight = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${viewHeight}px`);
  };

  useEffect(() => {
    customViewport();

    window.addEventListener('resize', customViewport);

    return () => {
      window.removeEventListener('resize', customViewport);
    };
  }, []);

  return null;
};

export default ConfigHeightScreen;
