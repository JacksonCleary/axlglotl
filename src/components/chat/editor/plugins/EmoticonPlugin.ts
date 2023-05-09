import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { type LexicalEditor } from "lexical";
import { TextNode } from "lexical";
import { $createEmoticonNode } from "./";

function emoticonTransform(node: TextNode) {
  const textContent = node.getTextContent();
  console.log("textContent", textContent);
  if (textContent === ":avo:") {
    node.replace($createEmoticonNode("avo-emoticon", "avo"));
  } else if (textContent === ":)") {
    node.replace($createEmoticonNode("", "🙂"));
  }
}

function useEmoticons(editor: LexicalEditor) {
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(
      TextNode,
      emoticonTransform
    );
    return () => {
      removeTransform();
    };
  }, [editor]);
}

export const EmoticonPlugin = () => {
  const [editor] = useLexicalComposerContext();
  useEmoticons(editor);
  return null;
};

// styles.css
// .emoticon {
//   color: transparent;
//   background-size: 16px 16px;
//   height: 16px;
//   width: 16px;
//   background-position: center;
//   background-repeat: no-repeat;
//   margin: 0 1px;
//   text-align: center;
//   vertical-align: middle;
// }

// .avo-emoticon {
//   background-image: url(images/emoticon/avocado_emo.jpeg);
// }
