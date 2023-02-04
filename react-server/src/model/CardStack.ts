import Card, { Suit } from './Card';

export default class CardStack {
    readonly cards: Card[];
    readonly faceup: boolean;

    constructor(cards?: Card[], faceup?: boolean) {
        this.cards = cards ?? [];
        this.faceup = faceup ?? true;
    }

    getTopCard(): Card|undefined {
        return this.cards.at(-1);
    }

    stackAbove(stack: CardStack): CardStack {
        return new CardStack([...stack.cards, ...this.cards], this.faceup);
    }

    stackUnder(stack: CardStack): CardStack {
        return new CardStack([...this.cards, ...stack.cards], stack.faceup);
    }
}

export function getDeck(faceup: boolean, shuffled = true): CardStack {
    // Generate cards
    const suits: Suit[] = ["heart", "diamond", "spade", "club"];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const cards: Card[] = [];
    for(const suit of suits) {
        for(const number of numbers) {
            cards.push(new Card(suit, number));
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
    return new CardStack(cards, faceup);
}