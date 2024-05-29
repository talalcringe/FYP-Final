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

const TipTap = ({
  pageId,
  title,
  totalWordCount,
  content,
  deletePage,
  fonts,
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

      handleOverflow();
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
  });

  useEffect(() => {
    const getPrevWordCount = async () => {
      const pageJSON = await indexedDBService.getItem(pageId);
      const prevWordCount = pageJSON ? pageJSON.words : 0;
      setWordCount(prevWordCount);
    };
    if (editor && content && content !== '<p></p>') {
      editor.commands.setContent(content);
      handleOverflow();
      getPrevWordCount();
      editor.commands.focus('end');
    }
  }, [pageId, editor, content]);

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

  const handleOverflow = () => {
    const editorElement = document.querySelector('.tiptap');
    const contentHeight = editorElement ? editorElement.scrollHeight : 0;
    const pageHeight = 690; // Fixed page height

    if (contentHeight > pageHeight) {
      // Identify the overflowing content
      const range = document.createRange();
      range.setStart(editorElement, 0);
      range.setEnd(editorElement, editorElement.childNodes.length);

      let overflowNodeIndex = null;
      let overflowHeight = 0;
      for (let i = 0; i < editorElement.childNodes.length; i++) {
        const node = editorElement.childNodes[i];
        const nodeHeight = node.scrollHeight || node.offsetHeight || 0;
        overflowHeight += nodeHeight;
        if (overflowHeight > pageHeight) {
          overflowNodeIndex = i;
          break;
        }
      }

      if (overflowNodeIndex !== null) {
        // Extract the overflowing content and create a new page with it
        const overflowingContent = Array.from(editorElement.childNodes)
          .slice(overflowNodeIndex)
          .map((node) => node.outerHTML)
          .join('');

        const remainingContent = Array.from(editorElement.childNodes)
          .slice(0, overflowNodeIndex)
          .map((node) => node.outerHTML)
          .join('');

        editor.commands.setContent(remainingContent);

        const saveDetails = async () => {
          localStorageService.setItem(pageId, remainingContent);
          await indexedDBService.updateItem(pageId, {
            content: remainingContent,
            words: wordCount,
          });
          localStorageService.deleteItem(pageId);
        };
        saveDetails();
        setWordCount(getWordCount(remainingContent));

        console.log(
          'Overflowing content:',
          overflowingContent,
          'Remaining content:',
          remainingContent
        );

        const nextPageId = getNextPage(pageId);
        if (!nextPageId) {
          createNewPage(overflowingContent);
        } else {
          selectPage(nextPageId, overflowingContent);
        }
      }
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='sticky top-5 z-10'>
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
      <div className='tiptap-container'>
        <EditorContent editor={editor} />
      </div>
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
      <BubbleMenu
        editor={editor}
        tippyOptions={{ placement: 'bottom-start', hideOnClick: true }}
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
