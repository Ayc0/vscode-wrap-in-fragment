export function wrapTextInFragment(text: string, fragmentFactory: string = "") {
  if (
    (text[0] === '"' && text[text.length - 1] === '"') ||
    (text[0] === "'" && text[text.length - 1] === "'")
  ) {
    return `<${fragmentFactory}>${text.substring(
      1,
      text.length - 1
    )}</${fragmentFactory}>`;
  }

  if (text[0] === "<" && text[text.length - 1] === ">") {
    return `<${fragmentFactory}>${text}</${fragmentFactory}>`;
  }

  return `<${fragmentFactory}>{${text}}</${fragmentFactory}>`;
}
