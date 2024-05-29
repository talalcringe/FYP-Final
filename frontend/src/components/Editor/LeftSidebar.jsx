import Button from "./Button";
import SolidButton from "./SolidButton";

const LeftSidebar = ({ pages, selectedPageId, selectPage, newPage }) => {
  // console.log('Sidebar rendered with pages', selectedPageId, pages);

  return (
    <div className="bg-ghostWhite text-cerulean flex flex-col justify-start items-center mx-2 py-8 p-0 h-[100vh] w-full overflow-auto">
      <SolidButton
        text="New Page"
        color="bg-emerald w-[90%]"
        onClick={newPage}
      />
      {pages.map((page, i) => (
        <Button
          key={page}
          text={`Page ${i + 1}`}
          defClass={selectedPageId === page ? "is-active" : ""}
          onClick={() => selectPage(page)}
        />
      ))}
    </div>
  );
};

export default LeftSidebar;
