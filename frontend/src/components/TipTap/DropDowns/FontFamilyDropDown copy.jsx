import React, { useEffect, useRef, useState } from 'react';
import Button from '../../Editor/Button';

const FontFamilyDropDown = ({ editor, fonts }) => {
  const [family, setFamily] = useState('sans serif');
  const [showOptions, setShowOptions] = useState(false);
  const interval = useRef(null);

  useEffect(() => {
    const updateCurrentFontFamily = () => {
      const currentFontFamily =
        editor.getAttributes('textStyle').fontFamily || 'sans serif';
      setFamily(currentFontFamily);
    };

    editor.on('update', updateCurrentFontFamily);
    editor.on('selectionUpdate', updateCurrentFontFamily);

    return () => {
      editor.off('update', updateCurrentFontFamily);
      editor.off('selectionUpdate', updateCurrentFontFamily);
    };
  }, [editor]);

  const handleFontFamilyChange = (f) => {
    setFamily(f);
    editor.chain().focus().setFontFamily(f).run();
    setShowOptions(false);
  };

  const toggleOff = () => {
    interval.current = setInterval(() => {
      setShowOptions(false);
    }, 600);
  };

  const toggleOn = () => {
    clearInterval(interval.current);
    setShowOptions(true);
  };

  return (
    <div className='relative text-cerulean'>
      <button
        onMouseEnter={toggleOn}
        onMouseLeave={toggleOff}
        onClick={toggleOn}
        className='flex items-center justify-center text-sm font-bold text-ghostWhite bg-cerulean py-1 px-2 m-1 transition hover:scale-105 rounded'
        title={'Font Family'}
      >
        {family}
      </button>
      {showOptions && (
        <div
          className='absolute border border-cerulean top-full z-10 bg-ghostWhite rounded h-96 w-max'
          onMouseEnter={toggleOn}
          onMouseLeave={toggleOff}
        >
          <div className='overflow-x-hidden overflow-y-auto h-full w-full '>
            {fonts.map((font) => (
              <Button
                key={font}
                text={font}
                onClick={() => handleFontFamilyChange(font)}
                defClass={'text-sm w-[90%] mx-2'}
                infoText={`Set font family to ${font}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FontFamilyDropDown;
