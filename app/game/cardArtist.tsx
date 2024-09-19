// components/Card.tsx
import React from "react";
interface CardProps {
  image: string;
  text: string;
  isHighlighted: boolean;
  isFinalSelected: boolean;
}

export const CardArtist: React.FC<CardProps> = ({
  image,
  text,
  isHighlighted,
  isFinalSelected,
}) => {
  return (
    <div
      className={`relative w-full h-52 cursor-pointer ${
        isHighlighted ? "ring-4 ring-cyan-500" : ""
      }`}
    >
      <div
        className={`relative w-full h-full transition-transform duration-2000 transform ${
          isFinalSelected ? "z-10" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full">
          <div
            className={`relative p-2 bg-white rounded-lg shadow-lg transition-all ${
              isHighlighted ? "ring-4 ring-blue-500 scale-110 z-20" : ""
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "200px", // Adjust the height as needed
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
              <p className="text-white text-center text-xl">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardArtist;
