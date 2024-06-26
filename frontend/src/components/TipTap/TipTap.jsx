import "./TipTap.css";
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";

import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";

import React, { useState, useEffect } from "react";

import MenuBar from "./Menus/MenuBar";
import Floating from "./Menus/Floating";
import Bubble from "./Menus/Bubble";

import TitleBar from "./Menus/TitleBar";

import FontSize from "./customExtensions/FontSize";

import localStorageService from "../../services/localStorage";
import indexedDBService from "../../services/indexedDB";
import { getWordCount } from "../../services/utils";
import axios from "axios";
import { sendFilesUrl } from "../../utils/urls";

const extensions = [
  StarterKit,
  Underline,
  Link,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Image,
  FontSize,
  TextStyle,
  FontFamily.configure({ types: ["textStyle"] }),
];

const TipTap = ({
  pageId,
  projectId,
  title,
  totalWordCount,
  content,
  deletePage,
  fonts,
  updateWordCount,
  createNewPage,
  getNextPage,
  selectPage,
}) => {
  const [wordCount, setWordCount] = useState(0);

  const editor = useEditor({
    extensions: extensions,
    content: content,
    onUpdate: ({ editor }) => {
      localStorageService.setItem(pageId, editor.getHTML());
      setWordCount(getWordCount(editor.getText()));
      updateWordCount(getWordCount(editor.getText()));
    },
    onBlur: async ({ editor }) => {
      const content = localStorageService.getItem(pageId);
      if (editor && editor.isEditable && content) {
        await indexedDBService.updateItem(pageId, {
          content: content,
          words: wordCount,
        });
        localStorageService.deleteItem(pageId);
      }
    },
    onDestroy: async () => {
      const content = localStorageService.getItem(pageId);
      if (content) {
        await indexedDBService.updateItem(pageId, {
          content: content,
          words: wordCount,
        });
      }
    },
    autofocus: "end",
  });

  useEffect(() => {
    const getPrevWordCount = async () => {
      const pageJSON = await indexedDBService.getItem(pageId);
      const prevWordCount = pageJSON ? pageJSON.words : 0;
      setWordCount(prevWordCount);
      updateWordCount(prevWordCount);
    };
    if (editor && content && content !== "<p></p>") {
      editor.commands.setContent(content);
      console.log("A", content);
      getPrevWordCount();
      const payload = {
        pageId: pageId,
        data: { projectId: projectId, content: content, words: wordCount },
      };
      axios
        .post(sendFilesUrl, payload, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("response:", response);
        })
        .catch((error) => {
          console.log("error:", error);
        });
    }
  }, [pageId, editor, content]);

  const styles = {
    top: {
      style:
        "bg-ghostWhite rounded flex justify-center text-2xl items-center w-max mb-1 mx-auto",
      blockLabels: {
        paragraph: "",
        heading: "",
        code: "",
        quote: "",
      },
    },
    floating: {
      style:
        "border border-cerulean bg-ghostWhite rounded flex-column justify-center items-centerm-auto w-full",
      blockLabels: {
        paragraph: "Paragraph",
        heading: "Heading",
        list: "List",
        code: "Code Block",
        quote: "Block Quote",
        rule: "Horizontal Rule",
      },
    },
    bubble: {
      style:
        "border border-cerulean bg-ghostWhite rounded flex justify-center items-center w-max mb-1 mx-auto",
      blockLabels: {
        paragraph: "",
        heading: "",
        code: "",
        quote: "",
      },
    },
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="sticky top-5 z-[1]">
        <TitleBar
          title={title}
          wordCount={wordCount}
          totalWordCount={totalWordCount}
          deletePage={deletePage}
        />
        <MenuBar
          editor={editor}
          style={styles.top.style}
          blockLabels={styles.top.blockLabels}
          showDividers={true}
          fonts={fonts}
          showBasicStyles={true}
          showCode={true}
          showAlignment={true}
          showParagraph={true}
          showHeadings={true}
          showUl={true}
          showOl={true}
          showCodeBlock={true}
          showQuote={true}
          showHR={true}
          showTextWrap={true}
          showLink={true}
          showExtraOptions={true}
          showRemoveFormating={true}
          showUndoRedo={true}
          showImage={false}
        />
      </div>
      <div className="z-[0]">
        <EditorContent editor={editor} />
      </div>
      <FloatingMenu
        editor={editor}
        tippyOptions={{ placement: "bottom-start", hideOnClick: true }}
      >
        <Floating
          editor={editor}
          style={styles.floating.style}
          blockLabels={styles.floating.blockLabels}
          fonts={fonts}
        />
      </FloatingMenu>
      <BubbleMenu
        editor={editor}
        tippyOptions={{ placement: "bottom-start", hideOnClick: true }}
      >
        <Bubble
          editor={editor}
          style={styles.bubble.style}
          blockLabels={styles.bubble.blockLabels}
          fonts={fonts}
        />
      </BubbleMenu>
    </div>
  );
};

export default TipTap;
