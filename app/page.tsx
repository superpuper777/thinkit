"use client";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import HomePic from "@/assets/brain.jpg";
// import Modal from "@/components/Modal/Modal";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => router.push("/quiz");

  return (
    <div className="flex flex-col gap-6 items-center mt-10">
      <p className="sm:text-2xl font-semibold text-sm">
        Do you have what it takes to become the ThinkIt-Quiz master?
      </p>
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
      {/* <Modal
        title={"Asdasd"}
        question={"asdfasfasfasfsafsa?"}
        text="sdfsdfsdf"
      /> */}
    </div>
  );
}
