import { MenuProvider } from "../components/menu-provider";

export function withMenuProvider<P>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P> {
  const displayName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? "Component";

  function ComponentWithMenuProvider(props: P) {
    return (
      <MenuProvider>
        <WrappedComponent {...(props as JSX.IntrinsicAttributes & P)} />
      </MenuProvider>
    );
  }

  ComponentWithMenuProvider.displayName = `withMenuProvider(${displayName})`;

  return ComponentWithMenuProvider;
}
