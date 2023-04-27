import { useEffect, useState } from 'react';

export default function useScreenWidth() {
  const [windowScreenWidth, setWindowScreenWidth] = useState(document.body.clientWidth);
  useEffect(() => {
    function handleScreenWidth() {
      setWindowScreenWidth(document.body.clientWidth);
    }

    window.addEventListener('resize', handleScreenWidth);
    return () => {
      window.removeEventListener('resize', handleScreenWidth);
    };
  }, []);
  return windowScreenWidth;
}
