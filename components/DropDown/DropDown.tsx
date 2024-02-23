import Select from "react-tailwindcss-select";
import {
  SelectValue,
  Options,
} from "react-tailwindcss-select/dist/components/type";

type Props = {
  options: Options;
  value: SelectValue;
  onChange: (value: SelectValue) => void;
};

const DropDown = ({ options, value, onChange }: Props) => {
  console.log(options);

  return (
    <Select
      primaryColor="gray"
      value={value}
      onChange={onChange}
      options={options}
    />
  );
};

export default DropDown;
