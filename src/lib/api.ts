import { DECK_COUNT, DECK_API } from "./constants";
import { Card, Deck } from "./type";

export const getNewDeck = async (): Promise<Deck> => {
  const res = await fetch(`${DECK_API}/new/shuffle/?deck_count=${DECK_COUNT}`);
  if (!res.ok) {
    throw new Error("Failed to fetch new deck");
  }
  return res.json();
};

export const getCards = async (
  deckId: string,
  count: number
): Promise<Card[]> => {
  const res = await fetch(`${DECK_API}/${deckId}/draw/?count=${count}`);
  if (!res.ok) {
    throw new Error("Failed to fetch cards");
  }
  const data = await res.json();
  return data.cards;
};

export const shuffleDeck = async (deckId: string) => {
  const res = await fetch(`${DECK_API}/${deckId}/shuffle`);
  if (!res.ok) {
    throw new Error("Failed to fetch cards");
  }
};
