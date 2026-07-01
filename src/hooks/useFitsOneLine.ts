import { useEffect, useRef, useState } from "react";

export function useFitsOneLine<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [fits, setFits] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => setFits(el.scrollWidth <= el.clientWidth);
    check();

    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, fits };
}
