import { TERipple } from "tw-elements-react";

type Props = {
  text: string;
  onClick: () => void;
  size: string;
  disabled?: boolean;
};

const Button = ({ text, onClick, size, disabled }: Props) => {
  return (
    <TERipple rippleColor="white">
      <button
        type="button"
        className={`text-slate-900 font-medium uppercase select-none ${size} bg-[#9694aa] sm:py-2 sm:px-8 py-2 px-4 rounded-md disabled:opacity-60 disabled:pointer-events-none shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#767391] active:bg-[#46b5d4]`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </TERipple>
  );
};

export default Button;
