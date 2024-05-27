import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import TipTap from '../components/TipTap/TipTap';
import LeftSidebar from '../components/Editor/LeftSidebar';
import RightSidebar from '../components/Editor/RightSidebar';

import indexedDBService from '../services/indexedDB';

// let content = `
// <h2>
//   Hi there,
// </h2>
// <p>
//   this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
// </p>
// <ul>
//   <li>
//     That’s a bullet list with one …
//   </li>
//   <li>
//     … or two list items.
//   </li>
// </ul>
// <p>
//   Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
// </p>
// <pre><code class="language-css">body {
// display: none;
// }</code></pre>
// <p>
//   I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
// </p>
// <blockquote>
//   Wow, that’s amazing. Good work, boy! 👏
//   <br />
//   — Mom
// </blockquote>
// `;

const EditorInstance = ({ title, fonts }) => {
  const [content, setContent] = useState('');
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState(pages[pages.length - 1]); // Default to the last page

  useEffect(() => {
    const fetchPages = async () => {
      const savedPages = await indexedDBService.getItem('pages');
      // console.log('savedPages', savedPages);

      if (savedPages === null || savedPages.length === 0) {
        newPage();
      } else {
        setPages(savedPages);
        setSelectedPageId(savedPages[savedPages.length - 1]);
      }
    };
    fetchPages();
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      const savedPage = await indexedDBService.getItem(selectedPageId);
      console.log(
        '5555555555555555555555555555555555555555555555savedPages: ',
        pages,
        'selectedPageId: ',
        selectedPageId,
        'savedPage: ',
        savedPage
      );
      const savedContent = savedPage ? savedPage.content : ' ';
      setContent(savedContent);
    };

    fetchContent();
  }, [selectedPageId]);

  useEffect(() => {
    console.log('contentAfterIdChange', content);
  }, [content]);

  const newPage = async () => {
    const newPageId = v4();
    const currentIndex = pages.indexOf(selectedPageId);
    const newPages = [
      ...pages.slice(0, currentIndex + 1),
      newPageId,
      ...pages.slice(currentIndex + 1),
    ];
    setPages(newPages); // Update the pages state
    await indexedDBService.setItem('pages', newPages);
    setSelectedPageId(newPageId); // Select the new page
    // setContent('');
  };

  // Function to handle page selection
  const selectPage = (pageId) => {
    // console.log('Selecting page', pageId);
    setSelectedPageId(pageId);
  };

  // Function to handle page deletion
  const deletePage = async () => {
    const selectNextPage = () => {
      const index = pages.indexOf(selectedPageId);
      // console.log('Pages before deletion', pages);
      if (pages.length === 1) {
        console.log('here');
        old = false;
      } else if (index === pages.length - 1) {
        setSelectedPageId(pages[index - 1]);
      } else {
        setSelectedPageId(pages[index + 1]);
        // console.log(selectedPageId);
      }
    };

    const newPages = pages.filter((page) => page !== selectedPageId);
    var old = true;

    await indexedDBService.setItem('pages', newPages);
    await indexedDBService.deleteItem(selectedPageId);

    selectNextPage();
    setPages(newPages);
    if (!old) {
      console.log('PAGESBEFORE: ', pages);
      const newPageId = v4();
      const newPages = [newPageId];
      setPages(newPages); // Update the pages state
      await indexedDBService.setItem('pages', newPages);
      setSelectedPageId(newPageId); // Select the new page
      console.log('PAGESAFTER: ', pages, newPageId);
    }
  };

  return (
    <div className=' relative flex justify-between w-screen h-full'>
      {/* Sidebar for selecting pages */}
      <div className='sticky top-5 h-full w-[15vw]'>
        <LeftSidebar
          pages={pages}
          selectedPageId={selectedPageId}
          selectPage={selectPage}
          newPage={newPage}
        />
      </div>
      {/* Main area for displaying the selected page */}
      <div className='p-4 w-[40vw] h-full'>
        {selectedPageId && content && (
          <TipTap
            key={selectedPageId}
            pageId={selectedPageId}
            deletePage={deletePage}
            content={content}
            fonts={fonts}
            title={title}
          />
        )}
      </div>
      {/* Sidebar for selecting modals */}
      <div className='sticky top-5 h-full w-[15vw]'>
        <RightSidebar />
      </div>
    </div>
  );
};

export default EditorInstance;
