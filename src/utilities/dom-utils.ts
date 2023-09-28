export function getClientScrollFactor(element: HTMLElement) {
  const { scrollHeight, clientHeight } = element;
  const style = getComputedStyle(element);

  const paddingTop = parseFloat(style.paddingTop.replace("px", ""));
  const paddingBottom = parseFloat(style.paddingBottom.replace("px", ""));
  const verticalPadding = paddingTop + paddingBottom;

  const normalizedScrollHeight = scrollHeight - verticalPadding;
  const normalizedClientHeight = clientHeight - verticalPadding;

  return normalizedScrollHeight / normalizedClientHeight;
}
