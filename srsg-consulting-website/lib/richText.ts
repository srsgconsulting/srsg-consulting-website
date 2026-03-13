type RichTextNode =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: unknown }
  | RichTextNode[];

export function richTextToPlainText(input: unknown): string {
  const parts: string[] = [];

  const walk = (node: RichTextNode) => {
    if (node == null) return;
    if (typeof node === "string") {
      parts.push(node);
      return;
    }
    if (typeof node === "number" || typeof node === "boolean") return;
    if (Array.isArray(node)) {
      for (const child of node) walk(child);
      return;
    }
    if (typeof node === "object") {
      for (const value of Object.values(node)) walk(value as RichTextNode);
    }
  };

  walk(input as RichTextNode);
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

export function estimateReadingTimeMinutes(text: string): number {
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

