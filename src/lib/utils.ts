import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Card } from "./type";
import { CARD_VALUE } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getScore = (cards: Card[]): number => {
  const sum = cards
    .map((card) => CARD_VALUE[card.value[0]])
    .reduce((prev, current) => prev + current, 0);
  return cards
    .filter((card) => card.value[0] === "A")
    .reduce((prev) => {
      return prev + 10 > 21 ? prev : prev + 10;
    }, sum);
};
