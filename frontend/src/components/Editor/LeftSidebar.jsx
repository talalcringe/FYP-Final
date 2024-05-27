import Button from './Button';
import SolidButton from './SolidButton';

const LeftSidebar = ({ pages, selectedPageId, selectPage, newPage }) => {
  // console.log('Sidebar rendered with pages', selectedPageId, pages);

  return (
    <div className='bg-ghostWhite text-cerulean flex flex-col justify-start items-center h-[84vh] w-[15vw] rounded overflow-y-auto'>
      <SolidButton
        text='New Page'
        color='bg-emerald w-[90%]'
        onClick={newPage}
      />
      {pages.map((page, i) => (
        <Button
          key={page}
          text={`Page ${i + 1}`}
          defClass={selectedPageId === page ? 'is-active' : ''}
          onClick={() => selectPage(page)}
        />
      ))}
    </div>
  );
};

export default LeftSidebar;
