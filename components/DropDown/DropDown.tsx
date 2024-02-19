import { useState } from "react";
import Select from "react-tailwindcss-select";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";

const options = [
  { value: "fox", label: "🦊 Fox" },
  { value: "Butterfly", label: "🦋 Butterfly" },
  { value: "Honeybee", label: "🐝 Honeybee" },
];

const DropDown = () => {
  const [animal, setAnimal] = useState<SelectValue | null>(null);

  const handleChange = (value: SelectValue) => {
    console.log("value:", value);
    setAnimal(value);
  };

  return (
    <Select
      primaryColor="gray"
      value={animal}
      onChange={handleChange}
      options={options}
    />
  );
};

export default DropDown;
