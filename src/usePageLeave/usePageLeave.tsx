import { useEffect } from 'react';

export const usePageLeave = (onPageLeave: () => void) => {
  useEffect(() => {
    document.documentElement.addEventListener('mouseleave', onPageLeave);

    return () => document.documentElement.removeEventListener('mouseleave', onPageLeave);
  }, []);
};
