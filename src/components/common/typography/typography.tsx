import clsx from "clsx";
import classes from "./typography.module.scss";

type Variant = "h1" | "body1" | "button" | "default";

const COMPONENT_VARIANT_MAP: Record<Variant, React.ElementType> = {
  h1: "h1",
  body1: "span",
  button: "span",
  default: "span",
};

export type TypographyProps = React.HTMLAttributes<typeof HTMLElement> & {
  component?: React.ElementType;
  variant: Variant;
};

export function Typography({
  component,
  variant,
  className,
  ...props
}: TypographyProps) {
  const Component =
    component != null ? component : COMPONENT_VARIANT_MAP[variant ?? "default"];

  return (
    <Component
      {...props}
      className={clsx(className, classes.typography, {
        [classes["typography--h1"]]: variant === "h1",
        [classes["typography--body1"]]: variant === "body1",
        [classes["typography--button"]]: variant === "button",
      })}
    ></Component>
  );
}
