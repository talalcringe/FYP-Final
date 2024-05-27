import React from 'react';
import MenuBar from './MenuBar';

const Bubble = ({ editor, style, blockLabels, fonts }) => {
  let showBasicStyles = true;
  let showCode = true;
  let showAlignment = true;
  let showHeadings = true;
  let showUl = false;
  let showOl = false;
  let showQuote = true;
  let showHR = true;
  let showLinks = true;
  let showExtraOptions = true;
  let showRemoveFormating = true;

  if (!editor) {
    return null;
  }

  if (editor.isActive('paragraph')) {
    showHeadings = false;
  }

  if (editor.isActive('heading')) {
    showCode = false;
    showQuote = false;
  }

  if (editor.isActive('blockquote')) {
    showQuote = false;
  }

  if (editor.isActive('bulletList') || editor.isActive('orderedList')) {
    showHeadings = false;
    showUl = true;
    showOl = true;
  }

  if (editor.isActive('codeBlock')) {
    showBasicStyles = false;
    showCode = false;
    showAlignment = false;
    showHeadings = false;
    showUl = false;
    showOl = false;
    showQuote = false;
    showHR = false;
    showLinks = false;
    showExtraOptions = false;
    showRemoveFormating = false;
  }
  return (
    <>
      <MenuBar
        editor={editor}
        style={style}
        blockLabels={blockLabels}
        showDividers={true}
        fonts={fonts}
        showBasicStyles={showBasicStyles}
        showCode={showCode}
        showAlignment={showAlignment}
        showParagraph={false}
        showHeadings={showHeadings}
        showUl={showUl}
        showOl={showOl}
        showCodeBlock={false}
        showQuote={showQuote}
        showHR={showHR}
        showTextWrap={false}
        showLink={showLinks}
        showExtraOptions={showExtraOptions}
        showRemoveFormating={showRemoveFormating}
        showUndoRedo={false}
        showImage={false}
        showBlocks={true}
      />
    </>
  );
};

export default Bubble;
