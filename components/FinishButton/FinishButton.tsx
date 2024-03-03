import { resetToken } from "@/app/actions";
import { useRouter } from "next/navigation";

import Button from "../Button/Button";

type Props = {
  token: string;
};

const FinishButton = ({ token }: Props) => {
  const router = useRouter();
  const handleFinishGame = async () => {
    await resetToken(token);
    router.push("/");
  };
  return (
    <Button text="Finish Game" onClick={handleFinishGame} size="sm:text-lg" />
  );
};

export default FinishButton;
