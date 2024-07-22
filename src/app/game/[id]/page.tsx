import { GameBoard } from "./GameBoard";
import { getCards } from "@/lib/api";

const Game = async ({ params }: { params: { id: string } }) => {
  const cards = await getCards(params.id, 4);
  return (
    <>
      <GameBoard id={params.id} cards={cards} />
    </>
  );
};

export default Game;
