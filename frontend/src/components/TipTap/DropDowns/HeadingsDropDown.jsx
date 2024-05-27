import React, { useEffect, useRef, useState } from 'react';
import Button from '../../Editor/Button';
import {
  LuHeading,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
} from 'react-icons/lu';

const HeadingsDropDown = ({ editor }) => {
  const [currentHeading, setCurrentHeading] = useState(<LuHeading />);
  const [showOptions, setShowOptions] = useState(false);
  const interval = useRef(null);

  useEffect(() => {
    const updateCurrentHeading = () => {
      if (editor.isActive('heading', { level: 1 })) {
        setCurrentHeading(<LuHeading1 />);
      } else if (editor.isActive('heading', { level: 2 })) {
        setCurrentHeading(<LuHeading2 />);
      } else if (editor.isActive('heading', { level: 3 })) {
        setCurrentHeading(<LuHeading3 />);
      } else if (editor.isActive('heading', { level: 4 })) {
        setCurrentHeading(<LuHeading4 />);
      } else if (editor.isActive('heading', { level: 5 })) {
        setCurrentHeading(<LuHeading5 />);
      } else if (editor.isActive('heading', { level: 6 })) {
        setCurrentHeading(<LuHeading6 />);
      } else {
        setCurrentHeading(<LuHeading />);
      }
    };

    editor.on('update', updateCurrentHeading);
    editor.on('selectionUpdate', updateCurrentHeading);

    return () => {
      editor.off('update', updateCurrentHeading);
      editor.off('selectionUpdate', updateCurrentHeading);
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
        className='flex items-center justify-center text-ghostWhite bg-cerulean p-1 transition hover:scale-105 rounded'
        title={'Headings'}
      >
        {currentHeading}
      </button>
      {showOptions && (
        <div
          className='absolute border border-cerulean flex-col items-center justify-center top-full z-10 mt-2 bg-ghostWhite rounded'
          onMouseEnter={toggleOn}
          onMouseLeave={toggleOff}
        >
          <Button
            text={<LuHeading1 />}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 1 }).run();
              setShowOptions(false);
            }}
            defClass={
              editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
            }
          />
          <Button
            text={<LuHeading2 />}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 2 }).run();
              setShowOptions(false);
            }}
            defClass={
              editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }
          />
          <Button
            text={<LuHeading3 />}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 3 }).run();
              setShowOptions(false);
            }}
            defClass={
              editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
            }
          />
          <Button
            text={<LuHeading4 />}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 4 }).run();
              setShowOptions(false);
            }}
            defClass={
              editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
            }
          />
          <Button
            text={<LuHeading5 />}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 5 }).run();
              setShowOptions(false);
            }}
            defClass={
              editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
            }
          />
          <Button
            text={<LuHeading6 />}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 6 }).run();
              setShowOptions(false);
            }}
            defClass={
              editor.isActive('heading', { level: 6 }) ? 'is-active' : ''
            }
          />
        </div>
      )}
    </div>
  );
};

export default HeadingsDropDown;
