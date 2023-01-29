import Card, { Suit } from './Card';

export default interface CardStack {
    cards: Card[];
    faceup: boolean;
}

export function getDeck(faceup: boolean, shuffled = true) {
    // Generate cards
    const suits: Suit[] = ["heart", "diamond", "spade", "club"];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const cards: Card[] = [];
    for(const suit of suits) {
        for(const number of numbers) {
            cards.push({suit, number});
        }
    }
    // Randomize cards
    if(shuffled) {
        // Fisher-Yates algorithm
        // https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
          }
    }
    // Create CardStack
    return {cards, faceup};
}

export const getTopCard = (stack: CardStack): Card|undefined => stack.cards.at(-1);

export const combineStacks = (stackBottom: CardStack, stackTop: CardStack): CardStack => ({
    cards: [...stackBottom.cards, ...stackTop.cards],
    faceup: stackTop.faceup
});