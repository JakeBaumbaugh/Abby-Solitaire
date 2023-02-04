export type Suit = "heart" | "diamond" | "spade" | "club";

export default class Card {
    readonly suit: Suit;
    readonly number: number;

    constructor(suit: Suit, number: number) {
        this.suit = suit;
        this.number = number;
    }

    getCardText(): string {
        const face = numberToText(this.number);
        const suit = `${this.suit.charAt(0).toUpperCase()}${this.suit.slice(1)}`;
        return `${face} of ${suit}s`;
    }

    matches(card: Card): boolean {
        return this.suit === card.suit || this.number === card.number;
    }
    
}

function numberToText(number: number): string {
    switch(number) {
        case 1:
            return "Ace";
        case 11:
            return "Jack";
        case 12:
            return "Queen";
        case 13:
            return "King";
        default:
            return `${number}`;
    }
}