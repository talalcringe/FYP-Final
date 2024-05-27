import React, { useEffect, useState, useRef } from 'react';
import Button from '../../Editor/Button';

const FontSizeDropDown = ({ editor }) => {
  const [size, setSize] = useState('16px');
  const [showOptions, setShowOptions] = useState(false);
  const interval = useRef(null);

  const fonts = [
    '8px',
    '10px',
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '24px',
    '26px',
    '28px',
    '30px',
    '32px',
  ];

  useEffect(() => {
    const updateCurrentFontSize = () => {
      const { size: fontSize } = editor.getAttributes('fontSize');
      if (fontSize) {
        setSize(fontSize);
      } else {
        setSize('16px');
      }
    };

    editor.on('update', updateCurrentFontSize);
    editor.on('selectionUpdate', updateCurrentFontSize);

    return () => {
      editor.off('update', updateCurrentFontSize);
      editor.off('selectionUpdate', updateCurrentFontSize);
    };
  }, [editor]);

  const handleFontSizeChange = (s) => {
    setSize(s);
    editor.chain().focus().setFontSize(s).run();
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
        className='flex items-center justify-center text-xs font-bold text-ghostWhite bg-cerulean py-1 px-2 m-1 transition hover:scale-105 rounded'
        title={'Font Size'}
      >
        {size}
      </button>
      {showOptions && (
        <div
          className='absolute border border-cerulean flex flex-col items-center justify-center top-full z-10 mt-2 bg-ghostWhite rounded'
          onMouseEnter={toggleOn}
          onMouseLeave={toggleOff}
        >
          {fonts.map((size) => (
            <Button
              key={size}
              text={size}
              onClick={() => handleFontSizeChange(size)}
              defClass={'text-xs w-[75%]'}
              infoText={`Set font size to ${size}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FontSizeDropDown;
