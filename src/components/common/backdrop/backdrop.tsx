import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./backdrop.module.scss";

export type BackdropProps = React.PropsWithChildren;

export function Backdrop({ children }: BackdropProps) {
  const [container, setContainer] = useState<HTMLDivElement>();

  useEffect(() => {
    const div = document.createElement("div");
    div.classList.add(styles.backdrop);

    document.body.appendChild(div);
    setContainer(div);

    return () => {
      document.body.removeChild(div);
    };
  }, []);

  if (container == null) {
    return null;
  }

  return <>{createPortal(children, container)}</>;
}
