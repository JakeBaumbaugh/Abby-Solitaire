export type Suit = "heart" | "diamond" | "spade" | "club";

export default interface Card {
    suit: Suit;
    number: number;
}

export function getCardText(card: Card): string {
    const face = numberToText(card.number);
    const suit = `${card.suit.charAt(0).toUpperCase()}${card.suit.slice(1)}`;
    return `${face} of ${suit}s`;
}

export function numberToText(number: number): string {
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