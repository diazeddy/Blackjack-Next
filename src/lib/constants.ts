export const DECK_API = "https://deckofcardsapi.com/api/deck";
export const BACK_IMAGE = "https://deckofcardsapi.com/static/img/back.png";
export const DECK_COUNT = Number(process.env.DECK_COUNT ?? "6");
export const CARD_VALUE: Record<string, number> = {
  A: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  1: 10,
  J: 10,
  Q: 10,
  K: 10,
};
