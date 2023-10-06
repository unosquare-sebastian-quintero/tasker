import { useEffect, useRef } from "react";

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
    logRef.current(`[mounted] ${nameRef.current}`);

    return () => {
      logRef.current(`[unmounted] ${nameRef.current}`);
    };
  }, []);

  useEffect(() => {
    logRef.current(`[update] ${nameRef.current} `, props);
  });
}
