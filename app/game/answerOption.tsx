import { cn } from "@/lib/utils";
import { AnswerQuestion, Respuesta } from "@/types";

type Props = {
  respuesta: Respuesta;
  index: number;
  setAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>;
  answer: number | null;
  isAnswered: boolean;
};

export const AnswerOption = ({
  respuesta,
  index,
  setAnswer,
  setIsAnswered,
  answer,
  isAnswered,
}: Props) => {
  const options = ["A", "B", "C", "D"];
  const handleClick = () => {
    setIsAnswered(true);
    setAnswer(index);
  };
  const newAnswer = respuesta.text.replace(/^[A-D]\) /, "");
  return (
    <button
      className={cn(
        "w-full bg-cyan-700 py-3 text-left pl-4 rounded-3xl text-white",
        answer === index && respuesta.correct && "bg-green-800",
        answer === index && !respuesta.correct && "bg-red-800",
        isAnswered && respuesta.correct && "bg-green-800",
        !isAnswered &&
          "hover:bg-cyan-900 hover:cursor-pointer hover:font-bold hover:scale-105"
      )}
      onClick={handleClick}
      disabled={isAnswered}
    >
      <h3>
        <span className="text-orange-500 font-bold">{options[index]}:</span>{" "}
        {newAnswer}
      </h3>
    </button>
  );
};
