import CardStack, { getDeck } from "./CardStack";

export default interface Game {
    board: CardStack[];
    deck: CardStack;
}

export const newGame = (): Game => ({
    board: [],
    deck: getDeck(false),
});