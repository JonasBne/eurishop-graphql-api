import { useEffect, RefObject } from 'react';

const useOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  handler: (event: any) => void,
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
