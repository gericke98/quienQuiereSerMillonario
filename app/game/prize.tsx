import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaCrown } from "react-icons/fa";
import LogoImg from "@/public/XXX.png";
import Image from "next/image";

type Props = {
  correct: number;
};
const options = [
  {
    icon: <RiDiscountPercentFill size={25} />,
    prize: "DESCUENTO 10%",
  },
  {
    icon: <RiDiscountPercentFill size={25} />,
    prize: "DESCUENTO 20%",
  },
  {
    icon: <RiDiscountPercentFill size={25} />,
    prize: "DESCUENTO 30%",
  },
  {
    icon: <FaCrown size={25} />,
    prize: "CAMISETA GRATIS*",
  },
];
export const PrizePage = ({ correct }: Props) => {
  useEffect(() => {}, [correct]);
  return (
    <div className="basis-1/4 p-14 flex flex-col-reverse items-start justify-center h-full min-h-screen gap-5 border-l-2 border-red-800 bg-white-pattern">
      {options.map((option, idx) => (
        <div
          key={option.prize}
          className={cn(
            "w-full flex flex-row items-center pl-4 border border-cyan-800 rounded-xl",
            idx === correct && "bg-cyan-800 text-white rounded-xl font-semibold"
          )}
        >
          {option.icon}
          <h5 className="w-full p-3 rounded-2xl text-base">{option.prize}</h5>
        </div>
      ))}
      <div className="w-full h-full flex flex-col items-center">
        <Image
          src={LogoImg}
          alt="Logo"
          width={250}
          height={250}
          className="mb-5"
        />
      </div>
    </div>
  );
};
