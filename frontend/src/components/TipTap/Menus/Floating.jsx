import React from 'react';
import MenuBar from './MenuBar';

const Floating = ({ editor, style, blockLabels, fonts }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <MenuBar
        editor={editor}
        style={style}
        blockLabels={blockLabels}
        fonts={fonts}
        showBasicStyles={false}
        showCode={false}
        showAlignment={false}
        showParagraph={true}
        showHeadings={true}
        showH2Only={true}
        showUl={true}
        showOl={false}
        showCodeBlock={true}
        showQuote={true}
        showHR={true}
        showTextWrap={false}
        showLink={false}
        showExtraOptions={false}
        showRemoveFormating={false}
        showUndoRedo={false}
        showImage={false}
        blocksClass={'w-[90%]'}
      />
    </>
  );
};

export default Floating;
