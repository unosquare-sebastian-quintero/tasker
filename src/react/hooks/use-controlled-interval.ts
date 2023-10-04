import { useCallback, useEffect, useRef } from "react";

export function useControlledInterval(
  callback: () => void,
  ms: number,
  deps?: React.DependencyList,
) {
  const idRef = useRef<ReturnType<typeof setInterval>>();

  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    // var id = setInterval(ref.current, ms);
    return () => {
      clearInterval(idRef.current);
    };
  }, deps ?? []);

  const start = useCallback(
    function start() {
      idRef.current = setInterval(callbackRef.current, ms);
    },
    [ms],
  );
  const stop = useCallback(function stop() {
    clearInterval(idRef.current);
    idRef.current = undefined;
  }, []);

  return { start, stop };
}
