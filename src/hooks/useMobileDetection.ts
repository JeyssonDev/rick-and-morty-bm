import { useEffect } from 'react';
import { useIsMobileStore } from '../store/is-mobile-store';

const useMobileDetection = () => {
  const { setIsMobile } = useIsMobileStore();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile]);
};

export default useMobileDetection;
