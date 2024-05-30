import SolidButton from "../../Editor/SolidButton";

const TitleBar = ({ title, wordCount, deletePage, totalWordCount }) => {
  // console.log('Topbar rendered with page', page);

  return (
    <div className="bg-ghostWhite text-cerulean flex justify-between items-center my-2 p-2 h-1/8 w-full rounded">
      <SolidButton text="Delete Page" color="bg-poppy" onClick={deletePage} />
      <h1 className="text-3xl font-bold">{title}</h1>
      <span className="text-l text-emerald font-semibold m-2 p-2 rounded">
        {totalWordCount + wordCount} words
      </span>
    </div>
  );
};

export default TitleBar;
