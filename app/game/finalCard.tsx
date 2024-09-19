import Image from "next/image";
import { useAudio, useWindowSize } from "react-use";
import LogoImg from "@/public/XXX.png";
import Confetti from "react-confetti";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaCrown } from "react-icons/fa";

type Props = {
  correct: number;
};

export default function FinalCard({ correct }: Props) {
  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });
  const { width, height } = useWindowSize();
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
      prize: "CAMISETA GRATIS",
    },
  ];
  return (
    <div className="bg-white absolute top-1/2 left-1/2 min-h-80 z-50 py-10 px-10 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8 w-4/6 rounded-2xl">
      <Confetti width={width} height={height} />
      {finishAudio}
      <div className="bg-white-pattern py-14 px-14 rounded-3xl flex flex-col items-center gap-5">
        <Image
          src={LogoImg}
          height={450}
          width={450}
          alt="Logo"
          className="mb-24"
        />
        <h5 className="font-bold mb-10 text-center text-2xl">
          ENHORABUENA!! HAS GANADO EL SIGUIENTE PREMIO: <br></br>
          <span className="text-3xl font-bold text-cyan-950 mt-5">
            {correct > 0 ? (
              options[correct - 1].prize
            ) : (
              <p>Suerte la próxima vez!</p>
            )}
          </span>
        </h5>
      </div>
    </div>
  );
}
