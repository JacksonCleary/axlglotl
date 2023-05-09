import { TextNode, type EditorConfig } from "lexical";

export class EmoticonNode extends TextNode {
  __className: string;

  static getType() {
    return "emoticon";
  }

  static clone(node: TextNode) {
    // WHYYYYYY
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return new EmoticonNode(node.__className, node.__text, node.__key);
  }

  constructor(className: string, text: string, key: string) {
    super(text, key);
    this.__className = className;
  }

  createDOM(config: EditorConfig) {
    const dom = super.createDOM(config);
    dom.className = this.__className;
    return dom;
  }
}

export function $isEmoticonNode(node: TextNode) {
  return node instanceof EmoticonNode;
}

export function $createEmoticonNode(className: string, emoticonText: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new EmoticonNode(className, emoticonText).setMode("token");
}
