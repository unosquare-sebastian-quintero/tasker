import { useEffect, useRef } from "react";

export function useInterval(
  callback: () => void,
  ms: number,
  deps?: React.DependencyList,
) {
  var ref = useRef(callback);
  ref.current = callback;

  useEffect(() => {
    var id = setInterval(ref.current, ms);
    return () => {
      clearInterval(id);
    };
  }, deps ?? []);
}
