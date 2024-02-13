import { useLayoutEffect } from 'react';

export const useUpdateSize = (callback) => {
  useLayoutEffect(() => {
    const updateSize = () => {
      callback(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [callback]);
};
