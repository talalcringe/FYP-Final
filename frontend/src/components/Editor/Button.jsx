const Button = ({
  text,
  onClick,
  disabled,
  defClass,
  infoText,
  blockLabel,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center font-bold p-1 m-1 transition hover:scale-105  hover:bg-cerulean hover:text-ghostWhite rounded ${defClass}`}
      title={infoText}
    >
      <span className='flex justify-center items-center gap-2'>
        {text}
        {blockLabel}
      </span>
    </button>
  );
};

export default Button;
