import React, { useState, useRef, useEffect } from 'react';
import Button from '../../Editor/Button';
import {
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiAlignJustify,
} from 'react-icons/ri';

const AlignmentDropDown = ({ editor }) => {
  const [currentAlign, setCurrentAlign] = useState(<RiAlignCenter />);
  const [showOptions, setShowOptions] = useState(false);
  const interval = useRef(null);

  useEffect(() => {
    const updateCurrentAlign = () => {
      if (editor.isActive({ textAlign: 'left' })) {
        setCurrentAlign(<RiAlignLeft />);
      } else if (editor.isActive({ textAlign: 'center' })) {
        setCurrentAlign(<RiAlignCenter />);
      } else if (editor.isActive({ textAlign: 'right' })) {
        setCurrentAlign(<RiAlignRight />);
      } else if (editor.isActive({ textAlign: 'justify' })) {
        setCurrentAlign(<RiAlignJustify />);
      }
    };

    editor.on('update', updateCurrentAlign);
    editor.on('selectionUpdate', updateCurrentAlign);

    return () => {
      editor.off('update', updateCurrentAlign);
      editor.off('selectionUpdate', updateCurrentAlign);
    };
  }, [editor]);

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
        className='flex items-center justify-center p-1 transition hover:scale-105 rounded text-ghostWhite bg-cerulean'
        title={'Alignment'}
      >
        {currentAlign}
      </button>

      {showOptions && (
        <div
          className='absolute border border-cerulean flex-col items-center justify-center top-full z-10 mt-2 bg-ghostWhite rounded'
          onMouseEnter={toggleOn}
          onMouseLeave={toggleOff}
        >
          <Button
            text={<RiAlignLeft />}
            onClick={() => {
              editor.chain().focus().setTextAlign('left').run();
              setCurrentAlign(<RiAlignLeft />);
              setShowOptions(false);
            }}
            defClass={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
            infoText={'Align Left'}
          />
          <Button
            text={<RiAlignCenter />}
            onClick={() => {
              editor.chain().focus().setTextAlign('center').run();
              setCurrentAlign(<RiAlignCenter />);
              setShowOptions(false);
            }}
            defClass={
              editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
            }
            infoText={'Align Center'}
          />
          <Button
            text={<RiAlignRight />}
            onClick={() => {
              editor.chain().focus().setTextAlign('right').run();
              setCurrentAlign(<RiAlignRight />);
              setShowOptions(false);
            }}
            defClass={
              editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''
            }
            infoText={'Align Right'}
          />
          <Button
            text={<RiAlignJustify />}
            onClick={() => {
              editor.chain().focus().setTextAlign('justify').run();
              setCurrentAlign(<RiAlignJustify />);
              setShowOptions(false);
            }}
            defClass={
              editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''
            }
            infoText={'Justify'}
          />
        </div>
      )}
    </div>
  );
};

export default AlignmentDropDown;
