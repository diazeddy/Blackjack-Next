import Link from "next/link";

import { Button } from "@/components/ui/button";
import Heading1 from "@/components/Heading1";
import { getNewDeck } from "@/lib/api";

const Home = async () => {
  const deck = await getNewDeck();

  return (
    <main className="flex flex-col gap-24 items-center justify-center h-full">
      <Heading1>Simple Blackjack Game</Heading1>
      <Button size="lg">
        <Link href={`/game/${deck.deck_id}`}>Start</Link>
      </Button>
    </main>
  );
};

export default Home;
