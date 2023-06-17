import { useEffect } from 'react';
export function usePreventWindowUnload(preventDefault) {
  useEffect(() => {
    const isPrevent =
      typeof preventDefault === 'function' ? preventDefault() : preventDefault;
    if (!isPrevent) return;
    const handleBeforeUnload = (event) => {
      console.log('unloading');
      event.preventDefault();
      event.returnValue = 'Are you sure you want to leave?';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [preventDefault]);
}
