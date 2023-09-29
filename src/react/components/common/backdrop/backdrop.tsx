import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./backdrop.module.scss";

export type BackdropProps = React.PropsWithChildren & {
  onClose?: () => void;
};

export function Backdrop({ onClose, children }: BackdropProps) {
  const [container, setContainer] = useState<HTMLDivElement>();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.currentTarget === event.target) {
        onClose?.();
      }
    }

    const div = document.createElement("div");
    div.setAttribute("role", "presentation");
    div.classList.add(styles.backdrop);
    div.addEventListener("click", onClick);

    document.body.appendChild(div);
    setContainer(div);

    return () => {
      div.removeEventListener("click", onClick);
      document.body.removeChild(div);
    };
  }, []);

  if (container == null) {
    return null;
  }

  return <>{createPortal(children, container)}</>;
}
