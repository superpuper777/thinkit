"use client";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import HomePic from "@/assets/brain.jpg";

import DropDown from "@/components/DropDown/DropDown";
import { Category, FormattedOption } from "@/types/quiz";
import { difficulties } from "@/mocks";
import { formattedObject } from "@/utils/formattedOptionsObj";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";
import { useState } from "react";
import { difficultyStore } from "./store/difficulty";
import { categoryStore } from "./store/category";
import { tokenStore } from "./store/token";
import { getToken } from "./actions";

type Props = {
  categories: Array<Category>;
};

export default function Home({ categories }: Props) {
  const router = useRouter();
  const formattedCategories = categories.map((el) => formattedObject(el));

  const currentDifficulty = difficultyStore((state) => state.difficulty);
  const changeCurrentDifficulty = difficultyStore(
    (state) => state.changeDifficulty
  );
  const [difficulty, setDifficulty] = useState<SelectValue | FormattedOption>(
    currentDifficulty
  );

  const currentCategory = categoryStore((state) => state.category);
  const changeCurrentCategory = categoryStore((state) => state.changeCategory);
  const saveToken = tokenStore((state) => state.saveToken);
  const [category, setCategory] = useState<SelectValue | FormattedOption>(
    currentCategory
  );

  const handleButtonClick = async () => {
    const { token } = await getToken();
    saveToken(token);
    router.push("/quiz");
  };

  const handleCategoryChange = (value: SelectValue) => {
    setCategory(value);
    changeCurrentCategory(value);
  };

  const handleDifficultyChange = (value: SelectValue) => {
    setDifficulty(value);
    changeCurrentDifficulty(value);
  };
  return (
    <div className="flex flex-col gap-6 items-center mt-10">
      <p className="sm:text-2xl font-semibold text-sm">
        Do you have what it takes to become the ThinkIt-Quiz master?
      </p>
      <div className="w-full max-w-80 flex flex-col gap-4">
        <DropDown
          options={[
            { value: "", label: "Any Category" },
            ...formattedCategories,
          ]}
          value={category}
          onChange={handleCategoryChange}
        />
        <DropDown
          options={difficulties}
          value={difficulty}
          onChange={handleDifficultyChange}
        />
      </div>
      <Image
        className="max-w-[700px] w-full rounded-lg"
        src={HomePic}
        alt="picture"
      />
      <Button
        text={"Start Quiz"}
        onClick={handleButtonClick}
        size="sm:text-3xl"
      ></Button>
    </div>
  );
}
