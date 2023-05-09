import React, { useState, useCallback, useEffect } from "react";
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  EditorState,
} from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { mergeRegister } from "@lexical/utils";
import { BiBold, BiItalic, BiUnderline, BiStrikethrough } from "react-icons/bi";
// custom plugins
import { EmoticonPlugin, EmoticonNode } from "./plugins";

function onChange(state: EditorState) {
  state.read(() => {
    const root = $getRoot();
    const selection = $getSelection();
    console.log(selection);
  });
}

interface ErrorEditorProps {
  children: JSX.Element;
  onError: (error: Error) => void;
}
const EditorError: React.FC<ErrorEditorProps> = ({ onError, children }) => {
  return <>{children}</>;
};

interface ToolBarProps {
  editorFocused: boolean;
}
const Toolbar: React.FC<ToolBarProps> = ({ editorFocused }) => {
  const [editor] = useLexicalComposerContext();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const toolBarIconClasses = "h-5 w-5 text-white";

  const renderButtonClasses = (activeCondition: boolean) => {
    return `hover:bg-sky-500", rounded-chatButton px-1 transition-iconButton duration-100 ease-in 
    ${activeCondition && editorFocused ? "bg-sky-500" : "bg-transparent"}`;
  };

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      })
    );
  }, [updateToolbar, editor, editorFocused]);

  return (
    <div className="flex gap-2">
      <button
        className={renderButtonClasses(isBold)}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
      >
        <BiBold className={toolBarIconClasses} />
      </button>
      <button
        className={renderButtonClasses(isItalic)}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
      >
        <BiItalic className={toolBarIconClasses} />
      </button>
      <button
        className={renderButtonClasses(isUnderline)}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
      >
        <BiUnderline className={toolBarIconClasses} />
      </button>
      <button
        className={renderButtonClasses(isStrikethrough)}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
      >
        <BiStrikethrough className={toolBarIconClasses} />
      </button>
    </div>
  );
};

export const Editor = () => {
  const [editorFocused, setEditorFocused] = useState<boolean>(false);

  return (
    <div className="relative w-full">
      <LexicalComposer
        initialConfig={{
          namespace: "chat-prompt",
          theme: {
            paragraph: "mb-1",
            text: {
              bold: "font-bold",
              italic: "italic",
              underline: "underline",
              strikethrough: "line-through",
            },
          },
          nodes: [EmoticonNode],
          onError(error) {
            throw error;
          },
        }}
      >
        <Toolbar editorFocused={editorFocused} />
        <div
          className={"relative px-0.5"}
          onFocus={() => setEditorFocused(true)}
          onBlur={() => setEditorFocused(false)}
        >
          <RichTextPlugin
            ErrorBoundary={EditorError}
            contentEditable={
              <ContentEditable className="scrollbar highlight-white/5 text-m  relative h-32 w-full resize-none rounded-chat bg-slate-800 p-2 text-sky-50 caret-sky-500 shadow-sm ring-slate-900/10 focus:bg-slate-900 focus:outline-none focus:ring-2  focus:ring-sky-500 " />
            }
            placeholder={
              <div className="pointer-events-none absolute inset-2 select-none text-sky-50">
                ...
              </div>
            }
          />
        </div>
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <EmoticonPlugin />
      </LexicalComposer>
    </div>
  );
};
