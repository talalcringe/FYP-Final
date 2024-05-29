import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

import TipTap from "../components/TipTap/TipTap";
import LeftSidebar from "../components/Editor/LeftSidebar";
import RightSidebar from "../components/Editor/RightSidebar";
import axios from "axios";
import { createProjectFolderAndGetIdUrl } from "../utils/urls";
import indexedDBService from "../services/indexedDB";

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

let projectFolderChecked = false;
const EditorInstance = ({ title, fonts, projectId }) => {
  const [content, setContent] = useState("");
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState(pages[pages.length - 1]); // Default to the last page
  const [totalWordCount, setTotalWordCount] = useState(0);

  useEffect(() => {
    const fetchPages = async () => {
      const savedPages = await indexedDBService.getItem("pages");

      if (savedPages === null || savedPages.length === 0) {
        newPage();
      } else {
        setPages(savedPages);
        setSelectedPageId(savedPages[savedPages.length - 1]);
      }
    };
    fetchPages();
    const checkProjectFolder = async () => {
      try {
        const response = await axios.get(
          createProjectFolderAndGetIdUrl(projectId),
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          console.log("Project folder created successfully");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!projectFolderChecked) {
      checkProjectFolder();
    }
    projectFolderChecked = true;
  }, []);

  useEffect(() => {
    const fetchCurrPageData = async () => {
      const savedPage = await indexedDBService.getItem(selectedPageId);
      const savedContent = savedPage ? savedPage.content : " ";
      const savedWords = savedPage ? savedPage.words : " ";
      return { savedWords, savedContent };
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
      console.log("Total Word Count after subtracting savedWords:", result);

      setTotalWordCount(result);
      // Fetch current page data and set content
      setContent(savedContent);
    };

    // Assuming 'pages' is available in the current scope
    calculateAndPrintTotalWordCount(pages);
  }, [selectedPageId]);

  const newPage = async () => {
    const newPageId = v4();
    const currentIndex = pages.indexOf(selectedPageId);
    const newPages = [
      ...pages.slice(0, currentIndex + 1),
      newPageId,
      ...pages.slice(currentIndex + 1),
    ];
    setPages(newPages);
    await indexedDBService.setItem("pages", newPages);
    setSelectedPageId(newPageId);
  };

  const createNewPage = () => {
    newPage();
  };

  const selectPage = (pageId) => {
    setSelectedPageId(pageId);
  };

  const deletePage = async () => {
    const selectNextPage = () => {
      const index = pages.indexOf(selectedPageId);
      if (pages.length === 1) {
        console.log("here");
        old = false;
      } else if (index === pages.length - 1) {
        setSelectedPageId(pages[index - 1]);
      } else {
        setSelectedPageId(pages[index + 1]);
      }
    };

    const newPages = pages.filter((page) => page !== selectedPageId);
    var old = true;

    await indexedDBService.setItem("pages", newPages);
    await indexedDBService.deleteItem(selectedPageId);

    selectNextPage();
    setPages(newPages);
    if (!old) {
      console.log("PAGESBEFORE: ", pages);
      const newPageId = v4();
      const newPages = [newPageId];
      setPages(newPages);
      await indexedDBService.setItem("pages", newPages);
      setSelectedPageId(newPageId);
      console.log("PAGESAFTER: ", pages, newPageId);
    }
  };

  const getNextPage = (currentPageId) => {
    console.log(
      "getNextPage: -------------------------- ",
      pages.indexOf(currentPageId) + 1
    );
    if (currentPageId === pages[pages.length - 1]) return false;
    else return pages[pages.indexOf(currentPageId) + 1];
  };

  return (
    <div className="relative flex justify-between w-screen h-full">
      <div className="sticky top-0 h-full w-[15vw]">
        <LeftSidebar
          pages={pages}
          selectedPageId={selectedPageId}
          selectPage={selectPage}
          newPage={newPage}
        />
      </div>
      <div className="p-4 w-[40vw] h-full">
        {selectedPageId && content && (
          <TipTap
            key={selectedPageId}
            pageId={selectedPageId}
            totalWordCount={totalWordCount}
            projectId={projectId}
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
      <div className="sticky top-0 h-full w-[15vw]">
        <RightSidebar />
      </div>
    </div>
  );
};

export default EditorInstance;
