import Button from './Button';
import SolidButton from './SolidButton';

const RightSidebar = ({}) => {
  // console.log('Sidebar rendered with pages', selectedPageId, pages);

  return (
    <div className='bg-ghostWhite text-cerulean flex flex-col justify-start items-center h-[92vh] w-[15vw] rounded overflow-y-auto'>
      <SolidButton
        text='Chatbot'
        color='bg-emerald h-20 w-[90%]'
        onClick={() => {}}
      />
      <SolidButton
        text='Exporting'
        color='bg-emerald h-20 w-[90%]'
        onClick={() => {}}
      />
      <SolidButton
        text='Sprinting'
        color='bg-emerald h-20 w-[90%]'
        onClick={() => {}}
      />
      <SolidButton
        text='Audio'
        color='bg-emerald h-20 w-[90%]'
        onClick={() => {}}
      />
    </div>
  );
};

export default RightSidebar;
