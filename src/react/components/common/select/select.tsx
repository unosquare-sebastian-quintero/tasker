import clsx from "clsx";
import styles from "./select.module.scss";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...props }: SelectProps) {
  return (
    <select {...props} className={clsx(className, styles.select)}></select>
  );
}
