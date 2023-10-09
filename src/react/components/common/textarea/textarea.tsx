import clsx from "clsx";
import { useRef, useState } from "react";
import { getClientScrollFactor } from "../../../utilities/dom-utils";
import styles from "./textarea.module.scss";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({
  readOnly,
  className,
  onFocus,
  onBlur,
  ...props
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [rows, setRows] = useState(1);

  function handleTextareaFocus(event: React.FocusEvent<HTMLTextAreaElement>) {
    onFocus?.(event);

    if (textareaRef.current) {
      setRows(Math.floor(getClientScrollFactor(textareaRef.current)));
    }
  }

  function handleTextareaBlur(event: React.FocusEvent<HTMLTextAreaElement>) {
    onBlur?.(event);
    setRows(1);
  }

  return (
    <textarea
      {...props}
      ref={textareaRef}
      rows={rows}
      className={clsx(className, styles.textarea, {
        [styles["textarea--read-only"]]: readOnly,
      })}
      onFocus={handleTextareaFocus}
      onBlur={handleTextareaBlur}
    />
  );
}
