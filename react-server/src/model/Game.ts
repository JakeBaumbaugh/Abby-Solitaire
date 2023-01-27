import CardStack, { getDeck } from "./CardStack";

export default interface Game {
    board: CardStack[];
    deck: CardStack;
}

export const newGame = () => ({
    board: [],
    deck: getDeck(false),
});