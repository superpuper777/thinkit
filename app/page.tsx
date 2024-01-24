"use client";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import HomePic from "@/assets/brain.jpg";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => router.push("/quiz");

  return (
    <main className="flex min-h-screen flex-col gap-6 items-center mt-10">
      <p className="sm:text-2xl font-semibold text-sm">
        Do you have what it takes to become the ThinkIt-Quiz master?
      </p>
      <Image
        className="max-w-[700px] w-full rounded-lg"
        src={HomePic}
        alt="picture"
      />
      <Button text={"Start Quiz"} onClick={handleButtonClick}></Button>
    </main>
  );
}
