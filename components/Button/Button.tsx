type Props = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: Props) => {
  return (
    <button
      type="button"
      className="select-none sm:text-3xl text-base bg-[#9694aa] font-bold sm:py-2 sm:px-8 py-1 px-4 rounded-md"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
