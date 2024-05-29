import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import TipTap from '../components/TipTap/TipTap';
import LeftSidebar from '../components/Editor/LeftSidebar';
import RightSidebar from '../components/Editor/RightSidebar';

import indexedDBService from '../services/indexedDB';

const EditorInstance = ({ title, fonts }) => {
  const [content, setContent] = useState('');
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState(null); // Default to null initially
  const [totalWordCount, setTotalWordCount] = useState(0);

  useEffect(() => {
    const fetchPages = async () => {
      const savedPages = await indexedDBService.getItem('pages');

      if (!savedPages || savedPages.length === 0) {
        newPage();
      } else {
        setPages(savedPages);
        setSelectedPageId(savedPages[savedPages.length - 1]);
      }
    };
    fetchPages();
  }, []);

  useEffect(() => {
    const fetchCurrPageData = async () => {
      if (selectedPageId) {
        const savedPage = await indexedDBService.getItem(selectedPageId);
        const savedContent = savedPage ? savedPage.content : ' ';
        const savedWords = savedPage ? savedPage.words : ' ';
        return { savedWords, savedContent };
      }
      return { savedWords: 0, savedContent: '' };
    };

    const calculateAndPrintTotalWordCount = async (pages) => {
      // Fetch the current page data
      const { savedWords, savedContent } = await fetchCurrPageData();

      // Use map to create an array of promises to fetch word counts
      const wordPromises = pages.map(async (pageId) => {
        const savedPage = await indexedDBService.getItem(pageId);
        return savedPage ? savedPage.words : 0; // Assuming words is a number
      });

      // Use Promise.all to wait for all promises to resolve
      const wordsArray = await Promise.all(wordPromises);

      // Calculate the total word count
      const totalWordCount = wordsArray.reduce(
        (acc, words) => acc + parseInt(words, 10),
        0
      );

      // Subtract savedWords
      const result =
        totalWordCount - parseInt(savedWords, 10) || totalWordCount;

      // Print the result
      console.log('Total Word Count after subtracting savedWords:', result);

      setTotalWordCount(result);
      // Fetch current page data and set content
      setContent(savedContent);
    };

    if (selectedPageId) {
      calculateAndPrintTotalWordCount(pages);
    }
  }, [selectedPageId]);

  const newPage = async (content = '') => {
    const newPageId = v4();
    const currentIndex = pages.indexOf(selectedPageId);
    const newPages = [
      ...pages.slice(0, currentIndex + 1),
      newPageId,
      ...pages.slice(currentIndex + 1),
    ];

    // Update the pages in state and database
    setPages(newPages);
    await indexedDBService.setItem('pages', newPages);

    // Set the content for the new page if provided
    if (content) {
      await indexedDBService.setItem(newPageId, {
        content: content,
        words: content.split(' ').length,
      });
    }

    console('selectedBefore', selectedPageId);
    // Set the selected page ID after the pages state is updated
    setSelectedPageId(newPageId);
    console('selectedAfter', selectedPageId);
  };

  const createNewPage = (content = '') => {
    newPage(content);
  };

  const selectPage = async (pageId, content = '') => {
    if (content) {
      const currentPage = await indexedDBService.getItem(pageId);
      const updatedContent =
        content + ' ' + (currentPage ? currentPage.content : '');
      await indexedDBService.setItem(pageId, {
        content: updatedContent,
        words: updatedContent.split(' ').length,
      });
    }
    setSelectedPageId(pageId);
  };

  const deletePage = async () => {
    const selectNextPage = () => {
      const index = pages.indexOf(selectedPageId);
      if (pages.length === 1) {
        old = false;
      } else if (index === pages.length - 1) {
        setSelectedPageId(pages[index - 1]);
      } else {
        setSelectedPageId(pages[index + 1]);
      }
    };

    const newPages = pages.filter((page) => page !== selectedPageId);
    var old = true;

    await indexedDBService.setItem('pages', newPages);
    await indexedDBService.deleteItem(selectedPageId);

    selectNextPage();
    setPages(newPages);
    if (!old) {
      const newPageId = v4();
      const newPages = [newPageId];
      setPages(newPages);
      await indexedDBService.setItem('pages', newPages);
      setSelectedPageId(newPageId);
    }
  };

  const getNextPage = (currentPageId) => {
    if (currentPageId === pages[pages.length - 1]) return false;
    else return pages[pages.indexOf(currentPageId) + 1];
  };

  return (
    <div className='relative flex justify-between w-screen h-full'>
      <div className='sticky top-5 h-full w-[15vw]'>
        <LeftSidebar
          pages={pages}
          selectedPageId={selectedPageId}
          selectPage={selectPage}
          newPage={newPage}
        />
      </div>
      <div className='p-4 w-[40vw] h-full'>
        {selectedPageId && content && (
          <TipTap
            key={selectedPageId}
            pageId={selectedPageId}
            totalWordCount={totalWordCount}
            deletePage={deletePage}
            content={content}
            fonts={fonts}
            title={title}
            createNewPage={createNewPage}
            getNextPage={getNextPage}
            selectPage={selectPage}
          />
        )}
      </div>
      <div className='sticky top-5 h-full w-[15vw]'>
        <RightSidebar />
      </div>
    </div>
  );
};

export default EditorInstance;
