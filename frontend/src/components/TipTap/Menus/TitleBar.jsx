import SolidButton from '../../Editor/SolidButton';

const TitleBar = ({ title, wordCount, totalWordCount, deletePage }) => {
  // console.log('Topbar rendered with page', page);

  return (
    <div className='bg-ghostWhite text-ceruleanz flex justify-between items-center mb-1 h-1/8 w-full scroll rounded'>
      <SolidButton text='Delete Page' color='bg-poppy' onClick={deletePage} />
      <h1 className='text-3xl font-bold '>{title}</h1>
      <span className='text-l text-emerald font-semibold m-2 p-2 rounded'>
        {`page: ${wordCount} words . total: ${
          totalWordCount + wordCount
        } words`}
      </span>
    </div>
  );
};

export default TitleBar;
