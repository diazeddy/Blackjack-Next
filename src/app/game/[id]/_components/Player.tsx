import Image from "next/image";

import { Card } from "@lib/type";

interface PlayerProps {
  label: string;
  cards: Card[];
  score: number;
}

export const Player = ({ label, cards, score }: PlayerProps) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full">
      <h3>
        {label} : {score}
      </h3>
      <div className="flex gap-5 items-center">
        {cards.map((card) => (
          <Image
            key={card.code}
            src={card.image}
            alt={card.code}
            width={110}
            height={120}
            style={{ height: "auto" }}
          />
        ))}
      </div>
    </div>
  );
};
