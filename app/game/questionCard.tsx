"use client";
import { CardData, Question } from "@/types";
import Image from "next/image";
import { AnswerOption } from "./answerOption";
import React, { useEffect, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useAudio } from "react-use";
import CountdownTimer from "./timer";
import { questionMaster } from "@/placeholder/questions";

type Props = {
  isFlipped: boolean;
  finalSelectedIndex: number | null;
  cards: CardData[];
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  correct: number;
  setCorrect: React.Dispatch<React.SetStateAction<number>>;
  setIsFinal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function QuestionCard({
  isFlipped,
  finalSelectedIndex,
  cards,
  setFlipped,
  correct,
  setCorrect,
  setIsFinal,
}: Props) {
  function getRandomQuestion(questions: any[]) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }

  function filterByCantantesAndNivel(cantante: string, nivel: number) {
    return questionMaster.filter(
      (item) =>
        item.Cantantes.toUpperCase() === cantante.toUpperCase() &&
        item.Nivel === nivel
    );
  }

  const [answer, setAnswer] = useState<number | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [resetTimer, setResetTimer] = useState<boolean>(false);
  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: "/incorrect.wav",
  });

  useEffect(() => {
    if (finalSelectedIndex !== null && cards[finalSelectedIndex] && isFlipped) {
      // Extract the artist and filter by both artist and level
      const artist = cards[finalSelectedIndex].text;
      if (artist) {
        const filteredQuestions = filterByCantantesAndNivel(
          artist,
          correct + 1
        );
        if (filteredQuestions.length > 0) {
          const randomQuestion = getRandomQuestion(filteredQuestions);
          setQuestion(randomQuestion); // Save the random question in state
        } else {
          console.log("No questions found for the selected artist and level.");
        }
      }
    }
  }, [finalSelectedIndex, correct]);

  const handleAnswerClick = (idx: number) => {
    const baseIndex = question?.Respuestas[0].id;
    if (baseIndex) {
      if (
        baseIndex + idx ===
        question?.Respuestas.filter((respuesta) => respuesta.correct)[0].id
      ) {
        correctControls.play();
        if (correct > 2) {
          setCorrect(correct + 1);
          setFlipped(false);
          setIsAnswered(false);
          setIsFinal(true);
        } else {
          setTimeout(() => {
            setAnswer(null);
            setIsAnswered(false);
            setFlipped(false);
            setCorrect(correct + 1);
            setResetTimer((prev) => !prev);
          }, 2500);
        }
      } else {
        incorrectControls.play();
        setTimeout(() => {
          setIsFinal(true);
        }, 1500);
      }
    }
  };

  const handleClick = () => {
    setAnswer(null);
    setIsAnswered(false);
    setFlipped(false);
  };

  const correctJSON = [
    "Un descuento del 10% en juego",
    "Un descuento del 20% en juego",
    "Un descuento del 30% en juego",
    "Una camiseta gratis en juego",
  ];

  return (
    <div className="bg-white absolute top-1/2 left-1/2 min-h-80 z-50 py-10 px-10 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8 w-4/6 rounded-2xl">
      {correctAudio}
      {incorrectAudio}
      <IoCloseCircleSharp
        size={25}
        className="cursor-pointer"
        onClick={handleClick}
      />
      <div className="bg-white-pattern py-3 px-14 rounded-3xl flex flex-col items-center gap-5">
        <Image
          src={
            finalSelectedIndex
              ? `${cards[finalSelectedIndex].image}`
              : "/01-hombresg-1.3e7890dd9e76.webp"
          }
          height={350}
          width={350}
          alt="Hola"
        />
        <CountdownTimer
          setIsFinal={setIsFinal}
          resetTimer={resetTimer}
          isFlipped={isFlipped}
        />

        <h2 className="mt-2 font-semibold text-lg text-center">
          {correctJSON[correct]}. {question?.Preguntas}
        </h2>
      </div>
      <div className="grid grid-cols-2 mt-3 gap-4">
        {question?.Respuestas.map((respuesta, idx) => (
          <div key={respuesta.id} onClick={() => handleAnswerClick(idx)}>
            <AnswerOption
              respuesta={respuesta}
              index={idx}
              setAnswer={setAnswer}
              setIsAnswered={setIsAnswered}
              answer={answer}
              isAnswered={isAnswered}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
