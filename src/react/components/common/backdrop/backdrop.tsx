import clsx from "clsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./backdrop.module.scss";

export type BackdropProps = React.PropsWithChildren & {
  className?: string;
  onClose?: () => void;
};

export function Backdrop({ className, onClose, children }: BackdropProps) {
  const [container, setContainer] = useState<HTMLDivElement>();

  useEffect(() => {
    const div = document.createElement("div");
    div.setAttribute("role", "presentation");
    div.className = styles.backdrop;

    document.body.appendChild(div);
    setContainer(div);

    return () => {
      document.body.removeChild(div);
    };
  }, []);

  useEffect(() => {
    if (container == null) {
      return;
    }

    function onClick(event: MouseEvent) {
      if (event.currentTarget === event.target) {
        onClose?.();
      }
    }

    container.addEventListener("click", onClick);

    return () => {
      container.removeEventListener("click", onClick);
    };
  }, [container, onClose]);

  useEffect(() => {
    if (container == null) {
      return;
    }

    container.className = clsx(className, styles.backdrop);
  }, [className, container]);

  if (container == null) {
    return null;
  }

  return <>{createPortal(children, container)}</>;
}
