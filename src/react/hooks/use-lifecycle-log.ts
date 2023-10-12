import { useEffect, useRef } from "react";

const ENABLED = false;

function getComponentName<TProps = unknown>(
  component: React.FunctionComponent<TProps>,
) {
  return component.displayName || component.name || "Component";
}

export function useLifecycleLog<TProps = unknown>(
  component: React.FunctionComponent<TProps>,
  props: TProps,
  logfn: typeof console.log,
) {
  const nameRef = useRef(getComponentName(component));
  nameRef.current = getComponentName(component);

  const logRef = useRef(logfn);
  logRef.current = logfn;

  useEffect(() => {
    if (ENABLED) {
      logRef.current(`[mounted] ${nameRef.current}`);

      return () => {
        logRef.current(`[unmounted] ${nameRef.current}`);
      };
    }
  }, []);

  useEffect(() => {
    if (ENABLED) {
      logRef.current(`[update] ${nameRef.current} `, props);
    }
  });
}
