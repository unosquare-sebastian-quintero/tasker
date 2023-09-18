import clsx from "clsx";
import classes from "./typography.module.scss";

export type TypographyProps = React.HTMLAttributes<typeof HTMLElement> & {
  component?: React.ElementType;
  variant?: "h1";
};

export function Typography({
  component = "span",
  variant,
  className,
  ...props
}: TypographyProps) {
  if (variant === "h1") {
    component = "h1";
  }

  const Component = component;

  return (
    <Component
      {...props}
      className={clsx(className, classes.typography, {
        [classes["typography--h1"]]: variant === "h1",
      })}
    ></Component>
  );
}
