type Props = {
  text: string;
  onClick: () => void;
  size: string;
  disabled?: boolean;
};

const Button = ({ text, onClick, size, disabled }: Props) => {
  return (
    <button
      type="button"
      className={`select-none ${size} text-base bg-[#9694aa] font-bold sm:py-2 sm:px-8 py-1 px-4 rounded-md disabled:opacity-60`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
