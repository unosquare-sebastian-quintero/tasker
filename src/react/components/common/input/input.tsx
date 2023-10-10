import clsx from "clsx";
import styles from "./input.module.scss";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return <input {...props} className={clsx(className, styles.input)} />;
}
