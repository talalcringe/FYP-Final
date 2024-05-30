import React, { useCallback, useState } from "react";

import {
  LuBold,
  LuItalic,
  LuUnderline,
  LuStrikethrough,
  LuList,
  LuListOrdered,
  LuHeading,
  LuQuote,
  LuCode2,
  LuLink2,
  LuLink2Off,
  LuRemoveFormatting,
  LuUndo,
  LuRedo,
  LuImage,
} from "react-icons/lu";
import { BiParagraph } from "react-icons/bi";
import { RiCodeBlock, RiSeparator, RiTextWrap } from "react-icons/ri";

import Button from "../../Editor/Button";
import HeadingsDropDown from "../DropDowns/HeadingsDropDown";
import AlignmentDropDown from "../DropDowns/AlignmentDropDown";
import FontSizeDropDown from "../DropDowns/FontSizeDropDown";
import FontFamilyDropDown from "../DropDowns/FontFamilyDropDown";
import BlocksDropDown from "../DropDowns/BlocksDropDown";

const MenuBar = ({
  editor,
  style,
  blockLabels,
  showDividers,
  fonts,
  showBasicStyles,
  showCode,
  showAlignment,
  showParagraph,
  showHeadings,
  showH2Only,
  showUl,
  showOl,
  showCodeBlock,
  showQuote,
  showHR,
  showTextWrap,
  showLink,
  showRemoveFormating,
  showUndoRedo,
  showImage,
  showBlocks,
  currentBlock,
  showChangeBlocks,
}) => {
  const divider = <div className="w-1 h-1 rounded bg-cerulean mx-1"></div>;

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return; // User cancelled the prompt

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className={style}>
      {showBlocks && (
        <BlocksDropDown editor={editor} currentBlock={currentBlock} />
      )}
      {showBasicStyles && (
        <>
          {showChangeBlocks && <BlocksDropDown editor={editor} />}
          <Button
            text={<LuBold />}
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            defClass={editor.isActive("bold") ? "is-active" : "not-active"}
            infoText={"Bold"}
          />
          <Button
            text={<LuItalic />}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            defClass={editor.isActive("italic") ? "is-active" : "not-active"}
            infoText={"Italic"}
          />
          <Button
            text={<LuUnderline />}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            defClass={editor.isActive("underline") ? "is-active" : "not-active"}
            infoText={"Underline"}
          />
          <Button
            text={<LuStrikethrough />}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            defClass={editor.isActive("strike") ? "is-active" : "not-active"}
            infoText={"Strikethrough"}
          />
          <FontSizeDropDown editor={editor} />
          <FontFamilyDropDown editor={editor} fonts={fonts} />
        </>
      )}

      {showCode && (
        <>
          <Button
            text={<LuCode2 />}
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            defClass={editor.isActive("code") ? "is-active" : "not-active"}
            infoText={"Code"}
          />

          {showDividers && divider}
        </>
      )}

      {showAlignment && (
        <>
          <AlignmentDropDown editor={editor} />
          {showDividers && divider}
        </>
      )}

      {showParagraph && (
        <Button
          text={<BiParagraph />}
          onClick={() => editor.chain().focus().setParagraph().run()}
          defClass={editor.isActive("paragraph") ? "is-active" : "not-active"}
          infoText={"Paragraph"}
          blockLabel={blockLabels.paragraph}
        />
      )}

      {showHeadings && (
        <>
          {!showH2Only ? (
            <HeadingsDropDown editor={editor} text={<LuHeading />} />
          ) : (
            <Button
              text={<LuHeading />}
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                setShowOptions(false);
              }}
              defClass={
                editor.isActive("heading", { level: 2 })
                  ? "is-active"
                  : "not-active"
              }
              blockLabel={blockLabels.heading}
            />
          )}
        </>
      )}

      {showUl && (
        <Button
          text={<LuList />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          defClass={editor.isActive("bulletList") ? "is-active" : "not-active"}
          infoText={"Bullet List"}
          blockLabel={blockLabels.list}
        />
      )}
      {showOl && (
        <Button
          text={<LuListOrdered />}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          defClass={editor.isActive("orderedList") ? "is-active" : "not-active"}
          infoText={"Ordered List"}
        />
      )}
      {showCodeBlock && (
        <>
          <Button
            text={<RiCodeBlock />}
            onClick={() => editor.chain().focus().setCodeBlock().run()}
            defClass={editor.isActive("codeBlock") ? "is-active" : "not-active"}
            infoText={"Code Block"}
            blockLabel={blockLabels.code}
          />
        </>
      )}
      {showQuote && (
        <Button
          text={<LuQuote />}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          defClass={editor.isActive("blockquote") ? "is-active" : "not-active"}
          infoText={"Blockquote"}
          blockLabel={blockLabels.quote}
        />
      )}

      {showLink && (
        <>
          {!editor.isActive("link") ? (
            <Button
              text={<LuLink2 />}
              onClick={setLink}
              defClass={editor.isActive("link") ? "is-active" : "not-active"}
              infoText={"Link"}
            />
          ) : (
            <Button
              text={<LuLink2Off />}
              onClick={() => editor.chain().focus().unsetLink().run()}
              disabled={!editor.isActive("link")}
              infoText={"Unlink"}
            />
          )}

          {showDividers && divider}
        </>
      )}

      {showHR && (
        <Button
          text={<RiSeparator />}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          defClass={"text-cerulean"}
          infoText={"Horizontal Rule"}
          blockLabel={blockLabels.rule}
        />
      )}
      {showTextWrap && (
        <>
          <Button
            text={<RiTextWrap />}
            onClick={() => editor.chain().focus().setHardBreak().run()}
            defClass={"text-cerulean"}
            infoText={"Hard Break"}
          />
          {showDividers && divider}
        </>
      )}

      {showRemoveFormating && (
        <>
          <Button
            text={<LuRemoveFormatting />}
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            defClass={"text-cerulean"}
            infoText={"Remove Formatting"}
          />
        </>
      )}

      {showUndoRedo && (
        <>
          {showDividers && divider}
          <Button
            text={<LuUndo />}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            defClass={"text-cerulean"}
            infoText={"Undo"}
          />
          <Button
            text={<LuRedo />}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            defClass={"text-cerulean"}
            infoText={"Redo"}
          />
        </>
      )}

      {showImage && <Button text={<LuImage />} />}
    </div>
  );
};

export default MenuBar;

// add image integration
