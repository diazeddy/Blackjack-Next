"use client";

import { useEffect, useCallback, useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { Fireworks } from "fireworks-js";

import { Card } from "@/lib/type";
import { Player } from "./Player";
import { getCards, shuffleDeck } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { getScore } from "@/lib/utils";
import logo from "@/assets/logo.svg";

interface GameBoardProps {
  id: string;
  cards: Card[];
}

export const GameBoard = ({ id, cards }: GameBoardProps) => {
  const [houseCards, setHouseCards] = useState<Card[]>(cards.slice(0, 2));
  const [houseScore, setHouseScore] = useState(0);
  const [userCards, setUserCards] = useState<Card[]>(cards.slice(2));
  const [userScore, setUserScore] = useState(0);
  const [isStand, setStand] = useState(false);
  const [isWin, setWin] = useState(false);
  const [firework, setFirework] = useState<Fireworks | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const onClickHit = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      if (!isStand) {
        const card = await getCards(id, 1);
        setUserCards((prev) => [...prev, card[0]]);
      }
    },
    [id, isStand, setUserCards]
  );

  const onClickStand = useCallback(() => {
    setStand(true);
    setWin(userScore === 21 || (userScore < 21 && userScore > houseScore));
    if (userScore === 21 || (userScore < 21 && userScore > houseScore)) {
      firework?.start();
    }
  }, [setStand, houseScore, userScore, firework]);

  useEffect(() => {
    setHouseScore(getScore(houseCards));
  }, [houseCards]);

  useEffect(() => {
    const score = getScore(userCards);
    setUserScore(score);
    if (score >= 21) {
      setStand(true);
      setWin(score === 21);
      if (score === 21) {
        firework?.start();
      }
    } else {
      setStand(false);
      firework?.stop();
    }
  }, [userCards, houseScore, firework]);

  useEffect(() => {
    setFirework((prev) =>
      prev === null
        ? new Fireworks(divRef.current!, {
            particles: 200,
            explosion: 10,
            autoresize: true,
          })
        : prev
    );
  }, []);

  const onClickOutside = useCallback(async () => {
    if (isStand) {
      await shuffleDeck(id);
      const cards = await getCards(id, 4);
      setStand(false);
      firework?.stop();
      setHouseCards(cards.slice(0, 2));
      setUserCards(cards.slice(2));
    }
  }, [isStand, id, firework, setStand, setHouseCards, setUserCards]);

  useEffect(() => {
    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 h-screen border-[20px] border-orange-900 p-3">
      <div
        ref={divRef}
        id="container"
        className="-z-10 absolute w-full h-full top-0 lef-0"
      ></div>
      <Player label="House" cards={houseCards} score={houseScore} />

      <div className="grid grid-cols-4 items-center gap-40 w-full">
        <Image
          src="https://deckofcardsapi.com/static/img/back.png"
          alt="Card Back Image"
          width={110}
          height={120}
          className="justify-self-center"
        />
        <Image
          src={logo}
          alt="logo"
          width={500}
          height={80}
          className="col-span-2 justify-self-center"
        />
        <div className="flex flex-col gap-10 p-10">
          <Button size="lg" onClick={onClickHit} disabled={isStand}>
            Hit
          </Button>
          <Button size="lg" onClick={onClickStand} disabled={isStand}>
            Stands
          </Button>
        </div>
      </div>

      <Player label="Card" cards={userCards} score={userScore} />

      {isStand && (
        <div className="absolute text-4xl font-black text-white w-1/3 text-center p-5 rounded-3xl bg-black">
          {isWin ? "You Win" : "You Lose"}
        </div>
      )}
    </div>
  );
};
