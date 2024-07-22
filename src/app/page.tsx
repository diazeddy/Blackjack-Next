import Link from "next/link";

import { Button } from "@components/ui/button";
import { getNewDeck } from "@lib/api";

const Home = async () => {
  const deck = await getNewDeck();

  return (
    <main className="flex flex-col gap-24 items-center justify-center h-full">
      <h1>Simple Blackjack Game</h1>
      <Button size="lg">
        <Link href={`/game/${deck.deck_id}`}>Start</Link>
      </Button>
    </main>
  );
};

export default Home;
