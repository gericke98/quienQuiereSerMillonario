"use client";
import { useEffect, useState } from "react";
import CardArtist from "./cardArtist";
import QuestionCard from "./questionCard";
import { PrizePage } from "./prize";
import { cards } from "@/placeholder";
import FinalCard from "./finalCard";

export default function GamePage() {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [finalSelectedIndex, setFinalSelectedIndex] = useState<number | null>(
    null
  );
  const [isFlipped, setFlipped] = useState<boolean>(false);
  const [isFinal, setIsFinal] = useState<boolean>(false);
  const [correct, setCorrect] = useState<number>(0);

  useEffect(() => {
    if (correct > 0) {
      setTimeout(() => {
        startHighlighting();
      }, 2500);
    }
  }, [correct]);

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const startHighlighting = () => {
    setHighlightedIndex(null);
    setFinalSelectedIndex(null);
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    // Generate a random order
    const randomOrder = shuffleArray([...Array(cards.length).keys()]);
    let currentIndex = 0;
    interval = setInterval(() => {
      setHighlightedIndex(randomOrder[currentIndex]);
      currentIndex = (currentIndex + 1) % cards.length;
    }, 100); // Change the highlighting speed if needed

    // After 3 seconds, select a random card and stop the highlighting
    timeout = setTimeout(() => {
      clearInterval(interval);
      const randomIndex = Math.floor(Math.random() * cards.length);
      setHighlightedIndex(null); // Reset highlighting
      setFinalSelectedIndex(randomOrder[randomIndex]); // Highlight only the final card

      setTimeout(() => {
        setFlipped(true);
      }, 500);
    }, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  };
  return (
    <div className="w-full h-full flex flex-row">
      <div className="basis-3/4 relative">
        <div className="flex min-h-screen flex-col items-center justify-center px-10 py-10 bg-black-pattern relative">
          {!isFinal ? (
            <QuestionCard
              isFlipped={isFlipped}
              finalSelectedIndex={finalSelectedIndex}
              cards={cards}
              setFlipped={setFlipped}
              correct={correct}
              setCorrect={setCorrect}
              setIsFinal={setIsFinal}
            />
          ) : (
            <FinalCard correct={correct} />
          )}
          <div className="bg-white-pattern grid grid-cols-5 gap-2 w-full p-4 relative">
            {cards.map((card, index) => (
              <CardArtist
                key={index}
                image={card.image}
                text={card.text}
                isHighlighted={
                  index === highlightedIndex || index === finalSelectedIndex
                }
                isFinalSelected={index === finalSelectedIndex && isFlipped}
              />
            ))}
          </div>
          {correct === 0 && !isFinal && (
            <button
              className="bg-cyan-800 px-24 py-4 rounded-full mt-5 cursor-pointer text-white hover:bg-cyan-950 hover:font-bold"
              onClick={startHighlighting}
            >
              PLAY
            </button>
          )}
        </div>
      </div>
      <PrizePage correct={correct} />
    </div>
  );
}
