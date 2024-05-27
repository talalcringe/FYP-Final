import React, { useEffect, useState, useRef } from 'react';
import SolidButton from '../../Editor/SolidButton';
import { LuList, LuHeading, LuQuote } from 'react-icons/lu';
import { BiParagraph } from 'react-icons/bi';
import { RiCodeBlock, RiSeparator } from 'react-icons/ri';

const BlockChangeDropDown = ({ editor }) => {
  const [showOptions, setShowOptions] = useState(false);
  const interval = useRef(null);

  const blockOptions = [
    {
      type: 'paragraph',
      icon: <BiParagraph />,
      label: 'Paragraph',
      command: () => editor.chain().focus().setParagraph().run(),
    },
    {
      type: 'heading',
      icon: <LuHeading />,
      label: 'Heading',
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      type: 'blockquote',
      icon: <LuQuote />,
      label: 'Quote',
      command: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      type: 'codeBlock',
      icon: <RiCodeBlock />,
      label: 'Code Block',
      command: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      type: 'bulletList || orderedList',
      icon: <LuList />,
      label: 'Bullet List',
      command: () => editor.chain().focus().toggleBulletList().run(),
    },
  ];

  const currentBlock = blockOptions.find((option) =>
    editor.isActive(option.type)
  ) || { type: 'paragraph', icon: <BiParagraph />, label: 'Paragraph' };

  const toggleOff = () => {
    interval.current = setInterval(() => {
      setShowOptions(false);
    }, 600);
  };

  const toggleOn = () => {
    clearInterval(interval.current);
    setShowOptions(true);
  };

  const changeCurrentBlock = (command) => {
    setShowOptions(false);
    command();
  };

  return (
    <div className='relative text-cerulean'>
      <button
        onMouseEnter={toggleOn}
        onMouseLeave={toggleOff}
        onClick={toggleOn}
        className='flex items-center justify-center text-sm font-bold text-ghostWhite bg-emerald p-2 m-1 transition hover:scale-105 rounded'
        title={`This is a ${currentBlock.label}`}
      >
        {currentBlock.icon}
      </button>
      {showOptions && (
        <div
          className='absolute border border-cerulean flex-col items-center justify-center top-full z-10 mt-2 bg-ghostWhite rounded'
          onMouseEnter={toggleOn}
          onMouseLeave={toggleOff}
        >
          {blockOptions
            .filter((option) => option.type !== currentBlock.type)
            .map((option) => (
              <SolidButton
                key={option.type}
                text={option.icon}
                onClick={() => changeCurrentBlock(option.command)}
                color={'bg-emerald'}
                infoText={`Change to ${option.label}`}
              />
            ))}

          <SolidButton text={<RiSeparator />} />
        </div>
      )}
    </div>
  );
};

export default BlockChangeDropDown;
