import { useEffect, useRef, useState } from 'react';

/**
 * The demo has no backend, so results are ready instantly. This stands in for a
 * network round trip: it reports `true` briefly whenever `key` changes, so the UI
 * shows a skeleton instead of content snapping in. Longer on first mount.
 */
export function useSimulatedLoad(key, { initial = 450, update = 220 } = {}) {
  const [loading, setLoading] = useState(true);
  const first = useRef(true);
  useEffect(() => {
    setLoading(true);
    const id = window.setTimeout(() => {
      first.current = false;
      setLoading(false);
    }, first.current ? initial : update);
    return () => window.clearTimeout(id);
  }, [key, initial, update]);
  return loading;
}
