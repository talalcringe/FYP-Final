import './TipTap.css';
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from '@tiptap/react';

import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';

import React, { useState, useEffect } from 'react';

import MenuBar from './Menus/MenuBar';
import Floating from './Menus/Floating';
import Bubble from './Menus/Bubble';

import TitleBar from './Menus/TitleBar';

import FontSize from './customExtensions/FontSize';

import localStorageService from '../../services/localStorage';
import indexedDBService from '../../services/indexedDB';
import { getWordCount } from '../../services/utils';

const extensions = [
  StarterKit,
  Underline,
  Link,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Image,
  FontSize,
  TextStyle,
  FontFamily.configure({ types: ['textStyle'] }),
];

const chapter = '1';

const TipTap = ({ pageId, title, content, deletePage, fonts }) => {
  // console.log('TipTap rendered with pageId', pageId, 'content: ', content);
  const [wordCount, setWordCount] = useState(0);

  const editor = useEditor({
    extensions: extensions,
    content: content,
    onUpdate: ({ editor }) => {
      localStorageService.setItem(pageId, editor.getHTML());
      setWordCount(getWordCount(editor.getText()));
      console.log('wordCount: ', wordCount);
      console.log('content', content);
    },

    onBlur: async ({ editor }) => {
      const content = localStorageService.getItem(pageId);
      if (editor && editor.isEditable && content) {
        await indexedDBService.updateItem(pageId, {
          content: content,
          words: wordCount,
        });
        localStorageService.deleteItem(pageId);
      } else {
        console.log('Editor was infact not editable at this point');
      }
    },

    onDestroy: async () => {
      const content = localStorageService.getItem(pageId);
      if (content) {
        await indexedDBService.updateItem(pageId, {
          content: content,
          words: wordCount,
        });
      } else {
        // console.log('Editor was infact not editable at this point');
      }
    },
    autofocus: 'end',
  });

  useEffect(() => {
    if (editor && content && content !== '<p></p>') {
      editor.commands.setContent(content);
    }
  }, [pageId, editor]);

  const styles = {
    top: {
      style:
        'bg-ghostWhite rounded flex justify-center text-2xl items-center w-max mb-1 mx-auto',
      blockLabels: {
        paragraph: '',
        heading: '',
        code: '',
        quote: '',
      },
    },
    floating: {
      style:
        'border border-cerulean bg-ghostWhite rounded flex-column justify-center items-centerm-auto w-full',
      blockLabels: {
        paragraph: 'Paragraph',
        heading: 'Heading',
        list: 'List',
        code: 'Code Block',
        quote: 'Block Quote',
        rule: 'Horizontal Rule',
      },
    },
    bubble: {
      style:
        'border border-cerulean bg-ghostWhite rounded flex justify-center items-center w-max mb-1 mx-auto',
      blockLabels: {
        paragraph: '',
        heading: '',
        code: '',
        quote: '',
      },
    },
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='sticky top-5 z-10'>
        <TitleBar title={title} wordCount={wordCount} deletePage={deletePage} />
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
      <EditorContent editor={editor} />
      <FloatingMenu
        editor={editor}
        tippyOptions={{ placement: 'bottom-start', hideOnClick: true }}
      >
        <Floating
          editor={editor}
          style={styles.floating.style}
          blockLabels={styles.floating.blockLabels}
          fonts={fonts}
        />
      </FloatingMenu>
      <BubbleMenu editor={editor}>
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
