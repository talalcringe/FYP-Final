const SolidButton = ({ text, color, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`flex items-center justify-center font-bold p-2 m-2 rounded text-ghostWhite transition hover:scale-105 ${color}`}
      >
        <span className='flex justify-center items-center gap-2'>{text}</span>
      </button>
    </>
  );
};

export default SolidButton;
